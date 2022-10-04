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
    hideTickValues?: boolean | "auto";
    orientation?: "inline" | "block";
    disabled?: boolean;
    /**
     * Allows you to override how the numeric value this Range uses is displayed/read as a string
     */
    getValueText?: (value: number) => string;
    /**
     * Defaults to the value of getValueText. Use this to further customize the tooltip that appears when hovering over the Range.
     */
    getTooltipText?: (value: number) => string;
}

interface RangeSingleProps extends RangeBaseProps {
    children?: never;
    value: number;
    onValueChange: (value: number) => (void | Promise<void>);
    step?: number | null | "any";
    snap?: "discrete" | "continuous";   // "continuous" allows selecting values outside of the "step" restriction, but still prefers step values.
    label: string;
}


interface RangeMultiProps extends RangeBaseProps {
    children: ComponentChildren;
    debounce?: number | boolean;
    value?: number;
    onValueChange?: (value: number) => (void | Promise<void>);
    step?: number | null | "any";
    snap?: "discrete" | "continuous";   // "continuous" allows selecting values outside of the "step" restriction, but still prefers step values.
    label?: string;
}

export type RangeProps = RangeSingleProps | RangeMultiProps;

export interface RangeThumbProps extends Omit<UseAriaSliderThumbArguments<HTMLInputElement>, "tag" | "onValueChange" | "valueText"> {
    onValueChange?: (value: number) => (void | Promise<void>);
    label: string;
    disabled?: boolean;
}

const RangeThumbContext = createContext<UseAriaSliderThumb>(null!);
const DebounceContext = createContext<number | boolean>(false);
const GetValueTextContext = createContext<(n: number) => string>(null!);
const GetListContext = createContext("");
const StepContext = createContext<number | "any">(1);
const SnapContext = createContext<"discrete" | "continuous">("discrete");
const DisabledContext = createContext(false);
const OrientationContext = createContext<"block" | "inline">("inline");

export const Range = memo(forwardElementRef(function Range({ max, min, debounce, hideTicks, hideTickValues, orientation, children, getValueText, getTooltipText, value, onValueChange, step, snap, label, disabled, ...rest }: RangeProps, ref: Ref<HTMLDivElement>) {
    const { useAriaSliderThumb } = useAriaSlider({ min, max });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= "any";
    let tickCount = (step == "any" ? Infinity : Math.ceil(1 + (max - min) / step));

    return (
        <RangeThumbContext.Provider value={useAriaSliderThumb}>
            <DebounceContext.Provider value={debounce ?? false}>
                <GetValueTextContext.Provider value={getTooltipText ?? getValueText ?? defaultGetValueText}>
                    <GetListContext.Provider value={id}>
                        <StepContext.Provider value={step}>
                            <SnapContext.Provider value={snap ?? "discrete"}>
                                <DisabledContext.Provider value={disabled ?? false}>
                                    <OrientationContext.Provider value={orientation ?? "inline"}>
                                        {createElement((label ? "label" : "div") as any, (useMergedProps<HTMLDivElement>({ class: clsx("form-range-container", orientation == "block" && "form-range-vertical"), ref, style: isFinite(tickCount) ? { "--form-range-tick-count": tickCount } : undefined }, rest)),
                                            label && <div class="form-range-label">{label}</div>,
                                            children ?? <RangeThumb index={0} min={min} max={max} value={value ?? 0} onValueChange={onValueChange} label={label ?? ""} />,
                                            <div class="form-range-track-background" />,
                                            <GetValueTextContext.Provider value={getValueText ?? defaultGetValueText}>
                                                <RangeTicks min={min} max={max} step={step} id={id} hideTickValues={hideTickValues} />
                                            </GetValueTextContext.Provider>
                                        )}
                                    </OrientationContext.Provider>
                                </DisabledContext.Provider>
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

const RangeTicks = memo(function RangeTicks({ step, min, max, id, hideTickValues }: { id: string; step: number | "any", min: number, max: number, hideTickValues?: boolean | "auto" }) {
    if (step == "any")
        return null;
    hideTickValues ??= "auto";
    const getValueText = useContext(GetValueTextContext);
    let children: ComponentChildren[] = [];
    for (let i = min; i <= max; i += step) {
        const atEnds = (i == min || (i + step) > max);
        const valuePercent = (i - min) / (max - min);
        let shouldHide = (hideTickValues == "auto" ? !atEnds : hideTickValues);
        children.push(<option value={i} class={clsx("form-range-tick", shouldHide && "form-range-tick-only")} key={i} style={{ "--form-range-tick-percent": `${valuePercent * 100}%` } as {}}>{shouldHide ? null : getValueText(i)}</option>)
    }
    return (
        <datalist id={id} class={clsx("form-range-ticks")}>
            {...children}
        </datalist>
    );
});

export const RangeThumb = memo(forwardElementRef(function RangeThumb({ index, value, max, min, onValueChange: onValueChangeAsync, disabled }: RangeThumbProps, ref: Ref<HTMLInputElement>) {
    const debounceSetting = useContext(DebounceContext);
    const { syncHandler, pending, hasError, currentCapture } = useAsyncHandler(onValueChangeAsync ?? null, { capture, debounce: debounceSetting == true ? 1500 : debounceSetting != false ? debounceSetting : undefined });
    const onValueChangeSync = syncHandler;// as UseAriaSliderThumbArguments<HTMLInputElement>["onValueChange"];
    value = (currentCapture ?? value);
    const getValueText = useContext(GetValueTextContext);
    const valueText = useMemo(() => { return ((getValueText?.(value)) ?? (value == null ? "" : `${value}`)); }, [value, getValueText]);
    const orientation = useContext(OrientationContext);
    let parentDisabled = useContext(DisabledContext);
    disabled ||= parentDisabled;

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
                snapTimeout.current = setTimeout(() => { setForceSnap(false); }, 750);
                e[EventDetail].value = closestStep;
            }

        }

        return onValueChangeSync?.(e as any as h.JSX.TargetedEvent<HTMLInputElement, Event>);
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
    const clampedValuePercent = Math.max(0, Math.min(1, valuePercent));

    return (
        <>
            <Tooltip side={orientation == "inline" ? "block-end" : "inline-end"} forceOpen={inputHasFocus} tooltip={`${valueText}`} childSelector={useCallback(function (e: Element) { return e.nextElementSibling!.firstElementChild!; }, [])}>
                <input {...useAriaSliderThumbProps(useHasFocusProps({
                    ref,
                    ...({ orient: orientation == "block" ? "vertical" : undefined } as {}),
                    class: clsx("form-range", orientation == "block" && "form-range-vertical"),
                    disabled,
                    tabIndex: 0,
                    step: usedStep,
                    list: useContext(GetListContext)
                }))} />
            </Tooltip>
            <div class="form-range-tooltip-container"><div class="form-range-tooltip-root" style={{ "--range-value": `${valuePercent}` }} /></div>
            <div class="form-range-track-fill-background" style={{ "--form-range-value-percent": clampedValuePercent }} />
        </>
    );
}));


function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): number {
    return (e as any as RangeChangeEvent<any>)[EventDetail].value;
}

