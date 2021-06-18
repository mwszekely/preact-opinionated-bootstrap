import { createContext, h, Ref } from "preact";
import { forwardElementRef, useAsyncEventHandler, useRefElement } from "preact-async-input";
import { useContext, useRef } from "preact/hooks";
import { clsx } from "../bootstrap-classes";
import { useArrowKeyNavigation } from "../dropdown/utility";
import { SimpleProps, SimplePropsWithExtras } from "../props-shared";
import { ListGroupColorVariant, ListGroupItemPropsMin, ListGroupPropsMin, useListGroup, useListGroupItemProps } from "./props";




interface OrderedListGroupProps extends ListGroupPropsMin<HTMLOListElement>, SimplePropsWithExtras<HTMLOListElement, "start" | "type" | "ref"> {
    numbered: true;
}

interface UnorderedListGroupProps extends ListGroupPropsMin<HTMLUListElement>, SimplePropsWithExtras<HTMLUListElement, "ref"> {
    numbered?: false;
}

type EitherListGroupProps = (OrderedListGroupProps | UnorderedListGroupProps);

export type ListGroupProps<E extends HTMLElement> = EitherListGroupProps & ListGroupPropsMin<E> & {
    disabled?: boolean;
    colorVariant?: ListGroupColorVariant;
};

const ListGroupDisabled = createContext(false);
const ListGroupDefaultColor = createContext<ListGroupColorVariant>("secondary");

export const ListGroup = forwardElementRef(function ListGroup<E extends HTMLOListElement | HTMLUListElement>(p: ListGroupProps<E>, ref: Ref<E>) {
    const { element, useRefElementProps } = useRefElement<E>();

    const { Context, useListGroupProps } = useListGroup();

    //const { useArrowKeyTabNavigationProps } = useArrowKeyNavigation();
    const { disabled, colorVariant, ...props } = useRefElementProps(useListGroupProps(({ ...p, ref })));
    return <Context><ListGroupDefaultColor.Provider value={colorVariant ?? "secondary"}><ListGroupDisabled.Provider value={disabled ?? false}>{h(p.numbered ? "ol" : "ul", props as any)}</ListGroupDisabled.Provider></ListGroupDefaultColor.Provider></Context>;
});


export interface ListGroupItemProps<E extends HTMLElement> extends Omit<ListGroupItemPropsMin<E>, "actionable" | "onAction">, SimplePropsWithExtras<HTMLLIElement, "value"> {
    onClick?: (_unused: void, staleEvent: Event) => (void | Promise<void>);
}

export const ListGroupItem = forwardElementRef(function ListGroupItem<E extends HTMLElement>(p: ListGroupItemProps<E>, ref: Ref<HTMLLIElement>) {
    const { onClick: asyncHandler, disabled, colorVariant, ...props } = p;
    const { syncHandler: onClick, pending } = useAsyncEventHandler({ convertEvent, asyncHandler });
    const parentIsDisabled = useContext(ListGroupDisabled);
    const actionable = (asyncHandler != null);
    const defaultColorVariant = useContext(ListGroupDefaultColor);
    return <li {...useListGroupItemProps({ ...props, colorVariant: colorVariant ?? defaultColorVariant, onClick, onAction: onClick, actionable, disabled: (pending || disabled || parentIsDisabled), ref })} />;
});

function convertEvent(e: Event) { }

