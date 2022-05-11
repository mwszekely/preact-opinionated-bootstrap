import { createContext, h } from "preact";
import { useGridNavigation, UseGridNavigationCell, UseGridNavigationRow, UseGridNavigationRowParameters, useHasFocus } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { GlobalAttributes } from "props";

export function useListCombo() {

}

export interface ListComboProps extends GlobalAttributes<HTMLDivElement> {

}
/*
export interface ListComboRowProps extends GlobalAttributes<HTMLDivElement>, UseGridNavigationRowParameters {

}

const UseGridNavigationRowContext = createContext<UseGridNavigationRow<HTMLDivElement, any> | null>(null!);
const UseGridNavigationCellContext = createContext<UseGridNavigationCell<any> | null>(null!);
function ListCombo({ children, ...props }: ListComboProps) {
    const { focusedInner, useHasFocusProps } = useHasFocus<HTMLDivElement>()
    const { cellIndex, rowCount, rowIndex, useGridNavigationRow } = useGridNavigation<HTMLDivElement, HTMLDivElement>({ focusOnChange: focusedInner });

    return (
        <UseGridNavigationRowContext.Provider value={useGridNavigationRow}>
            <div {...useHasFocusProps({ ...props })}>
                {children}
            </div>
        </UseGridNavigationRowContext.Provider>
    )
}

export function ListComboRow({ children, index, ...props }: ListComboRowProps) {
    const { cellCount, isTabbableRow, tabbableCell, useGridNavigationCell, useGridNavigationRowProps } = useContext(UseGridNavigationRowContext)!({ index });
    
}
*/