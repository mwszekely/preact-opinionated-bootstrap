import clsx from "clsx";
import { SimpleProps } from "../props-shared";

interface InputGroupPropsBase {
    size?: "sm" | "md" | "lg";
}
interface InputGroupTextPropsBase {}

export interface InputGroupProps extends InputGroupPropsBase, SimpleProps<HTMLDivElement> {}
export interface InputGroupTextProps extends InputGroupTextPropsBase, SimpleProps<HTMLSpanElement> {}

export function useInputGroupProps<P extends InputGroupProps>(p: P) {
    const { className, size, ...props } = p
    return {
        ...props,
        className: clsx("input-group", size == "sm" || size == "lg"? `input-group-${size}` : undefined, className)
    }
}

export function useInputGroupTextProps<P extends InputGroupTextProps>(p: P) {
    const { className, ...props } = p;
    return {
        ...props,
        className: clsx("input-group-text", className)
    }
}
