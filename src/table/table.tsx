import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, createElement, FunctionComponent, h, Ref, VNode } from "preact";
import { useButtonLikeEventHandlers } from "preact-aria-widgets/use-button";
import { useGridNavigation, UseGridNavigationCell, UseGridNavigationCellInfo, UseGridNavigationCellParameters, UseGridNavigationRow, UseGridNavigationRowInfo, UseGridNavigationRowParameters, useHasFocus, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { Fade, Swappable } from "preact-transition";
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
export interface TableBodyProps extends GlobalAttributes<HTMLTableSectionElement> { variant?: TableVariant; }
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
    overriddenRowIndex: number;

    /**
     * Alternative to `overriddenRowIndex` that a table cell child may use
     * to display the correct data when the table is sorted. 
     */
    overriddenValue: T;
}

type T = number | string | Date | null | undefined | boolean;

export interface TableRowProps extends Omit<UseGridNavigationRowParameters<TableBodyRowInfo>, "text" | "setOverriddenRowIndex" | "getManagedCells" | "setSetRelatedSiblingChildren" | "onChildrenUpdate" | "setOverriddenChildren"> { variant?: TableCellVariant; children?: ComponentChildren }
export interface TableCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "provideWithSiblingsSetOverriddenValue" | "setOverriddenValue" | "text" | "literalValue" | "displayValue" | "overriddenValue"> { value: T; children?: string | FunctionComponent<TableCellChildProps<any>>, focus?: "cell" | "child", variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends Omit<UseGridNavigationCellParameters<TableBodyCellInfo>, "provideWithSiblingsSetOverriddenValue" | "setOverriddenValue" | "text" | "literalValue" | "displayValue" | "overriddenValue"> { unsortable?: boolean; children: ComponentChildren; focus?: "cell" | "child"; variant?: TableCellVariant; active?: boolean; }

interface TableBodyRowInfo extends UseGridNavigationRowInfo {
    getManagedCells: () => TableBodyCellInfo[];

    /**
     * To handle sorting, each row has its literal row, and its overridden row.
     * 
     * The literal row is just what actual index into the table we are. What index in the DOM we are.
     * 
     * The overridden row is which row's children is *actually* being displayed there.
     * 
     * Each row communicates with each other and swaps children around as sorting takes place.
     * @param index 
     */
    setOverriddenRowIndex(index: number): void;
}

interface TableBodyCellInfo<T extends number | string | Date | null | undefined | boolean = number | string | Date | null | undefined | boolean> extends UseGridNavigationCellInfo {

    /**
     * This is the value that, originally passed to the cell,
     * represents what value this cell would show if we weren't sorted.
     * 
     * This value
     */
    literalValue: T;

    /**
     * This is the value that is actually displayed in the cell, at least before sorting.
     * 
     * It's usually the same as the `literalValue`, but can be specified explicitly, which is useful for, e.g., formatting dates.
     */
    displayValue: T;

    /**
     * The value that, because the table is sorted (at least now, for the sake of argument),
     * should be shown in this cell instead of the literalValue or displayValue.
     */
    overriddenValue: T;

    /**
     * Used to remotely "update" a cell's value
     * when the table is sorted. (Of course the cell
     * keeps the same props so the literalValue doesn't
     * change, but it re-renders with a new overriddenValue)
     * 
     * @param value 
     */
    setOverriddenValue(value: T): void;

    /**
     * In conjunction with the above, used so that siblings
     * can affect this cell's value to display whenever
     * the table is sorted.
     * 
     * Whenever the cell re-renders, any changes to the
     * literalValue (or displayValue) will be sent to that
     * function, which will be spookily entangled with the 
     * correct cell that it's handling sorts with.  In short,
     * calling this hook forces that cell to re-render and
     * possibly tell its partner to also re-render. An update
     * to the value props do the same.
     * 
     * Be warned that, as a setState function that itself
     * takes a function, you'll want to make sure you use
     * the 
     * 
     * `(prev) => returnValue`
     * 
     * form *explicitly*.
     * 
     * @param setSetOverriddenValue
     */
    provideWithSiblingsSetOverriddenValue(setSetOverriddenValue: StateUpdater<(value: any) => void>): void;
}

export interface TableHeadRowInfo extends UseGridNavigationRowInfo {}
export interface TableHeadCellInfo extends UseGridNavigationCellInfo {}

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
    if (`${+lhs}` === lhs)
        lhs = +lhs;
    if (`${+rhs}` === rhs)
        rhs = +rhs;

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
        return lhs != null ? -1 : 1

    }
    return compare2(lhs, rhs);
}

const SortContext = createContext<(column: number, direction: "ascending" | "descending") => void>(null!);
export const TableBody = forwardElementRef(function TableBody({ children, variant, ...props }: TableBodyProps, ref: Ref<HTMLTableSectionElement>) {
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLTableSectionElement>({})
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow, managedRows } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableBodyRowInfo, TableBodyCellInfo>({ focusOnChange: focusedInner });

    // This hooks up to internalSortHandler, used by the table head.
    const sort = useCallback((column: number, direction: "ascending" | "descending"): Promise<void> | void => {
        let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
            let result = compare1(lhsRow.getManagedCells()[column].literalValue, rhsRow.getManagedCells()[column].literalValue);
            if (direction[0] == "d")
                return -result;
            return result;
        });

        for (let literalIndex = 0; literalIndex < sortedRows.length; ++literalIndex) {
            const overriddenIndex = sortedRows[literalIndex].index;

            const overriddenCells = sortedRows[overriddenIndex].getManagedCells();
            const literalCells = sortedRows[literalIndex].getManagedCells();
            managedRows[literalIndex].setOverriddenRowIndex(overriddenIndex);
            for (let cellIndex = 0; cellIndex < overriddenCells.length; ++cellIndex) {
                overriddenCells[cellIndex].provideWithSiblingsSetOverriddenValue(() => literalCells[cellIndex].setOverriddenValue)
            }
        }
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

                    {children}

                </SortContext.Provider>
            </UseBodyGridNavigationRowContext.Provider >
        </tbody>
    )
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


