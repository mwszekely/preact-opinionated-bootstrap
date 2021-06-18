
import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { forwardElementRef, InputCheckbox, InputCheckboxProps, InputRadio, InputRadioGroupProps, InputRadioProps, useRefElement } from "preact-async-input";
import { clsx } from "../../bootstrap-classes";
import { ButtonPropsMin, useButtonSizeProps, useButtonVariantProps } from "../../button/props";
import { ButtonColor } from "../../button/types";
import { ProvideLabel } from "../label";
import { RadioGroup } from "../radio/component";
import { DefaultRadioButtonVariant, InToggleButton } from "./context";
import { useRadioSelectedValue } from "preact-async-input"
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { DefaultColorStyleContext, useNormalizedVariant } from "../../button/defaults";
import { AsyncInputErrorToastSentinel } from "../../toast/error";

export interface CheckboxButtonPropsMin { }
export interface RadioButtonPropsMin { }
export interface RadioButtonGroupPropsMin { }

export interface CheckboxButtonProps extends CheckboxButtonPropsMin, InputCheckboxProps, Pick<ButtonPropsMin, "size"> {
    children: ComponentChildren;
    variant?: ButtonColor;
}

export interface RadioButtonGroupProps extends RadioButtonGroupPropsMin, Omit<InputRadioGroupProps, "name"> {
    children: ComponentChildren;
    variant?: ButtonColor;
    name?: string;
}

export interface RadioButtonProps extends RadioButtonPropsMin, InputRadioProps, Pick<ButtonPropsMin, "size"> {
    children: ComponentChildren;
    variant?: ButtonColor;
}


/**
 * A checkbox that is styled as a button.
 * This is different from a regular button that is "pressed".
 * 
 * * Allows async input
 * * Input errors are reported as a toast
 * * Button content provided via children
 * * Works inside or outside an InputGroup, as is Bootstrap default
 */
export const CheckboxButton = forwardElementRef(function CheckboxButton(p: CheckboxButtonProps, r: Ref<HTMLInputElement>) {
    let { className, children, variant, size, checked, id, onInput, ref, ...props } = { ...p, ref: r };

    let defaultColor = useContext(DefaultColorStyleContext);
    if (variant == undefined) {
        variant = defaultColor;
    }
    variant = (checked ? variant : `outline-${variant}`) as ButtonColor;
    useNormalizedVariant(variant);

    const labelProps = useButtonVariantProps(useButtonSizeProps({ htmlFor: id, position: "after", label: children, variant, size, style: undefined } as const));

    return (
        <InToggleButton.Provider value={true}>
            <ProvideLabel {...labelProps} >
                <InputCheckbox tabIndex={0} childrenPre={<AsyncInputErrorToastSentinel />}  {...props} id={id} checked={checked} onInput={onInput} className={clsx(className, "btn-check visually-hidden-focusable")} ref={ref} />
            </ProvideLabel>
        </InToggleButton.Provider>
    )
});


/**
 * A set of radios that are styled as buttons.
 * This is different from a regular button that is "pressed".
 * 
 * * Allows async input
 * * Input errors are reported as a toast
 * * Button content provided via children
 * * Works inside or outside an InputGroup, as is Bootstrap default
 */
export function RadioButtonGroup({ name, variant, children, ...props }: RadioButtonGroupProps) {

    const randomNameRef = useRef(`radio-button-group-${Math.floor(Math.random() * 2 ** 32).toString(16).toUpperCase()}`)

    return (
        <InToggleButton.Provider value={true}>
            <DefaultRadioButtonVariant.Provider value={variant ?? "primary"}>
                <RadioGroup name={name ?? randomNameRef.current} {...props}>{children}<AsyncInputErrorToastSentinel /></RadioGroup>
            </DefaultRadioButtonVariant.Provider>
        </InToggleButton.Provider >
    )
}


/**
 * @see RadioButtonGroup
 */
export const RadioButton = forwardElementRef(function RadioButton(p: RadioButtonProps, r: Ref<HTMLInputElement>) {
    const { element, useRefElementProps } = useRefElement<HTMLInputElement>();
    let { className, children, variant, size, value, id, ref, ...props } = useRefElementProps({ ...p, ref: r });
    const selectedValue = useRadioSelectedValue();

    // Improve compatibility with tabbable in case there are multiple radio groups with the same "name" in the HTML (fairly likely).
    const isChecked = (useRadioSelectedValue() == value);

    const defaultVariant = useContext(DefaultRadioButtonVariant);
    variant ??= defaultVariant;
    variant = (value == selectedValue ? variant : `outline-${variant}`) as ButtonColor;

    const labelProps = useButtonVariantProps(useButtonSizeProps({ htmlFor: id, position: "after", label: children, variant, size, style: undefined } as const));

    return (
        <InToggleButton.Provider value={true}>
            <ProvideLabel {...labelProps} >
                <InputRadio tabIndex={0} {...props} value={value} id={id} ref={ref} className={clsx(className, "btn-check visually-hidden-focusable")} />
            </ProvideLabel>
        </InToggleButton.Provider>
    )
});


/*export function useFocusAfterDisabled(element: EventTarget | null, disabled: boolean) {

    const [lastValidElement, setLastValidElement] = useState<EventTarget | null>(null);

    useEffect(() => {
        const focusInHandler = (e: FocusEvent) => {
            //if (e.target != document.body) {
            //    setLastValidElement(e.target);
            //}
        }
        const focusOutHandler = (e: FocusEvent) => {
            debugger;
            if (e.target != document.body) {
                if (e.target != element) {
                    setLastValidElement(null);
                }
                else {
                    setLastValidElement(e.target);
                    console.log(`Lost focus, but the non-document element was saved`, e.target);
                }
            }
        }
        document.addEventListener("focusout", focusOutHandler, { passive: true });
        document.addEventListener("focusin", focusInHandler, { passive: true });
        return () => { document.removeEventListener("focusin", focusInHandler); document.removeEventListener("focusout", focusOutHandler); }
    }, [element])

    useEffect(() => {
        if (!disabled && lastValidElement) {
            (lastValidElement as HTMLElement).focus();
            setLastValidElement(null);
            console.log(`Restored focus to `, lastValidElement);
        }
    }, [lastValidElement, disabled])
}*/

