import { h, Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "../props";
import { ListMulti, ListMultiProps } from "./list-multi";
import { ListSingle, ListSingleProps } from "./list-single";
import { ListStatic, ListStaticProps } from "./list-static";

export type ListProps<E extends HTMLUListElement | HTMLOListElement> = ListSingleProps<E> | ListMultiProps<E> | ListStaticProps<E>;

function isSingleProps<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>): props is ListSingleProps<E> {
    return (props as ListSingleProps<E>).select == "single" || (props as ListSingleProps<E>).onSelect != null;
}

function isMultiProps<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>): props is ListMultiProps<E> {
    return (props as ListMultiProps<E>).select == "multi";
}

export const List = memo(forwardElementRef(function List<E extends HTMLUListElement | HTMLOListElement>(props: ListProps<E>, ref?: Ref<any>) {
    if (isSingleProps(props))
        return <ListSingle {...props as ListSingleProps<E>} ref={ref} />
    else if (isMultiProps(props))
        return <ListMulti {...props as ListMultiProps<E>} ref={ref} />
    return <ListStatic {...props as ListStaticProps<E>} ref={ref} />
}));
