import { UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { GlobalAttributes } from "../props";

export type ButtonColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";

export type ButtonFillVariant = "fill" | "outline";
export type ButtonSize = "lg" | "md" | "sm";


export interface ButtonPropsBase<E extends Element> extends Omit<UseAriaButtonParameters<E>, "pressed" | "tag" | "onClick">, GlobalAttributes<E> {
    colorVariant?: ButtonColorVariant;
    fillVariant?: ButtonFillVariant;
    size?: ButtonSize;
    disabled?: boolean;
}
