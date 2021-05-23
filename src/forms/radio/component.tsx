
import { ComponentChildren, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputRadio, InputRadioProps, InputRadioGroup, InputRadioGroupProps } from "preact-async-input";
import { useContext } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { IsInInputGroupContext } from "../../input-group/component";
import { SimpleProps } from "../../props-shared";
import { Label, ProvideLabel } from "../label";

export interface RadioGroupPropsMin { }

export interface RadioGroupProps extends RadioPropsMin, InputRadioGroupProps {

}

export function RadioGroup(props: RadioGroupProps) {
    return (<InputRadioGroup {...props} />)
}

export interface RadioPropsMin { }

export interface RadioProps extends RadioPropsMin, InputRadioProps {
    inline?: boolean;
    label?: ComponentChildren;
}

export const Radio = forwardElementRef(function Radio(p: RadioProps, r: Ref<HTMLInputElement>) {
    const { className, label, disabled, childrenPost, value, inline, ref, ...props } = { ...p, ref: r };

    const isInInputGroup = useContext(IsInInputGroupContext);

    const c = <InputRadio {...props} className={clsx("form-check-input")} value={value} ref={ref} />
    return (
        <div className={clsx(isInInputGroup ? "input-group-text" : ["form-check", inline && "form-check-inline"], className)}>
            {label == null ? c :
                <ProvideLabel label={label} position="after">
                    {c}
                </ProvideLabel>
            }
        </div>
    )
});


