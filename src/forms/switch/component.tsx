
import { ComponentChildren, Fragment, h, Ref, VNode } from "preact";
import { forwardElementRef, InputCheckbox, InputCheckboxProps } from "preact-async-input";
import { useContext } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { IsInInputGroupContext } from "../../input-group/component";
import { SimpleProps } from "../../props-shared";
import { Label, ProvideLabel } from "../label";


export interface SwitchPropsMin {

}

export interface SwitchProps extends SwitchPropsMin, InputCheckboxProps {
    inline?: boolean;
    label: ComponentChildren;
}

export const Switch = forwardElementRef(function Switch(p: SwitchProps, r: Ref<HTMLInputElement>) {
    const { className, label, disabled, checked, inline, onInput, ref, ...props } = { ...p, ref: r };

    const isInInputGroup = useContext(IsInInputGroupContext);

    const c = <InputCheckbox {...props} className={clsx("form-check-input")} checked={checked} onInput={onInput} ref={ref} />
    return (
        <div className={clsx(isInInputGroup ? "input-group-text" : ["form-check", "form-switch", inline && "form-check-inline"], className)}>
            {label == null ? c :
                <ProvideLabel label={label} position="after">
                    {c}
                </ProvideLabel>
            }
        </div>
    )
});


