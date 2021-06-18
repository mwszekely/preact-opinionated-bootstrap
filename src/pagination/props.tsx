import clsx from "clsx";
import { h } from "preact";
import { useMergedProps } from "../merge-props";
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

export interface PageProps extends PagePropsBase, SimpleProps<HTMLLIElement> { }

export interface PageLinkProps extends PageLinkPropsBase, SimpleHTMLAnchorProps { href: string }

export function usePaginationListProps<P extends PaginationListProps>({ size, ...props }: P) {
    return useMergedProps({ className: clsx("pagination", size == "lg" && `pagination-lg`, size == "sm" && "pagination-sm") }, props);
}

export function usePageProps<P extends PageProps>({ active, disabled, ...props }: P) {
    return useMergedProps({ className: clsx("page-item", active && "active", disabled && "disabled"),
        ...(active ? { "aria-active": "page" } as any : {})
    }, props);
}

export function usePageLinkPros<P extends PageLinkProps>({ tabIndex, disabled, ...props }: P) {
    return useMergedProps({
        className: clsx("page-link"),
        tabIndex: disabled ? -1 : tabIndex,
        ...(disabled ? { "aria-disabled": "true" } as any : {})
    }, props)
}