export const TableRow = forwardElementRef(function TableRow({ children, index: literalRowIndex, variant, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    const isInTHead = useContext(CellIsInHeaderContext);
    const useGridNavigationRow = useContext(isInTHead? (UseHeadGridNavigationRowContext as typeof UseBodyGridNavigationRowContext) : UseBodyGridNavigationRowContext)!;
    const [overriddenRowIndex, setOverriddenRowIndex] = useState(literalRowIndex);

    const { cellCount, useGridNavigationRowProps, useGridNavigationCell, tabbableCell, isTabbableRow, managedCells } = useGridNavigationRow({
        index: literalRowIndex, setOverriddenRowIndex, getManagedCells: useStableCallback(() => managedCells)
    });




    const rowProps = {
        children, ...(useMergedProps<HTMLTableRowElement>()({
            ref,
            role: "row",
            "data-literal-index": literalRowIndex,
            "data-overridden-index": overriddenRowIndex,
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

    const Provider = !isInTHead? UseBodyGridNavigationCellContext.Provider : UseHeadGridNavigationCellContext.Provider as typeof UseBodyGridNavigationCellContext["Provider"];

    return (
        <Provider value={useGridNavigationCell}>
            <OverriddenRowIndexContext.Provider value={overriddenRowIndex}>
                {rowJsx}
            </OverriddenRowIndexContext.Provider>
        </Provider>
    )
})

const OverriddenRowIndexContext = createContext<number>(null!);

export const TableCell = forwardElementRef(function TableCell({ value: literalValue,  children, index, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";
    const useGridNavigationCell = useContext(UseBodyGridNavigationCellContext)!;
    const isDisplayChildren = (typeof children == "string" || typeof children == "number" || typeof children == "boolean");
    const displayValue = isDisplayChildren? children : literalValue;

    const [overriddenValue, setOverriddenValue] = useState(literalValue);
    const [setSiblingOverriddenValue, provideWithSiblingsSetOverriddenValue] = useState<null | ((value: any) => void)>(null);

    const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index, text: null, overriddenValue, literalValue, displayValue, provideWithSiblingsSetOverriddenValue, setOverriddenValue });

    const overriddenRowIndex = useContext(OverriddenRowIndexContext);
    const cellProps = useMergedProps<HTMLTableCellElement>()({
        ref,
        role: "gridcell",
        "data-literal-value": `${literalValue}`,
        "data-display-value": `${displayValue}`,
        "data-overridden-value": `${overriddenValue}`,
        "data-overridden-row": `${overriddenRowIndex}`,
        className: clsx(variant && `table-${variant}`)
    },
        props);

    useEffect(() => {
        setSiblingOverriddenValue?.(displayValue);
    }, [setSiblingOverriddenValue, displayValue]);


    if (children && !isDisplayChildren) {
        return (
            <td {...cellProps}>
                {createElement(children! as any, useGridNavigationCellProps( { overriddenRowIndex, overriddenValue, className: "test" }))}
            </td>
        )
    }
    else {
        return (
            <td {...useGridNavigationCellProps(cellProps)}>
                {stringify(overriddenValue)}
            </td>
        )
    }
});

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


    const cellProps = useButtonLikeEventHandlers<HTMLTableCellElement>("th", unsortable? null : onSortClick, undefined)(
        useRefElementProps(useMergedProps<HTMLTableCellElement>()({
            ref,
            role: "columnheader",
            scope: (isInTHead ? "col" : "row"),
            className: clsx(variant && `table-${variant}`, unsortable && "unsortable")
        }, props)));


    const sortIcon = (
        <Swappable>
            <div class={clsx("table-sort-icon-container", `sort-direction-${sortDirection ?? "null"}`)}>
                <Fade open={sortDirection == null}><i class="bi bi-sort-down-alt hover-only"></i></Fade>
                <Fade open={sortDirection == "descending"}><i class="bi bi-sort-up no-hover-only"></i></Fade>
                <Fade open={sortDirection == "descending"}><i class="bi bi-sort-down-alt hover-only"></i></Fade>
                <Fade open={sortDirection == "ascending"}><i class="bi bi-sort-down-alt no-hover-only"></i></Fade>
                <Fade open={sortDirection == "ascending"}><i class="bi bi-sort-up hover-only"></i></Fade>
            </div>
        </Swappable>
    );

    if (focus === "child") {
        return <th {...cellProps}><div>{cloneElement(children as VNode<any>, useGridNavigationCellProps({}), (children as VNode<any>).props.children)}{sortIcon}</div></th>;
    }
    else {
        return <th {...useGridNavigationCellProps(cellProps)}><div>{children}{sortIcon}</div></th>
    }

})


function stringify(value: number | string | Date | null | undefined | boolean) {
    if (value == null)
        return null;

    // TODO: This could be a lot better
    if (value instanceof Date)
        return value.toLocaleString()

    return `${value}`;
}
