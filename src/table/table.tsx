import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, createElement, Fragment, FunctionComponent, h, Ref, VNode } from "preact";
import { useButtonLikeEventHandlers } from "preact-aria-widgets/use-button";
import { useForceUpdate, useGlobalHandler, useGridNavigation, UseGridNavigationCell, UseGridNavigationCellInfo, UseGridNavigationCellParameters, UseGridNavigationRow, UseGridNavigationRowInfo, UseGridNavigationRowParameters, useHasFocus, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
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

type T = number | string | Date | null | undefined | boolean;

export interface TableRowProps extends Omit<UseGridNavigationRowParameters<TableBodyRowInfo>, "text" | "getManagedCells" | "getRowIndexAsSorted" | "setRowIndexAsSorted" | "navIndex"> { variant?: TableCellVariant; children?: ComponentChildren }
export interface TableCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "literalValue" | "displayValue" | "navIndex"> { value: T; children?: VNode<any> | string | number | boolean | null, focus?: "cell" | "child", variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "text" | "literalValue" | "displayValue" | "navIndex"> { unsortable?: boolean; children: ComponentChildren; focus?: "cell" | "child"; variant?: TableCellVariant; active?: boolean; }

interface TableBodyRowInfo extends UseGridNavigationRowInfo {
    getManagedCells: () => TableBodyCellInfo[];

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
const UseBodyGridNavigationRowContext = createContext<UseGridNavigationRow<HTMLTableRowElement, HTMLTableCellElement, TableBodyRowInfo, TableBodyCellInfo> | null>(null!);
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

export const Table = forwardElementRef(function Table({ children, small, striped, hoverable, border, variant, borderColor, ...props }: TableProps, ref: Ref<HTMLTableElement>) {


    const [sortedColumn, setSortedColumn] = useState<null | number>(null);

    // This is the one that's used for the button in the table head
    const [internalSortHandler, setInternalSortHandler] = useState<null | ((column: number, direction: "ascending" | "descending") => (Promise<void> | void))>(null);
    return (
        <table {...useMergedProps<HTMLTableElement>()({
            ref,
            role: "group",
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
        }, props)}>
            <SetInternalSortHandlerContext.Provider value={setInternalSortHandler}>
                <InternalSortHandlerContext.Provider value={internalSortHandler}>
                    <CurrentSortedColumnContext.Provider value={sortedColumn}>
                        <SetCurrentSortedColumnContext.Provider value={setSortedColumn}>
                            {children}
                        </SetCurrentSortedColumnContext.Provider>
                    </CurrentSortedColumnContext.Provider>
                </InternalSortHandlerContext.Provider>
            </SetInternalSortHandlerContext.Provider>
        </table>

    );
})
const CellIsInHeaderContext = createContext(false);

function noop() { };

export const TableHead = forwardElementRef(function TableHead({ children, variant, ...props }: TableHeadProps, ref: Ref<HTMLTableSectionElement>) {

    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLTableSectionElement>({})
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableHeadRowInfo, TableHeadCellInfo>({ focusOnChange: focusedInner });

    return (

        <UseHeadGridNavigationRowContext.Provider value={useGridNavigationRow}>
            <CellIsInHeaderContext.Provider value={true}>
                <thead {...useHasFocusProps(useMergedProps<HTMLTableSectionElement>()({
                    ref,
                    role: "rowgroup",
                    "data-current-row": rowIndex,
                    "data-current-column": cellIndex,
                    "data-row-count": rowCount,
                    className: clsx(variant && `table-${variant}`)
                }, props))}>{children}</thead>
            </CellIsInHeaderContext.Provider>
        </UseHeadGridNavigationRowContext.Provider >
    )
});

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

const SortContext = createContext<(column: number, direction: "ascending" | "descending") => void>(null!);


export const TableBody = forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    const mangleMap = useRef(new Map<number, number>());
    const demangleMap = useRef(new Map<number, number>());
    const indexMangler = useCallback((n: number) => (mangleMap.current.get(n) ?? n), []);
    const indexDemangler = useCallback((n: number) => (demangleMap.current.get(n) ?? n), []);
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLTableSectionElement>({})
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow, managedRows } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableBodyRowInfo, TableBodyCellInfo>({
        focusOnChange: focusedInner,
        indexMangler,
        indexDemangler
    });

    //const forceUpdate = useForceUpdate();
    const [i, setI] = useState(0);

    // This hooks up to internalSortHandler, used by the table head.
    const sort = useCallback((column: number, direction: "ascending" | "descending"): Promise<void> | void => {
        let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
            let result = compare1(lhsRow.getManagedCells()[column].literalValue, rhsRow.getManagedCells()[column].literalValue);
            if (direction[0] == "d")
                return -result;
            return result;
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
        setI(i => ++i)
    }, []);

    const setInternalSortHandler = useContext(SetInternalSortHandlerContext);
    useEffect(() => { setInternalSortHandler(() => sort) }, [setInternalSortHandler, sort]);


    return (
        <tbody {...useHasFocusProps(useMergedProps<HTMLTableSectionElement>()({
            ref,
            role: "rowgroup",
            "data-current-row": rowIndex,
            "data-current-column": cellIndex,
            "data-row-count": rowCount,
            className: clsx(variant && `table-${variant}`)
        }, props))}>
            <UseBodyGridNavigationRowContext.Provider value={useGridNavigationRow}>
                <SortContext.Provider value={sort}>
                    <TableBodyChildren children={children} managedRows={managedRows} {...{ i } as any} />
                </SortContext.Provider>
            </UseBodyGridNavigationRowContext.Provider >
        </tbody>
    )
})

