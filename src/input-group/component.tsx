import clsx from "clsx";
import { Ref, h, createContext } from "preact";
import { forwardElementRef } from "preact-async-input";
import { InputGroupProps, InputGroupTextProps, useInputGroupProps, useInputGroupTextProps } from "./props";

export interface InputGroupComponentProps extends InputGroupProps {
    wrap?: boolean;
}


export interface InputGroupTextComponentProps extends InputGroupTextProps {
}

export const IsInInputGroupContext = createContext(false);

/**
 * A container for a set of inputs/labels.
 * Supports:
 * * Checkbox
 * * RadioGroup & Radio
 * * All text-based Input components and ProvideLabel
 * * CheckboxButton
 * * RadioButtonGroup & RadioButton
 */
export const InputGroup = forwardElementRef(function InputGroup(p: InputGroupComponentProps, ref: Ref<HTMLDivElement>) {

    const { children, className, wrap, ...props } = useInputGroupProps(p);

    return (
        <div {...props} ref={ref} className={clsx(wrap != true && "flex-nowrap", className)}>
            <IsInInputGroupContext.Provider value={true}>
                {children}
            </IsInInputGroupContext.Provider>
        </div>
    )
});

export const InputGroupText = forwardElementRef(function InputGroup(p: InputGroupTextComponentProps, ref: Ref<HTMLSpanElement>) {

    const { children, ...props } = useInputGroupTextProps(p);

    return (
        <span {...props} ref={ref}>
            {children}
        </span>
    )
});
