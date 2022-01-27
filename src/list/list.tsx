import { h, Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "../props";
import { ListMulti, ListMultiProps, ListItemMulti, ListItemMultiProps } from "./list-multi";
import { ListSingle, ListSingleProps, ListItemSingle, ListItemSingleProps } from "./list-single";
import { ListActionable, ListActionableProps, ListItemActionable, ListItemActionableProps } from "./list-actionable";
import { ListStatic, ListStaticProps, ListItemStatic, ListItemStaticProps } from "./list-static";

export type ListProps<E extends HTMLUListElement | HTMLOListElement> = ListSingleProps<E> | ListMultiProps<E> | ListActionableProps<E> | ListStaticProps<E>;
export type ListItemProps = ListItemSingleProps | ListItemMultiProps | ListItemActionableProps;

function isSingleProps<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>): props is ListSingleProps<E> {
    return (props as ListSingleProps<E>).select == "single" || (props as ListSingleProps<E>).onSelect != null;
}

function isMultiProps<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>): props is ListMultiProps<E> {
    return (props as ListMultiProps<E>).select == "multi";
}

function isSingleItemProps(props: ListItemProps): props is ListItemSingleProps {
    return (props as ListItemSingleProps | ListItemActionableProps).index != null && !isActionableItemProps(props);
}

function isMultiItemProps(props: ListItemProps): props is ListItemMultiProps {
    return (props as ListItemMultiProps).onSelect != null;
}

function isActionableItemProps(props: ListItemProps): props is ListItemActionableProps {
    return (props as ListItemActionableProps).onPress != null;
}

export const List = memo(forwardElementRef(function List<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>, ref?: Ref<any>) {
    if (isSingleProps(props))
        return <ListSingle {...props} ref={ref} />;
    else if (isMultiProps(props))
        return <ListMulti {...props} ref={ref} />;

    // There's no meaningful distinction between an actionable list and a static one
    // (on the outside at least)
    // but also there's no harm in just always assuming an actionable list.
    // It doesn't cost much to not use the list navigation after all.
    return <ListActionable {...props} ref={ref} />;
}));


export const ListItem = memo(forwardElementRef(function ListItem(props: ListItemProps, ref?: Ref<any>) {
    if (isSingleItemProps(props))
        return <ListItemSingle {...props} ref={ref} />;
    else if (isMultiItemProps(props))
        return <ListItemMulti {...props} ref={ref} />;
    else if (isActionableItemProps(props))
        return <ListItemActionable {...props} ref={ref} />;
    else
        return <ListItemStatic {...props} ref={ref} />;
}));

export { ListMulti, ListMultiProps, ListItemMulti, ListItemMultiProps };
export { ListSingle, ListSingleProps, ListItemSingle, ListItemSingleProps };
export { ListActionable, ListActionableProps, ListItemActionable, ListItemActionableProps };
export { ListStatic, ListStaticProps, ListItemStatic, ListItemStaticProps };