const TableBodyChildren = memo<{ managedRows: TableBodyRowInfo[], children: VNode<{ index: number }>[] }>(({ children, managedRows }) => {

    function ensortenChild(literalIndex: number) {
        const sortedIndex = managedRows[literalIndex]?.getRowIndexAsSorted() ?? literalIndex;
        const C = children[literalIndex].type as FunctionComponent<{ index: number }>;
        const { index, ...props } = children[literalIndex].props;
        let ret = <C key={sortedIndex} index={sortedIndex} {...props} />
        return ret;
    }


    return <>{children.map((tableRow, i) => {
        return ensortenChild(i);
    })}</>
})

export const TableFoot = forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLTableSectionElement>({})
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableBodyRowInfo, TableBodyCellInfo>({ focusOnChange: focusedInner });

    return (
        <UseBodyGridNavigationRowContext.Provider value={useGridNavigationRow}>
            <tfoot {...useHasFocusProps(useMergedProps<HTMLTableSectionElement>()({
                ref,
                "data-current-row": rowIndex,
                "data-current-column": cellIndex,
                "data-row-count": rowCount,
                className: clsx(variant && `table-${variant}`)
            }, props))}>{children}</tfoot>
        </UseBodyGridNavigationRowContext.Provider >
    )
})


export const TableRow = memo(forwardElementRef(function TableRow({ children, index: indexAsUnsorted, variant, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    const isInTHead = useContext(CellIsInHeaderContext);
    const useGridNavigationRow = useContext(isInTHead ? (UseHeadGridNavigationRowContext as typeof UseBodyGridNavigationRowContext) : UseBodyGridNavigationRowContext)!;
    const [rowIndexAsSorted, setRowIndexAsSorted, getRowIndexAsSorted] = useState(indexAsUnsorted);

    const { cellCount, useGridNavigationRowProps, useGridNavigationCell, tabbableCell, isTabbableRow, managedCells } = useGridNavigationRow({
        index: indexAsUnsorted,
        getRowIndexAsSorted,
        setRowIndexAsSorted,
        getManagedCells: useStableCallback(() => managedCells)
    });




    const rowProps = {
        children, ...(useMergedProps<HTMLTableRowElement>()({
            ref,
            role: "row",
            "data-index-as-unsorted": indexAsUnsorted,
            "data-overridden-index": rowIndexAsSorted,
            "data-tabbable": `${isTabbableRow}`,
            "data-tabbable-cell": `${tabbableCell}`,
            className: clsx(variant && `table-${variant}`),
            "data-cell-count": cellCount
        }, props))
    };

    // This is what we display under the default circumstance (we're displaying our own row)
    const rowJsx = <tr {...useGridNavigationRowProps(rowProps)}>
        {children}
    </tr>

    const Provider = !isInTHead ? UseBodyGridNavigationCellContext.Provider : UseHeadGridNavigationCellContext.Provider as typeof UseBodyGridNavigationCellContext["Provider"];

    return (
        <Provider value={useGridNavigationCell}>
            <RowIndexAsUnsortedContext.Provider value={indexAsUnsorted}>
                {rowJsx}
            </RowIndexAsUnsortedContext.Provider>
        </Provider>
    )
}))

const RowIndexAsUnsortedContext = createContext<number>(null!);

export const TableCell = memo(forwardElementRef(function TableCell({ value: valueAsUnsorted, children, index, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";
    const useGridNavigationCell = useContext(UseBodyGridNavigationCellContext)!;
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

    const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index, text: null, literalValue: valueAsUnsorted });

    const cellProps = {
        ref,
        role: "gridcell",
        "data-value-as-unsorted": `${valueAsUnsorted}`,
        "data-dvalue-as-unsorted": `${displayValue}`,
        className: clsx(variant && `table-${variant}`)
    };


    if (childrenReceiveFocus) {
        const p1 = useMergedProps<any>()(useGridNavigationCellProps({}), props);
        return (
            <td {...cellProps}>
                {cloneElement(children! as any, p1)}
            </td>
        )
    }
    else {
        const p2 = useMergedProps<any>()(useGridNavigationCellProps(cellProps), props);
        return (
            <td {...p2}>
                {stringify(displayValue)}
            </td>
        )
    }
}));

