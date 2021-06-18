import { createContext, h, Ref } from "preact";
import { useContext } from "preact/hooks";
import { TableBodyProps, TableCellProps, TableFootProps, TableHeaderCellProps, TableHeadProps, TableProps, TableRowProps, useTableBodyProps, useTableCellProps, useTableHeaderCellProps, useTableProps, useTableRowProps } from "./props";

export function Table({ children, ...rest }: TableProps, ref: Ref<HTMLTableElement>) {
    return <table {...useTableProps(rest)} ref={ref}>{children}</table>
}

const CellIsInHeaderContext = createContext(false);

export function TableHead({ children, ...rest }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {
    return <CellIsInHeaderContext.Provider value={true}><thead {...useTableBodyProps(rest)} ref={ref}>{children}</thead></CellIsInHeaderContext.Provider>
}

export function TableBody({ children, ...rest }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    return <tbody {...useTableBodyProps(rest)} ref={ref}>{children}</tbody>
}

export function TableFoot({ children, ...rest }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    return <tfoot {...useTableBodyProps(rest)} ref={ref}>{children}</tfoot>
}



export function TableRow({ children, ...rest }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    return <tr {...useTableRowProps(rest)} ref={ref}>{children}</tr>
}

export function TableCell({ children, ...rest }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    return <td {...useTableCellProps(rest)} ref={ref}>{children}</td>
}

export function TableHeaderCell({ children, scope, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    const isInTHead = useContext(CellIsInHeaderContext);

    return <th scope={scope ?? (isInTHead ? "col" : "row")} {...useTableHeaderCellProps({ ...props, ref })} >{children}</th>
}
