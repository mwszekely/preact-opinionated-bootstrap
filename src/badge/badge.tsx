import { h, Ref } from "preact";
import { forwardElementRef, GlobalAttributes } from "../props";
import clsx from "clsx";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";

export type BadgeColorVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export interface BadgeProps extends GlobalAttributes<HTMLSpanElement> {
    colorVariant?: BadgeColorVariant;
    roundedPill?: boolean;
    className?: string;
}

export const Badge = forwardElementRef(function Badge({ colorVariant, roundedPill, ...props }: BadgeProps, ref: Ref<HTMLSpanElement>) {
    return <span {...useMergedProps<HTMLSpanElement>()({ ref, className: clsx("badge", roundedPill && "rounded-pill", `bg-${colorVariant ?? "secondary"}`) }, props)} />
});
