import { ComponentChildren, Fragment, h } from "preact";
import { useInputLabel } from "preact-aria-widgets/use-label";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { useSpinnerDelay } from "../props";
import { ProgressCircular } from "../progress";
import { InInputGroupContext, useInputCaptures, UnlabelledInputTextProps, UnlabelledInputNumberProps, UnlabelledInputProps, InputProps } from "./props";
import clsx from "clsx";


function UnlabelledInput(props: UnlabelledInputTextProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputNumberProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputProps): h.JSX.Element;
function UnlabelledInput({ type, disabled, value, onInput: onInputAsync, ...props }: UnlabelledInputProps): h.JSX.Element {

    const { capture, uncapture } = useInputCaptures(type);

    const { getSyncHandler, currentCapture, pending, hasError, settleCount, flushDebouncedPromise, ...asyncInfo } = useAsyncHandler<HTMLInputElement>()({ capture, debounce: 1500 });
    const onInput = getSyncHandler(disabled? null : onInputAsync as any);

    const onBlur = flushDebouncedPromise;

    return (
        <ProgressCircular spinnerTimeout={10} mode={hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null} /*className="input-group-text"*/ childrenPosition="after" color="info">
            <input {...useMergedProps<HTMLInputElement>()(props, { "aria-disabled": disabled? "true" : undefined, onBlur, class: clsx(`form-control`, disabled && "disabled", pending && "with-end-icon"), type, value: currentCapture ?? uncapture(value), onInput })} />
        </ProgressCircular>
    )
}



export function Input({ children, labelPosition, ...props }: InputProps) {
    labelPosition ??= "start";

    const { inputId, labelId, useInputLabelInput, useInputLabelLabel } = useInputLabel({ inputPrefix: "input-", labelPrefix: "input-label-" });
    const { useInputLabelInputProps } = useInputLabelInput();
    const { useInputLabelLabelProps } = useInputLabelLabel<HTMLLabelElement>({ tag: "label" });

    const isInInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${children}`;
    if (children != null && labelPosition === "hidden") {
        if (!["string", "number", "boolean"].includes(typeof children))
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        else
            (props as any)["aria-label"] = stringLabel;
    }

    const labelJsx = <label {...useInputLabelLabelProps({ class: isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "" })}>{children}</label>
    const inputJsx = <UnlabelledInput {...useInputLabelInputProps(props as any) as any as UnlabelledInputTextProps} />;
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

