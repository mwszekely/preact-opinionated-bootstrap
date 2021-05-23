import { createContext, h, Ref } from "preact";
import { forwardElementRef, useAsyncEventHandler } from "preact-async-input";
import { useContext, useRef } from "preact/hooks";
import { SimpleProps, SimplePropsWithExtras } from "../props-shared";
import { listGroupItemProps, ListGroupItemPropsMin, listGroupProps, ListGroupPropsMin } from "./props";




interface OrderedListGroupProps extends ListGroupPropsMin, SimplePropsWithExtras<HTMLOListElement, "start" | "type" | "ref"> {
    numbered: true;
}

interface UnorderedListGroupProps extends ListGroupPropsMin, SimplePropsWithExtras<HTMLUListElement, "ref"> {
    numbered?: false;
}

type EitherListGroupProps = (OrderedListGroupProps | UnorderedListGroupProps);

export type ListGroupProps = EitherListGroupProps & ListGroupPropsMin & { disabled?: boolean };

const ListGroupDisabled = createContext(false);

export const ListGroup = forwardElementRef(function ListGroup(p: ListGroupProps, ref: Ref<HTMLOListElement> | Ref<HTMLUListElement>) {
    if (p.numbered) {
        const { disabled, ...props } = listGroupProps({ ...p, ref: ref as Ref<HTMLOListElement> });
        return <ListGroupDisabled.Provider value={disabled ?? false}><ol {...props} /></ListGroupDisabled.Provider>
    }
    else {
        const { disabled, ...props } = listGroupProps({ ...p, ref: ref as Ref<HTMLUListElement> });
        return <ListGroupDisabled.Provider value={disabled ?? false}><ul {...props} /></ListGroupDisabled.Provider>;
    }
});


export interface ListGroupItemProps extends Omit<ListGroupItemPropsMin, "actionable">, SimplePropsWithExtras<HTMLLIElement, "value"> {
    onClick?: (_unused: void, staleEvent: Event) => (void | Promise<void>);
}

export const ListGroupItem = forwardElementRef(function ListGroupItem(p: ListGroupItemProps, ref: Ref<HTMLLIElement>) {
    const { onClick: asyncHandler, disabled, ...props } = p;
    const { syncHandler: onClick, pending } = useAsyncEventHandler({ convertEvent, asyncHandler });
    const parentIsDisabled = useContext(ListGroupDisabled);
    return <li {...listGroupItemProps({ ...p, onClick, actionable: (asyncHandler != null), disabled: (pending || disabled || parentIsDisabled), ref })} />;
});

function convertEvent(e: Event) {}

