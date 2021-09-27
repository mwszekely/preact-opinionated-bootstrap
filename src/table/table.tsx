import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import {
    useTable,
    TableRowInfo,
    UseTableBody,
    UseTableCell,
    UseTableCellParameters,
    UseTableFoot,
    UseTableHead,
    UseTableHeadCell,
    UseTableHeadCellParameters,
    UseTableRow,
    UseTableRowParameters
} from "preact-aria-widgets/use-table";
import { useGlobalHandler, useState } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { Flip, Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, useLogRender } from "../props";

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

    /**
     * When a header cell is clicked and requested to be sorted,
     * the data will be sorted and the changes in indices will be noted by this function.
     * This handler basically needs to do whatever it takes to ensure that
     * a reordering of its TableRow children will take place that
     * matches the new index arrangement.
     * 
     * @param info 
     */
    //dealWithNewSortIndices(info: Array<{ originalIndex: number } & TableRowInfo>): (void | Promise<void>);
}

export interface TableHeadProps extends Omit<GlobalAttributes<HTMLTableSectionElement>, "children"> { children: VNode<{ rowIndex: number }>[] | VNode<{ rowIndex: number }>; variant?: TableVariant; }
export interface TableBodyProps extends Omit<GlobalAttributes<HTMLTableSectionElement>, "children"> { children: VNode<{ rowIndex: number }>[]; variant?: TableVariant; }
export interface TableFootProps extends Omit<GlobalAttributes<HTMLTableSectionElement>, "children"> { children: VNode<{ rowIndex: number }>[] | VNode<{ rowIndex: number }>; variant?: TableVariant; }

export interface TableCellChildProps<E extends Element> extends h.JSX.HTMLAttributes<E> {
    /**
     * When a table is sorted, the actual displayed content for this row
     * (and so this cell) may change.
     * 
     * Any child must consume this prop and display the correct data according to it,
     * *not* whatever it is there at that child index #.
     * 
     * Alternatively, using `overriddenValue`, the child may
     * use the valud directly.  Use whichever is more
     * appropriate for your use case.
     */
    rowIndexAsSorted: number;
}

type T2 = number | string | Date | null | undefined | boolean;

export interface TableRowProps extends Omit<UseTableRowParameters, "hiddenAsUnsorted" | "hidden" | "text" | "location" | "getManagedCells" | "getRowIndexAsSorted" | "setRowIndexAsSorted" | "navIndex"> { variant?: TableCellVariant; children?: ComponentChildren; hidden?: boolean; }
export interface TableCellProps extends Omit<UseTableCellParameters, "hidden" | "text" | "literalValue" | "displayValue" | "navIndex"> { colSpan?: number; value: T2; children?: VNode<any> | string | number | boolean | null, focus?: "cell" | "child", variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends Omit<UseTableHeadCellParameters<HTMLTableCellElement>, "hidden" | "tag" | "text" | "literalValue" | "displayValue" | "navIndex"> { unsortable?: boolean; children: ComponentChildren; focus?: "cell" | "child"; variant?: TableCellVariant; active?: boolean; }


const TableHeadContext = createContext<UseTableHead<HTMLTableSectionElement>>(null!);
const TableBodyContext = createContext<UseTableBody<HTMLTableSectionElement>>(null!);
const TableFootContext = createContext<UseTableFoot<HTMLTableSectionElement>>(null!);
const TableRowContext = createContext<UseTableRow<HTMLTableRowElement, HTMLTableCellElement, HTMLTableCellElement>>(null!);

const ManagedRowsContext = createContext<TableRowInfo[]>([]);


export const Table = forwardElementRef(function Table({ children, small, striped, hoverable, border, variant, borderColor, ...props }: TableProps, ref: Ref<HTMLTableElement>) {
    useLogRender("Table", `Rendering Table`);

    const { useTableProps, useTableBody, useTableFoot, useTableHead, useTableRow, managedRows } = useTable<HTMLTableElement, HTMLTableSectionElement, HTMLTableSectionElement, HTMLTableSectionElement, HTMLTableRowElement, HTMLTableCellElement, HTMLTableCellElement>({});

    return (
        <table {...useTableProps(useMergedProps<HTMLTableElement>()({
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
        }, props))}>
            <TableHeadContext.Provider value={useTableHead}>
                <TableBodyContext.Provider value={useTableBody}>
                    <TableFootContext.Provider value={useTableFoot}>
                        <TableRowContext.Provider value={useTableRow}>
                            <ManagedRowsContext.Provider value={managedRows}>
                                {children}
                            </ManagedRowsContext.Provider>
                        </TableRowContext.Provider>
                    </TableFootContext.Provider>
                </TableBodyContext.Provider>
            </TableHeadContext.Provider>
        </table>

    );
})

const CellLocationContext = createContext<"head" | "body" | "foot">(null!);

export const TableHead = forwardElementRef(function TableHead({ children, variant, ...props }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableHead", `Rendering TableHead`);

    const useTableHead = useContext(TableHeadContext);

    const { useTableHeadProps } = useTableHead({});


    return (
        <CellLocationContext.Provider value={"head"}>
            <thead {...useMergedProps<HTMLTableSectionElement>()(useTableHeadProps({ ref, children: Array.isArray(children) ? children : [children], className: clsx(variant && `table-${variant}`) }), props)} />
        </CellLocationContext.Provider>
    )


});



export const TableBody = forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableBody", `Rendering TableBody`);

    const useTableBody = useContext(TableBodyContext);
    const { useTableBodyProps } = useTableBody({});

