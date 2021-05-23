
import { h } from "preact";
import { clsx } from "../bootstrap-classes";
import { ButtonSize, ButtonVariant } from "./types";



interface ButtonPressedPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLButtonElement>, "className"> {
    pressed?: boolean;
}

interface ButtonVariantPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLButtonElement>, "className"> {
    variant?: ButtonVariant;
}

interface ButtonSizePropsMin extends Pick<h.JSX.HTMLAttributes<HTMLButtonElement>, "className"> {
    size?: ButtonSize;
}

export interface ButtonPropsMin extends ButtonPressedPropsMin, ButtonVariantPropsMin, ButtonSizePropsMin, Pick<h.JSX.HTMLAttributes<HTMLButtonElement>, "type" | "disabled" | "tabIndex" | "role"> { 
    "aria-disabled"?: "true" | undefined;
}


export function buttonPressedProps<P extends ButtonPressedPropsMin>(originalProps: P) {
    const { pressed, className, ...props } = originalProps;
    return {
        ...props,
        ...(pressed ? { "aria-pressed": "true" } : {}),
        className: clsx(
            pressed && "active",
            className
        )
    };
}

export function buttonVariantProps<P extends ButtonVariantPropsMin>(originalProps: P) {
    const { variant, className, ...props } = originalProps;
    return {
        ...props,
        className: clsx(
            "btn",
            `btn-${variant}`,
            className
        )
    };
}

export function buttonSizeProps<P extends ButtonSizePropsMin>(originalProps: P) {
    const { size, className, ...props } = originalProps;
    return {
        ...props,
        className: clsx(
            size == "lg" && "btn-lg",
            size == "sm" && "btn-sm",
            className
        )
    };
}

function sharedButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    return buttonPressedProps(buttonSizeProps(buttonVariantProps(originalProps)));
}

export function buttonButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    const { type, ...props } = sharedButtonProps(originalProps);

    return {
        type: type ?? "button",
        ...(props)
    }
}


export function anchorButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    const { disabled, tabIndex, role, "aria-disabled": ariaDisabled, ...props } = sharedButtonProps(originalProps);

    return {
        tabIndex: disabled ? -1 : tabIndex,
        role: role ?? "button",

        ...({ "aria-disabled": disabled ? "true" : ariaDisabled }),
        ...(props)
    }
}

