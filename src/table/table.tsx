import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, createElement, Fragment, FunctionComponent, h, Ref, VNode } from "preact";
import { useButtonLikeEventHandlers } from "preact-aria-widgets/use-button";
import { useChildFlag, useChildManager, useForceUpdate, useGlobalHandler, useGridNavigation, UseGridNavigationCell, UseGridNavigationCellInfo, UseGridNavigationCellParameters, UseGridNavigationRow, UseGridNavigationRowInfo, UseGridNavigationRowParameters, useHasFocus, UseListNavigationChildPropsReturnType, useRefElement, UseRefElementPropsReturnType, useStableCallback, useState } from "preact-prop-helpers";
import { MergedProps, useMergedProps } from "preact-prop-helpers/use-merged-props";
import { generateRandomId } from "preact-prop-helpers/use-random-id";
import { Fade, Flip, Swappable, ZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { StateUpdater, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from "preact/hooks";
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

export interface TableHeadProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }
export interface TableBodyProps extends Omit<GlobalAttributes<HTMLTableSectionElement>, "children"> { children: VNode<any>[]; variant?: TableVariant; }
export interface TableFootProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }

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

export interface TableRowProps extends Omit<UseGridNavigationRowParameters<TableRowInfo>, "text" | "location" | "getManagedCells" | "getRowIndexAsSorted" | "setRowIndexAsSorted" | "navIndex"> { variant?: TableCellVariant; children?: ComponentChildren }
export interface TableCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "literalValue" | "displayValue" | "navIndex"> { colSpan?: number; value: T2; children?: VNode<any> | string | number | boolean | null, focus?: "cell" | "child", variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "literalValue" | "displayValue" | "navIndex"> { unsortable?: boolean; children: ComponentChildren; focus?: "cell" | "child"; variant?: TableCellVariant; active?: boolean; }

interface TableRowInfo extends UseGridNavigationRowInfo {
    getManagedCells: () => TableBodyCellInfo[];

    location: "head" | "body" | "foot";

    /**
     * To handle sorting, each row component keeps track of what row it represents data-wise
     * ("rowIndexAsUnsorted") and what row it's currently displaying in ("rowIndexAsSorted").
     * The "as unsorted" row index never changes for a component, while the "as sorted" row index does.
     * 
     * When a table is unsorted, those two always match.  If a 2-row table is sorted in 
     * reverse order, then the topmost row will have rowIndexAsUnsorted be 1, and its
     * rowIndexAsSorted will be 0.  In terms of components, that row's component changed
     * its "as sorted" row index.  In terms of the DOM, that TR element's "as sorted"
     * won't change, but it will be rendering a component with a different "as unsorted".
     * 
     * Just make sure you're keeping in mind the distinction between
     * * The `TableRow` component, which moves around to different DOM nodes and whose "as unsorted" remains constant but whose "as sorted" jumps around
     * * The TR element in the DOM, which stays still but has different components "attached" to it. These components
     * will all come bearing the same "as sorted" row index matching this TR, but a different "as unsorted".
     * 
     * @param index 
     */
    setRowIndexAsSorted(index: number): void;

    getRowIndexAsSorted(): number;
}

interface TableBodyCellInfo<T extends number | string | Date | null | undefined | boolean = number | string | Date | null | undefined | boolean> extends UseGridNavigationCellInfo {

