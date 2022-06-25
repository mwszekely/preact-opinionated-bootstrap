import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { EventDetail, useAriaListboxMulti, UseListboxMultiItem, UseListboxMultiParameters } from "preact-aria-widgets";
import { ListboxMultiSelectEvent, UseListboxMultiItemInfo, UseListboxMultiItemParameters } from "preact-aria-widgets/use-listbox-multi";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, OmitStrong, OptionalTagSensitiveProps, useLogRender, usePseudoActive } from "../props";
import { ListItemStatic, ListItemStaticProps, ListStatic, ListStaticProps } from "./list-static";
import { useChildrenTextProps } from "./utility";

interface ListMultiItemInfo<E extends Element> extends UseListboxMultiItemInfo<E> {

}

export type ListMultiItemParameters<E extends Element> = OmitStrong<UseListboxMultiItemParameters<E, ListMultiItemInfo<E>>, "text" | "tag">;

export interface ListMultiProps<E extends HTMLUListElement | HTMLOListElement> extends OptionalTagSensitiveProps<E>, Omit<UseListboxMultiParameters, "onSelect">, ListStaticProps<E> {
    select: "multi";
    children: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
}


export const UseListboxMultiItemContext = createContext<UseListboxMultiItem<HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>>(null!);
export const ListMulti = memo(forwardElementRef(function ListMulti<E extends HTMLUListElement | HTMLOListElement>(props: ListMultiProps<E>, ref?: Ref<E>) {
    useLogRender("ListMulti", `Rendering ListMulti`);
    let { collator, keyNavigation, noTypeahead, noWrap, typeaheadTimeout, tag, select, label, labelPosition, ...domProps } = props;
    //const { useSyncHandler } = useAsyncHandler({ capture: (e: any) => e[EventDetail].selectedIndex as number });
    const { useListboxMultiItem, useListboxMultiLabel, useListboxMultiProps, currentTypeahead, focus, invalidTypeahead, tabbableIndex } = useAriaListboxMulti<E, HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>({ typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });
    const { useListboxMultiLabelProps } = useListboxMultiLabel<any>();

    labelPosition ??= "start";

    let labelProps = typeof label == "string" ? {} : label.props;
    let clonedLabel = labelPosition != "hidden" ? cloneElement(typeof label == "string" ? <label>{label}</label> : label, useListboxMultiLabelProps(labelProps)) : label;
    console.assert(!(labelPosition == "hidden" && typeof label != "string"));


    return (
        <UseListboxMultiItemContext.Provider value={useListboxMultiItem}>
            <ListStatic tag={tag} labelPosition={labelPosition} label={clonedLabel} {...(useMergedProps<E>()({ class: "list-group", ref, "aria-hidden": labelPosition === "hidden" ? label as string : undefined } as any, useListboxMultiProps(domProps) as any) as any)} />

        </UseListboxMultiItemContext.Provider>
    );
}));

export interface ListItemMultiProps extends Omit<ListMultiItemParameters<HTMLLIElement>, "onSelect">, ListItemStaticProps {
    onSelectChange(selected: boolean): void | Promise<void>;
};

export const ListItemMulti = memo(forwardElementRef(function ListItemMulti(p: ListItemMultiProps, ref?: Ref<HTMLLIElement>) {
    const { childrenText, props: { index, selected, disabled, children, onSelectChange: onSelectAsync, ...domProps } } = useChildrenTextProps({ ...p, ref });

    useLogRender("ListMulti", `Rendering ListMultiItem #${index}`);

    const useListItemMulti = useContext(UseListboxMultiItemContext);
    console.assert(!!useListItemMulti, "ListItemMulti is being used outside of a multi-select list. Did you mean to use a different kind of list, or a different kind of list item?");

    const { syncHandler, pending, currentCapture, hasError, resolveCount } = useAsyncHandler(onSelectAsync, { capture: (e: any) => (e as ListboxMultiSelectEvent<HTMLLIElement>)[EventDetail].selected });
    const onSelectSync = (disabled ? null : syncHandler);

    const { tabbable, useListboxMultiItemProps } = useListItemMulti({ index, text: childrenText, tag: "li", selected: currentCapture ?? selected ?? false, onSelect: onSelectSync ?? undefined, disabled });
    return (
        <ProgressCircular childrenPosition="child" mode={pending ? "pending" : hasError ? "failed" : resolveCount ? "succeeded" : null} colorVariant="info">
            <ListItemStatic {...usePseudoActive(useMergedProps<HTMLLIElement>()({ disabled, class: clsx("list-group-item-action", selected && "active", pending && "pending") } as any, useListboxMultiItemProps(domProps)))}>
                {children as VNode}
            </ListItemStatic>
        </ProgressCircular>
    );
}));


