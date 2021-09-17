import { ComponentChild, ComponentChildren, createContext, Fragment, h } from "preact";
import { EventDetail } from "preact-aria-widgets/props";
import { useGenericLabel } from "preact-aria-widgets/use-label";
import { RadioChangeEvent, useAriaRadioGroup, UseAriaRadioGroupParameters, UseAriaRadioInfo, UseAriaRadioParameters, UseRadio } from "preact-aria-widgets/use-radio-group";
import { useAsyncHandler, useState } from "preact-prop-helpers";
import { useChildFlag } from "preact-prop-helpers/use-child-manager";
import { useCallback, useContext, useEffect } from "preact/hooks";
import { useSpinnerDelay } from "../props";
import { ProgressCircular } from "../progress";
import { InInputGroupContext } from "./props";
import clsx from "clsx";

interface RadioGroupProps<V extends string | number> extends Omit<UseAriaRadioGroupParameters<V>, "onInput"> {
    children?: ComponentChildren;
    label?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    onInput(value: V, event: h.JSX.TargetedEvent<HTMLInputElement | HTMLLabelElement>): (void | Promise<void>);
}

interface RadioProps<V extends string | number, I extends Element, L extends Element> extends Omit<UseAriaRadioParameters<V, I, L, RadioInfo>, "labelPosition" | "text" | "disabled" | "setAsyncState"> {
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
export function RadioGroup<V extends string | number>({ children, name, selectedValue, label, labelPosition, onInput: onInputAsync }: RadioGroupProps<V>) {
    const { getSyncHandler, pending, hasError, settleCount, currentCapture, currentType } = useAsyncHandler<HTMLInputElement | HTMLLabelElement>()({ capture: (e) => (e as RadioChangeEvent<any>)[EventDetail].selectedValue as V });
    const onInput = getSyncHandler(onInputAsync);

    const { useRadio, useRadioGroupProps, managedChildren, getIndex } = useAriaRadioGroup<V, HTMLDivElement, HTMLInputElement, HTMLLabelElement, RadioInfo>({ name, selectedValue: pending? currentCapture! : selectedValue, onInput: onInput as any });

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

    const selectedIndex = getIndex(currentCapture ?? selectedValue);
    //const capturedIndex = getIndex(currentCapture!);
    useChildFlag(selectedIndex, managedChildren.length, (index, isSelected) => managedChildren[index].setAsyncState(isSelected? (hasError? "failed" : pending? "pending" :  "succeeded") : null ));

    
   // useChildFlag(pending ? capturedIndex : null, managedChildren.length, useCallback((index, isCaptured) => managedChildren[index].setPending(isCaptured? "in" : false), []));


    const { useGenericLabelLabel, useGenericLabelInput } = useGenericLabel({ inputPrefix: "aria-radiogroup", labelPrefix: "aria-radiogroup-label", backupText: stringLabel });

    const { useGenericLabelInputProps } = useGenericLabelInput<HTMLDivElement>();
    const { useGenericLabelLabelProps } = useGenericLabelLabel<HTMLInputElement>();

    let labelJsx = <div {...useGenericLabelLabelProps({})} />
    let groupJsx = (
        <div {...useGenericLabelInputProps(useRadioGroupProps({ "aria-label": labelPosition === "hidden" ? stringLabel : undefined }))}>
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


}

export function Radio<V extends string | number>({ disabled, children: label, index, value, labelPosition }: RadioProps<V, HTMLInputElement, HTMLLabelElement>) {
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

    const inputElement = <OptionallyInputGroup>
        <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentHandlerType == "async"? asyncState : null} color="info">
            <input {...useRadioInputProps({ type: "radio", className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-input"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} />
        </ProgressCircular>
    </OptionallyInputGroup>;
    const labelElement = <>{label != null && <OptionallyInputGroup><label {...useRadioLabelProps({ className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-label"), "aria-hidden": "true" })}>{label}</label></OptionallyInputGroup>}</>;

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

}

function OptionallyInputGroup({ children }: { children: ComponentChild; }) {
    const inInputGroup = useContext(InInputGroupContext);

    if (!inInputGroup)
        return <>{children}</>;
    return <div class="input-group-text">{children}</div>;
}

