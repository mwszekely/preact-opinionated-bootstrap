
import { ComponentChildren, createContext, h, Ref } from "preact";
import { CheckboxGroupChangeEvent, EventDetail, useCheckboxGroup, UseCheckboxGroupParentProps } from "preact-aria-widgets";
import { generateRandomId, useAsyncHandler } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { useChildrenTextProps } from "../list/utility";
import { forwardElementRef, OmitStrong } from "../props";
import { Checkbox, CheckboxProps } from "./input-checkbox";
import { CheckboxGroupChildInfo, UseCheckboxGroupChildContext } from "./props";




const CheckboxGroupParentOnInputContext = createContext<(e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => void>(null!);
const CheckboxGroupParentCheckedContext = createContext<boolean | "mixed">(false);
const UseCheckboxGroupParentPropsContext = createContext<UseCheckboxGroupParentProps<HTMLInputElement>>(null!);

export interface CheckboxGroupProps {
    children?: ComponentChildren;
}

export function returnFalse() { return false; }

export function CheckboxGroup({ children }: CheckboxGroupProps) {

    const onUpdateChildrenAsync = (value: boolean | Map<number, boolean | "mixed">): (Promise<void> | void) => {
        let results = managedCheckboxes.map((child, index) => child.setChecked(typeof value === "boolean" ? value : (value.get(index) ?? false))).filter(r => !!r);
        if (results.length) {
            console.assert("then" in (results[0] as Promise<any>));
            return Promise.all(results as Promise<void>[]).then(() => { });
        }

        return;
    };

    const { callCount, pending, rejectCount, settleCount, resolveCount, currentType, currentCapture, useSyncHandler } = useAsyncHandler<HTMLInputElement>()<CheckboxGroupChangeEvent<h.JSX.TargetedEvent<HTMLInputElement>>, boolean | Map<number, boolean | "mixed">>({ capture: e => { return e[EventDetail].childrenChecked } });

    const onUpdateChildrenSync = useSyncHandler(pending ? () => { } : onUpdateChildrenAsync);

    const { managedCheckboxes, currentTypeahead, focus, invalidTypeahead, onCheckboxGroupParentInput, tabbableIndex, useCheckboxGroupChild, useCheckboxGroupParentProps, parentIsChecked, parentPercentChecked } = useCheckboxGroup<HTMLInputElement, CheckboxGroupChildInfo>({ shouldFocusOnChange: returnFalse, onUpdateChildren: onUpdateChildrenSync! })


    return (
        <CheckboxGroupParentOnInputContext.Provider value={onCheckboxGroupParentInput}>
            <CheckboxGroupParentCheckedContext.Provider value={parentIsChecked}>
                <UseCheckboxGroupParentPropsContext.Provider value={useCheckboxGroupParentProps}>
                    <UseCheckboxGroupChildContext.Provider value={useCheckboxGroupChild}>
                            {children}
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




interface CheckboxGroupChildProps1 extends OmitStrong<CheckboxProps, "onCheck"> {
    index: number;

    // It's rare for onCheck to be called with "mixed"--it will ONLY happen
    // when the checkbox was already "mixed", then the parent was toggled,
    // which changes this checkbox from mixed to off to mixed again.
    onCheck(checked: boolean | "mixed", event: null | h.JSX.TargetedEvent<HTMLInputElement>): (void | Promise<void>);
}

interface CheckboxGroupChildProps2 extends OmitStrong<CheckboxProps, "onCheck"> {
    index: number;
    
    onCheck(checked: boolean, event: null | h.JSX.TargetedEvent<HTMLInputElement>): (void | Promise<void>);
}

export type CheckboxGroupChildProps = CheckboxGroupChildProps1 | CheckboxGroupChildProps2;

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
export const CheckboxGroupChild = memo(forwardElementRef(function CheckboxGroupChild(p: CheckboxGroupChildProps, ref?: Ref<any>) {

    let { childrenText, props: { index, checked, onCheck, id, ...props } } = useChildrenTextProps({ ...p, ref });

    const randomId = generateRandomId("cbc-");
    id ??= randomId;

    const useCheckboxGroupChild = useContext(UseCheckboxGroupChildContext)!;

    let setChecked = (checked: boolean | "mixed") => {
        return onCheck(checked as any, null);
    }



    const { tabbable, useCheckboxGroupChildProps } = useCheckboxGroupChild({ index, checked, text: childrenText, id, setChecked });


    return (
        <Checkbox {...useCheckboxGroupChildProps({ id, ...props })} onCheck={onCheck} checked={checked} />
    )
}));


