import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref } from "preact";
import { CheckboxChangeEvent, EventDetail, useAriaCheckbox } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { Tooltip } from "../tooltip";
import { ProgressCircular } from "../progress/linear";
import { forwardElementRef, GlobalAttributes } from "../props";
import { InputGroupText, InputGroupTextProps } from "./grouping";
import { InInputGridContext, InInputGroupContext } from "./props";
import { CheckboxLike } from "./checkbox-like";


export interface SwitchProps extends Omit<GlobalAttributes<HTMLDivElement>, "ref"> {
    //ref?: Ref<HTMLInputElement>;
    checked: boolean;
    disabled?: boolean;
    onCheck?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden" | "tooltip";
}

function capture(e: h.JSX.TargetedEvent<HTMLInputElement>): boolean {
    return (e as CheckboxChangeEvent<any>)[EventDetail].checked;
}

/**
 * @see Checkbox
 * @param ref 
 * @returns 
 */
export const Switch = memo(forwardElementRef(function Switch({ checked, disabled, onCheck: onInputAsync, children: label, labelPosition, tabIndex, ...rest }: SwitchProps, ref: Ref<HTMLInputElement>) {

    if (true) {

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
            label={label}
        />);

    }
    else {
        /*labelPosition ??= "end";

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

        let inputElement = <OptionallyInputGroup tag={inInputGroup ? "div" : null} isTooltip={false} isInput={true} {...useWrapperLabelProps({ disabled, tabIndex: -1 })}>
            <ProgressCircular childrenPosition="after" colorFill="foreground-only" mode={currentType === "async" ? asyncState : null} colorVariant="info">
                <input {...useSwitchInputElementProps({ ref, type: "checkbox", className: clsx(pending && "pending", "form-check-input", disabled && "disabled"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} />
            </ProgressCircular>
        </OptionallyInputGroup>;

        const p2 = { ...useSwitchLabelElementProps({ className: clsx(pending && "pending", "form-check-label", disabled && "disabled"), "aria-hidden": "true" }) };
        const labelElement = label != null ? <OptionallyInputGroup tag="label" isTooltip={labelPosition == "tooltip"} isInput={false} {...p2}>{label}</OptionallyInputGroup> : null;

        if (labelPosition == "tooltip")
            inputElement = <Tooltip tooltip={labelElement}>{inputElement}</Tooltip>


        const inputWithLabel = (
            <>
                {labelPosition == "start" && labelElement}
                {inputElement}
                {labelPosition == "end" && labelElement}
            </>
        );

        return (!inInputGroup) ? <div {...useMergedProps<HTMLDivElement>()(rest, { class: "form-check form-switch" })}>{inputWithLabel}</div> : inputWithLabel;
        */
    }
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



