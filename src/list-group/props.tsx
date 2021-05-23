import clsx from "clsx";
import { h } from "preact";

export type ListGroupColorVariant = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export interface ListGroupPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
    flush?: boolean;
    numbered?: boolean;
    horizontal?: boolean | "sm" | "md" | "lg" | "xl" | "xll";
}

export interface ListGroupItemPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
    active?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    actionable?: boolean;
    colorVariant?: ListGroupColorVariant;
}

export function listGroupProps<P extends ListGroupPropsMin>(p: P) {
    const { className, flush, numbered, horizontal, ...props } = p;
    return {
        ...props,
        className: clsx(
            "list-group",
            numbered && "list-group-numbered",
            horizontal === true && "list-group-horizontal",
            typeof horizontal == "string" && `list-group-horizontal-${horizontal}`,
            flush && "list-group-flush",
            className)
    }
}

export function listGroupItemProps<P extends ListGroupItemPropsMin>(p: P) {
    const { className, colorVariant, tabIndex, active, disabled, actionable, ...props } = p;
    return {
        ...props,
        tabIndex: disabled ? -1 : (tabIndex ?? (actionable? 0 : undefined)),
        className: clsx(
            "list-group-item", 
            disabled && "disabled", 
            colorVariant && colorVariant != "default" && `list-group-item-${colorVariant}`,
            actionable && "list-group-item-action", 
            active && "active", 
            className),
        ...(active ? { "aria-current": "true" } : {} as any),
        ...(disabled ? { "aria-disabled": "true" } : {} as any),
    }
}
