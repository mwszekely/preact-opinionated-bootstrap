import clsx from "clsx";
import { useMergedProps } from "../merge-props";
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

export function useTableProps<P extends TableProps>({ small, striped, hoverable, border, borderColor, variant, ...props }: P) {
    return useMergedProps({
        className: clsx(
            "table",
            small && "table-sm",
            striped && "table-striped",
            hoverable && "table-hover",
            border === "all" && "table-bordered",
            border === "none" && "table-borderless",
            variant && `table-${variant}`,
            borderColor && `border-${borderColor}`,

        )
    }, props);
}

export function useTableRowProps<P extends TableRowProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}

export function useTableCellProps<P extends TableCellProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}

export function useTableHeaderCellProps<P extends TableHeaderCellProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}





export function useTableHeadProps<P extends TableHeadProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}

export function useTableBodyProps<P extends TableBodyProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}

export function useTableFootProps<P extends TableFootProps>({ className, variant, ...props }: P) {
    return useMergedProps({ ...props, className: clsx(variant && `table-${variant}`) }, props);
}
