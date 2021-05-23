
import { Fragment, h, Ref, VNode } from "preact";
import { ButtonProps, forwardElementRef, InputCheckbox, InputCheckboxProps } from "preact-async-input";
import { clsx } from "../../bootstrap-classes";
import { buttonButtonProps, ButtonPropsMin, buttonSizeProps, buttonVariantProps } from "../../button/props";
import { ProvideLabel } from "../label";


export interface CheckboxButtonPropsMin {}

export interface CheckboxButtonProps extends CheckboxButtonPropsMin, InputCheckboxProps, Pick<ButtonPropsMin, "variant" | "size"> {
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


