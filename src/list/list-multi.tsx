import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaListboxMulti } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets";
import { UseListboxMultiItem, UseListboxMultiParameters } from "preact-aria-widgets";
import { UseListboxMultiItemInfo, UseListboxMultiItemParameters } from "preact-aria-widgets/use-listbox-multi";
import { useAsyncHandler, useMergedProps, useMutationObserver, useRefElement, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useContext, useLayoutEffect, useRef } from "preact/hooks";
import { GlobalAttributes, useLogRender, usePseudoActive, forwardElementRef, OmitStrong } from "../props";

interface ListMultiItemInfo<E extends Element> extends UseListboxMultiItemInfo<E> {

}

export type ListMultiItemParameters<E extends Element> = OmitStrong<UseListboxMultiItemParameters<E, ListMultiItemInfo<E>>, "text" | "tag">;

interface ListMultiProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseListboxMultiParameters, "onSelect">, GlobalAttributes<E> {
    select: "multi";
    tag: "ul" | "ol";
    children: ComponentChildren;
}


export const UseListboxMultiItemContext = createContext<UseListboxMultiItem<HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>>(null!);
export function ListMulti<E extends HTMLUListElement | HTMLOListElement>(props: ListMultiProps<E>, ref: Ref<E>) {
    useLogRender("ListMulti", `Rendering ListMulti`);
    const { collator, keyNavigation, noTypeahead, noWrap, typeaheadTimeout, tag, select, ...domProps } = props;
    const { getSyncHandler } = useAsyncHandler<E>()({ capture: (e: any) => e[EventDetail].selectedIndex as number });
    const { useListboxMultiItem, useListboxMultiLabel, useListboxMultiProps, currentTypeahead, focus, invalidTypeahead, tabbableIndex } = useAriaListboxMulti<E, HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>({ typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });

    return <UseListboxMultiItemContext.Provider value={useListboxMultiItem}>{h(tag, useMergedProps<E>()({ class: "list-group", ref } as any, useListboxMultiProps(domProps) as any) as any)}</UseListboxMultiItemContext.Provider>;
}

type ListItemMultiProps = ListMultiItemParameters<HTMLLIElement> & GlobalAttributes<HTMLLIElement>;

export const ListItemMulti = memo(forwardElementRef(function ListItemMulti(props: ListItemMultiProps, ref: Ref<HTMLLIElement>) {
    useLogRender("ListMulti", `Rendering ListMultiItem #${props.index}`);

    const useListItemMulti = useContext(UseListboxMultiItemContext);
    const { index, selected, onSelect, ...domProps } = { ...props, ref };

    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, getElement } = useRefElement<HTMLLIElement>({ onElementChange: useCallback((element: Node | null) => setText(((element as HTMLElement)?.innerText ?? "").trim()),[]) });
    useMutationObserver(getElement, { subtree: true, onCharacterData: (info) => setText((getElement()?.innerText ?? "").trim()) });

    const { tabbable, useListboxMultiItemProps } = useListItemMulti({ index, text, tag: "li", selected, onSelect });
    return <li {...usePseudoActive(useMergedProps<HTMLLIElement>()({ class: clsx("list-group-item", "list-group-item-action", selected && "active") } as any, useListboxMultiItemProps(useRefElementProps(domProps))))} />
}))
