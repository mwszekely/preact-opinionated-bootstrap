import { UtilityClasses } from "../classes";
import clsx from "clsx";
import { ComponentChildren, h, Ref, Fragment, createElement, createContext, VNode } from "preact";
import { useAsyncHandler, useHasFocus, useListNavigation, UseListNavigationChild, UseListNavigationChildInfo, UseListNavigationChildParameters, UseListNavigationChildProps, useMergedProps } from "preact-prop-helpers";
import { usePressEventHandlers } from "preact-aria-widgets"
import { memo, useContext } from "preact/compat";
import { forwardElementRef, GlobalAttributes, OptionalTagSensitiveProps, TagSensitiveProps, usePseudoActive } from "../props";
import { ProgressCircular } from "../progress";
import { ListItemStatic, ListItemStaticProps, ListStatic, ListStaticProps } from "./list-static";
import { useChildrenTextProps } from "./utility";



export interface ListActionableProps<E extends HTMLUListElement | HTMLOListElement> extends ListStaticProps<E> { }

const ListActionableChildContext = createContext<UseListNavigationChild<HTMLLIElement, UseListNavigationChildInfo>>(null!);
export const ListActionable = memo(forwardElementRef(function ListActionable<E extends HTMLUListElement | HTMLOListElement>(props: ListActionableProps<E>, ref?: Ref<E>) {
    const { useHasFocusProps, getFocusedInner } = useHasFocus<HTMLDivElement>({});
    const { indicesByElement, managedChildren, useListNavigationProps, useListNavigationChild, navigateToIndex, childCount } = useListNavigation<HTMLLIElement, UseListNavigationChildInfo>({ shouldFocusOnChange: getFocusedInner, keyNavigation: "block" });
    const listStaticProps = useHasFocusProps(useListNavigationProps(props as any)) as ListStaticProps<E>;
    return (
        <ListActionableChildContext.Provider value={useListNavigationChild}>
            <ListStatic role={childCount? "toolbar" : undefined} {...listStaticProps} />
        </ListActionableChildContext.Provider>
    );
}));


export interface ListItemActionableProps extends GlobalAttributes<HTMLLIElement> {
    badge?: ComponentChildren;
    disabled?: boolean;
    iconStart?: ComponentChildren;
    iconEnd?: ComponentChildren;
    onPress: () => (void | Promise<void>);
    index: number;
    hidden?: boolean;
}

export const ListItemActionable = memo(forwardElementRef(function ListItemActionable(props: ListItemActionableProps, ref: Ref<HTMLLIElement>) {

    const { childrenText, props: { onPress, index, hidden, children, ...domPropsWithoutPress } } = useChildrenTextProps({ ...props, ref });

    const useListNavigationChild = useContext(ListActionableChildContext);
    const { useListNavigationChildProps } = useListNavigationChild({ index, text: childrenText, hidden })

    const { pending, hasError, getSyncHandler } = useAsyncHandler<HTMLLIElement>()({ capture: returnVoid });

    const domProps = useMergedProps<HTMLLIElement>()(
        { className: clsx("list-group-item-action", pending && "pending") },
        useListNavigationChildProps(usePressEventHandlers<HTMLLIElement>(getSyncHandler((props.disabled || pending) ? undefined : onPress), undefined)(domPropsWithoutPress))) as ListItemStaticProps;
    return (
        <ListItemStatic {...domProps}>
            <ProgressCircular colorFill="foreground-only" childrenPosition="after" mode={pending ? "pending" : null} colorVariant="info">
                {children as VNode}
            </ProgressCircular>
        </ListItemStatic>
    );
}));
function returnVoid(): void { return undefined!; }