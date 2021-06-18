import clsx from "clsx";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { useMergedProps } from "../../merge-props";
import { IsInFormCheckbox } from "../checkbox/context";
import { InToggleButton } from "../toggle-button/context";


export type FormLabelProps = Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "className">;

export function useFormLabelProps<P extends FormLabelProps>({ className, ...props }: P) {
    const isCheckboxLabel = useContext(IsInFormCheckbox);
    const isInToggleButton = useContext(InToggleButton);
    return useMergedProps({
        className: clsx(isInToggleButton? "" : isCheckboxLabel? "form-check-label" : "form-label"),
        style: undefined
    }, props)
}