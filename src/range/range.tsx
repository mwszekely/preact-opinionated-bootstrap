import { ComponentChildren, createContext, createElement, h, Ref } from "preact";
import { EventDetail, UseAriaSliderArguments, UseAriaSliderThumbArguments, UseAriaSliderThumb, useAriaSlider, RangeChangeEvent, useInputLabel } from "preact-aria-widgets";
import { generateRandomId, ManagedChildInfo, MergedProps, useAsyncHandler, useChildManager, useHasFocus, useMergedProps, useRandomId } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { StateUpdater, useCallback, useContext, useMemo, useRef, useState } from "preact/hooks";
import { Tooltip } from "../tooltip";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps } from "../props";
import clsx from "clsx";




interface RangeBaseProps extends UseAriaSliderArguments, GlobalAttributes<HTMLDivElement> {
    debounce?: number | boolean;
    hideTicks?: boolean;
    orientation?: "inline" | "block";
}

interface RangeSingleProps extends RangeBaseProps {
    children?: never;
    value: number;
    getValueText?: (value: number) => string;
    onValueChange: (value: number) => (void | Promise<void>);
    step?: number | null | "any";
    snap?: "discrete" | "continuous";   // "continuous" allows selecting values outside of the "step" restriction, but still prefers step values.
    label: string;
}


interface RangeMultiProps extends RangeBaseProps {
    children: ComponentChildren;
    debounce?: number | boolean;
    value?: number;
    getValueText?: (value: number) => string;
    onValueChange?: (value: number) => (void | Promise<void>);
    step?: number | null | "any";
    snap?: "discrete" | "continuous";   // "continuous" allows selecting values outside of the "step" restriction, but still prefers step values.
    label?: string;
}

export type RangeProps = RangeSingleProps | RangeMultiProps;

export interface RangeThumbProps extends Omit<UseAriaSliderThumbArguments<HTMLInputElement>, "tag" | "onValueChange" | "valueText"> {
    onValueChange?: (value: number) => (void | Promise<void>);
    label: string;
}

const RangeThumbContext = createContext<UseAriaSliderThumb>(null!);
const DebounceContext = createContext<number | boolean>(false);
const GetValueTextContext = createContext<(n: number) => string>(null!);
const GetListContext = createContext("");
const StepContext = createContext<number | "any">(1);
const SnapContext = createContext<"discrete" | "continuous">("discrete");
const OrientationContext = createContext<"block" | "inline">("inline");

export const Range = memo(forwardElementRef(function Range({ max, min, debounce, hideTicks, orientation, children, getValueText, value, onValueChange, step, snap, label, ...rest }: RangeProps, ref: Ref<HTMLDivElement>) {
    const { useAriaSliderThumb } = useAriaSlider({ min, max });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= "any";
    let tickCount = (step == "any" ? Infinity : Math.ceil(1 + (max - min) / step));

    return (
        <RangeThumbContext.Provider value={useAriaSliderThumb}>
            <DebounceContext.Provider value={debounce ?? false}>
                <GetValueTextContext.Provider value={getValueText ?? defaultGetValueText}>
                    <GetListContext.Provider value={id}>
                        <StepContext.Provider value={step}>
                            <SnapContext.Provider value={snap ?? "discrete"}>
                                <OrientationContext.Provider value={orientation ?? "inline"}>
                                    {createElement((label ? "label" : "div") as any, (useMergedProps<HTMLDivElement>()({ class: clsx("form-range-container", orientation == "block" && "form-range-vertical"), ref, style: { "--form-range-tick-count": tickCount } }, rest)),
                                        label && <div class="form-range-label">{label}</div>,
                                        children ?? <RangeThumb index={0} value={value ?? 0} onValueChange={onValueChange} label={label ?? ""} />,
                                        <div class="form-range-track-background" />,
                                        <RangeTicks min={min} max={max} step={step} id={id} />
                                    )}
                                </OrientationContext.Provider>
                            </SnapContext.Provider>
                        </StepContext.Provider>
                    </GetListContext.Provider>
                </GetValueTextContext.Provider>
            </DebounceContext.Provider>
        </RangeThumbContext.Provider>
    );
}));

function defaultGetValueText(number: number) {
    return `${number}`
}

