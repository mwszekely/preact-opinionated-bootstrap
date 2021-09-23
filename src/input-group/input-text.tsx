import { ComponentChildren, Fragment, h } from "preact";
import { useInputLabel } from "preact-aria-widgets/use-label";
import { useAsyncHandler, useMergedProps, useRefElement } from "preact-prop-helpers";
import { useContext, useEffect } from "preact/hooks";
import { useSpinnerDelay } from "../props";
import { ProgressCircular } from "../progress";
import { InInputGroupContext, useInputCaptures, UnlabelledInputTextProps, UnlabelledInputNumberProps, UnlabelledInputProps, InputProps, InInputGridContext } from "./props";
import clsx from "clsx";
import { useHasFocus } from "preact-prop-helpers";
function UnlabelledInput(props: UnlabelledInputTextProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputNumberProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputProps): h.JSX.Element;
function UnlabelledInput({ type, disabled, value, onInput: onInputAsync, ...props }: UnlabelledInputProps): h.JSX.Element {

    const { capture, uncapture } = useInputCaptures(type, (props as UnlabelledInputNumberProps).min, (props as UnlabelledInputNumberProps).max!);
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLInputElement>();

    const { getSyncHandler, currentCapture, pending, hasError, settleCount, flushDebouncedPromise, currentType, ...asyncInfo } = useAsyncHandler<HTMLInputElement>()({ capture, debounce: type === "text" ? 1500 : undefined });
    const onInput = getSyncHandler(disabled ? null : onInputAsync as any);

    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    const onBlur = flushDebouncedPromise;

    return (
        <ProgressCircular spinnerTimeout={10} mode={currentType === "async" ? asyncState : null} /*className="input-group-text"*/ childrenPosition="after" color="info">
            <input {...(useHasFocusProps(useMergedProps<HTMLInputElement>()(props, {
                "aria-disabled": disabled ? "true" : undefined,
                readOnly: disabled,
                onBlur,
                class: clsx(`form-control`, disabled && "disabled", pending && "with-end-icon"),
                type,
                value: (pending || focusedInner) ? currentCapture : uncapture(value), onInput
            })))} />
        </ProgressCircular>
    )
}



export function Input({ children, width, labelPosition, ...props }: InputProps) {
    labelPosition ??= "start";

    if (props.value > 255)
        debugger;

    const { inputId, labelId, useInputLabelInput, useInputLabelLabel } = useInputLabel({ inputPrefix: "input-", labelPrefix: "input-label-" });
    const { useInputLabelInputProps } = useInputLabelInput();
    const { useInputLabelLabelProps } = useInputLabelLabel<HTMLLabelElement>({ tag: "label" });

    const isInInputGroup = useContext(InInputGroupContext);
    const isInInputGrid = useContext(InInputGridContext);

    let stringLabel = `${children}`;
    if (children != null && labelPosition === "hidden") {
        if (!["string", "number", "boolean"].includes(typeof children))
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        else
            (props as any)["aria-label"] = stringLabel;
    }

    const labelJsx = <label {...useInputLabelLabelProps({ class: clsx(props.disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "") })}>{children}</label>
    let inputJsx = <UnlabelledInput {...useInputLabelInputProps(props as any) as any as UnlabelledInputTextProps} />;

    if (isInInputGrid) {
        inputJsx = <div class="form-control faux-form-control" style={width?.endsWith("ch") ? { "--form-control-width": (width ?? "20ch") } as any : width ? { width } : undefined}>{inputJsx}</div>
    }

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

