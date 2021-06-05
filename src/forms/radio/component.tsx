
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputRadio, InputRadioProps, InputRadioGroup, InputRadioGroupProps } from "preact-async-input";
import { useContext } from "preact/hooks";
import { clsx } from "../../bootstrap-classes";
import { IsInInputGroupContext } from "../../input-group/component";
import { SimpleProps } from "../../props-shared";
import { Label, ProvideLabel } from "../label";

export interface RadioGroupPropsMin { }

export interface RadioGroupProps extends RadioPropsMin, InputRadioGroupProps {
    inline?: boolean;
}

const InlineContext = createContext(false);

export function RadioGroup(props: RadioGroupProps) {
    return (<InlineContext.Provider value={props.inline ?? false}><InputRadioGroup {...props} /></InlineContext.Provider>)
}

export interface RadioPropsMin { }

export interface RadioProps extends RadioPropsMin, InputRadioProps {
    inline?: boolean;
    children?: ComponentChildren;
}

export const Radio = forwardElementRef(function Radio(p: RadioProps, r: Ref<HTMLInputElement>) {
    const { className, children, disabled, childrenPost, value, inline, ref, ...props } = { ...p, ref: r };

    const c = <InputRadio {...props} className={clsx("form-check-input")} value={value} ref={ref} />;

    if (children == null) {
        return <RadioOuter {...p}>{c}</RadioOuter>
    }
    else {
        return <ProvideLabel label={children} position="after"><RadioOuter {...p}>{c}</RadioOuter></ProvideLabel>
    }
});

const RadioOuter = ({ inline, className, children }: RadioProps) => {
    const isInInputGroup = useContext(IsInInputGroupContext);
    const defaultInline = useContext(InlineContext);
    return (
        <div className={clsx(isInInputGroup ? "input-group-text" : ["form-check", (inline ?? defaultInline) && "form-check-inline"], className)}>
            {children}
        </div>);
}