const RangeTicks = memo(function RangeTicks({ step, min, max, id }: { id: string; step: number | "any", min: number, max: number }) {
    if (step == "any")
        return null;
    const getValueText = useContext(GetValueTextContext);
    let children: ComponentChildren[] = [];
    for (let i = min; i <= max; i += step) {
        children.push(<option value={getValueText(i)} class="form-range-tick" key={i} />)
    }
    return (
        <datalist id={id} class="form-range-ticks">
            {...children}
        </datalist>
    );
});

export const RangeThumb = memo(forwardElementRef(function RangeThumb({ index, value, max, min, onValueChange: onValueChangeAsync }: RangeThumbProps, ref: Ref<HTMLInputElement>) {
    const debounceSetting = useContext(DebounceContext);
    const { getSyncHandler, pending, hasError, currentCapture } = useAsyncHandler()({ capture, debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined });
    const onValueChangeSync = getSyncHandler(onValueChangeAsync) as UseAriaSliderThumbArguments<HTMLInputElement>["onValueChange"];
    value = (currentCapture ?? value);
    const getValueText = useContext(GetValueTextContext);
    const valueText = useMemo(() => { return ((getValueText?.(value)) ?? (value == null ? "" : `${value}`)); }, [value, getValueText]);
    const orientation = useContext(OrientationContext);

    const [inputHasFocus, setInputHasFocus] = useState(false);
    const { useHasFocusProps } = useHasFocus<HTMLInputElement>({ onFocusedChanged: setInputHasFocus });
    let usedStep = (useContext(StepContext) ?? 1);
    let userStep = usedStep;

    const [lastSnappedValue, setLastSnappedValue] = useState<number | null>(null);
    const [forceSnap, setForceSnap] = useState(false);
    const snap = useContext(SnapContext);
    //const [snap, setSnap] = useState<boolean | null>(null);

    if (snap == "continuous" && !forceSnap)
        usedStep = "any";

    /*if (snap === false)
        step = "any";
    if (snap === true && step == "any")
        step = 1;*/

    const snapTimeout = useRef<number>(-1);
    function onValueChange(e: RangeChangeEvent<HTMLInputElement>) {
        const newValue = e[EventDetail].value;
        if (userStep != "any") {
            let closestStep = Math.round(newValue / userStep) * userStep;
            let distanceToStep = (Math.abs(closestStep - newValue));
            let distanceToLastSnap = lastSnappedValue == null ? null : Math.abs(lastSnappedValue - newValue);
            if (distanceToLastSnap != null && distanceToLastSnap >= userStep) {
                setForceSnap(false);
                setLastSnappedValue(null);
            }

            if (distanceToStep <= 0.125 && closestStep != lastSnappedValue) {
                setLastSnappedValue(closestStep);
                setForceSnap(true);
                if (snapTimeout.current > 0)
                    clearTimeout(snapTimeout.current);
                snapTimeout.current = setTimeout(() => { setForceSnap(false); }, 250);
                e[EventDetail].value = closestStep;
            }

        }

        return onValueChangeSync?.(e);
    }

    const { getElement, useAriaSliderThumbProps, min: usedMin, max: usedMax } = useContext(RangeThumbContext)<HTMLInputElement>({
        tag: "input",
        value: value,
        valueText,
        index,
        max,
        min,
        onValueChange
    });
    const valuePercent = (value - usedMin) / (usedMax - usedMin);

    return (
        <>
            <Tooltip side={orientation == "inline"? "block-end" : "inline-end"} forceOpen={inputHasFocus} tooltip={`${value}.${valueText}`} childSelector={useCallback(function (e: Element) { return e.nextElementSibling!.firstElementChild!; }, [])}>
                <input {...useAriaSliderThumbProps(useHasFocusProps({
                    ref,
                    ...({ orient: orientation == "block" ? "vertical" : undefined } as {}),
                    class: clsx("form-range", orientation == "block" && "form-range-vertical"),
                    tabIndex: 0,
                    step: usedStep,
                    list: useContext(GetListContext)
                }))} />
            </Tooltip>
            <div class="form-range-tooltip-container"><div class="form-range-tooltip-root" style={{ "--range-value": `${valuePercent}` }} /></div>
            <div class="form-range-track-fill-background" style={{ "--form-range-value-percent": valuePercent }} />
        </>
    );
}));


function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): number {
    return (e as any as RangeChangeEvent<any>)[EventDetail].value;
}

