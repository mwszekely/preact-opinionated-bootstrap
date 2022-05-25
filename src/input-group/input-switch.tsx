import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref } from "preact";
import { CheckboxChangeEvent, EventDetail, useAriaCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes } from "../props";
import { CheckboxLike } from "./checkbox-like";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";


export interface SwitchProps extends Omit<GlobalAttributes<HTMLDivElement>, "ref"> {
    //ref?: Ref<HTMLInputElement>;
    checked: boolean;
    disabled?: boolean;
    onCheck?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden" | "tooltip";
    inline?: boolean;
}

function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): boolean {
    return (e as CheckboxChangeEvent<any>)[EventDetail].checked;
}

/**
 * @see Checkbox
 * @param ref 
 * @returns 
 */
export const Switch = memo(forwardElementRef(function Switch({ checked, disabled, inline, onCheck: onInputAsync, children: label, labelPosition, tabIndex, ...rest }: SwitchProps, ref: Ref<HTMLInputElement>) {

    type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };

    const { useSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler()({ capture });
    disabled ||= pending;
    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);


    const onChecked = useSyncHandler(onInputAsync) as unknown as I;
    const { useCheckboxInputElement: useSwitchInputElement, useCheckboxLabelElement: useSwitchLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({ checked: (pending ? currentCapture : checked) ?? false, disabled: disabled ?? false, onInput: onChecked, labelPosition: "separate" });

    const { useCheckboxInputElementProps: useSwitchInputElementProps } = useSwitchInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps: useSwitchLabelElementProps } = useSwitchLabelElement({ tag: "label" });
    //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });


    return (<CheckboxLike
        type="switch"
        disabled={disabled}
        asyncState={asyncState}
        currentHandlerType={currentType}
        labelPosition={labelPosition}
        inputProps={useSwitchInputElementProps({ ref: ref as any, class: clsx(), tabIndex: tabIndex ?? 0 })}
        labelProps={useSwitchLabelElementProps({ class: clsx() })}
        wrapperProps={useMergedProps<HTMLDivElement>()({ class: "form-switch" }, rest)}
        inline={inline ?? false}
        label={label}
    />);

}));

// Note: Slightly different from the others
// (^^^^ I'm really glad I left that there)
const OptionallyInputGroup = forwardElementRef(function OptionallyInputGroup<E extends Element>({ tag, isInput, isTooltip, children, ...props }: Omit<InputGroupTextProps<E>, "tag"> & { isInput: boolean, tag: InputGroupTextProps<E>["tag"] | null, isTooltip: boolean }, ref?: Ref<any>) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = useContext(InInputGridContext);
    props = { ...props, ref };

    if (!inInputGroup || isTooltip)
        return createElement(tag ?? Fragment as any, props, children);

    if (inInputGrid && isInput)
        children = <div {...useMergedProps<HTMLDivElement>()(props as any, { children, className: clsx(isInput && inInputGrid && "form-switch", "input-group-text") })} />

    return (
        <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<any>()({ children, className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text") }, props) as any} />
    );
})



