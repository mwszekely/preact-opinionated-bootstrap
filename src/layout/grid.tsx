import { h, Ref } from "preact";
import { TagSensitiveProps } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes } from "../props";

/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 * 
 * Easy one-liners all around here!
 */
export const GridResponsive = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ tag, minWidth, children, ...props }: { minWidth: `${string}em` } & Partial<TagSensitiveProps<E>> & GlobalAttributes<E>, ref: Ref<E>) {
    return (
        h(tag ?? "div" as any, useMergedProps<E>()({ className: "responsive-grid", style: minWidth ? { "--grid-min-width": `${minWidth}` } : {}, ref }, props), children)
    )
}));

/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 */
export const GridStatic = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ tag, columns, children, ...props }: { columns: number | string } & Partial<TagSensitiveProps<E>> & GlobalAttributes<E>, ref: Ref<E>) {
    return (
        h(tag ?? "div" as any, useMergedProps<E>()({ className: "static-grid", style: typeof columns === "string" ? { "--static-grid-columns": columns } : { "--grid-column-count": columns }, ref }, props), children)
    )
}));