    /**
     * This is the value that, originally passed to the cell,
     * represents what value this cell would show if we weren't sorted.
     */
    literalValue: T;
}

export interface TableHeadRowInfo extends UseGridNavigationRowInfo { }
export interface TableHeadCellInfo extends UseGridNavigationCellInfo { }

const CurrentSortedColumnContext = createContext<null | number>(null);
const SetCurrentSortedColumnContext = createContext<StateUpdater<null | number>>(null!);

// This is the hook that rows use for navigation
const UseBodyGridNavigationRowContext = createContext<UseGridNavigationRow<HTMLTableRowElement, HTMLTableCellElement, TableRowInfo, TableBodyCellInfo> | null>(null!);
// This is the hook that cells use for navigation
const UseBodyGridNavigationCellContext = createContext<UseGridNavigationCell<HTMLTableCellElement, TableBodyCellInfo> | null>(null!);

const UseHeadGridNavigationRowContext = createContext<UseGridNavigationRow<HTMLTableRowElement, HTMLTableCellElement, TableHeadRowInfo, TableHeadCellInfo> | null>(null!);
const UseHeadGridNavigationCellContext = createContext<UseGridNavigationCell<HTMLTableCellElement, TableHeadCellInfo> | null>(null!);

// This is, internally, what the header cell calls when the user clicks it.
// The body creates it--it sorts the known rows and updates the children.
const InternalSortHandlerContext = createContext<null | ((column: number, direction: "ascending" | "descending") => (Promise<void> | void))>(null);

// This is used by the body. It creates the sort handler, but in order
// to get it to the head, where the clickable header cells are, we need
// this Context, used by the parent Table, to fascilitate communication.
const SetInternalSortHandlerContext = createContext<StateUpdater<null | ((column: number, direction: "ascending" | "descending") => (Promise<void> | void))>>(null!);

export interface UseTableParameters { }
export interface UseTableHeadParameters { }
export interface UseTableBodyParameters { }
export interface UseTableFootParameters { }

export type UseTableRowParameters = Omit<UseGridNavigationRowParameters<TableRowInfo>, "text" | "getManagedCells" | "getRowIndexAsSorted" | "setRowIndexAsSorted" | "navIndex">;
export type UseTableCellParameters = Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "displayValue" | "navIndex"> & {}
export type UseTableHeadCellParameters = Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "displayValue" | "navIndex"> & { unsortable?: boolean }

const LocationPriority = { "head": 0, "body": 1, "foot": 2 };

export function useTable<T extends Element, H extends Element, B extends Element, F extends Element, R extends Element, HC extends Element, BC extends Element>({ }: UseTableParameters) {
    const [sortedColumn, setSortedColumn] = useState<null | number>(null);
    const { useManagedChild: useManagedHeaderCellChild, managedChildren: managedHeaderCells } = useChildManager<{ index: string; setSortedColumn(column: number): void; }>()
    const { focusedInner, useHasFocusProps } = useHasFocus<T>();

    // Whenever any given header cell requests a sort, it sets itself here, in the table,
    // as the "sortedColumn" column.  We then, as the parent table, let all the other
    // header rows know who is the "sortedColumn" column so that they can un-style themselves.
    useEffect(() => {
        if (sortedColumn != null) {
            Object.entries(managedHeaderCells).forEach(([index, cell]) => { cell.setSortedColumn(sortedColumn) });
        }
    }, [sortedColumn])

    // This is the one that's used for the button in the table head
    ///const [internalSortHandler, setInternalSortHandler] = useState<null | ((column: number, direction: "ascending" | "descending") => (Promise<void> | void))>(null);
    const mangleMap = useRef(new Map<number, number>());
    const demangleMap = useRef(new Map<number, number>());
    const indexMangler = useCallback((n: number) => (mangleMap.current.get(n) ?? n), []);
    const indexDemangler = useCallback((n: number) => (demangleMap.current.get(n) ?? n), []);
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow, managedRows } = useGridNavigation<R, BC | HC, TableRowInfo, TableBodyCellInfo>({
        focusOnChange: focusedInner,
        indexMangler,
        indexDemangler
    });

    //const forceUpdate = useForceUpdate();
    const [i, setI] = useState(0);

    // This hooks up to internalSortHandler, used by the table head.
    const sort = useCallback((column: number, direction: "ascending" | "descending"): Promise<void> | void => {
        let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
            if (lhsRow.location != rhsRow.location) {
                return (LocationPriority[lhsRow.location] ?? -1) - (LocationPriority[rhsRow.location] ?? -1);
            }
            else if (lhsRow.location === "head" || lhsRow.location === "foot") {
                // Rows in the header and footer are never sorted -- they always remain in their position.
                console.assert(rhsRow.location === "head" || rhsRow.location === "foot");
                return lhsRow.index - rhsRow.index;
            }
            else if (lhsRow.location === "body") {
                console.assert(rhsRow.location === "body");
                let result = compare(lhsRow.getManagedCells()?.[column]?.literalValue, rhsRow.getManagedCells()?.[column]?.literalValue);
                if (direction[0] == "d")
                    return -result;
            }

            console.assert(false);
            return 0;
        });

