import { h } from "preact";
import { SimpleHTMLAnchorAttributes, SimpleHTMLAnchorProps, SimpleProps } from "../props-shared";
import { PageLinkProps, PageProps, PaginationListProps, usePageLinkPros, usePageProps, usePaginationListProps } from "./props";



export function Pagination({ children, "aria-label": ariaLabel, ...rest }: PaginationListProps & { "aria-label": string }) {
    const { ...ulProps } = usePaginationListProps(rest);


    return (
        <nav aria-label="ariaLabel">
            <ul {...ulProps}>{children}</ul>
        </nav>
    )
}

export interface PageComponentProps extends SimpleProps<HTMLLIElement>, Pick<SimpleHTMLAnchorProps, SimpleHTMLAnchorAttributes> {
    href: string;
    active?: boolean;
}

export function Page({ children, ...rest }: PageComponentProps) {
    const { href, hrefLang, target, rel, disabled, download, ...props } = rest;

    return <li {...usePageProps(props)}><a {...usePageLinkPros({ ...(props as any), href, hrefLang, target, rel, disabled, download })}>{children}</a></li>
}
