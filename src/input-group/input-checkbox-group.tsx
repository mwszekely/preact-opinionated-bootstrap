
import { ComponentChildren, createContext, h } from "preact";
import { CheckboxGroupChangeEvent, EventDetail, useCheckboxGroup, UseCheckboxGroupParentProps } from "preact-aria-widgets";
import { generateRandomId, useAsyncHandler, useHasFocus, useLayoutEffect, useMutationObserver, usePassiveState, useRefElement, useState } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { OmitStrong } from "../props";
import { Checkbox, CheckboxProps } from "./input-checkbox";
import { CheckboxGroupChildInfo, UseCheckboxGroupChildContext } from "./props";




const CheckboxGroupParentOnInputContext = createContext<(e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => void>(null!);
const CheckboxGroupParentCheckedContext = createContext<boolean | "mixed">(false);
const UseCheckboxGroupParentPropsContext = createContext<UseCheckboxGroupParentProps<HTMLInputElement>>(null!);

export interface CheckboxGroupProps {
    children?: ComponentChildren;
}

export function CheckboxGroup({ children }: CheckboxGroupProps) {
    const { useHasFocusProps, getFocusedInner } = useHasFocus<HTMLDivElement>({  })

    const onUpdateChildrenAsync = (value: boolean | Map<number, boolean | "mixed">): (Promise<void> | void) => {
        let results = managedCheckboxes.map((child, index) => child.setChecked(typeof value === "boolean" ? value : (value.get(index) ?? false))).filter(r => !!r);
        if (results.length) {
            console.assert("then" in (results[0] as Promise<any>));
            return Promise.all(results as Promise<void>[]).then(() => { });
        }

        return;
    };

    const { callCount, pending, rejectCount, settleCount, resolveCount, currentType, currentCapture, getSyncHandler } = useAsyncHandler<HTMLInputElement>()<CheckboxGroupChangeEvent<h.JSX.TargetedEvent<HTMLInputElement>>, boolean | Map<number, boolean | "mixed">>({ capture: e => { return e[EventDetail].childrenChecked } });

    const onUpdateChildrenSync = getSyncHandler(pending ? () => { } : onUpdateChildrenAsync);

    const { managedCheckboxes, currentTypeahead, focus, invalidTypeahead, onCheckboxGroupParentInput, tabbableIndex, useCheckboxGroupChild, useCheckboxGroupParentProps, parentIsChecked, parentPercentChecked } = useCheckboxGroup<HTMLInputElement, CheckboxGroupChildInfo>({ shouldFocusOnChange: getFocusedInner, onUpdateChildren: onUpdateChildrenSync! })


    return (
        <CheckboxGroupParentOnInputContext.Provider value={onCheckboxGroupParentInput}>
            <CheckboxGroupParentCheckedContext.Provider value={parentIsChecked}>
                <UseCheckboxGroupParentPropsContext.Provider value={useCheckboxGroupParentProps}>
                    <UseCheckboxGroupChildContext.Provider value={useCheckboxGroupChild}>
                        <div {...useHasFocusProps({ class: "checkbox-group" })}>
                            {children}
                        </div>
                    </UseCheckboxGroupChildContext.Provider>
                </UseCheckboxGroupParentPropsContext.Provider>
            </CheckboxGroupParentCheckedContext.Provider>
        </CheckboxGroupParentOnInputContext.Provider>
    )

}

/**
 * This is the parent checkbox that both reflects the state
 * of all the child checkboxes, but can also update them all
 * at once by interacting with it.
 * 
 * @param props 
 * @returns 
 */
export function CheckboxGroupParent(props: OmitStrong<CheckboxProps, "checked" | "onCheck">) {
    const checked = useContext(CheckboxGroupParentCheckedContext);

    // All this does is notify the parent CheckboxGroup component
    // to switch states and then tell all checkboxes to update themselves
    // accordingly.
    const onInput = useContext(CheckboxGroupParentOnInputContext);

    return (
        <Checkbox checked={checked} onCheck={(_, e) => onInput(e)} {...props} />
    )
}




export interface CheckboxGroupChildProps extends OmitStrong<CheckboxProps, "onCheck"> {
    index: number;
    onCheck(checked: boolean | "mixed", event: null | h.JSX.TargetedEvent<HTMLInputElement>): (void | Promise<void>);
}

/**
 * This is a child checkbox of a `CheckboxGroup`.
 * 
 * Effectively the only differences to a normal `Checkbox` are
 * the addition of an `index` prop and the fact that your
 * onCheck must be able to handle "mixed" as a value, which can
 * occur if the child is set to be mixed, unset by the parent
 * checkbox, and then "restored" by the parent checkbox a few
 * clicks later.
 * 
 * @param param0 
 * @returns 
 */
export function CheckboxGroupChild({ index, checked, onCheck, id, ...props }: CheckboxGroupChildProps) {

    const randomId = generateRandomId("cbc-");
    id ??= randomId;

    const [text, setText] = useState<string | null>(null);
    
    const { useRefElementProps, getElement } = useRefElement<HTMLInputElement>({  });
    useMutationObserver(getElement, { subtree: true, onCharacterData: (info) => setText(getElement()?.innerText ?? "") });

    const useCheckboxGroupChild = useContext(UseCheckboxGroupChildContext)!;

    let setChecked = (checked: boolean | "mixed") => {
        return onCheck(checked, null);
    }



    const { tabbable, useCheckboxGroupChildProps } = useCheckboxGroupChild({ index, checked, text, id, setChecked });


    return (
        <Checkbox {...useRefElementProps(useCheckboxGroupChildProps({ id, ...props }))} onCheck={onCheck} checked={checked} />
    )
}


