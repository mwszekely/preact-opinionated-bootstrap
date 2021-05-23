
import { Fragment, h, Ref, VNode } from "preact";
import { forwardElementRef, InputRadio, InputCheckbox, InputCheckboxProps, InputRadioGroupProps, InputRadioProps } from "preact-async-input";
import { clsx } from "../../bootstrap-classes";
import { ButtonPropsMin, buttonSizeProps, buttonVariantProps } from "../../button/props";
import { ProvideLabel } from "../label";
import { RadioGroup } from "../radio/component";


export interface CheckboxButtonPropsMin {}
export interface RadioButtonPropsMin {}
export interface RadioButtonGroupPropsMin {}

export interface CheckboxButtonProps extends CheckboxButtonPropsMin, InputCheckboxProps, Pick<ButtonPropsMin, "variant" | "size"> {
    children: VNode<any>;
}

export interface RadioButtonGroupProps extends RadioButtonGroupPropsMin, InputRadioGroupProps {
    children: VNode<any>;
}

export interface RadioButtonProps extends RadioButtonPropsMin, InputRadioProps, Pick<ButtonPropsMin, "variant" | "size"> {
    children: VNode<any>;
}

export const CheckboxButton = forwardElementRef(function CheckboxButton(p: CheckboxButtonProps, r: Ref<HTMLInputElement>) {
    const { className, children, checked, onInput, ref, ...props } = buttonVariantProps(buttonSizeProps({...p, ref: r}));

    return (
        <ProvideLabel position="after" label={children} className={clsx(className, "btn-check")} >
            <InputCheckbox {...props} checked={checked} onInput={onInput} ref={ref}  />
        </ProvideLabel>
    )
});

export function RadioButtonGroup(p: RadioButtonGroupProps) {
    return (
        <RadioGroup {...p} />
    )
}

export const RadioButton = forwardElementRef(function RadioButton(p: RadioButtonProps, r: Ref<HTMLInputElement>) {
    const { className, children, ref, ...props } = buttonVariantProps(buttonSizeProps({...p, ref: r}));

    return (
        <ProvideLabel position="after" label={children} className={clsx(className, "btn-check")} >
            <InputRadio {...props} ref={ref}  />
        </ProvideLabel>
    )
});


