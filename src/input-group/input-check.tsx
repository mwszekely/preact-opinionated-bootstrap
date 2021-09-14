import clsx from "clsx";
import { ComponentChild, ComponentChildren, createContext, Fragment, h, Ref, RenderableProps } from "preact";
import { useAriaCheckbox, useCheckboxGroup } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { CheckboxChangeEvent } from "preact-aria-widgets/use-checkbox";
import { UseCheckboxGroupChild, UseCheckboxGroupParameters } from "preact-aria-widgets/use-checkbox-group";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { MergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback, useContext } from "preact/hooks";
import { GlobalAttributes } from "props";
import { InInputGroupContext } from "./props";

export interface CheckboxProps extends GlobalAttributes<HTMLDivElement> {
    checked: boolean | "mixed";
    disabled?: boolean;
    onInput?(checked: boolean, event: h.JSX.TargetedEvent<HTMLInputElement>): void | Promise<void>;
    label?: ComponentChildren;
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
export function Checkbox({ checked, disabled, onInput: onInputAsync, label, labelPosition, ...rest }: CheckboxProps, ref: Ref<HTMLDivElement>) {
    labelPosition ??= "end";

    type I = { (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLInputElement, Event>>): void; (event: CheckboxChangeEvent<h.JSX.TargetedEvent<HTMLLabelElement, Event>>): void; };


    const { getSyncHandler, pending } = useAsyncHandler()({ capture });
    const onInput = getSyncHandler(onInputAsync) as unknown as I;
    const { useCheckboxInputElement, useCheckboxLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement>({ checked: (checked as string) === "indeterminate" ? "mixed" : checked, disabled: disabled ?? false, onInput, labelPosition: "separate" });

    const { useCheckboxInputElementProps } = useCheckboxInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps } = useCheckboxLabelElement({ tag: "label" });

    const inInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = <OptionallyInputGroup><input {...useCheckboxInputElementProps({ type: "checkbox", className: clsx("form-check-input", inInputGroup && "mt-0"), "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} /></OptionallyInputGroup>;
    const labelElement = <>{label != null && <OptionallyInputGroup><label {...useCheckboxLabelElementProps({ className: "form-check-label", "aria-hidden": "true" })}>{label}</label></OptionallyInputGroup>}</>;

    const ret = (
        <>
            {labelPosition == "start" && labelElement}
            {inputElement}
            {labelPosition == "end" && labelElement}
        </>
    );

    if (!inInputGroup)
        return <div {...useMergedProps<HTMLDivElement>()(rest, { ref, class: "form-check" })}>{ret}</div>
    return ret;

}

type UseCheckboxGroupCheckboxProps = <P extends h.JSX.HTMLAttributes<HTMLInputElement>>(props: P) => MergedProps<HTMLInputElement, { "aria-controls": string; }, P>;
const CheckboxGroupParentCheckboxPropsContext = createContext<any>(null!);
const CheckboxGroupChildContext = createContext<UseCheckboxGroupChild<HTMLInputElement>>(null!);
export function CheckboxGroup({ children }: { children: ComponentChildren }) {
    const { percentChecked, selfIsChecked, onCheckboxGroupInput, useCheckboxGroupCheckboxProps, useCheckboxGroupChild } = useCheckboxGroup<HTMLInputElement, HTMLDivElement>({});

    return (
        <>
            <CheckboxGroupParentCheckboxPropsContext.Provider value={useCheckboxGroupCheckboxProps}>
                <Checkbox className="checkbox-group-parent" checked={selfIsChecked} onInput={useCallback((checked: any, e: h.JSX.TargetedEvent<HTMLInputElement>) => { onCheckboxGroupInput(e) }, [onCheckboxGroupInput])} />
            </CheckboxGroupParentCheckboxPropsContext.Provider>

            <CheckboxGroupChildContext.Provider value={useCheckboxGroupChild}>{children}</CheckboxGroupChildContext.Provider>

        </>
    )
}

function OptionallyInputGroup({ children }: { children: ComponentChild; }) {
    const inInputGroup = useContext(InInputGroupContext);

    if (!inInputGroup)
        return <>{children}</>;
    return <div class="input-group-text">{children}</div>;
}



