import clsx from "clsx";
import { createContext, createElement, Fragment, h, Ref, VNode } from "preact";
import { getFromLocalStorage, ManagedChildInfo, storeToLocalStorage, useMergedProps, useRandomId, UseReferencedIdPropsReturnType, useState, useTimeout } from "preact-prop-helpers";
import { Swappable } from "preact-transition";
import { Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { ButtonColorVariant } from "../button/types";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps, useSpinnerDelay } from "../props";

export type ProgressColorVariant = Exclude<ButtonColorVariant, "link">;

export interface LinearProgressProps extends Omit<UseAriaProgressBarParameters<HTMLProgressElement>, "tag"> {
    striped?: boolean;
    variant?: "solid" | "striped" | "animated";
    colorVariant?: ProgressColorVariant;
}


export interface UseAriaProgressBarParameters<E extends Element> extends TagSensitiveProps<E> {
    max?: number;           // Default is 1. No min property is provided because the HTML element doesn't support it.
    value: number | null;   // [0, max] (so the default is [0, 1]), or null to denote being indeterminate.
    valueText?: string;     // If the value isn't a linear, numeric percentage, but some other value, specify it here.
}

export interface CircularProgressProps extends GlobalAttributes<HTMLDivElement> {
    colorVariant?: ProgressColorVariant;
    children?: VNode<any>;
    childrenPosition?: "child" | "before" | "after" | "merged";

    loadingLabel?: string;

    /**
     * Controls how the indicator is displayed.
     * 
     * After the async operation ends, you can optionally show that
     * the operation succeeded or failed briefly afterwards. Otherwise,
     * use "pending" while it's in-progress and null to hide the spinner.
     * (It auto-hides with "succeeded" and "failed")
     */
    mode: null | "pending" | "succeeded" | "failed";
    colorFill?: "background" | "foreground" | "foreground-only";

    /**
     * How long to wait until showing the spinner.  Default is 1000ms, or whatever has been provided via `ProvideSpinnerDelay`.
     */
    spinnerTimeout?: number;
}

// It's possible to do this as useEffect, but doing so screws up the animation in Chrome sometimes
// presumably because the number of elements changes. 
// (and in really weird ways -- changing the animation speed in the console fixes it until you put it back at 100% speed???).
// Assuming that's the case, it's easier to just take care of the element count on page load.
let gimmickCount = 8;
(() => {
    let lastSet = (getFromLocalStorage<Persistence>()("circular-progress-gimmick-last-set", str => new Date(str)) ?? new Date(1970, 0, 1));

    const daysSinceLastGimmickSet = Math.floor((+(new Date()) - +lastSet) / 1000 / 60 / 60 / (24 - 5));
    if (daysSinceLastGimmickSet > 0) {
        let newCount = 4 + Math.round(Math.random() * 2 + Math.random() * 2);
        gimmickCount = newCount;
        storeToLocalStorage<Persistence>()("circular-progress-gimmick-last-set", new Date(), d => d.toISOString());
        storeToLocalStorage<Persistence>()("circular-progress-gimmick-count", gimmickCount, JSON.stringify);
    }
    else {
        gimmickCount = (getFromLocalStorage<Persistence>()("circular-progress-gimmick-count", JSON.parse) ?? 8)
    }

})();

