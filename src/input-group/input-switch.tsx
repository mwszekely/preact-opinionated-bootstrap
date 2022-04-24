import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref } from "preact";
import { CheckboxChangeEvent, EventDetail, useAriaCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress/linear";
import { forwardElementRef } from "../props";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";


export interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    onCheck?(checked: boolean): void | Promise<void>;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
}

/**
 * @see Checkbox
 * @param ref 
 * @returns 
 */
export const Switch = memo(forwardElementRef(function Switch({ checked, disabled, onCheck: onInputAsync, children: label, labelPosition, ...rest }: SwitchProps, ref: Ref<HTMLInputElement>) {
    labelPosition ??= "end";

    const { useSyncHandler, pending, currentType, hasError, settleCount, currentCapture } = useAsyncHandler()({ capture: (e: Event) => (e as CheckboxChangeEvent<any>)[EventDetail].checked });
    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    disabled ||= pending;

    const onInput = useSyncHandler(onInputAsync);
    const { useCheckboxInputElement: useSwitchInputElement, useCheckboxLabelElement: useSwitchLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({ checked: pending ? currentCapture : checked, disabled: disabled ?? false, onInput, labelPosition: "separate" });

    const { useCheckboxInputElementProps: useSwitchInputElementProps } = useSwitchInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps: useSwitchLabelElementProps } = useSwitchLabelElement({ tag: "label" });
    const { useCheckboxLabelElementProps: useWrapperLabelProps } = useSwitchLabelElement({ tag: "div" });

    const inInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = <OptionallyInputGroup tag={inInputGroup ? "div" : null} isInput={true} {...useWrapperLabelProps({ disabled, tabIndex: -1 })}>
        <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentType === "async" ? asyncState : null} colorVariant="info">
            <input {...useSwitchInputElementProps({ ref, type: "checkbox", className: clsx(pending && "pending", "form-check-input", disabled && "disabled"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} />
        </ProgressCircular>
    </OptionallyInputGroup>;

    const p2 = { ...useSwitchLabelElementProps({ className: clsx(pending && "pending", "form-check-label", disabled && "disabled"), "aria-hidden": "true" }) };
    const labelElement = <>{label != null && <OptionallyInputGroup tag="label" isInput={false} {...p2}>{label}</OptionallyInputGroup>}</>;

    const ret = (
        <>
            {labelPosition == "start" && labelElement}
            {inputElement}
            {labelPosition == "end" && labelElement}
        </>
    );

    if (!inInputGroup)
        return <div {...useMergedProps<HTMLDivElement>()(rest, { class: "form-check form-switch" })}>{ret}</div>

    return ret

}));

// Note: Slightly different from the others
// (^^^^ I'm really glad I left that there)
const OptionallyInputGroup = forwardElementRef(function OptionallyInputGroup<E extends Element>({ tag, isInput, children, ...props }: Omit<InputGroupTextProps<E>, "tag"> & { isInput: boolean, tag: InputGroupTextProps<E>["tag"] | null }, ref?: Ref<any>) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = useContext(InInputGridContext);
    props = { ...props, ref };

    if (!inInputGroup)
        return createElement(tag ?? Fragment as any, props, children);

    if (inInputGrid && isInput)
        children = <div className={clsx(isInput && inInputGrid && "form-switch", "input-group-text")}>{children}</div>

    return (
        <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<any>()({ className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text") }, props)}>
            {children}
        </InputGroupText>
    );
})



