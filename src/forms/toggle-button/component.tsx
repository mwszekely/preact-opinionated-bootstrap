
import { ComponentChildren, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputCheckbox, InputCheckboxProps, InputRadio, InputRadioGroupProps, InputRadioProps } from "preact-async-input";
import { clsx } from "../../bootstrap-classes";
import { ButtonPropsMin, buttonSizeProps, buttonVariantProps } from "../../button/props";
import { ButtonColor } from "../../button/types";
import { ProvideLabel } from "../label";
import { RadioGroup } from "../radio/component";
import { InToggleButton } from "./context";
import { useRadioSelectedValue } from "preact-async-input"

export interface CheckboxButtonPropsMin { }
export interface RadioButtonPropsMin { }
export interface RadioButtonGroupPropsMin { }

export interface CheckboxButtonProps extends CheckboxButtonPropsMin, InputCheckboxProps, Pick<ButtonPropsMin, "size"> {
    children: ComponentChildren;
    variant?: ButtonColor;
}

export interface RadioButtonGroupProps extends RadioButtonGroupPropsMin, InputRadioGroupProps {
    children: ComponentChildren;
}

export interface RadioButtonProps extends RadioButtonPropsMin, InputRadioProps, Pick<ButtonPropsMin, "size"> {
    children: ComponentChildren;
    variant?: ButtonColor;
}

export const CheckboxButton = forwardElementRef(function CheckboxButton(p: CheckboxButtonProps, r: Ref<HTMLInputElement>) {
    let { className, children, variant, checked, id, onInput, ref, ...props } = { ...p, ref: r };

    variant = (checked ? variant : `outline-${variant}`) as ButtonColor;

    const labelProps = buttonVariantProps(buttonSizeProps({ htmlFor: id, position: "after", label: children, variant, className: undefined } as const));

    return (
        <InToggleButton.Provider value={true}>
            <ProvideLabel {...labelProps} >
                <InputCheckbox {...props} id={id} checked={checked} onInput={onInput} className={clsx(className, "btn-check visually-hidden-focusable")} ref={ref} />
            </ProvideLabel>
        </InToggleButton.Provider >
    )
});

export function RadioButtonGroup(p: RadioButtonGroupProps) {
    return (
        <InToggleButton.Provider value={true}>
            <RadioGroup {...p} />
        </InToggleButton.Provider >
    )
}

export const RadioButton = forwardElementRef(function RadioButton(p: RadioButtonProps, r: Ref<HTMLInputElement>) {
    let { className, children, variant, value, id, ref, ...props } = { ...p, ref: r };
    const selectedValue = useRadioSelectedValue();

    variant = (value == selectedValue ? variant : `outline-${variant}`) as ButtonColor;

    const labelProps = buttonVariantProps(buttonSizeProps({ htmlFor: id, position: "after", label: children, variant, className: undefined } as const));

    return (
        <InToggleButton.Provider value={true}>
            <ProvideLabel {...labelProps} >
                <InputRadio {...props} value={value} id={id} ref={ref} className={clsx(className, "btn-check visually-hidden-focusable")} />
            </ProvideLabel>
        </InToggleButton.Provider>
    )
});


