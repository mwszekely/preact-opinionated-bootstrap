import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref } from "preact";
import { CheckboxChangeEvent, EventDetail, useCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, useDocument } from "../props";
import { CheckboxLike } from "./checkbox-like";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";


export interface SwitchProps extends Omit<GlobalAttributes<HTMLDivElement>, "ref"> {
    //ref?: Ref<HTMLInputElement>;
    checked: boolean;
    disabled?: boolean;
    onCheck?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden" | "tooltip" | "button";
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

    //type I = (event: CheckboxChangeEvent<HTMLInputElement>) => void;

    const { syncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler<CheckboxChangeEvent<HTMLInputElement>, boolean>(onInputAsync ?? null, { capture });
    disabled ||= pending;
    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);


    const getDocument = useDocument();
    const onChecked = syncHandler;

    const { useCheckboxInputElement: useSwitchInputElement, useCheckboxLabelElement: useSwitchLabelElement } = useCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({
        checkbox: {
            onCheckedChange: onChecked
        },
        checkboxLike: {

            checked: (pending ? currentCapture : checked) ?? false,
            disabled: disabled ?? false,
            labelPosition: "separate",
        },
        hasFocusInput: { getDocument },
        hasFocusLabel: { getDocument },
        label: { tagInput: "input", tagLabel: "label" }
    });

    const { useCheckboxInputElementProps: useSwitchInputElementProps } = useSwitchInputElement();
    const { useCheckboxLabelElementProps: useSwitchLabelElementProps } = useSwitchLabelElement();
    //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });


    return (<CheckboxLike
        type="switch"
        disabled={disabled}
        asyncState={asyncState}
        currentHandlerType={currentType}
        labelPosition={labelPosition}
        inputProps={useSwitchInputElementProps({ ref: ref as any, class: clsx(), tabIndex: tabIndex ?? 0 })}
        labelProps={useSwitchLabelElementProps({ class: clsx() })}
        wrapperProps={useMergedProps<HTMLDivElement>({ class: "form-switch" }, rest)}
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
        children = <div {...useMergedProps<HTMLDivElement>(props as any, { children, className: clsx(isInput && inInputGrid && "form-switch", "input-group-text") })} />

    return (
        <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<any>({ children, className: clsx("input-group-text", isInput && !inInputGrid && "form-switch", isInput && inInputGrid && "faux-input-group-text") }, props) as any} />
    );
})



