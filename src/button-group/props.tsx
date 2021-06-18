import { h } from "preact";
import { clsx } from "../bootstrap-classes";
import { ButtonProps } from "../button/component";
import { useMergedProps } from "../merge-props";


export interface ButtonGroupPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "role" | "style">, Pick<ButtonProps, "size"> {
    "aria-label"?: string;
    orientation?: "vertical" | "horizontal";
}

function buttonGroupProps({ role, size, orientation }: ButtonGroupPropsMin) {
    return {
        role: role ?? "group",
        className: clsx(
            orientation == "vertical" ? "btn-group-vertical" : "btn-group",
            size == "lg" && "btn-group-lg",
            size == "sm" && "btn-group-sm"
        )
    };
}


export function useButtonGroupProps<P extends ButtonGroupPropsMin>({ role, size, orientation, ...props }: P) {
    return useMergedProps(buttonGroupProps({ role, size, orientation }), props);
}

