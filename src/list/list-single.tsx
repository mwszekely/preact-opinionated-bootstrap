import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaListboxSingle } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { UseListboxSingleItem, UseListboxSingleItemInfo, UseListboxSingleParameters } from "preact-aria-widgets/use-listbox-single";
import { useAsyncHandler, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { UseLinearNavigationChildInfo, UseLinearNavigationParameters } from "preact-prop-helpers/use-keyboard-navigation";
import { useContext, useLayoutEffect } from "preact/hooks";
import { GlobalAttributes, usePseudoActive } from "../props";


interface ListSingleProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseListboxSingleParameters, "onSelect">, GlobalAttributes<E> {
    select: "single";
    tag: "ul" | "ol";
    children: ComponentChildren;
    onSelect(index: number): void | Promise<void>;
}

interface ListNoneProps<E extends HTMLUListElement | HTMLOListElement> extends UseLinearNavigationParameters, GlobalAttributes<E> {
    select: "none";
    tag: "ul" | "ol";
    children: ComponentChildren;
}


export const UseListboxSingleItemContext = createContext<UseListboxSingleItem<HTMLLIElement, UseListboxSingleItemInfo<HTMLLIElement>>>(null!);
export function ListSingle<E extends HTMLUListElement | HTMLOListElement>(props: ListSingleProps<E>, ref: Ref<E>) {
    const { onSelect: onSelectAsync, selectedIndex, selectionMode, collator, keyNavigation, noTypeahead, noWrap, typeaheadTimeout, tag, select, ...domProps } = props;
    const { getSyncHandler } = useAsyncHandler<E>()({ capture: (e: any) => e[EventDetail].selectedIndex as number });
    const onSelect = getSyncHandler(onSelectAsync);
    const { useListboxSingleItem, useListboxSingleLabel, useListboxSingleProps } = useAriaListboxSingle<E, HTMLLIElement, UseListboxSingleItemInfo<HTMLLIElement>>({ onSelect, selectedIndex, selectionMode, typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });

    return <UseListboxSingleItemContext.Provider value={useListboxSingleItem}>{h(tag, useMergedProps<E>()({ class: "list-group", ref } as any, useListboxSingleProps(domProps) as any) as any)}</UseListboxSingleItemContext.Provider>;
}

interface ListItemSingleNoneProps extends Omit<UseLinearNavigationChildInfo, "setSelected" | "setTabbable" | "text">, GlobalAttributes<HTMLLIElement> { children: ComponentChildren; }

type ListItemProps = (ListItemSingleNoneProps);

export function ListItemSingle(props: ListItemProps, ref: Ref<HTMLLIElement>) {
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
