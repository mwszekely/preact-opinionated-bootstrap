import clsx from "clsx";
import { Fragment, h, Ref } from "preact";
import { useInputLabel } from "preact-aria-widgets";
import { useAsyncHandler, useHasFocus, useMergedProps, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef } from "../props";
import { ProgressCircular } from "../progress";
import { InInputGridContext, InInputGroupContext, InputProps, UnlabelledInputNumberProps, UnlabelledInputProps, UnlabelledInputTextProps, useInputCaptures } from "./props";


function UnlabelledInputR(props: UnlabelledInputTextProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputNumberProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR({ type, disabled, value, onValueChange: onInputAsync, ...props }: UnlabelledInputProps, ref?: Ref<any>): h.JSX.Element {

    const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
    const { capture, uncapture } = useInputCaptures(type, (props as UnlabelledInputNumberProps).min, (props as UnlabelledInputNumberProps).max!);
    const { useHasFocusProps } = useHasFocus<HTMLInputElement>({ onFocusedInnerChanged: setFocusedInner });

    const { getSyncHandler, currentCapture, pending, hasError, settleCount, flushDebouncedPromise, currentType, ...asyncInfo } = useAsyncHandler<HTMLInputElement>()({ capture, debounce: type === "text" ? 1500 : undefined });
    const onInputIfValid = getSyncHandler(disabled ? null : onInputAsync as any);
    const onInput = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
        const target = (e.currentTarget as HTMLInputElement | undefined);
        if (type == "number") {

            // When typing numbers, they'll "autocorrect" to their
            // most natural represented form when the input re-renders.
            //
            // This is a problem when typing, e.g., "-5", because
            // when the user is typing character-by-character, 
            // the closest number to "-" is "NaN", which makes it
            // impossible to enter "-5" with the "-" as the first character.
            //
            // To fix this, we don't do anything if we received an onInput
            // event but there's no valid numeric representation for
            // whatever was typed.  We just ignore it, and wait until
            // an actual number comes in.
            //
            // NOTE: When valueAsNumber is NaN, value is "".  That means
            // that it's *NOT* possible to store the partially typed
            // value anywhere -- it's completely hidden away.
            if (target?.value || target?.valueAsNumber === 0) {
                return onInputIfValid?.bind(target as never)(e);
            }
        }
        else {
            return onInputIfValid?.bind(target as never)(e);
        }

    }

    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    const onBlur = flushDebouncedPromise;
    const isInInputGrid = useContext(InInputGridContext);

    return (
        <ProgressCircular spinnerTimeout={10} mode={currentType === "async" ? asyncState : null} childrenPosition="after" colorVariant="info">
            <input {...(useHasFocusProps(useMergedProps<HTMLInputElement>()(props, {
                "aria-disabled": disabled ? "true" : undefined,
                ref,
                readOnly: disabled,
                onBlur,
                class: clsx("form-control", "faux-form-control-inner", disabled && "disabled", pending && "with-end-icon"),
                type,
                value: (pending || focusedInner) ? currentCapture : uncapture(value), onInput
            })))} />
        </ProgressCircular>
    )
}

const UnlabelledInput = forwardElementRef(UnlabelledInputR);



export const Input = memo(forwardElementRef(function Input({ children, width, labelPosition, placeholder, size, ...props }: InputProps, ref?: Ref<any>) {
    labelPosition ??= "start";
    size ??= "md";


    const { inputId, labelId, useInputLabelInput, useInputLabelLabel } = useInputLabel({ inputPrefix: "input-", labelPrefix: "input-label-" });
    const { useInputLabelInputProps } = useInputLabelInput();
    const { useInputLabelLabelProps } = useInputLabelLabel<HTMLLabelElement>({ tag: "label" });

    const isInInputGroup = useContext(InInputGroupContext);
    const isInInputGrid = useContext(InInputGridContext);

    let stringLabel = `${children}`;
    if (children != null && (labelPosition === "hidden" || labelPosition === "placeholder")) {
        if (!["string", "number", "boolean"].includes(typeof children))
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        else {
            (props as any)["aria-label"] = stringLabel;
            if (placeholder == null && labelPosition === "placeholder")
                placeholder = stringLabel;
        }
    }

    const labelJsx = <label {...useInputLabelLabelProps({ class: clsx(props.disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "") })}>{children}</label>
    let inputJsx = <UnlabelledInput placeholder={placeholder} {...useInputLabelInputProps(props as any) as any as UnlabelledInputTextProps} {...{ ref } as never} />;

    const isEmpty = true || (((props.value as number) !== 0 && props.value == ""));

    //if (isInInputGrid) {
    inputJsx = <div class={clsx(
        "form-control",
        "faux-form-control-outer",
        "elevation-depressed-2",
        "elevation-body-surface",
        "focusable-within",
        !isEmpty && "focus-within-only",
        props.disabled && "disabled",
        size != "md" && `form-control-${size}`,
    )} style={width?.endsWith("ch") ? { "--form-control-width": (width ?? "20ch") } as any : width ? { width } : undefined}>{inputJsx}</div>
    // }

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
}));

