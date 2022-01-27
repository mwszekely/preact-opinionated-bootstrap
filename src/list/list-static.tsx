import { UtilityClasses } from "../classes";
import clsx from "clsx";
import { ComponentChildren, h, Ref, Fragment, createElement } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes, OptionalTagSensitiveProps, TagSensitiveProps, usePseudoActive } from "../props";



export interface ListStaticProps<E extends HTMLUListElement | HTMLOListElement> extends OptionalTagSensitiveProps<E>, GlobalAttributes<E> {
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
    inline?: boolean;
    flush?: boolean;
    role?: string;
}


export const ListStatic = memo(forwardElementRef(function ListStatic<E extends HTMLUListElement | HTMLOListElement>(props: ListStaticProps<E>, ref?: Ref<E>) {
    const { tag, label, inline, flush, labelPosition, ...domProps } = props;

    let labelVnode = typeof label == "string" ? <label>{label}</label> : label;

    return (
        <>
            {labelPosition === "start" && labelVnode}
            {createElement(tag ?? "ul", useMergedProps<E>()({ class: clsx("list-group", flush && "list-group-flush", inline && UtilityClasses.display.inline), ref, "aria-hidden": labelPosition === "hidden" ? label as string : undefined } as any, (domProps) as any) as any)}
            {labelPosition === "end" && labelVnode}
        </>
    );
}));

export interface ListItemStaticProps extends GlobalAttributes<HTMLLIElement> {
    badge?: ComponentChildren;
    disabled?: boolean;
    iconStart?: ComponentChildren;
    iconEnd?: ComponentChildren;
}

export const ListItemStatic = memo(forwardElementRef(function ListItemStatic(props: ListItemStaticProps, ref: Ref<HTMLLIElement>) {
    const { children, badge, iconStart, iconEnd, disabled, ...domProps } = { ...props, ref };
    return <li {...usePseudoActive(useMergedProps<HTMLLIElement>()({
        children: <>
            {iconStart && <span class="list-group-item-start-icon">{iconStart}</span>}
            {children}
            {badge && <span class="list-group-item-badge">{badge}</span>}{iconEnd && <span className="list-group-item-end-icon">{iconEnd}</span>}
        </>,
        class: clsx("list-group-item list-group-item-multiline", disabled && "disabled text-muted", !!badge && "with-badge", !!iconStart && "with-start", !!(badge || iconEnd) && "with-end"),
    } as any, domProps))} />
}))
