import clsx from "clsx";
import { h } from "preact";
import { useContext } from "preact/hooks";
import { SimpleProps } from "../../props-shared";
import { IsInFormCheckbox } from "../checkbox/context";



interface FormControlPropsBase {
    size?: "sm" | "md" | "lg";
    readOnlyVariant?: "plaintext" | "default";
}

export type FormControlProps = FormControlPropsBase & Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "className">// & SimpleProps<HTMLInputElement>;

export type FormLabelProps = Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "className">;
export type FloatingLabelContainerProps = Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "className">;

export function useFormLabelProps<P extends FormLabelProps>({ className, ...props }: P) {
    const isCheckboxLabel = useContext(IsInFormCheckbox);
    return {
        ...props,
        className: clsx(isCheckboxLabel? "form-check-label" : "form-label", className)
    }
}

export function useFloatingLabelContainerProps<P extends FloatingLabelContainerProps>({ className, ...props }: P) {
    return {
        ...props,
        className: clsx("form-floating", className)
    }
}

export function useFormControlProps<P extends FormControlProps>(p: P) {
    const { className, readOnlyVariant, size, ...rest } = (p);
    return {
        ...rest,
        className: clsx("form-control", size && `form-control-${size}`, readOnlyVariant === "plaintext" && "form-control-plaintext", className)
    }
}

export function useFormRangeProps<P extends FormControlProps>(p: P) {
    const { className, readOnlyVariant, size, ...rest } = (p);
    return {
        ...rest,
        className: clsx("form-range", className)
    }
}