        // Go through each DOM row in the table
        for (let literalIndex = 0; literalIndex < sortedRows.length; ++literalIndex) {
            // Get the row that should be shown instead of this one
            const overriddenIndex = sortedRows[literalIndex].index;

            // Let the DOM-based row know that it's showing a different row
            managedRows[literalIndex].setRowIndexAsSorted(overriddenIndex);
            mangleMap.current.set(literalIndex, overriddenIndex);
            demangleMap.current.set(overriddenIndex, literalIndex);
            //managedRows[literalIndex].overriddenRowIndex = overriddenIndex;
        }
        setSortedColumn(column);
        setI(i => ++i)
    }, [ /* Must remain stable */]);



    function useTableProps<P extends h.JSX.HTMLAttributes<T>>({ role, ...props }: P) { return useHasFocusProps(useMergedProps<T>()({ role: "group" }, props)); }


    const useTableRow: UseTableRow<R, HC, BC> = useCallback(({ index: rowIndexAsUnsorted, location }: UseTableRowParameters) => {
        const getManagedCells = useStableCallback(() => managedCells);
        const [rowIndexAsSorted, setRowIndexAsSorted, getRowIndexAsSorted] = useState(rowIndexAsUnsorted);

        const { useGridNavigationCell, useGridNavigationRowProps, cellCount, isTabbableRow, managedCells, tabbableCell } = useGridNavigationRow({ index: rowIndexAsUnsorted, getManagedCells, getRowIndexAsSorted, setRowIndexAsSorted, location });

        const useTableCellShared = useCallback(<C extends Element>({ index: columnIndex, literalValue }: { index: number, literalValue: T2 }) => {
            const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index: columnIndex, literalValue, text: null });
            function useTableCellProps<P extends h.JSX.HTMLAttributes<C>>({ role, ...props }: P) {
                return useGridNavigationCellProps(useMergedProps<any>()({ role: "gridcell" }, props));
            }

            function useTableCellDelegateProps<P extends h.JSX.HTMLAttributes<any>>({ role, ...props }: P) {
                return useGridNavigationCellProps(props);
            }

            return { useTableCellProps, useTableCellDelegateProps };

        }, [])

        const useTableHeadCell: UseTableHeadCell<HC> = useCallback(({ index: columnIndex, literalValue, unsortable }: UseTableHeadCellParameters) => {

            const { useTableCellDelegateProps, useTableCellProps } = useTableCellShared<HC>({ index: columnIndex, literalValue });

            // Header cell stuff
            const [sortDirection, setSortDirection, getSortDirection] = useState<null | "ascending" | "descending">(null);
            const [isTheSortedColumn, setIsTheSortedColumn] = useState(false);
            const random = useRef(generateRandomId());
            const { element, getElement, useManagedChildProps } = useManagedHeaderCellChild({ index: random.current, setSortedColumn: useCallback((c) => { setIsTheSortedColumn(c === columnIndex) }, [columnIndex]) })

            useEffect(() => {
                if (!isTheSortedColumn)
                    setSortDirection(null);
            }, [isTheSortedColumn])


            const onSortClick = useCallback(() => {
                let nextSortDirection = getSortDirection();
                if (nextSortDirection === "ascending")
                    nextSortDirection = "descending";
                else
                    nextSortDirection = "ascending";

                setSortDirection(nextSortDirection);
                sort(columnIndex, nextSortDirection);
            }, []);

            function useTableHeadCellProps<P extends h.JSX.HTMLAttributes<HC>>(props: P) {
                const m = useTableCellProps(useButtonLikeEventHandlers<HC>("th" as any, unsortable ? null : onSortClick, undefined)(
                    (useMergedProps<HC>()({
                        role: "columnheader",
                    }, props))));
                return useManagedChildProps(m as any);
            }

            return { useTableHeadCellProps, useTableHeadCellDelegateProps: useTableCellDelegateProps, sortDirection };

        }, [])

        const useTableCell: UseTableCell<BC> = useCallback(({ index: columnIndex, literalValue }: UseTableCellParameters) => {
            const { useTableCellDelegateProps, useTableCellProps } = useTableCellShared<BC>({ index: columnIndex, literalValue });

            return { useTableCellProps, useTableCellDelegateProps };
        }, [])

        function useTableRowProps<P extends h.JSX.HTMLAttributes<R>>({ role, ...props }: P) {
            return useGridNavigationRowProps(useMergedProps<R>()({ role: "row" }, props))
        }

        return { useTableCell, useTableRowProps, useTableHeadCell };
    }, [])




    const useTableHead: UseTableHead<H> = useCallback(function useTableHead({ }: UseTableHeadParameters) { return { useTableHeadProps: useCallback(<P extends h.JSX.HTMLAttributes<H>>(props: P) => useMergedProps<H>()({ role: "rowgroup" }, props), []) } }, []);
    const useTableBody: UseTableBody<B> = useCallback(function useTableBody({ }: UseTableBodyParameters) { return { useTableBodyProps: useCallback(<P extends h.JSX.HTMLAttributes<B>>(props: P) => useMergedProps<B>()({ role: "rowgroup" }, props), []) } }, []);
    const useTableFoot: UseTableFoot<F> = useCallback(function useTableFoot({ }: UseTableFootParameters) { return { useTableFootProps: useCallback(<P extends h.JSX.HTMLAttributes<F>>(props: P) => useMergedProps<F>()({ role: "rowgroup" }, props), []) } }, []);

    return {
        useTableProps,
        useTableHead,
        useTableBody,
        useTableFoot,
        useTableRow,
        managedRows
    }

}

