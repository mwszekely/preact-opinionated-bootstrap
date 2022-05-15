import { ComponentChildren, createContext, h } from "preact";
import { UseCheckboxGroupChild, UseCheckboxGroupChildInfo } from "preact-aria-widgets";
import { useCallback } from "preact/hooks";


interface BaseUnlabelledInputProps<T> {
    value: T | null;
    disabled?: boolean;
    readOnly?: boolean;
    disabledVariant?: "hard" | "soft" | "text";
    placeholder?: string;
    onValueChange: (value: T, event: InputEvent) => (Promise<void> | void);
    spinnerTimeout?: number;
    prefix?: ComponentChildren;
    suffix?: ComponentChildren;
}


export const UseCheckboxGroupChildContext = createContext<UseCheckboxGroupChild<HTMLInputElement, CheckboxGroupChildInfo> | null>(null);

export interface UnlabelledInputTextProps extends BaseUnlabelledInputProps<string> { type: "text"; maxLength?: number; }
export interface UnlabelledInputNumericProps extends BaseUnlabelledInputProps<string> { type: "numeric"; maxLength?: number; }
export interface UnlabelledInputNumberNonNullableProps extends BaseUnlabelledInputProps<number> { type: "number"; min?: number; max?: number; step?: number; nonNullable: true; }
export interface UnlabelledInputNumberNullableProps extends BaseUnlabelledInputProps<number | null> { type: "number"; min?: number; max?: number; step?: number; nonNullable?: false; }
export type UnlabelledInputProps = UnlabelledInputTextProps | UnlabelledInputNumberNullableProps | UnlabelledInputNumberNonNullableProps | UnlabelledInputNumericProps;

export type InputProps = UnlabelledInputProps & {
    children: ComponentChildren,
    labelPosition?: "start" | "end" | "floating" | "hidden" | "placeholder" | "tooltip" | "prefix" | "suffix";
    size?: "sm" | "md" | "lg";

    width?: `${number}ch` | `100%`;

    className?: string;
    class?: string;
}

export const InInputGroupContext = createContext(false);
export const InInputGridContext = createContext(0);
export const DefaultInputSize = createContext<"sm" | "md" | "lg" | null | undefined>(null);


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
export function useInputCaptures<T>(type: "text" | "number" | "numeric", min2?: T, max2?: T) {

    const capture = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>): T => {
        let ret: T;
        switch (type) {
            case "text":
            case "numeric":
                ret = max(min(event.currentTarget.value, min2 as any), max2 as any) as T;
                break;

            case "number":
                ret = max(min(event.currentTarget.valueAsNumber, min2 as any), max2 as any) as T;
                break;

        }
        if (typeof ret === "number" && isNaN(ret)) {
            ret = null!;
        }
        return ret;
    }, [type]);

    const uncapture = useCallback((value: InputProps["value"]): string => {
        switch (type) {
            case "text":
            case "numeric":
                return value as string;

            case "number":
                if (value != null)
                    return `${value as number}`;
                return "";

        }
    }, [type]);

    return { capture, uncapture };
}


