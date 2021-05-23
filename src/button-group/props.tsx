import { h } from "preact";
import { clsx } from "../bootstrap-classes";
import { ButtonComponentProps } from "../button/component";


export interface ButtonGroupPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className" | "role">, Pick<ButtonComponentProps, "size"> {
    "aria-label"?: string;
    orientation?: "vertical" | "horizontal";
}

export function buttonGroupProps<P extends ButtonGroupPropsMin>({ className, role, size, orientation, ...props }: P) {
    return {
        ...props,
        role: role ?? "group",
        className: clsx(
            orientation == "vertical" ? "btn-group-vertical" : "btn-group",
            size == "lg" && "btn-group-lg",
            size == "sm" && "btn-group-sm",
            className
        )
    };
}

