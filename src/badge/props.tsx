import { clsx } from "../bootstrap-classes";
import { useMergedProps } from "../merge-props";


export type BadgeColorProps = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"

export interface BadgePropsMin {
    colorVariant?: BadgeColorProps;
    roundedPill?: boolean;
    className?: string;
}

export function useBadgeProps<P extends BadgePropsMin>(p: P) {
    const { colorVariant, roundedPill, ...props } = p;
    return useMergedProps({ className: clsx("badge", roundedPill && "rounded-pill", `bg-${colorVariant ?? "secondary"}`) }, props);
}
