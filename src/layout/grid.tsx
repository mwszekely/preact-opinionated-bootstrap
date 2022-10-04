import { cloneElement, h, Ref, VNode } from "preact";
import { TagSensitiveProps } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes } from "../props";

/**
 * Very simple, easy responsive grid that guarantees each column is the minimum size.
 * 
 * Use leftover to control what happens when there's more space than minimally required.
 * * "fill" to have each element expand equally to fill the remaining space
 * * "shrink" to keep as many elements on one line as possible
 * 
 * Easy one-liners all around here!
 */
export const GridResponsive = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ tag, minWidth, leftover, children, ...props }: { leftover?: "fill" | "shrink", minWidth: `${string}em`, tag?: "passthrough" } & Partial<TagSensitiveProps<E>> & GlobalAttributes<E>, ref: Ref<E>) {
    const mergedProps = useMergedProps<E>({ className: "responsive-grid", style: minWidth ? { "--grid-min-width": `${minWidth}`, "--grid-auto-behavior": leftover ? `auto-${leftover == "shrink" ? "fit" : leftover}` : "" } : {}, ref }, props);
    const passthroughProps = useMergedProps<E>(mergedProps, (children as VNode<any>)?.props?.children ?? {});

    if (tag === "passthrough")
        return cloneElement(children as VNode<any>, passthroughProps);
    else
        return h(tag ?? "div" as any, mergedProps, children);
}));

/**
 * Very simple, easy static grid that guarantees the number of columns is displayed,
 * no matter how janky it looks.
 */
export const GridStatic = memo(forwardElementRef(function ResponsiveGrid<E extends Element>({ tag, columns, children, ...props }: { columns: number | string, tag?: "passthrough" } & Partial<TagSensitiveProps<E>> & GlobalAttributes<E>, ref: Ref<E>) {

    const mergedProps = useMergedProps<E>({ className: "static-grid", style: typeof columns === "string" ? { "--static-grid-columns": columns } : { "--grid-column-count": columns }, ref }, props);
    const passthroughProps = useMergedProps<E>(mergedProps, (children as VNode<any>)?.props?.children ?? {});

    if (tag === "passthrough")
        return cloneElement(children as VNode<any>, passthroughProps);
    else
        return h(tag ?? "div" as any, mergedProps, children);
}));
