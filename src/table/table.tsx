import { ButtonColorVariant } from "../button";
import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import { TableRowInfo, useTable, UseTableCell, UseTableCellParameters, UseTableHeadCell, UseTableHeadCellParameters, UseTableRow, UseTableRowParameters, UseTableHead, UseTableBody, UseTableFoot } from "preact-aria-widgets";
import { useGlobalHandler, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { Flip, Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, OmitStrong, TagSensitiveProps, useLogRender } from "../props";

export type TableBorderColor = Omit<ButtonColorVariant, "link">;
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

export interface TableSectionProps<T extends HTMLTableSectionElement> extends TagSensitiveProps<T>, OmitStrong<GlobalAttributes<HTMLTableSectionElement>, "children"> { location: "head" | "body" | "foot"; children?: ComponentChildren; variant?: TableVariant; };
export interface TableHeadProps extends OmitStrong<TableSectionProps<HTMLTableSectionElement>, "location" | "tag" | "children"> { children: VNode<any>[] | VNode<any> };
export interface TableBodyProps extends OmitStrong<TableSectionProps<HTMLTableSectionElement>, "location" | "tag" | "children"> { children: VNode<any>[] | VNode<any> };
export interface TableFootProps extends OmitStrong<TableSectionProps<HTMLTableSectionElement>, "location" | "tag" | "children"> { children: VNode<any>[] | VNode<any> };

type T2 = number | string | Date | null | undefined | boolean;

export interface TableRowProps extends OmitStrong<UseTableRowParameters, "hidden" | "location">, Pick<h.JSX.HTMLAttributes<HTMLTableRowElement>, "class" | "className" | "style" | "id"> { variant?: TableCellVariant; children?: ComponentChildren; hidden?: boolean; ref?: Ref<HTMLTableRowElement> }

interface TableCellSharedProps extends GlobalAttributes<HTMLTableCellElement> {
    focus?: "cell" | "child";
    active?: boolean;
    variant?: TableCellVariant;
    children?: VNode<any> | string | number | boolean | null;
}

export interface TableCellProps extends Omit<UseTableCellParameters, "value">, TableCellSharedProps {
    colSpan?: number;
    value?: T2;
}

export interface TableHeaderCellProps extends OmitStrong<UseTableHeadCellParameters<HTMLTableCellElement>, "tag">, TableCellSharedProps {
    unsortable?: boolean;
}


const TableHeadContext = createContext<UseTableHead<HTMLTableSectionElement, HTMLTableRowElement, HTMLTableCellElement>>(null!);
const TableBodyContext = createContext<UseTableBody<HTMLTableSectionElement, HTMLTableRowElement, HTMLTableCellElement>>(null!);
const TableFootContext = createContext<UseTableFoot<HTMLTableSectionElement, HTMLTableRowElement, HTMLTableCellElement>>(null!);

const TableRowContext = createContext<UseTableRow<HTMLTableRowElement, HTMLTableCellElement>>(null!);

const ManagedRowsContext = createContext<TableRowInfo[]>([]);


export const Table = memo(forwardElementRef(function Table({ children, small, striped, hoverable, border, variant, borderColor, ...props }: TableProps, ref: Ref<HTMLTableElement>) {
    useLogRender("Table", `Rendering Table`);

    const { useTableProps, useTableHead, useTableBody, useTableFoot, managedTableSections } = useTable<HTMLTableElement, HTMLTableSectionElement, HTMLTableRowElement, HTMLTableCellElement>({});

    return (
        <table {...useTableProps(useMergedProps<HTMLTableElement>({
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
                        {children}
                    </TableFootContext.Provider>
                </TableBodyContext.Provider>
            </TableHeadContext.Provider>
        </table>

    );
}))

const CellLocationContext = createContext<"head" | "body" | "foot">(null!);

const TableSectionImpl = memo(forwardElementRef(function TableSectionImpl<E extends HTMLTableSectionElement>({ tag, children, ...props }: { children?: any } & OmitStrong<TableSectionProps<E>, "location" | "children">, ref: Ref<E>) {
    return h(tag as any, { ...props, ref, children: Array.isArray(children) ? (children as VNode<any>[]) : [(children as VNode<any>)] });
}))
/*
const TableSection = memo(forwardElementRef(function TableSection<E extends HTMLTableSectionElement>({ location, tag, ...props }: TableSectionProps<E>, ref: Ref<E>) {
    const useTableSection = useContext(TableSectionContext);
    const { useTableRow, useTableSectionProps } = useTableSection({ location });

    return (
        <TableRowContext.Provider value={useTableRow}>
            <TableSectionImpl tag={tag} {...useTableSectionProps({ ...props as any, ref: ref as Ref<HTMLTableSectionElement> })} />
        </TableRowContext.Provider>);
}))*/

export const TableHead = memo(forwardElementRef(function TableHead({ variant, ...props }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableHead", `Rendering TableHead`);
    const [showShadow, setShowShadow] = useState(false);

    const { useTableHeadProps, useTableHeadRow } = useContext(TableHeadContext)();
    const { getElement, useRefElementProps } = useRefElement<HTMLTableSectionElement>({});

    useGlobalHandler(window.document, "scroll", e => setShowShadow(!!getElement()?.offsetTop), { passive: true, capture: true });

    return (
        <CellLocationContext.Provider value={"head"}>
            <TableRowContext.Provider value={useTableHeadRow}>
                <TableSectionImpl tag="thead" {...useRefElementProps(useMergedProps<HTMLTableSectionElement>(useTableHeadProps({ ref, className: clsx("elevation-body-surface", showShadow && "floating", variant && `table-${variant}`) }), props))} />
            </TableRowContext.Provider>
        </CellLocationContext.Provider>
    )
}));


export const TableBody = memo(forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableBody", `Rendering TableBody`);
    const { useTableBodyProps, useTableBodyRow } = useContext(TableBodyContext)();

    return (
        <CellLocationContext.Provider value={"body"}>
            <TableRowContext.Provider value={useTableBodyRow}>
                <TableSectionImpl tag="tbody" {...useMergedProps<HTMLTableSectionElement>(useTableBodyProps({ ref, children, className: clsx(variant && `table-${variant}`) }), props)} />
            </TableRowContext.Provider>
        </CellLocationContext.Provider>
    )
}))

export const TableFoot = memo(forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    useLogRender("TableFoot", `Rendering TableFoot`);
    const { useTableFootProps, useTableFootRow } = useContext(TableFootContext)();
    return (
        <CellLocationContext.Provider value={"foot"}>
            <TableRowContext.Provider value={useTableFootRow}>
                <TableSectionImpl tag="tfoot" {...useMergedProps<HTMLTableSectionElement>(useTableFootProps({ ref, children: Array.isArray(children) ? children : [children], className: clsx(variant && `table-${variant}`) }), props)} />
            </TableRowContext.Provider>
        </CellLocationContext.Provider>
    )
}))

const TableCellContext = createContext<UseTableCell<HTMLTableCellElement>>(null!);
const TableHeadCellContext = createContext<UseTableHeadCell<HTMLTableCellElement>>(null!);
export const TableRow = memo(forwardElementRef(function TableRow({ children, index: indexAsUnsorted, variant, hidden: hiddenAsUnsorted, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    useLogRender("TableRow", `Rendering TableRow #${indexAsUnsorted}, ${hiddenAsUnsorted}`);

    const location = useContext(CellLocationContext);

    const useTableRow = useContext(TableRowContext);
    const { useTableCell, useTableHeadCell, useTableRowProps } = useTableRow({ index: indexAsUnsorted, location, hidden: !!hiddenAsUnsorted });


    const rowProps = useTableRowProps({
        ...(useMergedProps<HTMLTableRowElement>({
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


export const TableCell = memo(forwardElementRef(function TableCell({ value: valueAsUnsorted, colSpan, children, index: columnIndex, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {

    if (valueAsUnsorted == undefined) {
        if (["string", "number", "bigint"].includes(typeof children)) {
            valueAsUnsorted = children as string;
        }
        else {
            valueAsUnsorted = "";
        }
    }

    const useTableCell = useContext(TableCellContext);
    const { useTableCellDelegateProps, useTableCellProps } = useTableCell({ index: columnIndex, value: valueAsUnsorted });

    const childrenReceiveFocus = (focus != "cell" && (
        !!children &&
        typeof children == "object" &&
        ("type" in (children as VNode<any>)) &&
        (children as VNode).type !== Fragment
    ));

    const displayValue = (children ?? valueAsUnsorted);

    const cellProps = useTableCellProps({
        ref,
        colSpan,
        className: clsx(variant && `table-${variant}`)
    });


    if (childrenReceiveFocus) {
        const p1 = useMergedProps<any>(useTableCellDelegateProps({}), props);
        return (
            <td {...cellProps}>
                {cloneElement(children! as any, useMergedProps<any>(p1, children.props), children.props.children)}
            </td>
        )
    }
    else {
        const p2 = useMergedProps<any>(useTableCellDelegateProps(cellProps), props);
        return (
            <td {...p2}>
                {stringify(displayValue)}
            </td>
        )
    }
}));

export const TableHeaderCell = memo(forwardElementRef(function TableHeaderCell({ index: columnIndex, focus, children, variant, active, unsortable, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {

    const useTableHeadCell = useContext(TableHeadCellContext);
    const { useTableHeadCellDelegateProps, useTableHeadCellProps, sortDirection } = useTableHeadCell({ tag: "th", index: columnIndex });

    const childrenReceiveFocus = (focus != "cell" && (
        !!children &&
        typeof children == "object" &&
        ("type" in (children as VNode<any>)) &&
        (children as VNode).type !== Fragment
    ));

    const { hovering, useIsHoveringProps } = useIsHovering<HTMLTableCellElement>();

    const cellProps = useTableHeadCellProps(useIsHoveringProps((
        (useMergedProps<HTMLTableCellElement>({
            ref,
            role: "columnheader",
            className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
        }, props)))));


    const sortIcon = (
        <Swappable>
            <div {...{ class: clsx("table-sort-icon-container") }}>
                <Flip flipAngleInline={180} show={sortDirection == "descending"}><div class="bi bi-sort-up" /></Flip>
                <Flip flipAngleInline={180} show={(hovering && sortDirection == null) || (sortDirection == "ascending")}><div class="bi bi-sort-down-alt" /></Flip>
            </div>
        </Swappable>
    );


    if (childrenReceiveFocus) {
        const p1 = useMergedProps<any>(useTableHeadCellDelegateProps({}), props);
        return (
            <th {...cellProps}>
                <div class="th-spacing">{cloneElement(children! as any, useMergedProps<any>(p1, children.props), children.props.children)}{sortIcon}</div>
            </th>
        )
    }
    else {
        const p2 = useMergedProps<any>(useTableHeadCellDelegateProps(cellProps), props);
        return (
            <th {...p2}>
                <div class="th-spacing">{children}{sortIcon}</div>
            </th>
        )
    }

}));

function useIsHovering<E extends Element>() {
    const [hovering, setHovering] = useState(false);
    const onMouseEnter = useCallback(() => { setHovering(true); }, [])
    const onMouseLeave = useCallback(() => { setHovering(false); }, []);
    useGlobalHandler(window, "blur", onMouseLeave);


    return { hovering, useIsHoveringProps: <P extends h.JSX.HTMLAttributes<E>>(props: P) => useMergedProps<E>({ onMouseEnter, onMouseLeave }, props) }
}


function stringify(value: number | string | boolean | Date | null | undefined | VNode) {
    if (value == null)
        return null;

    if (value instanceof Date || ["boolean", "string", "number"].includes(typeof value))
        return `${value}`

    return value;
}
