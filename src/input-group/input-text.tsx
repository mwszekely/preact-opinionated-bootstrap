import clsx from "clsx";
import { createElement, Fragment, h, Ref } from "preact";
import { useInputLabel } from "preact-aria-widgets";
import { storeToLocalStorage, useAsyncHandler, useHasFocus, useMergedProps, usePassiveState, useRefElement, useStableCallback, useStableGetter, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useContext, useEffect } from "preact/hooks";
import { forwardElementRef } from "../props";
import { ProgressCircular } from "../progress";
import { DefaultInputSize, InInputGridContext, InInputGroupContext, InputProps, UnlabelledInputNumberNonNullableProps, UnlabelledInputNumberNullableProps, UnlabelledInputProps, UnlabelledInputTextareaProps, UnlabelledInputTextProps, useInputCaptures } from "./props";
import { InputGroupText } from "./grouping";
import { Tooltip } from "../tooltip";
import { ProvideDefaultButtonSize } from "../button";


function return0() { return 0; }

function UnlabelledInputR(props: UnlabelledInputTextProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputTextareaProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputNumberNullableProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputNumberNonNullableProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(props: UnlabelledInputProps, ref?: Ref<any>): h.JSX.Element;
function UnlabelledInputR(p: UnlabelledInputProps, ref?: Ref<any>): h.JSX.Element {

    let { type, disabled, value, onValueChange: onInputAsync, disabledVariant, readOnly, spinnerTimeout, prefix, suffix, sizeClass, debounce, ...p2 } = (p as UnlabelledInputProps & { sizeClass?: string | null });
    let { nonNullable, ...p3 } = p2 as (UnlabelledInputNumberNonNullableProps | UnlabelledInputNumberNullableProps);
    let nullable = !nonNullable;
    const props = p3 as h.JSX.HTMLAttributes<HTMLInputElement>;

    disabledVariant ??= "soft";

    const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
    const { capture, uncapture } = useInputCaptures(type, (props as UnlabelledInputNumberNonNullableProps).min, (props as UnlabelledInputNumberNonNullableProps).max!);
    const { useHasFocusProps } = useHasFocus<HTMLInputElement>({
        onFocusedInnerChanged: setFocusedInner,
        onFocusedChanged: useCallback((focused: boolean) => {
            if (!focused)
                setLRImpatience(0);
        }, [])
    });

    const { syncHandler, currentCapture, pending, hasError, settleCount, flushDebouncedPromise, currentType, ...asyncInfo } = useAsyncHandler<h.JSX.TargetedEvent<HTMLInputElement, Event>, string | number | null>(onInputAsync as any ?? null, {
        capture: useStableCallback((e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
            const ret = capture(e);
            if (ret == null) {
                if (nullable)
                    return ret;
                else
                    return value;
            }
            else {
                return ret;
            }
        }),
        debounce: debounce ?? (type === "text" ? 1500 : undefined)
    });
    if (!focusedInner && pending)
        disabled = true;
    const onInputIfValid = (disabled ? null : syncHandler as any);
    const onInput = (e: h.JSX.TargetedEvent<HTMLInputElement>) => {
        const target = (e.currentTarget as HTMLInputElement | undefined);
        return onInputIfValid?.bind(target as never)(e);

    }

    // Until a better solution to "can't measure where the cursor is in input type=number" is found
    // use this to keep track of if the user is hammering left/right trying to escape the text field 
    // within a larger arrowkey-based navigation system. 
    const [getLRImpatience, setLRImpatience] = usePassiveState(null, return0);

    setInterval(() => {
        if (getLRImpatience() == 0) {
            setLRImpatience(prev => {
                if (prev == null)
                    prev = 0;

                else if (prev < 0)
                    ++prev;
                else if (prev > 0)
                    --prev;

                return prev;
            })
        }
    }, 1000);

    const onKeyDown = (e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>) => {

        if (e.currentTarget.type == "number") {

            let prevValue = e.currentTarget.value;
            let nextValue: string | null = null;

            let arrowType: "vert" | "horiz" | null = null;

            switch (e.key) {
                case "ArrowUp":
                    try {
                        e.currentTarget.stepUp();
                    }
                    catch (ex) { debugger; }
                    nextValue = e.currentTarget.value;
                    e.currentTarget.value = prevValue;
                    arrowType = "vert";
                    break;

                case "ArrowDown":
                    try {
                        e.currentTarget.stepDown();
                    }
                    catch (ex) { debugger; }
                    nextValue = e.currentTarget.value;
                    e.currentTarget.value = prevValue;
                    arrowType = "vert";
                    break;

                case "ArrowLeft":
                    setLRImpatience(prev => Math.max(-e.currentTarget.value.length + 1, (prev ?? 0) - 1));
                    arrowType = "horiz";
                    break;
                case "ArrowRight":
                    setLRImpatience(prev => Math.min(e.currentTarget.value.length + 1, (prev ?? 0) + 1));
                    arrowType = "horiz";
                    break;
            }

            if (arrowType === "vert") {

                // Only prevent anyone else from reacting to this event
                // if this key press actually changed the value.
                if (prevValue != nextValue) {
                    e.stopPropagation();
                }
            }

            if (arrowType === "horiz") {
                // No way to detect if we're at the start or end of the input element,
                // unfortunately, at least when the type is number....
                //
                // So instead, we track the number of times the user has
                // hammered the Left/Right arrows recently
                // and if it's more than it takes to type the current value,
                // as an escape we let the event through.
                //
                // This is mostly to prevent frustration, but
                // TODO: really need a proper aria re-implementation of a number
                // field as a text field (on non-mobile only??).
                if (Math.abs(getLRImpatience()) <= e.currentTarget.value.length)
                    e.stopPropagation();
            }
        }
    }

    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    const onBlur = flushDebouncedPromise;
    const isInInputGrid = useContext(InInputGridContext);

    const extraProps = (type === "numeric" ? {
        inputMode: "numeric",
        pattern: "[0-9]*"
    } : {});
    if (type === "numeric") {
        type = "text";
    }


    // When typing numbers, they'll "autocorrect" to their
    // most natural represented form when the input re-renders.
    //
    // This is a problem when typing, e.g., "-5", because
    // when the user is typing character-by-character, 
    // the closest number to "-" is "NaN", which makes it
    // impossible to enter "-5" with the "-" as the first character.
    //
    // To fix this, we render the <input> as completely uncontrolled,
    // and manually update the value during useEffect. If the value
    // is null, whether it's because of valid or invalid user input,
    // we'll just not update the value property on the element. We'll
    // just leave it as it was last entered. Any time the value
    // is NOT null, then we will take over again.
    //
    // TODO: Entering extremely large/small numbers is still rough.
    //
    // NOTE: When valueAsNumber is NaN, value is "".  That means
    // that it's *NOT* possible to store the partially typed
    // value anywhere -- it's completely hidden away.
    const v = (((pending || focusedInner || hasError) ? currentCapture : undefined) ?? uncapture(value));
    const { getElement, useRefElementProps } = useRefElement<HTMLInputElement>({});
    useEffect(() => {
        const element = getElement();
        if (element) {
            if (!focusedInner && v != null) {
                element.value = `${v}`;
            }
        }
    }, [focusedInner, v]);

    let measure: string | number | h.JSX.Element

    if (type == "number") {
        measure = "0".repeat((v as number).toString().length);
    }
    else {
        measure = v || <>&nbsp;</>;
    }

    const inputProps = useRefElementProps(useHasFocusProps(useMergedProps<HTMLInputElement>(props, {
        "aria-disabled": disabled ? "true" : undefined,
        onKeyDown,
        ref,
        readOnly: readOnly || (disabled && disabledVariant === "soft"),
        disabled: (disabled && disabledVariant === "hard"),
        onBlur,
        class: clsx("form-control", "faux-form-control-inner", disabled && "disabled", "form-control", sizeClass),
        type: type == "textarea"? undefined : type,
        onInput,
        ...extraProps,
    })));


    return (
        <>
            {prefix && <span class="form-control-prefix">{prefix}</span>}
            <span class={clsx("form-control", "faux-form-control-measure", "form-control", sizeClass)}>
                <span>{measure}{currentType == "async" ? <span class="d-inline-block user-select-none" style={{ width: "2em" }} /> : null}</span>
            </span>
            <label class={clsx("form-control form-control-input-container", sizeClass)}>
                <ProgressCircular spinnerTimeout={spinnerTimeout ?? 10} mode={currentType === "async" ? asyncState : null} childrenPosition="after" colorVariant="info">
                   {createElement(type == "textarea"? "textarea" : "input", inputProps as any)}
                </ProgressCircular>
            </label>

            {suffix && <span class="form-control-suffix">{suffix}</span>}
        </>
    )
}

const UnlabelledInput = forwardElementRef(UnlabelledInputR);



export const Input = memo(forwardElementRef(function Input({ children, value, width, readOnly, labelPosition, placeholder, disabled, disabledVariant, size, className, prefix, suffix, debounce, class: classs, ...props }: InputProps, ref?: Ref<any>) {
    labelPosition ??= "start";
    let parentSize = useContext(DefaultInputSize);
    size ??= (parentSize ?? "md");


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

    const IC = (disabled && disabledVariant === "text" ? InputGroupText : UnlabelledInput);

    const labelJsx = <label {...useInputLabelLabelProps({ class: clsx(disabledVariant !== "text" && disabled && "disabled", isInInputGroup ? "input-group-text" : labelPosition != "floating" ? "form-label" : "") })}>{children}</label>

    const sizeClass = (size != "md" && `form-control-${size}`);
    let inputJsx = <IC
        {...useInputLabelInputProps(useMergedProps<any>({
            children: IC === InputGroupText ? value : undefined,
            value: undefined, //IC === InputGroupText ? undefined : (value ?? undefined),
            placeholder: IC === InputGroupText ? undefined : placeholder,
            disabled: (IC === InputGroupText ? undefined : disabled),
            disabledVariant: (IC === InputGroupText ? undefined : disabledVariant),
            readOnly: (IC === InputGroupText ? undefined : readOnly),
            debounce: (IC === InputGroupText ? undefined : debounce),

            className: clsx(IC === InputGroupText ? "form-control" : undefined, sizeClass),
        }, props as any)) as any as UnlabelledInputTextProps}
        {...(IC === InputGroupText ? {} : {
            sizeClass,
            prefix: (prefix as string),
            suffix: (suffix as string),
        } as any)}
        {...{ ref } as any}
        {...{ [IC == InputGroupText ? "children" : "value"]: value }}
        children={IC == InputGroupText ? value : undefined}
    />;


    const isEmpty = true || (((value as number) !== 0 && value == ""));
    //if (isInInputGrid) {
    if (!(disabled && disabledVariant === "text")) {
        inputJsx = <div class={clsx(
            labelPosition != "floating" && classs,
            labelPosition != "floating" && className,
            "form-control",
            "faux-form-control-outer",
            "elevation-depressed-2",
            "elevation-body-surface",
            //"focusable-within",
            sizeClass,
            !isEmpty && "focus-within-only",
            disabled && disabledVariant !== "text" && "disabled",
        )} style={width?.endsWith("ch") ? { "--form-control-width": (width ?? "20ch") } as any : width ? { width } : undefined}>{inputJsx}</div>
    }
    // }

    if (labelPosition == "tooltip")
        inputJsx = <Tooltip tooltip={labelJsx}>{inputJsx}</Tooltip>;


    return (
        <ProvideDefaultButtonSize value={size ?? "md"}>

            {(labelPosition !== "floating") ?
                <>
                    {labelPosition === "start" && labelJsx}
                    {inputJsx}
                    {(labelPosition === "end") && labelJsx}
                </>
                :
                <div class={clsx("form-floating", labelPosition == "floating" && classs, labelPosition === "floating" && className)}>{inputJsx}</div>}
        </ProvideDefaultButtonSize>
    );
}));

