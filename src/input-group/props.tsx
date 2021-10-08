import { ComponentChildren, createContext, h } from "preact";
import { UseCheckboxGroupChild, UseCheckboxGroupChildInfo } from "preact-aria-widgets";
import { useCallback } from "preact/hooks";


interface BaseUnlabelledInputProps<T> {
    value: T;
    disabled?: boolean;
    onValueChange: (value: T, event: InputEvent) => (Promise<void> | void);
}


export const UseCheckboxGroupChildContext = createContext<UseCheckboxGroupChild<HTMLInputElement, CheckboxGroupChildInfo> | null>(null);

export interface UnlabelledInputTextProps extends BaseUnlabelledInputProps<string> { type: "text"; }
export interface UnlabelledInputNumberProps extends BaseUnlabelledInputProps<number> { type: "number"; min?: number; max?: number; step?: number; }
export type UnlabelledInputProps = UnlabelledInputTextProps | UnlabelledInputNumberProps;

export type InputProps = UnlabelledInputProps & { 
    children: ComponentChildren, 
    labelPosition?: "start" | "end" | "floating" | "hidden";
    width?: `${number}ch` | `100%`; 
}

export const InInputGroupContext = createContext(false);
export const InInputGridContext = createContext(0);


export interface CheckboxGroupChildInfo extends UseCheckboxGroupChildInfo {
    setChecked(checked: boolean | "mixed"): (void | Promise<void>)
}

function max<T extends number | string | Date>(value: T, max?: T) {
    if (max == null)
        return value;
    if (value > max)
        return max;
    return value;
}
function min<T extends number | string | Date>(value: T, min?: T) {
    if (min == null)
        return value;
    if (value < min)
        return min;
    return value;
}

/*
export function useInputCaptures<T>(type: "text", min2: string, max2: string):
export function useInputCaptures<T>(type: "text" | "number", min2: number, max2: number)
export function useInputCaptures<T>(type: "text" | "number", min2: T, max2: T)*/
export function useInputCaptures<T>(type: "text" | "number", min2?: T, max2?: T) {

    const capture = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>): T  => {
        switch (type) {
            case "text":
                return max(min(event.currentTarget.value, min2 as any), max2 as any) as T;

            case "number":
                return max(min(event.currentTarget.valueAsNumber, min2 as any), max2 as any) as T;
        }
    }, [type]);

    const uncapture = useCallback((value: InputProps["value"]): string => {
        switch (type) {
            case "text":
                return value as string;

            case "number":
                return `${value as number}`;

        }
    }, [type]);

    return { capture, uncapture };
}


