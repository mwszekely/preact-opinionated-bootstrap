
import { h } from "preact";
import { clsx } from "../bootstrap-classes";
import { useMergedProps } from "../merge-props";
import { ButtonSize, ButtonVariant } from "./types";



interface ButtonPressedPropsMin {
    pressed?: boolean;
}

interface ButtonVariantPropsMin {
    variant?: ButtonVariant;
}

interface ButtonSizePropsMin {
    size?: ButtonSize;
}

export interface ButtonPropsMin extends ButtonPressedPropsMin, ButtonVariantPropsMin, ButtonSizePropsMin, Pick<h.JSX.HTMLAttributes<HTMLButtonElement>, "type" | "disabled" | "tabIndex" | "role" | "style"> {
    "aria-disabled"?: "true" | undefined;
}


function buttonPressedProps({ pressed }: ButtonPressedPropsMin) {
    return {
        ...(pressed ? { "aria-pressed": "true" } : {}),
        className: clsx(pressed && "active")
    };
}

function buttonVariantProps({ variant }: ButtonVariantPropsMin) {
    return { className: clsx("btn raised", `btn-${variant}`) };
}

function buttonSizeProps({ size }: ButtonSizePropsMin) {
    return { className: clsx(size == "lg" && "btn-lg", size == "sm" && "btn-sm") };
}

export function useButtonPressedProps<P extends ButtonPressedPropsMin>({ pressed, ...props }: P) {
    return useMergedProps(buttonPressedProps({ pressed }), props);
}

export function useButtonVariantProps<P extends ButtonVariantPropsMin>({ variant, ...props }: P) {
    return useMergedProps(buttonVariantProps({ variant }), props);
}

export function useButtonSizeProps<P extends ButtonSizePropsMin>({ size, ...props }: P) {
    return useMergedProps(buttonSizeProps({ size }), props);
}

function useSharedButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    return useButtonPressedProps(useButtonSizeProps(useButtonVariantProps(originalProps)));
}

export function useButtonButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    const { type, ...props } = useSharedButtonProps(originalProps);

    return {
        type: type ?? "button",
        ...(props)
    }
}


export function useAnchorButtonProps<P extends ButtonPropsMin>(originalProps: P) {
    const props = useSharedButtonProps(originalProps);

    return useMergedProps(props, {
        tabIndex: props.disabled ? -1 : props.tabIndex,
        role: props.role ?? "button",

        ...({ "aria-disabled": props.disabled ? "true" : props["aria-disabled"] }),
        ...(props)
    })
}

