import clsx from "clsx";
import { Fragment, h } from "preact";
import { useInputLabel } from "preact-aria-widgets";
import { useAsyncHandler, useHasFocus, useMergedProps, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { InInputGridContext, InInputGroupContext, InputProps, UnlabelledInputNumberProps, UnlabelledInputProps, UnlabelledInputTextProps, useInputCaptures } from "./props";


function UnlabelledInput(props: UnlabelledInputTextProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputNumberProps): h.JSX.Element;
function UnlabelledInput(props: UnlabelledInputProps): h.JSX.Element;
function UnlabelledInput({ type, disabled, value, onValueChange: onInputAsync, ...props }: UnlabelledInputProps): h.JSX.Element {

    const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
    const { capture, uncapture } = useInputCaptures(type, (props as UnlabelledInputNumberProps).min, (props as UnlabelledInputNumberProps).max!);
    const { useHasFocusProps } = useHasFocus<HTMLInputElement>({ setFocusedInner });

    const { getSyncHandler, currentCapture, pending, hasError, settleCount, flushDebouncedPromise, currentType, ...asyncInfo } = useAsyncHandler<HTMLInputElement>()({ capture, debounce: type === "text" ? 1500 : undefined });
    const onInput = getSyncHandler(disabled ? null : onInputAsync as any);

    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    const onBlur = flushDebouncedPromise;

    return (
        <ProgressCircular spinnerTimeout={10} mode={currentType === "async" ? asyncState : null} childrenPosition="after" colorVariant="info">
            <input {...(useHasFocusProps(useMergedProps<HTMLInputElement>()(props, {
                "aria-disabled": disabled ? "true" : undefined,
                readOnly: disabled,
                onBlur,
                class: clsx(`form-control`, "elevation-body-surface", "elevation-depressed-2", (value as number) !== 0 && value == "" && "focus-only", disabled && "disabled", pending && "with-end-icon"),
                type,
                value: (pending || focusedInner) ? currentCapture : uncapture(value), onInput
            })))} />
        </ProgressCircular>
    )
}



export const Input = memo(function Input({ children, width, labelPosition, ...props }: InputProps) {
    labelPosition ??= "start";

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
});

