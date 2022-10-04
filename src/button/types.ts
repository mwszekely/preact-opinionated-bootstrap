import { UseButtonParameters } from "preact-aria-widgets";
import { GlobalAttributes } from "../props";

export type ButtonColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "subtle" | "contrast" | "link";

export type ButtonFillVariant = "fill" | "outline";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonDropdownVariant =  "separate" | "combined"
export type ButtonDropdownDirection = "block-end" | "block-start" | "inline-start" | "inline-end" | null;

export interface ButtonPropsBase<E extends Element> extends Omit<UseButtonParameters<E>["button"], "pressed" | "tagButton" | "onPress">, GlobalAttributes<E> {
    colorVariant?: ButtonColorVariant;
    fillVariant?: ButtonFillVariant;
    size?: ButtonSize;
}
