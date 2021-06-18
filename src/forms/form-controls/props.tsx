import clsx from "clsx";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { useMergedProps } from "../../merge-props";
import { AsyncInputErrorToastSentinel } from "../../toast/error";
import { IsInFormCheckbox } from "../checkbox/context";
import { InToggleButton } from "../toggle-button/context";



interface FormControlPropsBase {
    size?: "sm" | "md" | "lg";
    readOnlyVariant?: "plaintext" | "default";
}

export type FormControlProps = FormControlPropsBase & Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "className" | "readOnly">// & SimpleProps<HTMLInputElement>;

export type FloatingLabelContainerProps = Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "className">;

export function useFloatingLabelContainerProps<P extends FloatingLabelContainerProps>({ className, ...props }: P) {
    return useMergedProps({
        className: clsx("form-floating"),
        style: undefined
    }, props);
}

export function useFormControlProps<P extends FormControlProps>(p: P) {
    const { readOnly, readOnlyVariant, size, ...props } = p;
    return useMergedProps({
        readOnly,
        childrenPre: <AsyncInputErrorToastSentinel />,
        className: clsx("form-control", size && `form-control-${size}`, readOnlyVariant === "plaintext" && readOnly && "form-control-plaintext")
    }, props);
}

export function useFormRangeProps<P extends FormControlProps>(p: P) {
    const { readOnlyVariant, size, ...props } = p;
    return useMergedProps({
        className: clsx("form-range")
    }, props)
}

