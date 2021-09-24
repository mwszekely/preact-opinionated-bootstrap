import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaListboxSingle } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { UseListboxSingleItem, UseListboxSingleItemInfo, UseListboxSingleItemParameters, UseListboxSingleParameters } from "preact-aria-widgets/use-listbox-single";
import { useAsyncHandler, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { UseLinearNavigationChildInfo, UseLinearNavigationParameters } from "preact-prop-helpers/use-keyboard-navigation";
import { useContext, useLayoutEffect } from "preact/hooks";
import { GlobalAttributes, useLogRender, usePseudoActive } from "../props";

interface ListSingleItemInfo<E extends Element> extends UseListboxSingleItemInfo<E> {

}

export type ListSingleItemParameters<E extends Element> = Omit<UseListboxSingleItemParameters<E, ListSingleItemInfo<E>>, "text" | "tag">;

interface ListSingleProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseListboxSingleParameters, "onSelect">, GlobalAttributes<E> {
    select: "single";
    tag: "ul" | "ol";
    children: ComponentChildren;
    onSelect(index: number): void | Promise<void>;
}


export const UseListboxSingleItemContext = createContext<UseListboxSingleItem<HTMLLIElement, UseListboxSingleItemInfo<HTMLLIElement>>>(null!);
export function ListSingle<E extends HTMLUListElement | HTMLOListElement>(props: ListSingleProps<E>, ref: Ref<E>) {
    useLogRender("ListSingle", `Rendering ListSingle`);
    const { onSelect: onSelectAsync, selectedIndex, selectionMode, collator, keyNavigation, noTypeahead, noWrap, typeaheadTimeout, tag, select, ...domProps } = props;
    const { getSyncHandler } = useAsyncHandler<E>()({ capture: (e: any) => e[EventDetail].selectedIndex as number });
    const onSelect = getSyncHandler(onSelectAsync);
    const { useListboxSingleItem, useListboxSingleLabel, useListboxSingleProps } = useAriaListboxSingle<E, HTMLLIElement, UseListboxSingleItemInfo<HTMLLIElement>>({ onSelect, selectedIndex, selectionMode, typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });

    return <UseListboxSingleItemContext.Provider value={useListboxSingleItem}>{h(tag, useMergedProps<E>()({ class: "list-group", ref } as any, useListboxSingleProps(domProps) as any) as any)}</UseListboxSingleItemContext.Provider>;
}

type ListItemSingleProps = ListSingleItemParameters<HTMLLIElement> & GlobalAttributes<HTMLLIElement>;

export function ListItemSingle(props: ListItemSingleProps, ref: Ref<HTMLLIElement>) {
    useLogRender("ListSingle", `Rendering ListSingleItem #${props.index}`);

    const useListItemSingle = useContext(UseListboxSingleItemContext);
    const { index, ...domProps } = { ...props, ref };

    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, element } = useRefElement<HTMLLIElement>();
    useLayoutEffect(() => {
        if (element)
            setText(element.innerText);
    }, [element]);

    const { getSelected, tabbable, selected, useListboxSingleItemProps } = useListItemSingle({ index, text, tag: "li" });
    return <li {...usePseudoActive(useMergedProps<HTMLLIElement>()({ class: clsx("list-group-item", "list-group-item-action", selected && "active") } as any, useListboxSingleItemProps(useRefElementProps(domProps))))} />
}