export const TableHeaderCell = forwardElementRef(function TableHeaderCell({ index, focus, children, variant, active, unsortable, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";
    const [sortDirection, setSortDirection, getSortDirection] = useState<null | "ascending" | "descending">(null);
    const isInTHead = useContext(CellIsInHeaderContext);
    const useGridNavigationCell = useContext(UseHeadGridNavigationCellContext)!;
    const { useRefElementProps, element } = useRefElement<HTMLTableCellElement>();
    const [text, setText] = useState(null as null | string);
    useLayoutEffect(() => { if (element) { setText(element.innerText); } }, [element]);
    const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index, text });

    const currentSortedColumn = useContext(CurrentSortedColumnContext);
    const setCurrentSortedColumn = useContext(SetCurrentSortedColumnContext);

    useEffect(() => {
        if (currentSortedColumn != index)
            setSortDirection(null);

    }, [currentSortedColumn, index])

    const onSort = useContext(InternalSortHandlerContext);

    const onSortClick = useCallback(() => {
        let nextSortDirection = getSortDirection();
        if (nextSortDirection === "ascending")
            nextSortDirection = "descending";
        else
            nextSortDirection = "ascending";

        setSortDirection(nextSortDirection);
        onSort?.(index, nextSortDirection);
        setCurrentSortedColumn(prev => index);
    }, [onSort, index]);


    const { hovering, useIsHoveringProps } = useIsHovering<HTMLTableCellElement>();
    const cellProps = useIsHoveringProps(useButtonLikeEventHandlers<HTMLTableCellElement>("th", unsortable ? null : onSortClick, undefined)(
        useRefElementProps(useMergedProps<HTMLTableCellElement>()({
            ref,
            role: "columnheader",
            scope: (isInTHead ? "col" : "row"),
            className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
        }, props))));


    const sortIcon = (
        <Swappable>
            <div {...{ class: clsx("table-sort-icon-container") }}>
                <Flip flipAngleInline={180} open={sortDirection == "descending"}><div class="bi bi-sort-up" /></Flip>
                <Flip flipAngleInline={180} open={(hovering && sortDirection == null) || (sortDirection == "ascending")}><div class="bi bi-sort-down-alt" /></Flip>
            </div>
        </Swappable>
    );

    if (focus === "child") {
        return <th {...cellProps}><div class="th-spacing">{cloneElement(children as VNode<any>, useGridNavigationCellProps({}), (children as VNode<any>).props.children)}{sortIcon}</div></th>;
    }
    else {
        return <th {...useGridNavigationCellProps(cellProps)}><div class="th-spacing">{children}{sortIcon}</div></th>
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
