import clsx from "clsx";
import { ComponentChildren, createElement, h } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { useButtonColorVariant } from "../button/defaults";
import { ProgressCircular } from "../progress";
import { Tooltip } from "../tooltip";
import { InputGroupText } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";

type LabelPosition = "start" | "end" | "hidden" | "tooltip" | "button";
type CheckboxLikeType = "radio" | "switch" | "check";

/**
 * A Checkbox-Like is a checkbox, radio button, switch, etc.  This is a very low-level visuals-only kind of component.
 * 
 * It does not forward props or refs anywhere. It takes `inputProps` and `labelProps` instead.
 * 
 * It has an input element, a label value, and a position for that label (e.g. "after", "tooltip", etc.).
 * 
 * It displays itself differently depending on if it's within an InputGroup or not.
 * 
 * It can also display an async state.
 */
export function CheckboxLike({ labelPosition, currentHandlerType, asyncState, inputProps, labelProps, wrapperProps, label, disabled, type, inline }: { type: CheckboxLikeType, disabled: boolean, label: ComponentChildren, wrapperProps: any, labelProps: any, inputProps: any, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", labelPosition: null | undefined | LabelPosition, inline: boolean }) {
    labelPosition ??= "end";
    const inInputGroup = !!useContext(InInputGroupContext);
    const inInputGrid = !!useContext(InInputGridContext);
    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    let temp: any = useMergedProps<HTMLInputElement>({ "aria-label": stringLabel } as h.JSX.HTMLAttributes<HTMLInputElement>, inputProps);
    if (inInputGroup)
        inputProps = temp;

    if (labelPosition == "button") {
        return <ButtonCheckboxLike disabled={disabled} asyncState={asyncState} currentHandlerType={currentHandlerType} label={label} inputProps={inputProps} labelProps={labelProps} />
    }
    else if (inInputGroup) {
        return <InputGroupCheckboxLike type={type} labelPosition={labelPosition} disabled={disabled} asyncState={asyncState} currentHandlerType={currentHandlerType} label={label} inputProps={inputProps} labelProps={labelProps} />
    }
    else {
        return <NormalCheckboxLike labelPosition={labelPosition} disabled={disabled} inline={inline} asyncState={asyncState} currentHandlerType={currentHandlerType} label={label} inputProps={inputProps} labelProps={labelProps} wrapperProps={wrapperProps} />
    }
}

function ButtonCheckboxLike({ inputProps, labelProps, label, asyncState, currentHandlerType, disabled }: { disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", label: ComponentChildren, labelProps: any, inputProps: any }) {
    const buttonColor = useButtonColorVariant() || "primary";

    return (
        <>
            {createElement("input", useMergedProps<HTMLInputElement>({ class: clsx("btn-check", disabled && "disabled") }, inputProps))}
            <ProgressCircular childrenPosition="child" colorFill="foreground-only" mode={(currentHandlerType === "async" ? asyncState : null) ?? null} colorVariant="info">
                <label {...useMergedProps<HTMLLabelElement>({ class: clsx("btn", `btn-${buttonColor}`, disabled && disabled, inputProps.checked && "active"), children: <span class="btn-text-contents">{label}</span> }, labelProps)} />
            </ProgressCircular>
        </>
    );
}

function CheckboxLikeOnly({ label, inputProps, asyncState, currentHandlerType, disabled, labelPosition }: { disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", inputProps: any, label: ComponentChildren, labelPosition: LabelPosition }) {
    let inputElement = createElement("input", useMergedProps<HTMLInputElement>({ class: clsx("form-check-input", disabled && "disabled") }, inputProps));

    inputElement = <Tooltip tooltip={labelPosition == "tooltip" ? label : null}>{inputElement}</Tooltip>;
    inputElement = <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={(currentHandlerType === "async" ? asyncState : null) ?? null} colorVariant="info">{inputElement}</ProgressCircular>

    return inputElement;
}

function InputGroupCheckboxLike({ inputProps, labelProps, label, asyncState, currentHandlerType, disabled, labelPosition, type }: { type: CheckboxLikeType, disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", label: ComponentChildren, labelProps: any, inputProps: any, labelPosition: LabelPosition }) {
    let labelElement = createElement(InputGroupText, { tag: "label", ...useMergedProps<HTMLLabelElement>({ "class": clsx("input-group-text", disabled && "disabled"), children: label }, labelProps) } as h.JSX.HTMLAttributes<any>);
    labelElement = (label != null && (labelPosition == "start" || labelPosition == "end") && labelElement) || null!;
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


function InputWrapper(props: h.JSX.HTMLAttributes<HTMLInputElement>) {
    return <input {...props} />;                                                // Error
}

const a = <InputWrapper {...({} as h.JSX.HTMLAttributes<HTMLInputElement>)} />; // Works fine
const b = h("input", {} as h.JSX.HTMLAttributes<HTMLInputElement>);             // Works fine
const c = <input {...({} as h.JSX.HTMLAttributes<HTMLInputElement>)} />;        // Error
const d = h("div", {} as h.JSX.HTMLAttributes<HTMLDivElement>);                 // Works fine
const e = <div {...({} as h.JSX.HTMLAttributes<HTMLDivElement>)} />;            // Works fine
const f = h("select", {} as h.JSX.HTMLAttributes<HTMLSelectElement>);           // Works fine
const g = <select {...({} as h.JSX.HTMLAttributes<HTMLSelectElement>)} />;      // Works fine




function NormalCheckboxLike({ inputProps, labelProps, wrapperProps, label, asyncState, currentHandlerType, disabled, labelPosition, inline }: { disabled: boolean, currentHandlerType: "sync" | "async" | null | undefined, asyncState: null | undefined | "pending" | "succeeded" | "failed", label: ComponentChildren, wrapperProps: any, labelProps: any, inputProps: any, labelPosition: LabelPosition, inline: boolean }) {

    const labelElement = ((labelPosition == "start" || labelPosition == "end") && <label {...useMergedProps<HTMLLabelElement>({ class: clsx("form-check-label", disabled && "disabled"), children: label }, labelProps)} />);

    return (
        <div {...useMergedProps<HTMLDivElement>({ class: clsx("form-check", disabled && "disabled", inline && "form-check-inline") }, wrapperProps)}>
            {labelPosition == "start" && labelElement}
            <CheckboxLikeOnly disabled={disabled} inputProps={inputProps} labelPosition={labelPosition} label={label} asyncState={asyncState} currentHandlerType={currentHandlerType} />
            {labelPosition == "end" && labelElement}
        </div>
    )
}
