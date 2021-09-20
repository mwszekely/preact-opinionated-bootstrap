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
     * Alternatively, using `displayValue`, the child may
     * use the valud directly.  Use whichever is more
     * appropriate for your use case.
     */
    displayRowIndex: number;

    /**
     * Alternative to `displayRowIndex` that a table cell child may use
     * to display the correct data when the table is sorted. 
     */
    displayValue: number | string | Date | null | undefined | boolean;
}

export interface TableRowProps extends Omit<UseGridNavigationRowParameters<TableRowInfo>, "text" | "setDisplayRowIndex" | "getManagedCells" | "setSetRelatedSiblingChildren" | "onChildrenUpdate" | "setDisplayChildren"> { variant?: TableCellVariant; children?: ComponentChildren }
export interface TableCellProps extends Omit<UseGridNavigationCellParameters<TableCellInfo>, "provideWithSiblingsSetDisplayValue" | "setDisplayValue" | "text" | "literalValue"> { children?: FunctionComponent<TableCellChildProps<any>>, focus?: "cell" | "child", variant?: TableCellVariant; active?: boolean; }
export interface TableHeaderCellProps extends Omit<UseGridNavigationCellParameters<TableCellInfo>, "provideWithSiblingsSetDisplayValue" | "setDisplayValue" | "text" | "literalValue"> { children?: ComponentChildren; focus?: "cell" | "child"; variant?: TableCellVariant; active?: boolean; }

interface TableRowInfo extends UseGridNavigationRowInfo {
    getManagedCells: () => TableCellInfo[];

    /**
     * To handle sorting, each row has its literal row, and its display row.
     * 
     * The literal row is just what actual index into the table we are. What index in the DOM we are.
     * 
     * The display row is which row's children is *actually* being displayed there.
     * 
     * Each row communicates with each other and swaps children around as sorting takes place.
     * @param index 
     */
    setDisplayRowIndex(index: number): void;

    /**
     * The function actually called to update a row's children.
     * 
     * Calling this results in the sibling immediately re-rendering,
     * so use with caution to avoid infinite loops.
     * 
     * @param displayChildren The actual row to display
     */
    //setDisplayChildren(displayChildren: h.JSX.Element): void;

    /**
     * For any given row, it needs to be able to
     * call a function that will tell the correct sibling
     * which sorted row it should be displaying (
     * so effectively the sibling's setDisplayChildren function).
     * 
     * The table body sorts out those functions, and when
     * one of them changes, will notify the row of that change here.
     * @param setRelatedSiblingChildren 
     */
    //setSetRelatedSiblingChildren(setRelatedSiblingChildren: (displayChildren: h.JSX.Element) => void): void;
}

interface TableCellInfo<T extends number | string | Date | null | undefined | boolean = number | string | Date | null | undefined | boolean> extends UseGridNavigationCellInfo {
    value: T;

    /**
     * This is the value that, originally passed to the cell,
     * represents what value this cell would show if we weren't sorted.
     */
    literalValue: T;

    /**
     * Used to remotely set a cell's value to display whenever
     * the table is sorted.
     * 
     * @param value 
     */
    setDisplayValue(value: T): void;

    /**
     * In conjunction with the above, used so that siblings
     * can affect this cell's value to display whenever
     * the table is sorted.
     * 
     * Be warned that, as a setState function that itself
     * takes a function, you'll want to make sure you use
     * the 
     * `(prev) => returnValue`
     * form *explicitly*.
     * 
     * @param setSetDisplayValue
     */
    provideWithSiblingsSetDisplayValue(setSetDisplayValue: StateUpdater<(value: any) => void>): void;
}

const CurrentSortedColumnContext = createContext<null | number>(null);
const SetCurrentSortedColumnContext = createContext<StateUpdater<null | number>>(null!);

