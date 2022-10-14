
import { useChildrenTextProps } from "list/utility";
import { cloneElement, h, RenderableProps, VNode } from "preact";
import { CheckboxCheckedType, CheckboxGroup as BaseCheckboxGroup, CheckboxGroupChild as BaseCheckboxGroupChild, CheckboxGroupParent as BaseCheckboxGroupParent, defaultRenderCheckboxGroupChild, EventDetail } from "preact-aria-widgets";
import { returnUndefined, usePassiveState, useStableCallback } from "preact-prop-helpers";
import { useContext, useEffect, useRef } from "preact/hooks";
import { OmitStrong, useDocument } from "../props";
import { Checkbox, CheckboxProps } from "./input-checkbox";

export function CheckboxGroup({ children, ...rest }: RenderableProps<{}>) {
    return (
        <BaseCheckboxGroup
            render={(info, modifyChildContainerProps) => {
                return (<div {...modifyChildContainerProps({ ...rest })}>{children}</div>);
            }}

        />
    )
}

export interface CheckboxGroupParentProps extends Omit<CheckboxProps, "checked"> {
    // In most cases, this is 0, as the parent checkbox comes first.
    // If it comes at the end, then you'd use e.g. 10 (if there are 10 children) instead.
    index: number;
}

/**
 * This is the parent checkbox that both reflects the state
 * of all the child checkboxes, but can also update them all
 * at once by interacting with it.
 * 
 * @returns 
 */
export function CheckboxGroupParent({ index, onCheck, ...rest }: CheckboxGroupParentProps) {
    const { childrenText, props } = useChildrenTextProps(rest);
    return (
        <BaseCheckboxGroupParent<HTMLInputElement, HTMLLabelElement>
            index={index}
            subInfo={undefined}
            text={childrenText ?? ""}
            render={({ checkboxGroupParent: { checked, getPercent, onParentCheckedChange } }, modifyControlProps) => {
                return (
                    <Checkbox
                        checked={checked}
                        onCheck={async (checked, e) => { await onParentCheckedChange(e); }}
                        {...modifyControlProps(props)}
                    />
                )
            }}
        />
    )
}

export interface CheckboxGroupChildProps extends CheckboxProps {
    /**
     * This should generally start at 1, assuming that the parent is index 0.
     */
    index: number;
}

export function CheckboxGroupChild({ onCheck, checked, index, disabled, ...rest }: CheckboxGroupChildProps) {
    const { childrenText, props } = useChildrenTextProps(rest);
    const inputElement = useRef<HTMLInputElement>(null);
    return (
        <BaseCheckboxGroupChild<HTMLInputElement, HTMLLabelElement>
            checked={checked}
            index={index}
            text={childrenText ?? ""}
            subInfo={undefined}
            onChangeFromParent={async (checked, e) => { await onCheck?.(checked as boolean, e as h.JSX.TargetedEvent<HTMLInputElement, Event>); }}
            focus={useStableCallback(() => inputElement.current?.focus())}
            render={({ checkboxGroupChild: { onControlIdChanged, onChildCheckedChange } }, modifyControlProps) => {

                const [_getControlId, setControlId] = usePassiveState<string | undefined>(onControlIdChanged, returnUndefined);
                // TODO: Effect running once every render is pretty lame, but how else do we get the ID?
                useEffect(() => { setControlId(inputElement.current?.id); return () => setControlId(undefined); });
                
                return (
                    <Checkbox
                        checked={checked}
                        disabled={false}
                        onCheck={(checked, event) => { onChildCheckedChange(checked); onCheck?.(checked, event);}}
                        {...modifyControlProps(props)}
                    />)
            }}
        />
    )
}


/*
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

    const { callCount, pending, rejectCount, settleCount, resolveCount, currentType, currentCapture, syncHandler } = useAsyncHandler<CheckboxGroupChangeEvent<h.JSX.TargetedEvent<HTMLInputElement>>, boolean | Map<number, boolean | "mixed">>(onUpdateChildrenAsync, { capture: e => { return e[EventDetail].childrenChecked } });

    const onUpdateChildrenSync = (pending ? () => { } : syncHandler);

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
 *\/
export const CheckboxGroupChild = memo(forwardElementRef(function CheckboxGroupChild(p: CheckboxGroupChildProps, ref?: Ref<any>) {

    let { childrenText, props: { index, checked, onCheck, id, ...props } } = useChildrenTextProps({ ...p, ref });
    checked ||= false;

    const randomId = generateRandomId("cbc-");
    id ??= randomId;

    const useCheckboxGroupChild = useContext(UseCheckboxGroupChildContext)!;

    let setChecked = (checked: boolean | "mixed") => {
        return onCheck(checked as any, null);
    }



    const { tabbable, useCheckboxGroupChildProps } = useCheckboxGroupChild({ index, checked: checked, text: childrenText, id, setChecked });


    return (
        <Checkbox {...useCheckboxGroupChildProps({ id, ...(props as any) })} onCheck={onCheck} checked={checked} />
    )
}));

*/
