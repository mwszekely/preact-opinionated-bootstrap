import { createContext, h } from "preact";
import { useCallback } from "preact/hooks";


export interface BaseInputProps<T> {
    value: T;
    onInput: (value: T, event: InputEvent) => (Promise<void> | void);
}

export interface InputTextProps extends BaseInputProps<string> { type: "text"; }
export interface InputNumberProps extends BaseInputProps<number> { type: "number"; }
export type InputProps = InputTextProps | InputNumberProps;

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


