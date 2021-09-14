import { ComponentChildren, Fragment, h } from "preact";
import { useInputLabel } from "preact-aria-widgets/use-label";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { useSpinnerDelay } from "../props";
import { ProgressCircular } from "../progress";
import { InInputGroupContext, InputNumberProps, InputProps, InputTextProps, useInputCaptures } from "./props";
import clsx from "clsx";

export type LabelledInputProps = InputProps & { label: ComponentChildren, labelPosition?: "start" | "end" | "floating" }

export function Input(props: InputTextProps): h.JSX.Element;
export function Input(props: InputNumberProps): h.JSX.Element;
export function Input(props: InputProps): h.JSX.Element;
export function Input({ type, value, onInput: onInputAsync, ...props }: InputProps): h.JSX.Element {

    const { capture, uncapture } = useInputCaptures(type);

    const { getSyncHandler, currentCapture, pending, hasError, settleCount, ...asyncInfo } = useAsyncHandler<HTMLInputElement>()({ capture });
    const onInput = getSyncHandler(onInputAsync as any);

    return (
        <ProgressCircular mode={hasError? "failed" : pending? "pending" : settleCount? "succeeded" : null } /*className="input-group-text"*/ childrenPosition="after" color="info"><input {...useMergedProps<HTMLInputElement>()(props, { class: clsx(`form-control`, pending && "with-end-icon"), type, value: currentCapture ?? uncapture(value), onInput })} /></ProgressCircular>
    )
}



export function LabelledInput({ label, labelPosition, ...props }: LabelledInputProps) {
    labelPosition ??= "start";

    const { inputId, labelId, useInputLabelInput, useInputLabelLabel } = useInputLabel({ inputPrefix: "input-", labelPrefix: "input-label-" });
    const { useInputLabelInputProps } = useInputLabelInput();
    const { useInputLabelLabelProps } = useInputLabelLabel<HTMLLabelElement>({ tag: "label" });

    const isInInputGroup = useContext(InInputGroupContext);

    const labelJsx = <label {...useInputLabelLabelProps({ class: isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "" })}>{label}</label>
    const inputJsx =<Input {...useInputLabelInputProps(props as any) as any as InputTextProps} />;
    const inputWithLabel = (
        <>
            {labelPosition === "start" && labelJsx}
            {inputJsx}
            {(labelPosition === "end" || labelPosition == "floating") && labelJsx}
        </>
    );

    if (labelPosition !== "floating")
        return inputWithLabel;
    else
        return <div class="form-floating">{inputJsx}</div>
}

