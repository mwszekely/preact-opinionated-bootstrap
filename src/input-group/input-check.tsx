import clsx from "clsx";
import { ComponentChild, ComponentChildren, createContext, createElement, Fragment, h, Ref, RenderableProps } from "preact";
import { useAriaCheckbox, useCheckboxGroup } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { CheckboxChangeEvent } from "preact-aria-widgets/use-checkbox";
import { UseCheckboxGroupChild, UseCheckboxGroupParameters } from "preact-aria-widgets/use-checkbox-group";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { MergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback, useContext } from "preact/hooks";
import { ProgressCircular } from "../progress/linear";
import { forwardElementRef, GlobalAttributes } from "../props";
import { InputGroupText, InputGroupTextProps } from "./input-group";
import { InInputGridContext, InInputGroupContext } from "./props";

export interface CheckboxProps extends GlobalAttributes<HTMLInputElement> {
    checked: boolean | "mixed";
    disabled?: boolean;
    onInput?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    labelPosition?: "start" | "end" | "hidden";
}

function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): boolean {
    return (e as CheckboxChangeEvent<any>)[EventDetail].checked;
}

/**
 * TODO: When inside an InputGroup, Checkboxes don't forward any properties or refs because there's no one DOM element to attach to.
 * 
 * Probably need separate `inputRef` & `labelRef` properties for that, 
 * but given there's also no easy way to forward props to just them a solution like that feels incomplete.
 */
export const Checkbox = forwardElementRef(function Checkbox({ checked, disabled, onInput: onInputAsync, labelPosition, children: label, ...props }: CheckboxProps, ref: Ref<HTMLInputElement>) {
    labelPosition ??= "end";

    type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };

    const { getSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler()({ capture });
    disabled ||= pending;

    const onInput = getSyncHandler(onInputAsync) as unknown as I;
    const { useCheckboxInputElement, useCheckboxLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement>({ checked: pending ? currentCapture! : ((checked as string) === "indeterminate" ? "mixed" : checked), disabled: disabled ?? false, onInput, labelPosition: "separate" });

    const { useCheckboxInputElementProps } = useCheckboxInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps } = useCheckboxLabelElement({ tag: "label" });

    const inInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);

    const p = useMergedProps<HTMLInputElement>()(props, useCheckboxInputElementProps({ ref, type: "checkbox", className: clsx("form-check-input", pending && "pending", disabled && "disabled", inInputGroup && "mt-0"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined }));
    const inputElement =
        <OptionallyInputGroup isInput tag={inInputGroup ? "div" : null} tabIndex={-1} disabled={disabled}>
            <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentType === "async" ? asyncState : null} colorVariant="info">
                <input {...p} />
            </ProgressCircular>
        </OptionallyInputGroup>

    const p2 = { ...useCheckboxLabelElementProps({ className: clsx(pending && "pending", disabled && "disabled", "form-check-label"), "aria-hidden": "true" }) };
    const labelElement = <>{label != null && <OptionallyInputGroup isInput={false} tag="label" {...p2}>{label}</OptionallyInputGroup>}</>;

    const ret = (
        <>
            {labelPosition == "start" && labelElement}
            {inputElement}
            {labelPosition == "end" && labelElement}
        </>
    );

    if (!inInputGroup)
        return <div {...useMergedProps<HTMLDivElement>()({}, { class: "form-check" })}>{ret}</div>
    return ret;

})

type UseCheckboxGroupCheckboxProps = <P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) => MergedProps<HTMLInputElement, { "aria-controls": string; }, P>;
const CheckboxGroupParentCheckboxPropsContext = createContext<any>(null!);
const CheckboxGroupChildContext = createContext<UseCheckboxGroupChild<HTMLInputElement>>(null!);
export function CheckboxGroup({ children }: { children: ComponentChildren }) {
    const { percentChecked, selfIsChecked, onCheckboxGroupInput, useCheckboxGroupCheckboxProps, useCheckboxGroupChild } = useCheckboxGroup<HTMLInputElement>({});

    return (
        <>
            <CheckboxGroupParentCheckboxPropsContext.Provider value={useCheckboxGroupCheckboxProps}>
                <Checkbox className="checkbox-group-parent" checked={selfIsChecked} onInput={useCallback((checked: any, e: h.JSX.TargetedEvent<HTMLInputElement>) => { onCheckboxGroupInput(e) }, [onCheckboxGroupInput])} />
            </CheckboxGroupParentCheckboxPropsContext.Provider>

            <CheckboxGroupChildContext.Provider value={useCheckboxGroupChild}>{children}</CheckboxGroupChildContext.Provider>

        </>
    )
};

export function OptionallyInputGroup<E extends Element>({ tag, children, isInput, ...props }: Omit<InputGroupTextProps<E>, "tag"> & { isInput: boolean, tag: InputGroupTextProps<E>["tag"] | null }) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = !!useContext(InInputGridContext);

    if (!inInputGroup)
        return createElement(tag ?? Fragment as any, props, children);

    // If we're in an InputGrid's InputGroup, then create a 
    // new child that's, CSS-wise, the "true" input.
    // The other one is used for its border styles and relative positioning.
    if (inInputGrid && isInput)
        children = <div className="input-group-text">{children}</div>

    return <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<E>()({ className: clsx(isInput && inInputGrid && "faux-input-group-text") }, props)}>{children}</InputGroupText>;
}



