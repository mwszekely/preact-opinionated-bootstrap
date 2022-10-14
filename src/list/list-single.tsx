import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { EventDetail } from "preact-aria-widgets";
import { UseListboxSingleParameters, ListboxSingle as BaseListboxSingle, ListboxSingleItem as BaseListboxSingleItem } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps, useRefElement, useStableGetter, useState, useChildrenFlag, useStableCallback, ChildFlagOperations } from "preact-prop-helpers";
import { Children, memo } from "preact/compat";
import { StateUpdater, useCallback, useContext, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { GlobalAttributes, useLogRender, usePseudoActive, forwardElementRef, OmitStrong, OptionalTagSensitiveProps, useDocument } from "../props";
import { ListItemStatic, ListItemStaticProps, ListStatic } from "./list-static";
import { ProgressCircular } from "../progress";
import { useChildrenTextProps } from "./utility";
import { ElementToTag } from "preact-aria-widgets/props";


//export type ListSingleItemParameters<E extends Element> = OmitStrong<UseListboxSingleItemParameters<E, ListSingleItemInfo<E>>, "text" | "tag" | "setPending" | "getPending">;

export interface ListSingleProps<E extends HTMLUListElement | HTMLOListElement> extends OptionalTagSensitiveProps<E>, GlobalAttributes<E> {
    select?: "single";
    //selectionMode?: UseListboxSingleParameters["selectionMode"];
    children: ComponentChildren;
    onSelectChange(index: number): void | Promise<void>;
    labelPosition?: "start" | "end" | "hidden";
    label: h.JSX.Element | string;
    selectedIndex: number;
    selectionMode?: UseListboxSingleParameters<any, any>["singleSelection"]["selectionMode"];
}

//export const UseListboxSingleItemContext = createContext<UseListboxSingleItem<HTMLLIElement, ListSingleItemInfo<HTMLLIElement>>>(null!);
export const ListSingle = memo(forwardElementRef(function ListSingle<E extends HTMLUListElement | HTMLOListElement>(props: ListSingleProps<E>, ref: Ref<E>) {
    useLogRender("ListSingle", `Rendering ListSingle`);
    let { onSelectChange: onSelectAsync, selectedIndex, selectionMode, tag, select, labelPosition, label, ...domProps } = props;
    tag ??= ("ul" as ElementToTag<E>);
    selectionMode ??= "focus";

    // For async operations, we notify the current child that it should show itself as pending as appropriate.
    const { syncHandler, pending, currentCapture } = useAsyncHandler(onSelectAsync, { capture: (e: any) => e[EventDetail].selectedIndex as number });
    const onSelect = syncHandler;
    let reevaluateClosestFit: () => void;
    let changeIndex: StateUpdater<number | null>;

    const i = (pending? currentCapture : null);
    useEffect(() => {
        changeIndex(i ?? null);
    }, [i])

    labelPosition ??= "start";

    return (
        <BaseListboxSingle<HTMLLabelElement, HTMLUListElement, HTMLLIElement, undefined, "pending">
            selectedIndex={selectedIndex}
            selectionMode={selectionMode}
            onChildrenMountChange={useStableCallback(() => reevaluateClosestFit?.())}
            render={({ typeaheadNavigation: { currentTypeahead, invalidTypeahead }, managedChildren: { children } }, modifyPropsLabel, modifyPropsList) => {

                const f = useChildrenFlag({ children, closestFit: true, initialIndex: null, key: "pending" });
                reevaluateClosestFit = f.reevaluateClosestFit;
                changeIndex = f.changeIndex;

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
                        {...listProps}
                    />
                )

            }}
            onSelect={e => {
                onSelect(e[EventDetail].selectedIndex);
            }}
            tagList={tag! as "ul"}
            tagLabel="label"

        />
    )
}));

export interface ListItemSingleProps extends ListItemStaticProps {
    index: number;
    hidden?: boolean;
    disabled?: boolean;
}

export const ListItemSingle = memo(forwardElementRef(function ListItemSingle(p: ListItemSingleProps, ref: Ref<HTMLLIElement>) {
    let { childrenText, props: { index, hidden, disabled, children, ...domProps } } = useChildrenTextProps({ ...p, ref });

    useLogRender("ListSingle", `Rendering ListSingleItem #${index}`);

    const [pending, setPending, getPending] = useState(false);

    const flagOperations = useRef<ChildFlagOperations>({
        get: getPending,
        set: setPending,
        isValid: useStableCallback(() => { return !hidden })
    });

    //const { getSelected, tabbable, selected, useListboxSingleItemProps } = useListItemSingle({ index, text: childrenText, tag: "li", setPending, getPending, hidden, disabled });
    return (
        <ProgressCircular childrenPosition="child" mode={pending ? "pending" : null} colorVariant="info">
            <BaseListboxSingleItem<HTMLLIElement, undefined, "pending">
                index={index}
                subInfo={undefined}
                flags={{ pending: flagOperations.current }}
                text={childrenText ?? ""}
                getDocument={useDocument()}
                render={({ singleSelection: { selected } }, modifyListItemProps) => {
                    return <ListItemStatic {...modifyListItemProps(usePseudoActive(useMergedProps<HTMLLIElement>({ disabled, class: clsx("list-group-item-action", selected && "active", pending && "pending") } as any, domProps)))}>
                        {children as VNode}
                    </ListItemStatic>
                }}
            />
        </ProgressCircular>
    )
}));

