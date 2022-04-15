import { ComponentChildren, createContext, h, Ref } from "preact";
import { EventDetail, UseAriaSliderArguments, UseAriaSliderThumbArguments, UseAriaSliderThumb, useAriaSlider, RangeChangeEvent } from "preact-aria-widgets";
import { generateRandomId, ManagedChildInfo, MergedProps, useAsyncHandler, useChildManager, useHasFocus, useMergedProps, useRandomId } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { StateUpdater, useCallback, useContext, useMemo, useState } from "preact/hooks";
import { Tooltip } from "../tooltip";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps } from "../props";


export interface RangeProps extends UseAriaSliderArguments, GlobalAttributes<HTMLDivElement> {
    children?: ComponentChildren;
    debounce?: number | boolean;
    value?: number;
    getValueText?: (value: number) => string;
    onValueChange?: (value: number) => (void | Promise<void>);
    step?: number;
}

export interface RangeThumbProps extends Omit<UseAriaSliderThumbArguments<HTMLInputElement>, "tag" | "onValueChange" | "valueText"> {
    onValueChange?: (value: number) => (void | Promise<void>);
}

const RangeThumbContext = createContext<UseAriaSliderThumb>(null!);
const DebounceContext = createContext<number | boolean>(false);
const GetValueTextContext = createContext<(n: number) => string>(null!);
const GetListContext = createContext("");
const StepContext = createContext(0);

export const Range = memo(forwardElementRef(function Range({ max, min, debounce, children, getValueText, value, onValueChange, step, ...rest }: RangeProps, ref: Ref<HTMLDivElement>) {
    const { useAriaSliderThumb } = useAriaSlider({ min, max });
    let id = useMemo(generateRandomId, []);
    id ??= "";
    step ??= 1;
    let tickCount = Math.ceil(1 + (max - min) / step);
    return (
        <RangeThumbContext.Provider value={useAriaSliderThumb}>
            <DebounceContext.Provider value={debounce ?? false}>
                <GetValueTextContext.Provider value={getValueText ?? defaultGetValueText}>
                    <GetListContext.Provider value={id}>
                        <StepContext.Provider value={step}>
                            <div {...(useMergedProps<HTMLDivElement>()({ class: "form-range-container", ref, style: { "--form-range-tick-count": tickCount } }, rest))}>
                                {children ?? <RangeThumb index={0} value={value ?? 0} onValueChange={onValueChange} />}
                                <div class="form-range-track-background" />
                                <RangeTicks min={min} max={max} step={step} id={id} />
                            </div>
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

const RangeTicks = memo(function RangeTicks({ step, min, max, id }: { id: string; step: number, min: number, max: number }) {
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
    const { getElement, useAriaSliderThumbProps, min: usedMin, max: usedMax } = useContext(RangeThumbContext)<HTMLInputElement>({ tag: "input", value: value, valueText, index, max, min, onValueChange: onValueChangeSync });

    const [inputHasFocus, setInputHasFocus] = useState(false);
    const { useHasFocusProps } = useHasFocus<HTMLInputElement>({ onFocusedChanged: setInputHasFocus });
    const valuePercent = (value - usedMin) / (usedMax - usedMin);
    return (
        <>
            <Tooltip side="block-end" forceOpen={inputHasFocus} tooltip={valueText} childSelector={useCallback(function (e: Element) { return e.nextElementSibling!; }, [])}>
                <input {...useAriaSliderThumbProps(useHasFocusProps({ ref, class: "form-range", tabIndex: 0, step: useContext(StepContext) }))} list={useContext(GetListContext)} />
            </Tooltip>
            <div class="form-range-tooltip-root" style={{ "--range-value": `${valuePercent}` }} />
        </>);
}));


function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): number {
    return (e as any as RangeChangeEvent<any>)[EventDetail].value;
}

