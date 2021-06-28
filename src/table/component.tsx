import { createContext, h, Ref } from "preact";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { TableBodyProps, TableCellProps, TableFootProps, TableHeaderCellProps, TableHeadProps, TableProps, TableRowProps, useTableBodyProps, useTableCellProps, useTableHeaderCellProps, useTableProps, useTableRowProps } from "./props";

export const Table = memo(function Table({ children, ...rest }: TableProps, ref: Ref<HTMLTableElement>) {
    return <table {...useTableProps(rest)} ref={ref}>{children}</table>
})
const CellIsInHeaderContext = createContext(false);

export const TableHead = memo(function TableHead({ children, ...rest }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {
    return <CellIsInHeaderContext.Provider value={true}><thead {...useTableBodyProps(rest)} ref={ref}>{children}</thead></CellIsInHeaderContext.Provider>
})

export const TableBody = memo(function TableBody({ children, ...rest }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    return <tbody {...useTableBodyProps(rest)} ref={ref}>{children}</tbody>
})

export const TableFoot = memo(function TableFoot({ children, ...rest }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    return <tfoot {...useTableBodyProps(rest)} ref={ref}>{children}</tfoot>
})



export const TableRow = memo(function TableRow({ children, ...rest }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    return <tr {...useTableRowProps(rest)} ref={ref}>{children}</tr>
})

export const TableCell = memo(function TableCell({ children, ...rest }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    return <td {...useTableCellProps(rest)} ref={ref}>{children}</td>
})

export const TableHeaderCell = memo(function TableHeaderCell({ children, scope, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    const isInTHead = useContext(CellIsInHeaderContext);

    return <th scope={scope ?? (isInTHead ? "col" : "row")} {...useTableHeaderCellProps({ ...props, ref })} >{children}</th>
})
