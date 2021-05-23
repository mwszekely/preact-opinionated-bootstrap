import clsx from "clsx";
import { h } from "preact";
import { SimpleHTMLAnchorProps, SimpleProps } from "../props-shared";


interface PaginationListPropsBase {
    size?: "sm" | "md" | "lg";
}

interface PagePropsBase {
    active?: boolean;
    disabled?: boolean;
}


interface PageLinkPropsBase {
    disabled?: boolean;
}

export interface PaginationListProps extends PaginationListPropsBase, SimpleProps<HTMLUListElement> {

}

export interface PageProps extends PagePropsBase, SimpleProps<HTMLLIElement> {}

export interface PageLinkProps extends PageLinkPropsBase, SimpleHTMLAnchorProps { href: string }

export function usePaginationListProps<P extends PaginationListProps>({ className, size, ...props }: P) {
    return {
        ...props,
        className: clsx("pagination", size == "lg" && `pagination-lg`, size == "sm" && "pagination-sm", className)
    }
}

export function usePageProps<P extends PageProps>({ className, active, disabled, ...props }: P) {
    return {
        className: clsx("page-item", active && "active", disabled && "disabled", className),
        ...(active? { "aria-active": "page" } as any : {}),
        ...props
    }
}

export function usePageLinkPros<P extends PageLinkProps>({ className, tabIndex, disabled, ...props }: P) {
    return {
        className: clsx("page-link", className),
        tabIndex: disabled? -1 : tabIndex,
        ...(disabled? { "aria-disabled": "true" } as any : {}),
        ...props
    }
}
