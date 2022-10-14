import clsx from "clsx";
import { useChildrenTextProps } from "list/utility";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { EventDetail, RadioChangeEvent, useRadioGroup, UseRadioGroupParameters, UseRadioParameters, UseRadio } from "preact-aria-widgets";
import { ChildFlagOperations, generateRandomId, useAsyncHandler, useChildrenFlag, useMergedProps, useRandomId, useStableCallback, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext, useEffect, useRef } from "preact/hooks";
import { forwardElementRef, OmitStrong, useDocument } from "../props";
import { CheckboxLike } from "./checkbox-like";

export interface RadioGroupProps<V extends string | number> {
    children?: ComponentChildren;
    label?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden";
    onValueChange(value: V, event: h.JSX.TargetedEvent<HTMLInputElement | HTMLLabelElement>): (void | Promise<void>);
    name?: string;
    selectedValue: UseRadioGroupParameters<V, any, any, any>["radioGroup"]["selectedValue"];
}

export interface RadioProps<V extends string | number, I extends Element, L extends Element> /*extends OmitStrong<UseRadioParameters<V, I, L, RadioInfo>, "labelPosition" | "text" | "disabled" | "setAsyncState">*/ {
    index: number;
    value: V;
    children?: ComponentChildren;
    labelPosition?: "start" | "end" | "hidden" | "tooltip" | "button";
    disabled?: boolean;
    inline?: boolean;
    hidden?: boolean;
}

interface RadioInfo {
    foo: "bar"
    //setAsyncState(state: null | "pending" | "succeeded" | "failed"): void;
}

const knownNames = new Set<string>();

const CurrentHandlerTypeContext = createContext<"sync" | "async">("sync");
const RadioGroupContext = createContext<UseRadio<any, any, any, any, any>>(null!);

export const RadioGroup = memo(forwardElementRef(function RadioGroup<V extends string | number>({ children, name, selectedValue, label, labelPosition, onValueChange: onInputAsync }: RadioGroupProps<V>, ref?: Ref<HTMLDivElement>) {
    const { syncHandler, pending, hasError, settleCount, currentCapture, currentType } = useAsyncHandler(onInputAsync, { capture: (e) => (e as RadioChangeEvent<any, V>)[EventDetail].selectedValue as V });
    const onInput = syncHandler;

    //const { randomId: backupName } = gener({ prefix: "radio-" });
    const [backupName] = useState(() => generateRandomId("radio-"));
    name ??= backupName;
    const { useRadio, useRadioGroupProps, useRadioGroupLabelProps, ...radioInfo } = useRadioGroup<V, HTMLDivElement, HTMLLabelElement, HTMLInputElement, HTMLLabelElement, RadioInfo, "pending">({
        radioGroup: {
            name: name!,
            selectedValue: pending ? currentCapture! : selectedValue,
            onSelectedValueChange: onInput,
            tagGroup: "div",
            tagGroupLabel: "label"
        },
        listNavigation: {},
        linearNavigation: {},
        childrenHaveFocus: {},
        managedChildren: { onChildrenMountChange: useStableCallback(() => reevaluateClosestFit()) },
        rovingTabIndex: {},
        singleSelection: { selectionMode: "focus" },
        typeaheadNavigation: {}
    });

    const { radioGroup: { selectedIndex }, managedChildren: { children: managedChildren } } = radioInfo;

    let stringLabel: string | undefined = undefined;
    if (labelPosition === "hidden") {
        if (label != null && !["string", "number", "boolean"].includes(typeof label)) {
            console.error(`Hidden labels require a string-based label for the aria-label attribute.`);
        }
        else {
            stringLabel = `${label}`;
        }
    }

    // Debugging check -- multiple groups with the same name can cause weird glitches from native radio selection behavior.
    useEffect(() => {
        if (knownNames.has(name!)) {
            console.error(`Multiple radio groups with the name "${name}" exist on the same page at the same time!`);
        }
        knownNames.add(name!);
        return () => knownNames.delete(name!);
    }, [name]);

    const { changeIndex, getCurrentIndex, reevaluateClosestFit } = useChildrenFlag({ children: managedChildren, closestFit: false, initialIndex: selectedIndex, key: "pending" });

    // Any time the selected index changes, let the previous radio button know that it shouldn't be displaying a spinner (if it was).
    const currentCheckboxPendingState = (hasError ? ("failed" as const) : pending ? ("pending" as const) : ("succeeded" as const));
    useEffect(() => {
        if (currentCheckboxPendingState == 'pending')
            changeIndex(selectedIndex);
        else
            changeIndex(null);
    }, [currentCheckboxPendingState, selectedIndex]);

    let labelJsx = <label {...useRadioGroupLabelProps({ children: label })} />
    let groupJsx = (
        <div {...(useRadioGroupProps({ ref, "aria-label": labelPosition === "hidden" ? stringLabel : undefined }))}>
            {children}
        </div>
    )

    return (
        <CurrentHandlerTypeContext.Provider value={currentType ?? "sync"}>
            <RadioGroupContext.Provider value={useRadio as UseRadio<string | number, HTMLInputElement, HTMLLabelElement, RadioInfo, "pending">}>
                {labelPosition == "start" && labelJsx}
                {groupJsx}
                {labelPosition == "end" && labelJsx}
            </RadioGroupContext.Provider>
        </CurrentHandlerTypeContext.Provider>
    )


}));

function LabelTest() {
    return (
        <>
        </>
    );
}

export const Radio = memo(forwardElementRef(function Radio<V extends string | number>({ disabled, inline, children: label, index, value, labelPosition, hidden, ...rest }: RadioProps<V, HTMLInputElement, HTMLLabelElement>, ref?: Ref<HTMLInputElement>) {

    const currentHandlerType = useContext(CurrentHandlerTypeContext);
    const [pending, setPending, getPending] = useState(false);
    //const [asyncState, setAsyncState] = useState<null | "pending" | "succeeded" | "failed">(null);
    // disabled ||= (asyncState === "pending");
    disabled ||= (pending);

    const getDocument = useDocument();
    const { childrenText: text, props: tp } = useChildrenTextProps({ children: label });

    const pendingOperations = useRef<ChildFlagOperations>({ set: setPending, get: getPending, isValid: useStableCallback(() => !hidden) })

    const useRadio = useContext(RadioGroupContext) as UseRadio<V, HTMLInputElement, HTMLLabelElement | HTMLDivElement, RadioInfo, "pending">;
    const { useRadioInput, useRadioLabel } = useRadio({
        radio: { disabled: disabled ?? false, labelPosition: "separate", value, tagInput: "input", tagLabel: "label" },
        hasFocus: { getDocument },
        hasFocusInput: { getDocument },
        hasFocusLabel: { getDocument },
        listNavigation: { text: text ?? "" },
        managedChild: { index, flags: { pending: pendingOperations.current } },
        rovingTabIndex: {},
        subInfo: { foo: "bar" }
    });

    const { useRadioInputProps } = useRadioInput({ tag: "input" });
    const { useRadioLabelProps } = useRadioLabel({ tag: "label" });

    return (<CheckboxLike
        type="radio"
        disabled={disabled}
        asyncState={pending ? "pending" : null}
        currentHandlerType={currentHandlerType}
        labelPosition={labelPosition}
        inputProps={useRadioInputProps(useMergedProps(tp, { ref, type: "radio" }))}
        labelProps={useRadioLabelProps({ class: clsx() })}
        wrapperProps={useMergedProps({ class: "" }, rest)}
        inline={inline ?? false}
        label={label}
    />);


}));