    return (
        <CellLocationContext.Provider value={"body"}>
            <tbody {...useMergedProps<HTMLTableSectionElement>()(useTableBodyProps({ ref, children, className: clsx(variant && `table-${variant}`) }), props)} />
        </CellLocationContext.Provider>
    )
})

export const TableFoot = forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableFoot", `Rendering TableFoot`);

    const useTableFoot = useContext(TableFootContext);
    const { useTableFootProps } = useTableFoot({})

    return (
        <CellLocationContext.Provider value={"foot"}>
            <tfoot {...useMergedProps<HTMLTableSectionElement>()(useTableFootProps({
                ref,
                children: Array.isArray(children) ? children : [children],
                className: clsx(variant && `table-${variant}`)
            }), props)} />
        </CellLocationContext.Provider>
    )
})

const TableCellContext = createContext<UseTableCell<HTMLTableCellElement>>(null!);
const TableHeadCellContext = createContext<UseTableHeadCell<HTMLTableCellElement>>(null!);
export const TableRow = memo(forwardElementRef(function TableRow({ children, rowIndex: indexAsUnsorted, variant, hidden: hiddenAsUnsorted,  ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    useLogRender("TableRow", `Rendering TableRow #${indexAsUnsorted}, ${hiddenAsUnsorted}`);

    const location = useContext(CellLocationContext);

    const useTableRow = useContext(TableRowContext);
    const { useTableCell, useTableHeadCell, useTableRowProps } = useTableRow({ rowIndex: indexAsUnsorted, location, hidden: !!hiddenAsUnsorted });


    const rowProps = useTableRowProps({
        ...(useMergedProps<HTMLTableRowElement>()({
            children,
            ref,
            className: clsx(variant && `table-${variant}`),
        }, props))
    });

    return (
        <TableCellContext.Provider value={useTableCell}>
            <TableHeadCellContext.Provider value={useTableHeadCell}>
                <tr {...(rowProps)} />
            </TableHeadCellContext.Provider>
        </TableCellContext.Provider>
    )
}))



export const TableCell = memo(forwardElementRef(function TableCell({ value: valueAsUnsorted, colSpan, children, columnIndex, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";

    const useTableCell = useContext(TableCellContext);
    const { useTableCellDelegateProps, useTableCellProps } = useTableCell({ columnIndex, value: valueAsUnsorted });

    const childrenReceiveFocus = (
        children &&
        typeof children != "string" &&
        typeof children != "number" &&
        typeof children != "boolean" &&
        !Array.isArray(children) &&
        (children as VNode).type !== Fragment
    );

    //const isFocusbleChildren = 
    const displayValue = (children ?? valueAsUnsorted);

    const cellProps = useTableCellProps({
        ref,
        colSpan,
        className: clsx(variant && `table-${variant}`)
    });


    if (childrenReceiveFocus) {
        const p1 = useMergedProps<any>()(useTableCellDelegateProps({}), props);
        return (
            <td {...cellProps}>
                {cloneElement(children! as any, p1)}
            </td>
        )
    }
    else {
        const p2 = useMergedProps<any>()(useTableCellDelegateProps(cellProps), props);
        return (
            <td {...p2}>
                {stringify(displayValue)}
            </td>
        )
    }
}));

export const TableHeaderCell = forwardElementRef(function TableHeaderCell({ columnIndex, focus, children, variant, active, unsortable, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";

    const useTableHeadCell = useContext(TableHeadCellContext);
    const { useTableHeadCellDelegateProps, useTableHeadCellProps, sortDirection } = useTableHeadCell({ tag: "th", columnIndex });


    const { hovering, useIsHoveringProps } = useIsHovering<HTMLTableCellElement>();

    const cellProps = useTableHeadCellProps(useIsHoveringProps((
        (useMergedProps<HTMLTableCellElement>()({
            ref,
            role: "columnheader",
            className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
        }, props)))));


    const sortIcon = (
        <Swappable>
            <div {...{ class: clsx("table-sort-icon-container") }}>
                <Flip flipAngleInline={180} open={sortDirection == "descending"}><div class="bi bi-sort-up" /></Flip>
                <Flip flipAngleInline={180} open={(hovering && sortDirection == null) || (sortDirection == "ascending")}><div class="bi bi-sort-down-alt" /></Flip>
            </div>
        </Swappable>
    );

    if (focus === "child") {
        return <th {...cellProps}><div class="th-spacing">{cloneElement(children as VNode<any>, useTableHeadCellDelegateProps({}), (children as VNode<any>).props.children)}{sortIcon}</div></th>;
    }
    else {
        return <th {...useTableHeadCellDelegateProps(cellProps)}><div class="th-spacing">{children}{sortIcon}</div></th>
    }

});

function useIsHovering<E extends Element>() {
    const [hovering, setHovering] = useState(false);
    const onMouseEnter = useCallback(() => { setHovering(true); }, [])
    const onMouseLeave = useCallback(() => { setHovering(false); }, []);
    useGlobalHandler(window, "blur", onMouseLeave);


    return { hovering, useIsHoveringProps: <P extends h.JSX.HTMLAttributes<E>>(props: P) => useMergedProps<E>()({ onMouseEnter, onMouseLeave }, props) }
}


function stringify(value: number | string | boolean | Date | null | undefined | VNode) {
    if (value == null)
        return null;

    if (value instanceof Date || ["boolean", "string", "number"].includes(typeof value))
        return `${value}`

    return value;
}