export function useAriaProgressBar<ProgressElement extends Element>({ tag, max, value, valueText }: UseAriaProgressBarParameters<ProgressElement>) {

    //const { inputId, labelId, useGenericLabelInput, useGenericLabelLabel, useReferencedInputIdProps, useReferencedLabelIdProps } = useGenericLabel({ inputPrefix: "progressbar-", labelPrefix: "progressbar-reference-" });
    const { id: progressBarId, getId, useRandomIdProps, useReferencedIdProps } = useRandomId({ prefix: "progressbar-" })


    function useProgressProps<P extends h.JSX.HTMLAttributes<ProgressElement>>({ "aria-valuemax": ariaValueMax, "aria-valuenow": ariaValueNow, "aria-valuetext": ariaValueText, role, ...p }: P) {
        const extraProps: h.JSX.HTMLAttributes<ProgressElement> = tag === "progress" ?
            {
                max,
                value: (value ?? undefined),
                "aria-valuemin": "0",
                "aria-valuenow": value == null ? undefined : `${value}`,
            } as h.JSX.HTMLAttributes<HTMLProgressElement> as any as h.JSX.HTMLAttributes<ProgressElement>
            :
            {
                "aria-valuemin": "0",
                "aria-valuemax": max == null ? undefined : `${max}`,
                "aria-valuetext": valueText == null ? undefined : `${valueText}`,
                "aria-valuenow": value == null ? undefined : `${value}`,
                role: "progressbar"
            };

        return useRandomIdProps(useMergedProps<ProgressElement>()(extraProps, p))
    }

    const useReferencedElement = useCallback(function useReferencedElement<ReferencedElement extends Element>() {
        function useReferencedProps<P extends h.JSX.HTMLAttributes<ReferencedElement>>(props: P) {
            return useReferencedIdProps("aria-controls")(props);
        }

        return { useReferencedProps };
    }, [useReferencedIdProps])


    return { useProgressProps, useReferencedElement };
}

// TODO: What's with this weird typing? It fails when ReferencedElement is used
type T = <ReferencedElement extends Element>() => {
    useReferencedProps: <P extends h.JSX.HTMLAttributes<Element>>(props: P) => UseReferencedIdPropsReturnType<P, "aria-controls">;
}

interface ProgressBarInfo extends ManagedChildInfo<"progressbar"> {
    setHook(hook: T): void;
}

export const ProgressAsChildContext = createContext<((hook: T) => void) | undefined>(undefined);
const ProgressMaxContext = createContext<undefined | number>(undefined);
const ProgressValueContext = createContext<undefined | null | number>(undefined);
const ProgressValueTextContext = createContext<undefined | string>(undefined);

/**
 * A progress bar can either take its value & max arguments directly,
 * or have them provided by a parent via varions Context objects.
 * 
 * Props will be prioritized over context if both are given.
 * @param param0 
 * @returns 
 */
export const ProgressLinear = memo(forwardElementRef(function ProgressLinear({ colorVariant, max: maxProp, value: valueProp, valueText: valueTextProp, striped, variant, ...rest }: LinearProgressProps, ref: Ref<HTMLDivElement>) {
    let value = (useContext(ProgressValueContext));
    let max = useContext(ProgressMaxContext);
    let valueText = useContext(ProgressValueTextContext);

    if (value === undefined)
        value = valueProp;

    if (max === undefined)
        max = maxProp;

    if (valueText === undefined)
        valueText = valueTextProp;


    const provideParentWithHook = useContext(ProgressAsChildContext);
    const { useProgressProps, useReferencedElement } = useAriaProgressBar<HTMLProgressElement>({ value, valueText, max, tag: "progress" });

    useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

    return (
        <div {...useMergedProps<HTMLDivElement>()({ ref, className: clsx("progress", `bg-${colorVariant ?? "primary"}`) }, rest)}>
            <progress {...useProgressProps({ className: "progress-bar" })} />
        </div>
    )
}))


// :)
const R = ((new Date()).getDate() % 2);

function Check() {
    return (
        <i class="bi bi-check" />
    )
}

function Cross() {
    return (
        <i class="bi bi-x" />
    )
}

function safeParseInt(str: string) {
    let ret = parseInt(str)
    if (!isFinite(ret) || isNaN(ret))
        return 0;
    return ret;
}

interface Persistence {
    "circular-progress-gimmick-last-set": Date;
    "circular-progress-gimmick-count": number;
}

