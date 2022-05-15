import clsx from "clsx";
import { cloneElement, ComponentType, createElement, Fragment, h, Ref, VNode } from "preact";
import { CheckboxChangeEvent, EventDetail, useAriaCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, GlobalAttributes, OmitStrong } from "../props";
import { Tooltip } from "../tooltip";
import { CheckboxLike } from "./checkbox-like";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";

export interface CheckboxProps extends Omit<GlobalAttributes<HTMLDivElement>, "ref"> {
    //ref?: Ref<HTMLInputElement>;
    checked: boolean | "mixed";
    disabled?: boolean;
    onCheck?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    labelPosition?: "start" | "end" | "hidden" | "tooltip";
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
export const Checkbox = memo(forwardElementRef(function Checkbox({ checked, disabled, onCheck: onCheckedAsync, labelPosition, children: label, tabIndex, ...props }: CheckboxProps, ref: Ref<HTMLInputElement>) {

    if (true) {

        const inInputGroup = useContext(InInputGroupContext);

        type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };

        const { useSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler()({ capture });
        disabled ||= pending;
        const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);


        const onChecked = useSyncHandler(onCheckedAsync) as unknown as I;
        const { useCheckboxInputElement, useCheckboxLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({ checked: pending ? currentCapture! : ((checked as string) === "indeterminate" ? "mixed" : checked), disabled: disabled ?? false, onInput: onChecked, labelPosition: "separate" });

        const { useCheckboxInputElementProps } = useCheckboxInputElement({ tag: "input" });
        const { useCheckboxLabelElementProps } = useCheckboxLabelElement({ tag: "label" });
        //const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });

        return (<CheckboxLike
            type="check"
            disabled={disabled}
            asyncState={asyncState}
            currentHandlerType={currentType}
            labelPosition={labelPosition}
            inputProps={useCheckboxInputElementProps({ ref: ref as any, className: clsx(pending && "pending", inInputGroup && "mt-0"), tabIndex: tabIndex ?? 0 })}
            labelProps={useCheckboxLabelElementProps({ class: clsx(pending && "pending") })}
            wrapperProps={useMergedProps<HTMLDivElement>()({}, props)}
            label={label}
        />);
    }
    else {


        labelPosition ??= "end";

        type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };

        const { useSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture, currentType } = useAsyncHandler()({ capture });
        disabled ||= pending;

        const onChecked = useSyncHandler(onCheckedAsync) as unknown as I;
        const { useCheckboxInputElement, useCheckboxLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement | HTMLDivElement>({ checked: pending ? currentCapture! : ((checked as string) === "indeterminate" ? "mixed" : checked), disabled: disabled ?? false, onInput: onChecked, labelPosition: "separate" });

        const { useCheckboxInputElementProps } = useCheckboxInputElement({ tag: "input" });
        const { useCheckboxLabelElementProps } = useCheckboxLabelElement({ tag: "label" });
        const { useCheckboxLabelElementProps: useWrapperLabelProps } = useCheckboxLabelElement({ tag: "div" });

        const inInputGroup = useContext(InInputGroupContext);

        let stringLabel = `${label}`;
        if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        }

        const asyncState = (hasError ? "failed" : pending ? "pending" : settleCount ? "succeeded" : null);

        const propsForInput = useMergedProps<HTMLInputElement>()(props, useCheckboxInputElementProps({ ref, type: "checkbox", className: clsx("form-check-input", pending && "pending", disabled && "disabled", inInputGroup && "mt-0"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined }));
        let inputElement =
            <OptionallyInputGroup isInput isTooltip={false} tag={inInputGroup ? "div" : null} {...useWrapperLabelProps({ disabled, tabIndex: -1 })}>
                <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentType === "async" ? asyncState : null} colorVariant="info">
                    <input {...propsForInput} />
                </ProgressCircular>
            </OptionallyInputGroup>

        const p2 = { ...useCheckboxLabelElementProps({ className: clsx(pending && "pending", disabled && "disabled", "form-check-label"), "aria-hidden": "true" }) };
        const labelElement = label != null ? <OptionallyInputGroup isTooltip={labelPosition == "tooltip"} isInput={false} tag="label" {...p2}>{label}</OptionallyInputGroup> : null;

        if (labelPosition == "tooltip")
            inputElement = <Tooltip tooltip={labelElement} >{inputElement}</Tooltip>;

        const inputWithLabel = (
            <>
                {labelPosition == "start" && labelElement}
                {inputElement}
                {labelPosition == "end" && labelElement}
            </>
        );

        return (!inInputGroup) ? <div {...useMergedProps<HTMLDivElement>()({}, { class: "form-check" })}>{inputWithLabel}</div> : inputWithLabel;
    }
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



