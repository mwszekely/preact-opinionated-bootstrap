import type { ButtonColorVariant } from "../button";
import clsx from "clsx";
import { h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes } from "../props";

export type BadgeColorVariant = Omit<ButtonColorVariant, "link">;

export interface BadgeProps extends GlobalAttributes<HTMLSpanElement> {
    colorVariant?: BadgeColorVariant;
    roundedPill?: boolean;
    className?: string;
    label: string;
}

export const Badge = memo(forwardElementRef(function Badge({ colorVariant, roundedPill, label, ...props }: BadgeProps, ref: Ref<HTMLSpanElement>) {
    return <span {...useMergedProps<HTMLSpanElement>()({ ref, "aria-label": label, className: clsx("badge", roundedPill && "rounded-pill", `bg-${colorVariant ?? "secondary"}`) }, props)} />
}));
