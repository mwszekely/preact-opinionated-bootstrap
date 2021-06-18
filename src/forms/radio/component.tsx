
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputRadio, InputRadioProps, InputRadioGroup, InputRadioGroupProps, useRadioSelectedValue,  } from "preact-async-input";
import { useContext } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { IsInInputGroupContext } from "../../input-group/component";
import { SimpleProps } from "../../props-shared";
import { AsyncInputErrorToastSentinel } from "../../toast/error";
import { Label, ProvideLabel } from "../label";

export interface RadioGroupPropsMin { }

export interface RadioGroupProps extends RadioPropsMin, InputRadioGroupProps {
    inline?: boolean;
}

const InlineContext = createContext(false);



/**
 * A group of radios with additional features and styling.
 * (Note: different from radio buttons, which are specifically buttons that act like radios)
 * 
 * * Allows async input
 * * Input errors are reported as a toast
 * * Provide a label via children
 * * Works inside or outside an InputGroup
 */
export function RadioGroup({ children, inline, ...props }: RadioGroupProps) {
    return (<InlineContext.Provider value={inline ?? false}><InputRadioGroup {...props}>{children}<AsyncInputErrorToastSentinel /></InputRadioGroup></InlineContext.Provider>)
}

export interface RadioPropsMin { }

export interface RadioProps extends RadioPropsMin, InputRadioProps {
    inline?: boolean;
    children?: ComponentChildren;
}



/**
 * @see RadioGroup
 */
export const Radio = forwardElementRef(function Radio(p: RadioProps, r: Ref<HTMLInputElement>) {
    const { className, children, disabled, childrenPost, value, inline, ref, ...props } = { ...p, ref: r };

    // Improve compatibility with tabbable in case there are multiple radio groups with the same "name" in the HTML (fairly likely).
    const isChecked = (useRadioSelectedValue() == value);
    const c = <InputRadio tabIndex={isChecked ? 0 : undefined} {...props} className={clsx("form-check-input")} value={value} ref={ref} />;

    if (children == null) {
        return <RadioOuter inline={inline} className={className}>{c}</RadioOuter>
    }
    else {
        return <RadioOuter {...p}><ProvideLabel label={children} position="after">{c}</ProvideLabel></RadioOuter>
    }
});

const RadioOuter = ({ inline, className, children }: Pick<RadioProps, "inline" | "className" | "children">) => {
    const isInInputGroup = useContext(IsInInputGroupContext);
    const defaultInline = useContext(InlineContext);

    if (isInInputGroup) {
        return <>{children}</>;
    }
    return (
        <div className={clsx(["form-check", (inline ?? defaultInline) && "form-check-inline"], className)}>
            {children}
        </div>);
}