type UseTableHead<H extends Element> = (parameters: UseTableHeadParameters) => { useTableHeadProps: <P extends h.JSX.HTMLAttributes<H>>(props: P) => MergedProps<H, { role: string; }, P>; };
type UseTableBody<B extends Element> = (parameters: UseTableBodyParameters) => { useTableBodyProps: <P extends h.JSX.HTMLAttributes<B>>(props: P) => MergedProps<B, { role: string; }, P>; };
type UseTableFoot<F extends Element> = (parameters: UseTableFootParameters) => { useTableFootProps: <P extends h.JSX.HTMLAttributes<F>>(props: P) => MergedProps<F, { role: string; }, P>; };

type UseTableCell<BC extends Element> = ({ index: columnIndex, literalValue }: UseTableCellParameters) => {
    useTableCellProps: <P extends h.JSX.HTMLAttributes<BC>>({ role, ...props }: P) => h.JSX.HTMLAttributes<BC>
    useTableCellDelegateProps: <P extends h.JSX.HTMLAttributes<any>>(props: P) => h.JSX.HTMLAttributes<any>
}

type UseTableHeadCell<HC extends Element> = ({ index: columnIndex, literalValue, unsortable }: UseTableHeadCellParameters) => {
    useTableHeadCellProps: <P extends h.JSX.HTMLAttributes<HC>>(props: P) => h.JSX.HTMLAttributes<HC>
    useTableHeadCellDelegateProps: <P extends h.JSX.HTMLAttributes<HC>>(props: P) =>h.JSX.HTMLAttributes<HC>;
    sortDirection: "ascending" | "descending" | null;
}

type UseTableRow<R extends Element, HC extends Element, BC extends Element> = (parameters: UseTableRowParameters) => {
    useTableCell: UseTableCell<BC>;
    useTableRowProps: <P extends h.JSX.HTMLAttributes<R>>(props: P) => h.JSX.HTMLAttributes<R>
    useTableHeadCell: UseTableHeadCell<HC>
}

const TableHeadContext = createContext<UseTableHead<HTMLTableSectionElement>>(null!);
const TableBodyContext = createContext<UseTableBody<HTMLTableSectionElement>>(null!);
const TableFootContext = createContext<UseTableFoot<HTMLTableSectionElement>>(null!);
const TableRowContext = createContext<UseTableRow<HTMLTableRowElement, HTMLTableCellElement, HTMLTableCellElement>>(null!);

const ManagedRowsContext = createContext<TableRowInfo[]>([]);

