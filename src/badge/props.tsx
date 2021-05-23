import { clsx } from "../bootstrap-classes";


export type BadgeColorProps = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"

export interface BadgePropsMin {
    colorVariant?: BadgeColorProps;
    rounded?: boolean;
    className?: string;
}

export function badgeProps<P extends BadgePropsMin>(p: P) {
    const { className, colorVariant, rounded, ...props } = p;
    return {
        ...props,
        className: clsx("badge", rounded && "rounded-pill", colorVariant && `bg-${colorVariant}`, className)
    };
}
