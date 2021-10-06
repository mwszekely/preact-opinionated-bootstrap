import { ComponentChild, ComponentChildren, createElement, Fragment, h, Ref, RenderableProps } from "preact";
import { useAriaCheckbox } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { CheckboxChangeEvent } from "preact-aria-widgets/use-checkbox";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { InInputGridContext, InInputGroupContext } from "./props";
import clsx from "clsx";
import { createContext } from "preact";
import { useCheckboxGroup } from "preact-aria-widgets";
import { } from "preact-aria-widgets/props";
import { } from "preact-aria-widgets/use-checkbox";
import { UseCheckboxGroupChild, UseCheckboxGroupParameters } from "preact-aria-widgets/use-checkbox-group";
import { } from "preact-prop-helpers";
import { MergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback, } from "preact/hooks";
import { ProgressCircular } from "../progress/linear";
import { GlobalAttributes } from "../props";
import { InputGroupText, InputGroupTextProps } from "./grouping";




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
export function Switch({ checked, disabled, onCheck: onInputAsync, children: label, labelPosition, ...rest }: SwitchProps, ref: Ref<HTMLDivElement>) {
    labelPosition ??= "end";

    const { getSyncHandler, pending, currentType, hasError, settleCount, currentCapture } = useAsyncHandler()({ capture: (e: Event) => (e as CheckboxChangeEvent<any>)[EventDetail].checked });
    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);
    disabled ||= pending;

    const onInput = getSyncHandler(onInputAsync);
    const { useCheckboxInputElement: useSwitchInputElement, useCheckboxLabelElement: useSwitchLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement>({ checked: pending ? currentCapture : checked, disabled: disabled ?? false, onInput, labelPosition: "separate" });

    const { useCheckboxInputElementProps: useSwitchInputElementProps } = useSwitchInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps: useSwitchLabelElementProps } = useSwitchLabelElement({ tag: "label" });

    const inInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = <OptionallyInputGroup tag={inInputGroup ? "div" : null} disabled={disabled} tabIndex={-1} isInput={true}>
        <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentType === "async" ? asyncState : null} colorVariant="info">
            <input {...useSwitchInputElementProps({ type: "checkbox", className: clsx(pending && "pending", "form-check-input", disabled && "disabled"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} />
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
        return <div {...useMergedProps<HTMLDivElement>()(rest, { ref, class: "form-check form-switch" })}>{ret}</div>

    return ret

}

// Note: Slightly different from the others
// (^^^^ I'm really glad I left that there)
function OptionallyInputGroup<E extends Element>({ tag, isInput, children, ...props }: Omit<InputGroupTextProps<E>, "tag"> & { isInput: boolean, tag: InputGroupTextProps<E>["tag"] | null }) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = useContext(InInputGridContext);

    if (!inInputGroup)
        return createElement(tag ?? Fragment as any, props, children);

    if (inInputGrid && isInput)
        children = <div className={clsx(isInput && inInputGrid && "form-switch", "input-group-text")}>{children}</div>

    return (
        <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<any>()({ className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text") }, props)}>
            {children}
        </InputGroupText>
    );
}



