import clsx from "clsx";
import { cloneElement, createElement, h, Ref, VNode } from "preact";
import { CheckboxChangeEvent, EventDetail, useAriaCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, OmitStrong } from "../props";
import { CheckboxLike } from "./checkbox-like";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";

export interface CheckboxProps extends Omit<GlobalAttributes<HTMLDivElement>, "ref"> {
    //ref?: Ref<HTMLInputElement>;
    checked: boolean | "mixed";
    disabled?: boolean;
    onCheck?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    labelPosition?: "start" | "end" | "hidden" | "tooltip" | "button";
    inline?: boolean;
    tristate?: boolean;     // When true, clicking the checkbox cycles through all three states instead of just true/false.
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
export const Checkbox = memo(forwardElementRef(function Checkbox({ checked, tristate, disabled, inline, onCheck: onCheckedAsync, labelPosition, children: label, tabIndex, ...props }: CheckboxProps, ref: Ref<HTMLInputElement>) {


    const inInputGroup = useContext(InInputGroupContext);

    type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };

    const { useSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler()({ capture });
    disabled ||= pending;
    const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);


    const onChecked = useSyncHandler((newCheckedValue, event) => {
        if (tristate) {
            if (checked == false)
                return onCheckedAsync?.("mixed" as unknown as boolean, event);
            else if (checked === "mixed")
                return onCheckedAsync?.(true, event);
            else
                return onCheckedAsync?.(false, event);
        }
        else {
            return onCheckedAsync?.(newCheckedValue, event);
        }
    }) as unknown as I;

    const { useCheckboxInputElement, useCheckboxLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({
        checked: pending ? currentCapture! : ((checked as string) === "indeterminate" ? "mixed" : checked),
        disabled: disabled ?? false,
        onInput: onChecked,
        labelPosition: "separate"
    });

    const { useCheckboxInputElementProps } = useCheckboxInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps } = useCheckboxLabelElement({ tag: "label" });
    //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });

    let baseInputProps = { ref: ref as any, className: clsx(pending && "pending", inInputGroup && "mt-0"), tabIndex: tabIndex ?? 0 };
    let baseLabelProps = { class: clsx(pending && "pending") };


    return (<CheckboxLike
        type="check"
        disabled={disabled}
        asyncState={asyncState}
        currentHandlerType={currentType}
        labelPosition={labelPosition}
        inputProps={useCheckboxInputElementProps(baseInputProps)}
        labelProps={useCheckboxLabelElementProps(baseLabelProps)}
        inline={inline ?? false}
        wrapperProps={useMergedProps<HTMLDivElement>()({}, props)}
        label={label}
    />);

}));

export const OptionallyInputGroup = forwardElementRef(function OptionallyInputGroup<E extends Element>({ tag, children, isInput, isTooltip, ...props }: OmitStrong<InputGroupTextProps<E>, "tag"> & { isInput: boolean, isTooltip: boolean, tag: InputGroupTextProps<E>["tag"] | null }, ref?: Ref<any>) {
    const inInputGroup = useContext(InInputGroupContext);
    const inInputGrid = !!useContext(InInputGridContext);
    props = { ...props, ref };

    props = useMergedProps<any>()(props, (!inInputGroup || isTooltip) && !tag ? (children as VNode<any>).props : {});

    if (!inInputGroup || isTooltip) {
        if (tag)
            return createElement(tag as any, props, children);
        else
            return cloneElement(children as VNode<any>, props);
    }

    // If we're in an InputGrid's InputGroup, then create a 
    // new child that's, CSS-wise, the "true" input.
    // The other one is used for its border styles and relative positioning.
    if (inInputGrid && isInput)
        children = <div {...useMergedProps<HTMLDivElement>()(props as any, { className: "input-group-text" })}>{children}</div>

    return <InputGroupText tag={tag ?? "div" as any} {...useMergedProps<E>()({ className: clsx(isInput && inInputGrid && "faux-input-group-text") }, props)}>{children}</InputGroupText>;
})



