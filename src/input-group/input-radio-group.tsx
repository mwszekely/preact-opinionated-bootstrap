import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { EventDetail, RadioChangeEvent, useAriaRadioGroup, UseAriaRadioGroupParameters, UseAriaRadioInfo, UseAriaRadioParameters, useGenericLabel, UseRadio } from "preact-aria-widgets";
import { useAsyncHandler, useEffect, useMergedProps, useRandomId, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, OmitStrong } from "../props";
import { Tooltip } from "../tooltip";
import { CheckboxLike } from "./checkbox-like";
import { OptionallyInputGroup } from "./input-checkbox";
import { InInputGroupContext } from "./props";

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
    labelPosition?: "start" | "end" | "hidden" | "tooltip";
    disabled?: boolean;
}

interface RadioInfo extends UseAriaRadioInfo {
    setAsyncState(state: null | "pending" | "succeeded" | "failed"): void;
}

const knownNames = new Set<string>();

const CurrentHandlerTypeContext = createContext<"sync" | "async">("sync");
const RadioGroupContext = createContext<UseRadio<string | number, HTMLInputElement, HTMLLabelElement, RadioInfo>>(null!);

export const RadioGroup = memo(forwardElementRef(function RadioGroup<V extends string | number>({ children, name, selectedValue, label, labelPosition, onValueChange: onInputAsync }: RadioGroupProps<V>, ref?: Ref<HTMLDivElement>) {
    const { useSyncHandler, pending, hasError, settleCount, currentCapture, currentType } = useAsyncHandler<HTMLInputElement | HTMLLabelElement>()({ capture: (e) => (e as RadioChangeEvent<any>)[EventDetail].selectedValue as V });
    const onInput = useSyncHandler(onInputAsync);

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

export const Radio = memo(forwardElementRef(function Radio<V extends string | number>({ disabled, children: label, index, value, labelPosition, ...rest }: RadioProps<V, HTMLInputElement, HTMLLabelElement>, ref?: Ref<HTMLInputElement>) {

    if (true) {
        const currentHandlerType = useContext(CurrentHandlerTypeContext);
        const [asyncState, setAsyncState] = useState<null | "pending" | "succeeded" | "failed">(null);
        disabled ||= (asyncState === "pending");

        
        const useAriaRadio = useContext(RadioGroupContext) as UseRadio<V, HTMLInputElement, HTMLLabelElement | HTMLDivElement, RadioInfo>;
        const { useRadioInput, useRadioLabel } = useAriaRadio({ disabled: disabled ?? false, labelPosition: "separate", index, text: null, value, setAsyncState });

        const { useRadioInputProps } = useRadioInput({ tag: "input" });
        const { useRadioLabelProps } = useRadioLabel({ tag: "label" });
        //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });


        return (<CheckboxLike
            type="radio"
            disabled={disabled}
            asyncState={asyncState}
            currentHandlerType={currentHandlerType}
            labelPosition={labelPosition}
            inputProps={ useRadioInputProps({ ref, type: "radio", className: clsx() })}
            labelProps={useRadioLabelProps({ class: clsx() })}
            wrapperProps={useMergedProps<HTMLDivElement>()({ class: "" }, rest)}
            label={label}
        />);

        
    }
    else {

        labelPosition ??= "end";

        const useAriaRadio = useContext(RadioGroupContext) as UseRadio<V, HTMLInputElement, HTMLLabelElement | HTMLDivElement, RadioInfo>;

        const text = null;
        const currentHandlerType = useContext(CurrentHandlerTypeContext);
        const [asyncState, setAsyncState] = useState<null | "pending" | "succeeded" | "failed">(null);
        disabled ||= (asyncState === "pending");

        const { useRadioInput, useRadioLabel } = useAriaRadio({ disabled: disabled ?? false, labelPosition: "separate", index, text, value, setAsyncState });

        const { useRadioInputProps } = useRadioInput({ tag: "input" });
        const { useRadioLabelProps } = useRadioLabel({ tag: "label" });
        const { useRadioLabelProps: useWrapperLabelProps } = useRadioLabel({ tag: "div" });


        const inInputGroup = useContext(InInputGroupContext);

        label ??= value;

        let stringLabel = `${label}`;
        if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        }

        const propsForInput = useRadioInputProps({ ref, type: "radio", className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-input"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined });

        let inputElement = <OptionallyInputGroup isInput isTooltip={false} tag={inInputGroup ? "div" : null} {...useRadioLabelProps({ disabled, tabIndex: -1 })}>
            <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentHandlerType === "async" ? asyncState : null} colorVariant="info">
                <input {...propsForInput} />
            </ProgressCircular>
        </OptionallyInputGroup>;
        const labelElement = label != null ? <OptionallyInputGroup isTooltip={labelPosition == "tooltip"} isInput={false} tag={"label"} {...useRadioLabelProps({ className: clsx(asyncState === "pending" && "pending", disabled && "disabled", "form-check-label"), "aria-hidden": "true" })}>{label}</OptionallyInputGroup> : null;

        if (labelPosition == "tooltip")
            inputElement = <Tooltip tooltip={labelElement}>{inputElement}</Tooltip>;

        const inputWithLabel = (
            <>
                {labelPosition == "start" && labelElement}
                {inputElement}
                {labelPosition == "end" && labelElement}
            </>
        );

        return (!inInputGroup) ? <div {...useWrapperLabelProps({ className: "form-check" }) as h.JSX.HTMLAttributes<HTMLDivElement>}>{inputWithLabel}</div> : inputWithLabel;
    }

}));


