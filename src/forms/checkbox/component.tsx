
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputCheckbox, InputCheckboxProps } from "preact-async-input";
import { useCallback, useContext, useEffect, useRef } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { InputGroupText, IsInInputGroupContext } from "../../input-group/component";
import { useMergedProps } from "../../merge-props";
import { SimpleProps } from "../../props-shared";
import { AsyncInputErrorToastSentinel } from "../../toast/error";
import { Label, ProvideLabel } from "../label";
import { IsInFormCheckbox } from "./context";


export interface CheckboxPropsMin {

}

export interface CheckboxProps extends CheckboxPropsMin, InputCheckboxProps {
    inline?: boolean;
    children?: ComponentChildren;
}

/**
 * A checkbox with the following features:
 * 
 * * Allows async input
 * * Input errors are reported as a toast
 * * Provide a label via children
 * * Works inside or outside an InputGroup
 */
export const Checkbox = forwardElementRef(function Checkbox(p: CheckboxProps, r: Ref<HTMLInputElement>) {
    const isInInputGroup = useContext(IsInInputGroupContext);
    const { className, onInput, checked, disabled, children: label, inline, ...props } = { ...p, ref: r };

    let c = <InputCheckbox {...useMergedProps({ onInput, className: "form-check-input" }, props)} {...props} childrenPre={<AsyncInputErrorToastSentinel />} checked={checked} onInput={onInput} className={clsx("form-check-input")} />;
    if (isInInputGroup)
        c = <InputGroupText>{c}</InputGroupText>

    if (label == null)
        return (<CheckboxOuter inline={inline}>{c}</CheckboxOuter>)
    else
        return (<CheckboxOuter inline={inline}><ProvideLabel label={label} position={isInInputGroup ? "before" : "after"}>{c}</ProvideLabel></CheckboxOuter>)
});

function CheckboxOuter({ inline, className, children: c }: { children: ComponentChildren } & Pick<CheckboxProps, "className" | "inline">) {
    const isInInputGroup = useContext(IsInInputGroupContext);

    if (isInInputGroup) {
        return (<IsInFormCheckbox.Provider value={true}>
            {c}
        </IsInFormCheckbox.Provider>)
    }
    else {
        return (<IsInFormCheckbox.Provider value={true}>
            <div className={clsx(["form-check", inline && "form-check-inline"], className)}>
                {c}
            </div>
        </IsInFormCheckbox.Provider>)
    }
}


