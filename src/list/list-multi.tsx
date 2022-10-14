import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { EventDetail, UseListboxMultiItem, UseListboxMultiParameters, ListboxMulti as BaseListboxMulti, ListboxMultiItem as BaseListboxMultiItem, defaultRenderListboxMultiItem } from "preact-aria-widgets";
import { ListboxMultiSelectEvent } from "preact-aria-widgets";
import { UseListboxMultiItemParameters, UseListboxMultiItemInfo } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, OmitStrong, OptionalTagSensitiveProps, useDocument, useLogRender, usePseudoActive } from "../props";
import { ListItemStatic, ListItemStaticProps, ListStatic, ListStaticProps } from "./list-static";
import { useChildrenTextProps } from "./utility";

interface ListMultiItemInfo<E extends Element> extends UseListboxMultiItemInfo<E> {

}

export type ListMultiItemParameters<E extends Element> = OmitStrong<UseListboxMultiItemParameters<E, ListMultiItemInfo<E>>, "text" | "tag">;

export interface ListMultiProps<E extends HTMLUListElement | HTMLOListElement> extends OptionalTagSensitiveProps<E>, ListStaticProps<E> {
    select: "multi";
    children: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
    //a: UseListboxMultiParameters<any, E>["listboxMulti"]["tagLabel"]
}


//export const UseListboxMultiItemContext = createContext<UseListboxMultiItem<HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>>(null!);
export const ListMulti = memo(forwardElementRef(function ListMulti<E extends HTMLUListElement | HTMLOListElement>(props: ListMultiProps<E>, ref?: Ref<E>) {
    useLogRender("ListMulti", `Rendering ListMulti`);
    let { tag, select, label, labelPosition, ...domProps } = props;
    //const { useSyncHandler } = useAsyncHandler({ capture: (e: any) => e[EventDetail].selectedIndex as number });
    //const { useListboxMultiItem, useListboxMultiLabel, useListboxMultiProps, currentTypeahead, focus, invalidTypeahead, tabbableIndex } = useAriaListboxMulti<E, HTMLLIElement, UseListboxMultiItemInfo<HTMLLIElement>>({ typeaheadTimeout, noWrap, noTypeahead, keyNavigation, collator });
    //const { useListboxMultiLabelProps } = useListboxMultiLabel<any>();

    labelPosition ??= "start";

    //let labelProps = typeof label == "string" ? {} : label.props;
    //let clonedLabel = labelPosition != "hidden" ? cloneElement(typeof label == "string" ? <label>{label}</label> : label, (labelProps)) : label;
    //console.assert(!(labelPosition == "hidden" && typeof label != "string"));


    return (
        
        <BaseListboxMulti<HTMLLabelElement, HTMLUListElement, HTMLLIElement, undefined, "pending">
            render={({ typeaheadNavigation: { currentTypeahead, invalidTypeahead }, managedChildren: { children } }, modifyPropsLabel, modifyPropsList) => {

                let labelProps = modifyPropsLabel(typeof label == "string" ? {} : label.props);
                const listProps = modifyPropsList(useMergedProps<E>({ class: "list-group", ref, "aria-hidden": labelPosition === "hidden" ? label as string : undefined } as any, domProps));
                let clonedLabel = labelPosition != "hidden" ? cloneElement(typeof label == "string" ? <label>{label}</label> : label, (labelProps)) : label;
                console.assert(!(labelPosition == "hidden" && typeof label != "string"));


                return (
                    <ListStatic 
                    tag={tag} 
                    labelPosition={labelPosition} 
                    label={clonedLabel} 
                    {...({
                        "data-current-typeahead": (currentTypeahead ?? "null").toString(),
                        "data-invalid-typeahead": (invalidTypeahead ?? "null").toString()
                    } as {})}
                    {...(useMergedProps<E>({ class: "list-group", ref, "aria-hidden": labelPosition === "hidden" ? label as string : undefined } as any, (listProps) as any) as any)} />
                )

            }}
            tagList={tag! as "ul"}
            tagLabel="label"

        />
    );
}));

export interface ListItemMultiProps extends ListItemStaticProps {
    onSelectChange(selected: boolean): void | Promise<void>;
    index: number;
    selected: ListMultiItemParameters<HTMLLIElement>["listitemMulti"]
};

export const ListItemMulti = memo(forwardElementRef(function ListItemMulti(p: ListItemMultiProps, ref?: Ref<HTMLLIElement>) {
    const { childrenText, props: { index, selected, disabled, children, onSelectChange: onSelectAsync, ...domProps } } = useChildrenTextProps({ ...p, ref });

    useLogRender("ListMulti", `Rendering ListMultiItem #${index}`);

    const { syncHandler, pending, currentCapture, hasError, resolveCount } = useAsyncHandler(onSelectAsync, { capture: (e: any) => (e as ListboxMultiSelectEvent<HTMLLIElement>)[EventDetail].selected });
    const onSelectSync = (disabled ? null : syncHandler);

    //const { tabbable, useListboxMultiItemProps } = useListItemMulti({ index, text: childrenText, tag: "li", selected: currentCapture ?? selected ?? false, onSelect: onSelectSync ?? undefined, disabled });
    return (
        <ProgressCircular childrenPosition="child" mode={pending ? "pending" : hasError ? "failed" : resolveCount ? "succeeded" : null} colorVariant="info">
            <BaseListboxMultiItem
                getDocument={useDocument()}
                index={index}
                disabled={disabled as boolean}
                render={(info, modifyProps) => { return <ListItemStatic {...usePseudoActive(useMergedProps<HTMLLIElement>({ disabled, class: clsx("list-group-item-action", selected && "active", pending && "pending") } as any, modifyProps(domProps)))}>{children}</ListItemStatic>}}
                selected={currentCapture ?? selected ?? false}
                onSelectedChange={e => onSelectSync?.(e[EventDetail])}
                subInfo={undefined}
                text={childrenText ?? ""}

            />
            {/*<ListItemStatic {...usePseudoActive(useMergedProps<HTMLLIElement>({ disabled, class: clsx("list-group-item-action", selected && "active", pending && "pending") } as any, useListboxMultiItemProps(domProps)))}>
                {children as VNode}
    </ListItemStatic>*/}
        </ProgressCircular>
    );
}));


