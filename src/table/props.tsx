import clsx from "clsx";
import { SimpleHTMLTableBodyProps, SimpleHTMLTableCellProps, SimpleHTMLTableFootProps, SimpleHTMLTableHeaderCellProps, SimpleHTMLTableHeadProps, SimpleHTMLTableProps, SimpleHTMLTableRowProps } from "../props-shared";
import { TableBorderColor, TableVariant, TableRowVariant, TableCellVariant } from "./types";

interface BaseForAll {
    variant?: TableVariant;
}

interface TablePropsBase extends BaseForAll {
    border?: "all" | "none" | "default";
    borderColor?: TableBorderColor;
    small?: boolean;
    striped?: boolean;
    hoverable?: boolean;
}


interface TableHeadPropsBase extends BaseForAll { }
interface TableBodyPropsBase extends BaseForAll { }
interface TableFootPropsBase extends BaseForAll { }

interface TableRowPropsBase extends BaseForAll {
    variant?: TableRowVariant;
    active?: boolean;
}

interface TableCellPropsBase {
    variant?: TableCellVariant;
    active?: boolean;
}

interface TableHeaderCellPropsBase {
    variant?: TableCellVariant;
    active?: boolean;
}

export interface TableProps extends TablePropsBase, SimpleHTMLTableProps { }

export interface TableHeadProps extends TableHeadPropsBase, SimpleHTMLTableHeadProps { }
export interface TableBodyProps extends TableBodyPropsBase, SimpleHTMLTableBodyProps { }
export interface TableFootProps extends TableFootPropsBase, SimpleHTMLTableFootProps { }


export interface TableRowProps extends TableRowPropsBase, SimpleHTMLTableRowProps { }
export interface TableCellProps extends TableCellPropsBase, SimpleHTMLTableCellProps { }
export interface TableHeaderCellProps extends TableHeaderCellPropsBase, SimpleHTMLTableHeaderCellProps { }

export function useTableProps<P extends TableProps>(props: P) {
    const { className, small, striped, hoverable, border, borderColor, variant, ...rest } = props;
    return {
        ...rest,
        className: clsx(
            "table",
            small && "table-sm",
            striped && "table-striped",
            hoverable && "table-hover",
            border === "all" && "table-bordered",
            border === "none" && "table-borderless",
            variant && `table-${variant}`,
            borderColor && `border-${borderColor}`,

            className)
    }
}

export function useTableRowProps<P extends TableRowProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}

export function useTableCellProps<P extends TableCellProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}

export function useTableHeaderCellProps<P extends TableHeaderCellProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}





export function useTableHeadProps<P extends TableHeadProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}

export function useTableBodyProps<P extends TableBodyProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}

export function useTableFootProps<P extends TableFootProps>(props: P) {
    const { className, variant, ...rest } = props;
    return { ...rest, className: clsx(variant && `table-${variant}`, className) }
}
