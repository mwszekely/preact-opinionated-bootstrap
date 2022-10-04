import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { useAriaListboxSingle } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets";
import { UseListboxSingleItem, UseListboxSingleItemInfo, UseListboxSingleItemParameters, UseListboxSingleParameters } from "preact-aria-widgets";
import { useAsyncHandler, useChildFlag, useMergedProps, useRefElement, useStableGetter, useState } from "preact-prop-helpers";
import { Children, memo } from "preact/compat";
import { useCallback, useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { GlobalAttributes, useLogRender, usePseudoActive, forwardElementRef, OmitStrong, OptionalTagSensitiveProps } from "../props";
import { ListItemStatic, ListItemStaticProps, ListStatic } from "./list-static";
import { ProgressCircular } from "../progress";
import { useChildrenTextProps } from "./utility";

interface ListSingleItemInfo<E extends Element> extends UseListboxSingleItemInfo<E> {
    setPending(pending: boolean): void;
    getPending(): boolean;
}

export type ListSingleItemParameters<E extends Element> = OmitStrong<UseListboxSingleItemParameters<E, ListSingleItemInfo<E>>, "text" | "tag" | "setPending" | "getPending">;

export interface ListSingleProps<E extends HTMLUListElement | HTMLOListElement> extends OptionalTagSensitiveProps<E>, Omit<UseListboxSingleParameters, "onSelect" | "selectionMode">, GlobalAttributes<E> {
    select?: "single";
    selectionMode?: UseListboxSingleParameters["selectionMode"];
    children: ComponentChildren;
    onSelectChange(index: number): void | Promise<void>;
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
}

export const UseListboxSingleItemContext = createContext<UseListboxSingleItem<HTMLLIElement, ListSingleItemInfo<HTMLLIElement>>>(null!);
export const ListSingle = memo(forwardElementRef(function ListSingle<E extends HTMLUListElement | HTMLOListElement>(props: ListSingleProps<E>, ref: Ref<E>) {
    useLogRender("ListSingle", `Rendering ListSingle`);
    let { onSelectChange: onSelectAsync, selectedIndex, selectionMode, collator, keyNavigation, noTypeahead, noWrap, typeaheadTimeout, tag, select, labelPosition, label, ...domProps } = props;
    const { syncHandler, pending, currentCapture } = useAsyncHandler(onSelectAsync, { capture: (e: any) => e[EventDetail].selectedIndex as number });
    const onSelect = syncHandler;
    const { useListboxSingleItem, useListboxSingleLabel, useListboxSingleProps, managedChildren } = useAriaListboxSingle<E, HTMLLIElement, ListSingleItemInfo<HTMLLIElement>>({ onSelect, selectedIndex: selectedIndex, selectionMode: selectionMode ?? "activate", typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });
    const { useListboxSingleLabelProps } = useListboxSingleLabel<any>()

    useChildFlag({
        activatedIndex: pending ? currentCapture : null,
        managedChildren,
        getChildFlag: useCallback((i: number) => managedChildren[i].getPending(), []),
        setChildFlag: useCallback((i: number, set: boolean) => managedChildren[i].setPending(set), [])
    });

    labelPosition ??= "start";

    let labelProps = typeof label == "string" ? {} : label.props;
    let clonedLabel = labelPosition != "hidden" ? cloneElement(typeof label == "string" ? <label>{label}</label> : label, useListboxSingleLabelProps(labelProps)) : label;
    console.assert(!(labelPosition == "hidden" && typeof label != "string"));

    return (
        <UseListboxSingleItemContext.Provider value={useListboxSingleItem}>
            <ListStatic tag={tag} labelPosition={labelPosition} label={clonedLabel} {...(useMergedProps<E>({ class: "list-group", ref, "aria-hidden": labelPosition === "hidden" ? label as string : undefined } as any, useListboxSingleProps(domProps) as any) as any)} />
        </UseListboxSingleItemContext.Provider>
    );
}));

export interface ListItemSingleProps extends ListSingleItemParameters<HTMLLIElement>, ListItemStaticProps {

}

export const ListItemSingle = memo(forwardElementRef(function ListItemSingle(p: ListItemSingleProps, ref: Ref<HTMLLIElement>) {
    let { childrenText, props: { index, hidden, disabled, children, ...domProps } } = useChildrenTextProps({ ...p, ref });

    useLogRender("ListSingle", `Rendering ListSingleItem #${index}`);

    const [pending, setPending, getPending] = useState(false);

    const useListItemSingle = useContext(UseListboxSingleItemContext);
    console.assert(!!useListItemSingle, "ListItemSingle is being used outside of a single-select list. Did you mean to use a different kind of list, or a different kind of list item?");


    const { getSelected, tabbable, selected, useListboxSingleItemProps } = useListItemSingle({ index, text: childrenText, tag: "li", setPending, getPending, hidden, disabled });
    return (
        <ProgressCircular childrenPosition="child" mode={pending ? "pending" : null} colorVariant="info">
            <ListItemStatic {...usePseudoActive(useMergedProps<HTMLLIElement>({ disabled, class: clsx("list-group-item-action", selected && "active", pending && "pending") } as any, useListboxSingleItemProps(domProps)))}>
                {children as VNode}
            </ListItemStatic>
        </ProgressCircular>
    )
}));

