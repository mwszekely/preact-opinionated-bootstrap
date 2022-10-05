import { UtilityClasses } from "../classes";
import clsx from "clsx";
import { ComponentChildren, h, Ref, Fragment, createElement } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef, GlobalAttributes, OptionalTagSensitiveProps, TagSensitiveProps, usePseudoActive } from "../props";



export interface ListStaticProps<E extends Element> extends OptionalTagSensitiveProps<E>, GlobalAttributes<E> {
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
    inline?: boolean;
    flush?: boolean;
    role?: string;
}


export function useListStaticProps<E extends Element>(props: Pick<ListStaticProps<E>, "labelPosition" | "flush" | "inline" | "label">): h.JSX.HTMLAttributes<E> {
    const { label, inline, flush, labelPosition, ...domProps } = props;

    return ({
        class: clsx("list-group", flush && "list-group-flush", inline && UtilityClasses.display.inline),
        "aria-label": labelPosition === "hidden" ? label as string : undefined
    });
}


export function useListItemStaticProps<E extends Element>(props: Pick<ListItemStaticProps, "badge" | "iconStart" | "iconEnd" | "disabled" | "children">): h.JSX.HTMLAttributes<E> {
    const { iconStart, iconEnd, badge, disabled, children, ...domProps } = props;

    return usePseudoActive({
        children:
            (
                <span class={clsx("list-item-text-contents", !!badge && "with-badge", !!iconStart && "with-start", !!(badge || iconEnd) && "with-end")}>
                    {iconStart && <span class="list-item-text-contents-start-icon">{iconStart}</span>}
                    {children}
                    {badge && <span class="list-item-text-contents-badge">{badge}</span>}
                    {iconEnd && <span className="list-item-text-contents-end-icon">{iconEnd}</span>}
                </span>
            ),
        class: clsx("list-group-item list-group-item-multiline", disabled && "disabled text-muted"),
    });
}


export const ListStatic = memo(forwardElementRef(function ListStatic<E extends HTMLUListElement | HTMLOListElement>(props: ListStaticProps<E>, ref?: Ref<E>) {
    const { tag, label, inline, flush, labelPosition, ...domProps } = props;

    let labelVnode = typeof label == "string" ? <label>{label}</label> : label;

    return (
        <>
            {labelPosition === "start" && labelVnode}
            {createElement(tag ?? "ul", useMergedProps<E>(useListStaticProps({ label, flush, labelPosition, inline }), ({ ...domProps, ref })) as any)}
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
    return <li {...useMergedProps(useListItemStaticProps({ badge, children, disabled, iconEnd, iconStart }), domProps)} />
}))
