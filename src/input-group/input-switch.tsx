import { ComponentChild, ComponentChildren, Fragment, h, Ref, RenderableProps } from "preact";
import { useAriaCheckbox } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { CheckboxChangeEvent } from "preact-aria-widgets/use-checkbox";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { InInputGroupContext } from "./props";

// TODO: SO MUCH of all of this is shared with checkbox,
// but subtly different DOM and CSS are needed, so
// proceed with caution when refactoring.

export interface SwitchProps {
    checked: boolean;
    disabled?: boolean;
    onInput?(checked: boolean): void | Promise<void>;
    label?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
}

/**
 * @see Checkbox
 * @param ref 
 * @returns 
 */
export function Switch({ checked, disabled, onInput: onInputAsync, label, labelPosition, ...rest }: SwitchProps, ref: Ref<HTMLDivElement>) {
    labelPosition ??= "end";

    const { getSyncHandler, pending } = useAsyncHandler()({ capture: (e: Event) => (e as CheckboxChangeEvent<any>)[EventDetail].checked });
    const onInput = getSyncHandler(onInputAsync);
    const { useCheckboxInputElement: useSwitchInputElement, useCheckboxLabelElement: useSwitchLabelElement } = useAriaCheckbox<HTMLInputElement, HTMLLabelElement>({ checked, disabled: disabled ?? false, onInput, labelPosition: "separate" });

    const { useCheckboxInputElementProps: useSwitchInputElementProps } = useSwitchInputElement({ tag: "input" });
    const { useCheckboxLabelElementProps: useSwitchLabelElementProps } = useSwitchLabelElement({ tag: "label" });

    const inInputGroup = useContext(InInputGroupContext);

    let stringLabel = `${label}`;
    if (label != null && labelPosition === "hidden" && !["string", "number", "boolean"].includes(typeof label)) {
        console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
    }

    const inputElement = <OptionallyInputGroup><input {...useSwitchInputElementProps({ type: "checkbox", className: "form-check-input", "aria-label": labelPosition === "hidden" ? stringLabel : undefined })} /></OptionallyInputGroup>;
    const labelElement = <>{label != null && <OptionallyInputGroup><label {...useSwitchLabelElementProps({ className: "form-check-label", "aria-hidden": "true" })}>{label}</label></OptionallyInputGroup>}</>;

    const ret = (
        <>
            {labelPosition == "start" && labelElement}
            {inputElement}
            {labelPosition == "end" && labelElement}
        </>
    );

    if (!inInputGroup)
        return <div {...useMergedProps<HTMLDivElement>()(rest, { ref, class: "form-check form-switch" })}>{ret}</div>

    return ret

}

// Note: Slightly different from the others
function OptionallyInputGroup({ children }: { children: ComponentChild; }) {
    const inInputGroup = useContext(InInputGroupContext);

    if (!inInputGroup)
        return <>{children}</>;
    return <div class="input-group-text form-switch">{children}</div>;
}



