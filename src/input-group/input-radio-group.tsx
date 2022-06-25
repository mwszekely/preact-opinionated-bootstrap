import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { EventDetail, RadioChangeEvent, useAriaRadioGroup, UseAriaRadioGroupParameters, UseAriaRadioInfo, UseAriaRadioParameters, useGenericLabel, UseRadio } from "preact-aria-widgets";
import { useAsyncHandler, useEffect, useMergedProps, useRandomId, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, OmitStrong } from "../props";
import { CheckboxLike } from "./checkbox-like";

export interface RadioGroupProps<V extends string | number> extends OmitStrong<UseAriaRadioGroupParameters<V>, "onInput" | "name"> {
    children?: ComponentChildren;
    label?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    onValueChange(value: V, event: h.JSX.TargetedEvent<HTMLInputElement | HTMLLabelElement>): (void | Promise<void>);
    name?: string;
}

export interface RadioProps<V extends string | number, I extends Element, L extends Element> extends OmitStrong<UseAriaRadioParameters<V, I, L, RadioInfo>, "labelPosition" | "text" | "disabled" | "setAsyncState"> {
    index: number;
    value: V;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden" | "tooltip" | "button";
    disabled?: boolean;
    inline?: boolean;
}

interface RadioInfo extends UseAriaRadioInfo {
    setAsyncState(state: null | "pending" | "succeeded" | "failed"): void;
}

const knownNames = new Set<string>();

const CurrentHandlerTypeContext = createContext<"sync" | "async">("sync");
const RadioGroupContext = createContext<UseRadio<string | number, HTMLInputElement, HTMLLabelElement, RadioInfo>>(null!);

export const RadioGroup = memo(forwardElementRef(function RadioGroup<V extends string | number>({ children, name, selectedValue, label, labelPosition, onValueChange: onInputAsync }: RadioGroupProps<V>, ref?: Ref<HTMLDivElement>) {
    const { syncHandler, pending, hasError, settleCount, currentCapture, currentType } = useAsyncHandler(onInputAsync, { capture: (e) => (e as RadioChangeEvent<any>)[EventDetail].selectedValue as V });
    const onInput = syncHandler;

    const { randomId: backupName } = useRandomId({ prefix: "radio-" });
    name ??= backupName;
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
        if (knownNames.has(name!)) {
            console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
        }
        knownNames.add(name!);
        return () => knownNames.delete(name!);
    }, [name])


    //useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) =>{ managedChildren[index]?.setAsyncState(isSelected? (hasError? "failed" : pending? "pending" :  "succeeded") : null )});

    // Any time the selected index changes, let the previous radio button know that it shouldn't be displaying a spinner (if it was).
    const currentCheckboxPendingState = (hasError ? ("failed" as const) : pending ? ("pending" as const) : ("succeeded" as const));
    useEffect((prev) => {
        if (prev) {
            const [prevSelectedIndex] = prev;
            if (prevSelectedIndex != null && prevSelectedIndex >= 0 && prevSelectedIndex < managedChildren.length)
                managedChildren[prevSelectedIndex]?.setAsyncState(null);
        }

    }, [selectedIndex]);

    useEffect(() => {
        if (selectedIndex != null && selectedIndex >= 0 && selectedIndex < managedChildren.length)
            managedChildren[selectedIndex]?.setAsyncState(currentCheckboxPendingState);
    }, [selectedIndex, currentCheckboxPendingState])


    // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));


    const { useGenericLabelLabel, useGenericLabelInput, useReferencedInputIdProps } = useGenericLabel({ inputPrefix: "aria-radiogroup", labelPrefix: "aria-radiogroup-label", backupText: stringLabel });

    const { useGenericLabelInputProps } = useGenericLabelInput<HTMLDivElement>();
    const { useGenericLabelLabelProps } = useGenericLabelLabel<HTMLLabelElement>();

    let labelJsx = <label {...useGenericLabelLabelProps(useReferencedInputIdProps("for")({ children: label }))} />
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

function LabelTest() {
    return (
        <>
        </>
    );
}

export const Radio = memo(forwardElementRef(function Radio<V extends string | number>({ disabled, inline, children: label, index, value, labelPosition, ...rest }: RadioProps<V, HTMLInputElement, HTMLLabelElement>, ref?: Ref<HTMLInputElement>) {

    const currentHandlerType = useContext(CurrentHandlerTypeContext);
    const [asyncState, setAsyncState] = useState<null | "pending" | "succeeded" | "failed">(null);
    disabled ||= (asyncState === "pending");


    const useAriaRadio = useContext(RadioGroupContext) as UseRadio<V, HTMLInputElement, HTMLLabelElement | HTMLDivElement, RadioInfo>;
    const { useRadioInput, useRadioLabel } = useAriaRadio({ disabled: disabled ?? false, labelPosition: "separate", index, text: null, value, setAsyncState });

    const { useRadioInputProps } = useRadioInput({ tag: "input" });
    const { useRadioLabelProps } = useRadioLabel({ tag: "label" });

    return (<CheckboxLike
        type="radio"
        disabled={disabled}
        asyncState={asyncState}
        currentHandlerType={currentHandlerType}
        labelPosition={labelPosition}
        inputProps={useRadioInputProps({ ref, type: "radio", className: clsx() })}
        labelProps={useRadioLabelProps({ class: clsx() })}
        wrapperProps={useMergedProps<HTMLDivElement>()({ class: "" }, rest)}
        inline={inline ?? false}
        label={label}
    />);


}));