export const Table = forwardElementRef(function Table({ children, small, striped, hoverable, border, variant, borderColor, ...props }: TableProps, ref: Ref<HTMLTableElement>) {

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

function noop() { };

export const TableHead = forwardElementRef(function TableHead({ children, variant, ...props }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {

    const useTableHead = useContext(TableHeadContext);

    const { useTableHeadProps } = useTableHead({});


    return (
        <CellLocationContext.Provider value={"head"}>
            <thead {...useTableHeadProps(useMergedProps<HTMLTableSectionElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props))}>
                {children}
            </thead>
        </CellLocationContext.Provider>
    )


});

function compare(lhs: string | number | boolean | Date | null | undefined, rhs: string | number | boolean | Date | null | undefined) {
    return compare1(lhs, rhs);

    function compare3(lhs: string | number, rhs: string | number) {

        // Coerce strings to numbers if they seem to stay the same when serialized
        if (`${+lhs}` === lhs)
            lhs = +lhs;
        if (`${+rhs}` === rhs)
            rhs = +rhs;

        // At this point, if either argument is a string, turn the other one into one too
        if (typeof lhs === "string")
            rhs = `${rhs}`;
        if (typeof rhs === "string")
            lhs = `${lhs}`;

        console.assert(typeof lhs === typeof rhs);

        if (typeof lhs === "string")
            return lhs.localeCompare(rhs as string);
        if (typeof lhs === "number")
            return +lhs - +rhs;

        return 0;
    }
    function compare2(lhs: string | number | boolean | Date, rhs: string | number | boolean | Date) {
        if (typeof lhs === "boolean" || lhs instanceof Date)
            lhs = +lhs;
        if (typeof rhs === "boolean" || rhs instanceof Date)
            rhs = +rhs;
        return compare3(lhs, rhs);
    }
    function compare1(lhs: string | number | boolean | Date | null | undefined, rhs: string | number | boolean | Date | null | undefined) {
        if (lhs == null && rhs == null) {
            // They're both null
            return 0;
        }
        else if (lhs == null || rhs == null) {
            // One of the two is null -- easy case
            return lhs != null ? 1 : -1
        }
        return compare2(lhs, rhs);
    }
}



export const TableBody = forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {

    const useTableBody = useContext(TableBodyContext);
    const { useTableBodyProps } = useTableBody({});


    const managedRows: TableRowInfo[] = useContext(ManagedRowsContext);

    function ensortenChild(literalIndex: number) {
        const sortedIndex = managedRows[literalIndex]?.getRowIndexAsSorted() ?? literalIndex;
        const C = children[literalIndex].type as FunctionComponent<{ index: number }>;
        const { index, ...props } = children[literalIndex].props;
        let ret = <C key={sortedIndex} index={sortedIndex} {...props} />
        return ret;
    }

    return (
        <CellLocationContext.Provider value={"body"}>
            <tbody {...useTableBodyProps(useMergedProps<HTMLTableSectionElement>()({ ref, className: clsx(variant && `table-${variant}`) }, props))}>
                <>
                    {children.map((tableRow, i) => {
                        return ensortenChild(i);
                    })}
                </>
            </tbody>
        </CellLocationContext.Provider>
    )
})

export const TableFoot = forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {

    const useTableFoot = useContext(TableFootContext);
    const { useTableFootProps } = useTableFoot({})

    return (
        <CellLocationContext.Provider value={"foot"}>
            <tfoot {...useTableFootProps(useMergedProps<HTMLTableSectionElement>()({
                ref,
                className: clsx(variant && `table-${variant}`)
            }, props))}>{children}</tfoot>
        </CellLocationContext.Provider>
    )
})

const TableCellContext = createContext<UseTableCell<HTMLTableCellElement>>(null!);
const TableHeadCellContext = createContext<UseTableHeadCell<HTMLTableCellElement>>(null!);
export const TableRow = memo(forwardElementRef(function TableRow({ children, index: indexAsUnsorted, variant, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    //const isInTHead = useContext(CellIsInHeaderContext);

    const location = useContext(CellLocationContext);
    const useTableRow = useContext(TableRowContext);
    const { useTableCell, useTableHeadCell, useTableRowProps } = useTableRow({ index: indexAsUnsorted, location });


    const rowProps = {
        children, ...useTableRowProps(useMergedProps<HTMLTableRowElement>()({
            ref,
            className: clsx(variant && `table-${variant}`),
        }, props))
    };


    //const Provider = !isInTHead ? UseBodyGridNavigationCellContext.Provider : UseHeadGridNavigationCellContext.Provider as typeof UseBodyGridNavigationCellContext["Provider"];

    return (
        <TableCellContext.Provider value={useTableCell}>
            <TableHeadCellContext.Provider value={useTableHeadCell}>
                <tr {...useTableRowProps(rowProps)}>
                    {children}
                </tr>
            </TableHeadCellContext.Provider>
        </TableCellContext.Provider>
    )
}))

const RowIndexAsUnsortedContext = createContext<number>(null!);

export const TableCell = memo(forwardElementRef(function TableCell({ value: valueAsUnsorted, colSpan, children, index, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";

    const useTableCell = useContext(TableCellContext);
    const { useTableCellDelegateProps, useTableCellProps } = useTableCell({ index, literalValue: valueAsUnsorted });

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
        role: "gridcell",
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

export const TableHeaderCell = forwardElementRef(function TableHeaderCell({ index, focus, children, variant, active, unsortable, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";

    const useTableHeadCell = useContext(TableHeadCellContext);
    const { useTableHeadCellDelegateProps, useTableHeadCellProps, sortDirection } = useTableHeadCell({ index, literalValue: "" });


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

/**
 * For a component within a row, returns that row's index.
 * 
 * When the table is sorted, the returned index is the overridden row,
 * not the literal row that's passed in as the `index` prop.
 * 
 * @returns 
 */
export function useTableRowIndex() {
    return useContext(RowIndexAsUnsortedContext)
}


function stringify(value: number | string | boolean | Date | null | undefined | VNode) {
    if (value == null)
        return null;

    if (value instanceof Date || ["boolean", "string", "number"].includes(typeof value))
        return `${value}`

    return value;
}