// This is the hook that rows use for navigation
const UseGridNavigationRowContext = createContext<UseGridNavigationRow<HTMLTableRowElement, HTMLTableCellElement, TableRowInfo, TableCellInfo> | null>(null!);
// This is the hook that cells use for navigation
const UseGridNavigationCellContext = createContext<UseGridNavigationCell<HTMLTableCellElement, TableCellInfo> | null>(null!);

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
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableRowInfo, TableCellInfo>({ focusOnChange: focusedInner });

    return (

        <UseGridNavigationRowContext.Provider value={useGridNavigationRow}>
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
        </UseGridNavigationRowContext.Provider >
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
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow, managedRows } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableRowInfo, TableCellInfo>({ focusOnChange: focusedInner });

    // This hooks up to internalSortHandler, used by the table head.
    const sort = useCallback((column: number, direction: "ascending" | "descending"): Promise<void> | void => {
        let sortedRows = managedRows.slice().sort((lhsRow, rhsRow) => {
            let result = compare1(lhsRow.getManagedCells()[column].literalValue, rhsRow.getManagedCells()[column].literalValue);
            if (direction[0] == "d")
                return -result;
            return result;
        });

        for (let literalIndex = 0; literalIndex < sortedRows.length; ++literalIndex) {
            const displayIndex = sortedRows[literalIndex].index;

            const displayCells = sortedRows[displayIndex].getManagedCells();
            const literalCells = sortedRows[literalIndex].getManagedCells();
            managedRows[literalIndex].setDisplayRowIndex(displayIndex);
            for (let cellIndex = 0; cellIndex < displayCells.length; ++cellIndex) {
                displayCells[cellIndex].provideWithSiblingsSetDisplayValue(() => literalCells[cellIndex].setDisplayValue)
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
            <UseGridNavigationRowContext.Provider value={useGridNavigationRow}>
                <SortContext.Provider value={sort}>

                    {children}

                </SortContext.Provider>
            </UseGridNavigationRowContext.Provider >
        </tbody>
    )
})

export const TableFoot = forwardElementRef(function TableFoot({ children, variant, ...props }: TableFootProps, ref: Ref<HTMLTableSectionElement>) {
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLTableSectionElement>({})
    const { cellIndex, rowIndex, rowCount, useGridNavigationRow } = useGridNavigation<HTMLTableRowElement, HTMLTableCellElement, TableRowInfo, TableCellInfo>({ focusOnChange: focusedInner });

    return (
        <UseGridNavigationRowContext.Provider value={useGridNavigationRow}>
            <tfoot {...useHasFocusProps(useMergedProps<HTMLTableSectionElement>()({
                ref,
                "data-current-row": rowIndex,
                "data-current-column": cellIndex,
                "data-row-count": rowCount,
                className: clsx(variant && `table-${variant}`)
            }, props))}>{children}</tfoot>
        </UseGridNavigationRowContext.Provider >
    )
})


export const TableRow = forwardElementRef(function TableRow({ children, index: literalIndex, variant, ...props }: TableRowProps, ref: Ref<HTMLTableRowElement>) {
    const useGridNavigationRow = useContext(UseGridNavigationRowContext)!;
    const [displayIndex, setDisplayIndex] = useState(literalIndex);

    const { cellCount, useGridNavigationRowProps, useGridNavigationCell, tabbableCell, isTabbableRow, managedCells } = useGridNavigationRow({
        index: literalIndex, setDisplayRowIndex: setDisplayIndex, getManagedCells: useStableCallback(() => managedCells)
    });


    const isInTHead = useContext(CellIsInHeaderContext);


    const rowProps = {
        children, ...(useMergedProps<HTMLTableRowElement>()({
            ref,
            role: "row",
            "data-literal-index": literalIndex,
            "data-display-index": displayIndex,
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

    return (
        <UseGridNavigationCellContext.Provider value={useGridNavigationCell}>
            <DisplayRowIndexContext.Provider value={displayIndex}>
                {rowJsx}
            </DisplayRowIndexContext.Provider>
        </UseGridNavigationCellContext.Provider>
    )
})

const DisplayRowIndexContext = createContext<number>(null!);

export const TableCell = forwardElementRef(function TableCell({ value: literalValue, children, index, variant, focus, active, ...props }: TableCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";
    const useGridNavigationCell = useContext(UseGridNavigationCellContext)!;

    const [displayValue, setDisplayValue] = useState(literalValue);
    const [setSiblingDisplayValue, provideWithSiblingsSetDisplayValue] = useState<null | ((value: any) => void)>(null);

    const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index, text: null, value: displayValue, literalValue, provideWithSiblingsSetDisplayValue, setDisplayValue });

    const displayRowIndex = useContext(DisplayRowIndexContext);
    const cellProps = useMergedProps<HTMLTableCellElement>()({
        ref,
        role: "gridcell",
        "data-literal-value": literalValue,
        "data-display-value": displayValue,
        "data-display-row": displayRowIndex,
        className: clsx(variant && `table-${variant}`)
    },
        props);

    useEffect(() => {
        setSiblingDisplayValue?.(literalValue);
    }, [setSiblingDisplayValue, literalValue]);


    if (children) {
        return (
            <td {...cellProps}>
                {createElement(children! as any, useGridNavigationCellProps( { displayRowIndex, displayValue, className: "test" }))}
            </td>
        )
    }
    else {
        return (
            <td {...useGridNavigationCellProps(cellProps)}>
                {stringify(displayValue)}
            </td>
        )
    }
});

export const TableHeaderCell = forwardElementRef(function TableHeaderCell({ index, focus, value, children, variant, active, ...props }: TableHeaderCellProps, ref: Ref<HTMLTableCellElement>) {
    focus ??= "cell";
    const [sortDirection, setSortDirection, getSortDirection] = useState<null | "ascending" | "descending">(null);
    const isInTHead = useContext(CellIsInHeaderContext);
    const useGridNavigationCell = useContext(UseGridNavigationCellContext)!;
    const { useRefElementProps, element } = useRefElement<HTMLTableCellElement>();
    const [text, setText] = useState(null as null | string);
    useLayoutEffect(() => { if (element) { setText(element.innerText); } }, [element]);
    const { tabbable, useGridNavigationCellProps } = useGridNavigationCell({ index, text, value, literalValue: value, setDisplayValue: noop, provideWithSiblingsSetDisplayValue: noop });

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


    const cellProps = useButtonLikeEventHandlers<HTMLTableCellElement>("th", onSortClick, undefined)(
        useRefElementProps(useMergedProps<HTMLTableCellElement>()({
            ref,
            role: "columnheader",
            scope: (isInTHead ? "col" : "row"),
            className: clsx(variant && `table-${variant}`)
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
        return <th {...useGridNavigationCellProps(cellProps)}><div>{children ?? stringify(value)}{sortIcon}</div></th>
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
