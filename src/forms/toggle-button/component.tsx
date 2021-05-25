
import { ComponentChildren, Fragment, h, Ref, VNode } from "preact";
import { forwardElementRef, InputRadio, InputCheckbox, InputCheckboxProps, InputRadioGroupProps, InputRadioProps } from "preact-async-input";
import { clsx } from "../../bootstrap-classes";
import { ButtonPropsMin, buttonSizeProps, buttonVariantProps } from "../../button/props";
import { ProvideLabel } from "../label";
import { RadioGroup } from "../radio/component";


export interface CheckboxButtonPropsMin {}
export interface RadioButtonPropsMin {}
export interface RadioButtonGroupPropsMin {}

export interface CheckboxButtonProps extends CheckboxButtonPropsMin, InputCheckboxProps, Pick<ButtonPropsMin, "variant" | "size"> {
    children: ComponentChildren;
}

export interface RadioButtonGroupProps extends RadioButtonGroupPropsMin, InputRadioGroupProps {
    children: ComponentChildren;
}

export interface RadioButtonProps extends RadioButtonPropsMin, InputRadioProps, Pick<ButtonPropsMin, "variant" | "size"> {
    children: ComponentChildren;
}

export const CheckboxButton = forwardElementRef(function CheckboxButton(p: CheckboxButtonProps, r: Ref<HTMLInputElement>) {
    const { className, children, checked, id, onInput, ref, ...props } = {...p, ref: r};

    const labelProps = buttonVariantProps(buttonSizeProps({ htmlFor: id, position: "after", label: children, className: undefined } as const));

    return (
        <ProvideLabel {...labelProps} >
            <InputCheckbox {...props} id={id} checked={checked} onInput={onInput} className={clsx(className, "btn-check")} ref={ref}  />
        </ProvideLabel>
    )
});

export function RadioButtonGroup(p: RadioButtonGroupProps) {
    return (
        <RadioGroup {...p} />
    )
}

export const RadioButton = forwardElementRef(function RadioButton(p: RadioButtonProps, r: Ref<HTMLInputElement>) {
    const { className, children, id, ref, ...props } = {...p, ref: r};

    const labelProps = buttonVariantProps(buttonSizeProps({ htmlFor: id, position: "after", label: children, className: undefined } as const));

    return (
        <ProvideLabel {...labelProps} >
            <InputRadio {...props} id={id} ref={ref} className={clsx(className, "btn-check")} />
        </ProvideLabel>
    )
});


