import { ComponentChildren, createContext, h } from "preact";
import { useCallback } from "preact/hooks";


interface BaseUnlabelledInputProps<T> {
    value: T;
    disabled?: boolean;
    onInput: (value: T, event: InputEvent) => (Promise<void> | void);
}

export interface UnlabelledInputTextProps extends BaseUnlabelledInputProps<string> { type: "text"; }
export interface UnlabelledInputNumberProps extends BaseUnlabelledInputProps<number> { type: "number"; min?: number; max?: number; step?: number; }
export type UnlabelledInputProps = UnlabelledInputTextProps | UnlabelledInputNumberProps;

export type InputProps = UnlabelledInputProps & { children: ComponentChildren, labelPosition?: "start" | "end" | "floating" | "hidden" }

export const InInputGroupContext = createContext(false);

export function useInputCaptures(type: InputProps["type"]) {

    const capture = useCallback((event: h.JSX.TargetedEvent<HTMLInputElement>) => {
        switch (type) {
            case "text":
                return event.currentTarget.value;

            case "number":
                return event.currentTarget.valueAsNumber;

        }
    }, [type]);

    const uncapture = useCallback((value: InputProps["value"]) => {
        switch (type) {
            case "text":
                return value as string;

            case "number":
                return `${value as number}`;

        }
    }, [type]);

    return { capture, uncapture };
}