export const ProgressCircular = forwardElementRef(function ({ loadingLabel, spinnerTimeout, mode, colorFill, childrenPosition, children, colorVariant, ...p }: CircularProgressProps, ref: Ref<HTMLDivElement>) {
    loadingLabel ??= "Operation pending";
    const { useProgressProps, useReferencedElement } = useAriaProgressBar<HTMLDivElement>({ value: null, valueText: loadingLabel, max: 1, tag: "div" });

    //useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

    const [delay, setDelay] = useState(`-${Math.random() * 30}s`);
    const { useReferencedProps } = useReferencedElement<any>();
    const showSpinner = useSpinnerDelay(mode === "pending", spinnerTimeout);
    //const [spinnerShowCount, setSpinnerShowCount] = useState(0);
    //useEffect(() => { setSpinnerShowCount(s => ++s) }, [showSpinner]);


    useEffect(() => { setShownStatusLongEnough(false); }, [mode])
    const [shownStatusLongEnough, setShownStatusLongEnough] = useState(false);
    useTimeout({
        callback: () => { if (mode == "failed" || (mode == "succeeded")) setShownStatusLongEnough(true) },
        timeout: 1000,
        triggerIndex: mode
    });

    // This is used to ensure that the "success" icon
    // is only shown immediately after a failure has occurred.
    const [previousSettledMode, setPreviousSettledMode, getPreviousSettledMode] = useState<typeof mode>("pending");
    const [succeededAfterFailure, setSucceededAfterFailure, getSucceededAfterFailure] = useState(false);
    useEffect(() => {
        if (getSucceededAfterFailure())
            setSucceededAfterFailure(false);

        if (mode == "succeeded") {
            if (getPreviousSettledMode() == "failed") {
                setSucceededAfterFailure(true);
            }

            setPreviousSettledMode(mode);
        }
        else if (mode == "failed") {
            setPreviousSettledMode("failed");
        }
    }, [mode]);


    childrenPosition ??= "after";
    if (children && (typeof children != "object" || !("type" in (children))))
        children = <span>{children}</span>;


    let progressProps = useMergedProps<HTMLDivElement>()({ ref, className: clsx("circular-progress-container") }, useMergedProps<HTMLDivElement>()(useProgressProps({ "aria-hidden": `${mode != "pending"}` }), p));

    progressProps = useMergedProps<HTMLDivElement>()(progressProps, childrenPosition === "merged" ? { ...children?.props, ref: children?.ref } : {});

    let progressVnodeType = childrenPosition === "merged"? (children?.type ?? "div") : "div";

    const progressElement = (
        h(progressVnodeType as any, progressProps, <>
            {mode === "pending" && !!loadingLabel && <div role="alert" aria-live="assertive" class="visually-hidden">{loadingLabel}</div>}
            {mode !== null && <Swappable>
                <div className="circular-progress-swappable">
                    <Fade show={mode === "pending" && showSpinner} exitVisibility="removed">
                        <div style={{ "--count": gimmickCount, "--delay": delay } as any} className={clsx("circular-progress", colorVariant ? `circular-progress-${colorVariant}` : undefined, colorFill == "foreground" && "inverse-fill", colorFill === "foreground-only" && "no-fill")}>
                            {Array.from(function* () {
                                for (let i = 0; i < gimmickCount; ++i)
                                    yield <div class={clsx("circular-progress-ball-origin", `circular-progress-ball-origin-${i}`)}><div class="circular-progress-ball" /></div>;
                            }())}
                        </div>
                    </Fade>
                    <Fade show={!shownStatusLongEnough && mode === "succeeded" && succeededAfterFailure}><div class="circular-progress-succeeded"><Check /></div></Fade>
                    <Fade show={!shownStatusLongEnough && mode === "failed"}><div class="circular-progress-failed"><Cross /></div></Fade>
                </div>
            </Swappable>}
        </>)
    );

    return (
        <>
            {childrenPosition == "before" && progressElement}
            {children && createElement(children.type as any, useMergedProps<any>()({ children: childrenPosition === "child" ? progressElement : undefined, ref: children.ref as any }, useReferencedProps(children.props)))}
            {childrenPosition == "after" && progressElement}
        </>
    )
})


