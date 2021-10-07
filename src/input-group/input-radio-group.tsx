import clsx from "clsx";
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { EventDetail, RadioChangeEvent, useAriaRadioGroup, UseAriaRadioGroupParameters, UseAriaRadioInfo, UseAriaRadioParameters, useGenericLabel, UseRadio } from "preact-aria-widgets";
import { useAsyncHandler, useEffect, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, OmitStrong } from "../props";
import { OptionallyInputGroup } from "./input-checkbox";
import { InInputGroupContext } from "./props";

export interface RadioGroupProps<V extends string | number> extends OmitStrong<UseAriaRadioGroupParameters<V>, "onInput"> {
    children?: ComponentChildren;
    label?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    onValueChange(value: V, event: h.JSX.TargetedEvent<HTMLInputElement | HTMLLabelElement>): (void | Promise<void>);
}

export interface RadioProps<V extends string | number, I extends Element, L extends Element> extends OmitStrong<UseAriaRadioParameters<V, I, L, RadioInfo>, "labelPosition" | "text" | "disabled" | "setAsyncState"> {
    index: number;
    value: V;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    disabled?: boolean;
}

interface RadioInfo extends UseAriaRadioInfo {
    setAsyncState(state: null | "pending" | "succeeded" | "failed"): void;
}

const knownNames = new Set<string>();

const CurrentHandlerTypeContext = createContext<"sync" | "async">("sync");
const RadioGroupContext = createContext<UseRadio<string | number, HTMLInputElement, HTMLLabelElement, RadioInfo>>(null!);

export const RadioGroup = memo(forwardElementRef(function RadioGroup<V extends string | number>({ children, name, selectedValue, label, labelPosition, onValueChange: onInputAsync }: RadioGroupProps<V>, ref?: Ref<HTMLDivElement>) {
    const { getSyncHandler, pending, hasError, settleCount, currentCapture, currentType } = useAsyncHandler<HTMLInputElement | HTMLLabelElement>()({ capture: (e) => (e as RadioChangeEvent<any>)[EventDetail].selectedValue as V });
    const onInput = getSyncHandler(onInputAsync);

    const { useRadio, useRadioGroupProps, managedChildren, selectedIndex } = useAriaRadioGroup<V, HTMLDivElement, HTMLInputElement, HTMLLabelElement, RadioInfo>({ name, selectedValue: pending ? currentCapture! : selectedValue, onInput: onInput as any });

    let stringLabel: string | undefined = undefined;
    if (labelPosition === "hidden") {
        if (label != null && !["string", "number", "boolean"].includes(typeof label)) {
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        }
        else {
            stringLabel = `${label}`;
        }
    }

    // Debugging check -- multiple groups with the same name can cause weird glitches from native radio selection behavior.
    useEffect(() => {
        if (knownNames.has(name)) {
            console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
        }
        knownNames.add(name);
        return () => knownNames.delete(name);
    }, [name])


    //useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) =>{ managedChildren[index]?.setAsyncState(isSelected? (hasError? "failed" : pending? "pending" :  "succeeded") : null )});

    // Any time the selected index changes, let the previous radio button know that it shouldn't be displaying a spinner (if it was).
    const currentCheckboxPendingState = (hasError ? ("failed" as const) : pending ? ("pending" as const) : ("succeeded" as const));
    useEffect(([prevSelectedIndex]) => {
        if (prevSelectedIndex != null && prevSelectedIndex >= 0 && prevSelectedIndex < managedChildren.length)
            managedChildren[prevSelectedIndex]?.setAsyncState(null);

    }, [selectedIndex]);

    useEffect(() => {
        if (selectedIndex != null && selectedIndex >= 0 && selectedIndex < managedChildren.length)
            managedChildren[selectedIndex]?.setAsyncState(currentCheckboxPendingState);
    }, [selectedIndex, currentCheckboxPendingState])


    // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));


    const { useGenericLabelLabel, useGenericLabelInput } = useGenericLabel({ inputPrefix: "aria-radiogroup", labelPrefix: "aria-radiogroup-label", backupText: stringLabel });

    const { useGenericLabelInputProps } = useGenericLabelInput<HTMLDivElement>();
    const { useGenericLabelLabelProps } = useGenericLabelLabel<HTMLInputElement>();

    let labelJsx = <div {...useGenericLabelLabelProps({})} />
    let groupJsx = (
        <div {...useGenericLabelInputProps(useRadioGroupProps({ ref, "aria-label": labelPosition === "hidden" ? stringLabel : undefined }))}>
            {children}
        </div>
    )

    return (
        <CurrentHandlerTypeContext.Provider value={currentType ?? "sync"}>
            <RadioGroupContext.Provider value={useRadio as UseRadio<string | number, HTMLInputElement, HTMLLabelElement, RadioInfo>}>
                {labelPosition == "start" && labelJsx}
                {groupJsx}
                {labelPosition == "end" && labelJsx}
            </RadioGroupContext.Provider>
        </CurrentHandlerTypeContext.Provider>
    )


}));

export const Radio = memo(forwardElementRef(function Radio<V extends string | number>({ disabled, children: label, index, value, labelPosition }: RadioProps<V, HTMLInputElement, HTMLLabelElement>, ref?: Ref<HTMLInputElement>) {
    const useAriaRadio = useContext(RadioGroupContext) as UseRadio<V, HTMLInputElement, HTMLLabelElement, RadioInfo>;
    labelPosition ??= "end";
    const text = null;
    const currentHandlerType = useContext(CurrentHandlerTypeContext);
    const [asyncState, setAsyncState] = useState<null | "pending" | "succeeded" | "failed">(null);
    disabled ||= (asyncState === "pending");

    const { useRadioInput, useRadioLabel } = useAriaRadio({ disabled: disabled ?? false, labelPosition: "separate", index, text, value, setAsyncState });

    const { useRadioInputProps } = useRadioInput({ tag: "input" });
    const { useRadioLabelProps } = useRadioLabel({ tag: "label" });


    const inInputGroup = useContext(InInputGroupContext);

    label ??= value;

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = <OptionallyInputGroup isInput tag={inInputGroup ? "div" : null} disabled={disabled} tabIndex={-1}>
        <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentHandlerType == "async" ? asyncState : null} colorVariant="info">
            <input {...useRadioInputProps({ ref, type: "radio", className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-input"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} />
        </ProgressCircular>
    </OptionallyInputGroup>;
    const labelElement = <>{label != null && <OptionallyInputGroup isInput={false} tag={"label"} {...useRadioLabelProps({ className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-label"), "aria-hidden": "true" })}>{label}</OptionallyInputGroup>}</>;

    const ret = (
        <>
            {labelPosition == "start" && labelElement}
            {inputElement}
            {labelPosition == "end" && labelElement}
        </>
    );

    if (!inInputGroup)
        return <div class="form-check">{ret}</div>
    return ret;

}));

