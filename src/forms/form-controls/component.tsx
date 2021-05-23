import { Ref, ComponentChildren, FunctionComponent, h, VNode } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { SimplePropsWithExtras } from "../../props-shared";
import { FloatingLabelContainerProps, FormControlProps, FormLabelProps, useFloatingLabelContainerProps, useFormControlProps, useFormRangeProps, useFormLabelProps } from "./props";

import { Input as InputB, InputNumber as InputNumberB, InputDate as InputDateB, InputColor as InputColorB, InputMonth as InputMonthB, InputEmail as InputEmailB, InputRadio as InputRadioB, InputCheckbox as InputCheckboxB, InputRange as InputRangeB, InputTime as InputTimeB, SelectSingle as SelectSingleB, SelectMulti as SelectMultiB, InputRadioGroup as InputRadioGroupB, InputDateTime as InputDateTimeB, OptionSingle as OptionSingleB, OptionMulti as OptionMultiB, TextArea as TextAreaB, forwardElementRef, ProvideId, useProvidedId } from "preact-async-input";
import type { InputNumberProps as InputNumberPropsB, InputDateProps as InputDatePropsB, InputColorProps as InputColorPropsB, SelectMultiProps as SelectMultiPropsB, SelectSingleProps as SelectSinglePropsB, InputProps as InputPropsB, TextAreaProps as TextAreaPropsB, InputTimeProps as InputTimePropsB, InputEmailProps as InputEmailPropsB, InputMonthProps as InputMonthPropsB, InputRadioProps as InputRadioPropsB, InputRangeProps as InputRangePropsB, OptionMultiProps as OptionMultiPropsB, OptionSingleProps as OptionSinglePropsB, InputCheckboxProps as InputCheckboxPropsB, InputDateTimeProps as InputDateTimePropsB, InputRadioGroupProps as InputRadioGroupsPropsB } from "preact-async-input";

import { Temporal } from "proposal-temporal";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";
import clsx from "clsx";
import { InputGroupText, IsInInputGroupContext } from "../../input-group/component";
import { ProvideLabel } from "../label";



export interface InputTextProps extends Omit<FormControlProps & InputPropsB<string>, "convert" | "checked" | "size"> {
    type: "color" | "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week";
    value: string;
}

interface InputProps extends Omit<FormControlProps & InputPropsB<string>, "size"> { }
interface InputNumberProps extends Omit<FormControlProps & InputNumberPropsB, "size"> { }
interface InputColorProps extends Omit<FormControlProps & InputColorPropsB, "size"> { }
interface InputDateProps extends Omit<FormControlProps & InputDatePropsB, "size"> { }
interface InputDateTimeProps extends Omit<FormControlProps & InputDateTimePropsB, "size"> { }
interface InputRangeProps extends Omit<FormControlProps & InputRangePropsB, "size"> { label?: ComponentChildren }
interface InputRadioGroupProps extends Omit<FormControlProps & InputRadioGroupsPropsB, "size"> { }
interface InputRadioProps extends Omit<FormControlProps & InputRadioPropsB, "size"> { }
interface InputCheckboxProps extends Omit<FormControlProps & InputCheckboxPropsB, "size"> { }
interface InputMonthProps extends Omit<FormControlProps & InputMonthPropsB, "size"> { }

interface SelectSingleProps extends FormControlProps, Omit<SelectSinglePropsB, "size" | "height"> { size?: "sm" | "md" | "lg", height?: "dropdown" | number; }
interface OptionSingleProps extends FormControlProps, Omit<OptionSinglePropsB, "size"> { }
interface SelectMultiProps extends FormControlProps, Omit<SelectMultiPropsB, "size" | "height"> { size?: "sm" | "md" | "lg", height: number; }
interface OptionMultiProps extends FormControlProps, Omit<OptionMultiPropsB, "size"> { }


export const Input = forwardElementRef(function Input(p: InputProps, ref: Ref<HTMLInputElement>) { return <InputB<string>  {...useFormControlProps(p)} ref={ref} /> })
export const InputNumber = forwardElementRef(function InputNumber(p: InputNumberProps, ref: Ref<HTMLInputElement>) { return <InputNumberB {...useFormControlProps(p)} ref={ref} /> })
export const InputDate = forwardElementRef(function InputDate(p: InputDateProps, ref: Ref<HTMLInputElement>) { return <InputDateB {...useFormControlProps(p)} ref={ref} /> })
export const InputText = forwardElementRef(function InputText(p: InputTextProps, ref: Ref<HTMLInputElement>) { return <InputB {...useFormControlProps(p)} type="text" ref={ref} /> })
export const InputColor = forwardElementRef(function InputColor(p: InputColorProps, ref: Ref<HTMLInputElement>) { return <InputColorB {...useFormControlProps(p)} ref={ref} /> });
export const InputMonth = forwardElementRef(function InputMonth(p: InputMonthProps, ref: Ref<HTMLInputElement>) { return <InputMonthB {...useFormControlProps(p)} ref={ref} /> });
export const InputCheckbox = forwardElementRef(function InputCheckbox(p: InputCheckboxProps, ref: Ref<HTMLInputElement>) { return <InputCheckboxB {...useFormControlProps(p)} ref={ref} /> });
export const InputRadioGroup = forwardElementRef(function InputRadioGroup(p: InputRadioGroupProps, ref: Ref<HTMLInputElement>) { return <InputRadioGroupB {...useFormControlProps(p)} ref={ref} /> });
export const InputRadio = forwardElementRef(function InputRadio(p: InputRadioProps, ref: Ref<HTMLInputElement>) { return <InputRadioB {...useFormControlProps(p)} ref={ref} /> });
export const InputDateTime = forwardElementRef(function InputDateTime(p: InputDateTimeProps, ref: Ref<HTMLInputElement>) { return <InputDateTimeB {...useFormControlProps(p)} ref={ref} /> });

export const InputRange = forwardElementRef(function InputRange({ label, ...props }: InputRangeProps, ref: Ref<HTMLInputElement>) {
    const ret = <InputRangeB {...useFormRangeProps(props)} ref={ref} />
    if (label != null)
        return <ProvideLabel label={label} position="before">{ret}</ProvideLabel>;
    else
        return ret;
}
);

export const SelectSingle = forwardElementRef(function SelectSingle(p: SelectSingleProps, ref: Ref<HTMLSelectElement>) {
    const { size, height, ...props } = p;
    return <SelectSingleB size={height == "dropdown" ? undefined : height} {...useFormControlProps(props)} ref={ref} />;
});
export const OptionSingle = forwardElementRef(function OptionSingle(p: OptionSingleProps, ref: Ref<HTMLOptionElement>) { return <OptionSingleB {...useFormControlProps(p)} ref={ref} /> });
export const SelectMulti = forwardElementRef(function SelectMulti(p: SelectMultiProps, ref: Ref<HTMLSelectElement>) {
    const { size, height, ...props } = p;
    return <SelectMultiB size={height} {...useFormControlProps(props)} ref={ref} />;
});
export const OptionMulti = forwardElementRef(function OptionMulti(p: OptionMultiProps, ref: Ref<HTMLOptionElement>) { return <OptionMultiB {...useFormControlProps(p)} ref={ref} /> });
