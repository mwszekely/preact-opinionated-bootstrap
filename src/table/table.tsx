import clsx from "clsx";
import { createContext, h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes } from "../props";

export type TableBorderColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
export type TableVariant = TableBorderColor;
export type TableRowVariant = TableVariant;
export type TableCellVariant = TableVariant;

export interface TableProps extends GlobalAttributes<HTMLTableElement> {
    variant?: TableVariant;
    border?: "all" | "none" | "default";
    borderColor?: TableBorderColor;
    small?: boolean;
    striped?: boolean;
    hoverable?: boolean;
}

export interface TableHeadProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }
export interface TableBodyProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }
export interface TableFootProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }

export interface TableRowProps extends GlobalAttributes<HTMLTableRowElement> { variant?: TableCellVariant; }
export interface TableCellProps extends GlobalAttributes<HTMLTableCellElement> { variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends GlobalAttributes<HTMLTableHeaderCellElement> { variant?: TableCellVariant; active?: boolean; }

export const Table = forwardElementRef(function Table({ children, small, striped, hoverable, border, variant, borderColor, ...props }: TableProps, ref: Ref<HTMLTableElement>) {
    return <table {...useMergedProps<HTMLTableElement>()({
        ref,
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
    }, props)}>{children}</table>
})
const CellIsInHeaderContext = createContext(false);

export const TableHead = forwardElementRef(function TableHead({ children, variant, ...props }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {
    return <CellIsInHeaderContext.Provider value={true}><thead {...useMergedProps<HTMLTableSectionElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props)}>{children}</thead></CellIsInHeaderContext.Provider>
})

export const TableBody = forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    return <tbody {...useMergedProps<HTMLTableSectionElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props)}>{children}</tbody>
})

export const TableFoot = forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    return <tfoot {...useMergedProps<HTMLTableSectionElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props)}>{children}</tfoot>
})



export const TableRow = forwardElementRef(function TableRow({ children, variant, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    return <tr {...useMergedProps<HTMLTableRowElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props)}>{children}</tr>
})

export const TableCell = forwardElementRef(function TableCell({ children, variant, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    return <td {...useMergedProps<HTMLTableCellElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props)}>{children}</td>
})

export const TableHeaderCell = forwardElementRef(function TableHeaderCell({ children, variant, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    const isInTHead = useContext(CellIsInHeaderContext);

    return <th  {...useMergedProps<HTMLTableCellElement>()({ ref, scope: (isInTHead ? "col" : "row"), className: clsx(variant && `table-${variant}`) }, props)} >{children}</th>
})
