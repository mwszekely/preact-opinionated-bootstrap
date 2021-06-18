import clsx from "clsx";
import { h } from "preact";
import { useRandomId } from "preact-async-input/src/provide-id";
import { useCallback, useEffect, useState } from "preact/hooks";
import { MakeFocusableOnly, useArrowKeyNavigatableProps, useArrowKeyNavigation } from "../dropdown/utility";
import { useMergedProps } from "../merge-props";

export type ListGroupColorVariant = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export interface ListGroupPropsMin<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "className" | "role"> {
    flush?: boolean;
    numbered?: boolean;
    horizontal?: boolean | "sm" | "md" | "lg" | "xl" | "xll";
}

export interface ListGroupItemPropsMin<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "className"> {
    active?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    actionable?: boolean;
    onAction: (e: Event) => void;
    colorVariant?: ListGroupColorVariant;
    index: number;
    id?: string;
}

export function useListGroup() {
    const { Context, setFocusById, setFocusToFirst, setFocusToCurrent, setFocusToLast, setFocusToNext, useArrowKeyTabNavigationProps, setFocusToPrev, ready } = useArrowKeyNavigation();

    useEffect(() => {
        if (ready)
            setFocusToFirst(MakeFocusableOnly);
    }, [ready]);



    return {
        Context,
        useListGroupProps: <P extends ListGroupPropsMin<any>>({ numbered, horizontal, flush, role, ...props }: P) => useMergedProps(useArrowKeyTabNavigationProps({
            role: role ?? "group",
            className: clsx(
                "list-group",
                numbered && "list-group-numbered",
                horizontal === true && "list-group-horizontal",
                typeof horizontal == "string" && `list-group-horizontal-${horizontal}`,
                flush && "list-group-flush")
        }), props)
    };
}

export function useListGroupItemProps<P extends ListGroupItemPropsMin<any>>({ index, id, onAction, disabled, tabIndex, actionable, colorVariant, active, ...props }: P) {
    const backupId = useRandomId();

    const [activeFromKeyDown, setActiveFromKeyDown] = useState(false);

    active ??= activeFromKeyDown;

    const onKeyDown = useCallback((e: KeyboardEvent) => { if (e.code == "Space") { setActiveFromKeyDown(true); e.preventDefault(); } }, [])
    const onKeyUp = useCallback((e: KeyboardEvent) => { if (e.code == "Space" || e.code == "Enter") { setActiveFromKeyDown(false); onAction(e); e.preventDefault(); } }, [onAction]);


    let propsIfNotActionable = {
        index,
        id: id ?? backupId,
        tabIndex: disabled ? -1 : (tabIndex ?? (actionable ? 0 : undefined)),
        className: clsx(
            "list-group-item",
            disabled && "disabled",
            actionable && "actionable",
            actionable ? `btn-outline-${colorVariant ?? "secondary"}` :
                colorVariant ? colorVariant != "default" && `list-group-item-${colorVariant}` : "",
            actionable && "list-group-item-action",
            active && "active"),
        ...(active ? { "aria-current": "true" } : {}),
        ...(disabled ? { "aria-disabled": "true" } : {}),
    };
    let propsIfActionable = useArrowKeyNavigatableProps(useMergedProps({ style: undefined, onKeyDown, onKeyUp }, propsIfNotActionable));

    return useMergedProps(actionable ? propsIfActionable : propsIfNotActionable, props);
}
