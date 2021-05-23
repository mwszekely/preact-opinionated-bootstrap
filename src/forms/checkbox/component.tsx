
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputCheckbox, InputCheckboxProps } from "preact-async-input";
import { useContext } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { IsInInputGroupContext } from "../../input-group/component";
import { SimpleProps } from "../../props-shared";
import { Label, ProvideLabel } from "../label";
import { IsInFormCheckbox } from "./context";


export interface CheckboxPropsMin {

}

export interface CheckboxProps extends CheckboxPropsMin, InputCheckboxProps {
    inline?: boolean;
    label?: ComponentChildren;
}


export const Checkbox = forwardElementRef(function Checkbox(p: CheckboxProps, r: Ref<HTMLInputElement>) {
    const { className, disabled, label, inline, ...props } = { ...p, ref: r };

    const isInInputGroup = useContext(IsInInputGroupContext);

    const c = <InputCheckbox {...props} className={clsx("form-check-input")} />;

    return (
        <IsInFormCheckbox.Provider value={true}>
            <div className={clsx(isInInputGroup ? "input-group-text" : ["form-check", inline && "form-check-inline"], className)}>
                {label == null ? c :
                    <ProvideLabel label={label} position="after">
                        {c}
                    </ProvideLabel>
                }
            </div>
        </IsInFormCheckbox.Provider>
    )
});


