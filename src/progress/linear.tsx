import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, createElement, Fragment, h, Ref, VNode } from "preact";
import { useGenericLabel } from "preact-aria-widgets/use-label";
import { ManagedChildInfo, useMergedProps, useRandomId, useState, useTimeout } from "preact-prop-helpers";
import { UsedManagedChild } from "preact-prop-helpers/use-child-manager";
import { UseReferencedIdPropsReturnType } from "preact-prop-helpers/use-random-id";
import { useCallback, useContext, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps, useSpinnerDelay } from "../props";
import { ButtonColorVariant } from "../button/types";
import { Fade } from "preact-transition/fade";
import { Swappable } from "preact-transition";

export type ProgressColorVariant = Exclude<ButtonColorVariant, "link">;

export interface LinearProgressProps extends Omit<UseAriaProgressBarParameters<HTMLProgressElement>, "tag"> {
    striped?: boolean;
    variant?: "solid" | "striped" | "animated";
    color?: ProgressColorVariant;
}


export interface UseAriaProgressBarParameters<E extends Element> extends TagSensitiveProps<E> {
    max?: number;           // Default is 1. No min property is provided because the HTML element doesn't support it.
    value: number | null;   // [0, max] (so the default is [0, 1]), or null to denote being indeterminate.
    valueText?: string;     // If the value isn't a linear, numeric percentage, but some other value, specify it here.
}

export interface CircularProgressProps extends GlobalAttributes<HTMLDivElement> {
    color?: ProgressColorVariant;
    children?: VNode<any>;
    childrenPosition?: "child" | "before" | "after";

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
}

export function useAriaProgressBar<ProgressElement extends Element>({ tag, max, value, valueText }: UseAriaProgressBarParameters<ProgressElement>) {

    //const { inputId, labelId, useGenericLabelInput, useGenericLabelLabel, useReferencedInputIdProps, useReferencedLabelIdProps } = useGenericLabel({ inputPrefix: "progressbar-", labelPrefix: "progressbar-reference-" });
    const { id: progressBarId, getId, useRandomIdProps, useReferencedIdProps } = useRandomId({ prefix: "progressbar-" })


    function useProgressProps<P extends h.JSX.HTMLAttributes<ProgressElement>>({ "aria-valuemax": ariaValueMax, "aria-valuenow": ariaValueNow, "aria-valuetext": ariaValueText, role, ...p }: P) {
        const extraProps: h.JSX.HTMLAttributes<ProgressElement> = tag === "progress" ?
            {
                max,
                value: (value ?? undefined),
                "aria-valuenow": value == null ? undefined : `${value}`,
            } as h.JSX.HTMLAttributes<HTMLProgressElement> as any as h.JSX.HTMLAttributes<ProgressElement>
            :
            {
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
export function ProgressLinear({ color, max: maxProp, value: valueProp, valueText: valueTextProp, striped, variant, ...rest }: LinearProgressProps) {
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
        <div {...useMergedProps<HTMLDivElement>()({ className: clsx("progress", `bg-${color ?? "primary"}`) }, rest)}>
            <progress {...useProgressProps({ className: "progress-bar" })} />
        </div>
    )
}


// :)
const R = ((new Date()).getDate() % 2);

function Check() {
    return (
        <i class="bi bi-check text-success" />
    )
}

function Cross() {
    return (
        <i class="bi bi-x text-warning" />
    )
}

export const ProgressCircular = forwardElementRef(function ({ mode, colorFill, childrenPosition, children, color, ...p }: CircularProgressProps, ref: Ref<HTMLDivElement>) {
    const provideParentWithHook = useContext(ProgressAsChildContext);
    const { useProgressProps, useReferencedElement } = useAriaProgressBar<HTMLDivElement>({ value: null, valueText: undefined, max: undefined, tag: "div" });

    //useLayoutEffect(() => { provideParentWithHook?.(useReferencedElement) }, [useReferencedElement, provideParentWithHook])

    const { useReferencedProps } = useReferencedElement<any>();
    const showSpinner = useSpinnerDelay(mode === "pending");
    //const [spinnerShowCount, setSpinnerShowCount] = useState(0);
    //useEffect(() => { setSpinnerShowCount(s => ++s) }, [showSpinner]);


    useEffect(() => { setShownStatusLongEnough(false); }, [mode])
    const [shownStatusLongEnough, setShownStatusLongEnough] = useState(false);
    useTimeout({
        callback: () => { if (mode == "failed" || (mode == "succeeded")) setShownStatusLongEnough(true) },
        timeout: 1000,
        triggerIndex: mode
    });


    const progressElement = (
        <div {...useMergedProps<HTMLDivElement>()(useProgressProps({ ref, className: clsx("circular-progress-container") }), p)}>
            <Swappable>
                <div className="circular-progress-swappable">
                    <Fade open={mode === "pending" && showSpinner}>
                        <div className={clsx("circular-progress", `circular-progress-${color ?? "primary"}`, colorFill == "foreground" && "inverse-fill", colorFill === "foreground-only" && "no-fill")}>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                            <div><div /></div>
                        </div>
                    </Fade>
                    <Fade open={!shownStatusLongEnough && mode === "succeeded"}><div><Check /></div></Fade>
                    <Fade open={!shownStatusLongEnough && mode === "failed"}><div><Cross /></div></Fade>
                </div>
            </Swappable>
        </div>);

    childrenPosition ??= "after";

    return (
        <>
            {childrenPosition == "before" && progressElement}
            {children && createElement(children.type as any, useMergedProps<any>()({ children: childrenPosition === "child" ? progressElement : undefined, ref: children.ref as any }, useReferencedProps(children.props)))}
            {childrenPosition == "after" && progressElement}
        </>
    )
})


