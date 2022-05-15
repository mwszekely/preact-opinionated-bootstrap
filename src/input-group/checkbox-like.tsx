import clsx from "clsx";
import { ComponentChildren, h } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { Tooltip } from "../tooltip";
import { InputGroupText } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";

type LabelPosition = "start" | "end" | "hidden" | "tooltip";
type CheckboxLikeType = "radio" | "switch" | "check";

/**
 * A Checkbox-Like is a checkbox, radio button, switch, etc.
 * 
 * It has an input element, a label value, and a position for that label (e.g. "after", "tooltip", etc.).
 * 
 * It displays itself differently depending on if it's within an InputGroup or not.
 * 
 * It can also display an async state.
 */
export function CheckboxLike({ labelPosition, currentHandlerType, asyncState, inputProps, labelProps, wrapperProps, label, disabled, type }: { type: CheckboxLikeType, disabled: boolean, label: ComponentChildren, wrapperProps: any, labelProps: any, inputProps: any, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", labelPosition: null | undefined | LabelPosition }) {
    labelPosition ??= "end";
    const inInputGroup = !!useContext(InInputGroupContext);
    const inInputGrid = !!useContext(InInputGridContext);
    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    //if (labelPosition == "hidden" || labelPosition == "tooltip")
    //    label = null;

    let temp: any = useMergedProps<HTMLInputElement>()({ "aria-label": stringLabel }, inputProps);
    if (inInputGroup)
        inputProps = temp;

    if (inInputGroup) {
        return <InputGroupCheckboxLike type={type} labelPosition={labelPosition} disabled={disabled} asyncState={asyncState} currentHandlerType={currentHandlerType} label={label} inputProps={inputProps} labelProps={labelProps} />
    }
    else {
        return <NormalCheckboxLike labelPosition={labelPosition} disabled={disabled} asyncState={asyncState} currentHandlerType={currentHandlerType} label={label} inputProps={inputProps} labelProps={labelProps} wrapperProps={wrapperProps} />
    }
}

function CheckboxLikeOnly({ label, inputProps, asyncState, currentHandlerType, disabled, labelPosition }: { disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", inputProps: any, label: ComponentChildren, labelPosition: LabelPosition }) {
    let inputElement = <input {...useMergedProps<HTMLInputElement>()({ class: clsx("form-check-input", disabled && "disabled") }, inputProps)} />;

    inputElement = <Tooltip tooltip={labelPosition == "tooltip" ? label : null}>{inputElement}</Tooltip>;
    inputElement = <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={(currentHandlerType === "async" ? asyncState : null) ?? null} colorVariant="info">{inputElement}</ProgressCircular>

    return inputElement;
}

function InputGroupCheckboxLike({ inputProps, labelProps, label, asyncState, currentHandlerType, disabled, labelPosition, type }: { type: CheckboxLikeType, disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", label: ComponentChildren, labelProps: any, inputProps: any, labelPosition: LabelPosition }) {
    const labelElement = (label != null && (labelPosition == "start" || labelPosition == "end") && <InputGroupText tag="label" {...useMergedProps<HTMLLabelElement>()({ class: clsx("input-group-text", disabled && "disabled"), children: label }, labelProps)} />);
    return (
        <>
            {labelPosition == "start" && labelElement}
            <InputGroupText tag="div" disabled={disabled} class={clsx(type == "switch" ? "form-switch" : null)} >
                <CheckboxLikeOnly labelPosition={labelPosition} disabled={disabled} inputProps={inputProps} label={label} asyncState={asyncState} currentHandlerType={currentHandlerType} />
            </InputGroupText>
            {labelPosition == "end" && labelElement}
        </>
    )
}

function NormalCheckboxLike({ inputProps, labelProps, wrapperProps, label, asyncState, currentHandlerType, disabled, labelPosition }: { disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", label: ComponentChildren, wrapperProps: any, labelProps: any, inputProps: any, labelPosition: LabelPosition }) {

    const labelElement = ((labelPosition == "start" || labelPosition == "end") && <label {...useMergedProps<HTMLLabelElement>()({ class: clsx("form-check-label", disabled && "disabled"), children: label }, labelProps)} />);

    return (
        <div {...useMergedProps<HTMLDivElement>()({ class: clsx("form-check", disabled && "disabled") }, wrapperProps)}>
            {labelPosition == "start" && labelElement}
            <CheckboxLikeOnly disabled={disabled} inputProps={inputProps} labelPosition={labelPosition} label={label} asyncState={asyncState} currentHandlerType={currentHandlerType} />
            {labelPosition == "end" && labelElement}
        </div>
    )
}
