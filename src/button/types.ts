import { UseAriaButtonParameters } from "preact-aria-widgets";
import { GlobalAttributes } from "../props";

export type ButtonColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "subtle" | "contrast" | "link";

export type ButtonFillVariant = "fill" | "outline";
export type ButtonSize = "lg" | "md" | "sm";


export interface ButtonPropsBase<E extends Element> extends Omit<UseAriaButtonParameters<E>, "pressed" | "tag" | "onPress">, GlobalAttributes<E> {
    colorVariant?: ButtonColorVariant;
    fillVariant?: ButtonFillVariant;
    size?: ButtonSize;
    disabled?: boolean;
}
