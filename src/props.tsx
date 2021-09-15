import { ComponentChildren, createContext, h, Ref, VNode } from "preact";
import { forwardRef, useCallback, useContext, useEffect } from "preact/compat";
import { useMergedProps } from "preact-prop-helpers/use-merged-props"
import clsx from "clsx";
import { useState, useTimeout } from "preact-prop-helpers";

export type RefFromTag<T extends keyof h.JSX.IntrinsicElements> = NonNullable<h.JSX.IntrinsicElements[T]["ref"]>;
export type ElementFromRef<R extends Ref<any>> = R extends Ref<infer E> ? E : EventTarget;
export type ElementFromTag<T extends keyof h.JSX.IntrinsicElements> = ElementFromRef<RefFromTag<T>>;

type ElementToTag<E extends EventTarget> = keyof SubType<HTMLElementTagNameMap, E>;
type SubType<Base, Condition> = Pick<Base, {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base]>;

/**
 * For times when more than just the abstract element type is needed,
 * but the actual, concrete, implementation-affecting "div" string type.
 * 
 * TODO: Should this be the standard for all the non-ARIA hooks?
 * They *never* care about the specific type for the implementation,
 * just for typing, so it wouldn't be necessary, 
 * but it would be consistent with these ARIA hooks.
 */
export interface TagSensitiveProps<E extends EventTarget> {
    tag: ElementToTag<E>;
}


export interface GlobalAttributes<E extends EventTarget> extends Pick<h.JSX.HTMLAttributes<E>, "class" | "className" | "hidden" | "id" | "style" | "ref" | "children"> {
    "aria-labelledby"?: string;
    "aria-label"?: string;
}


export function forwardElementRef<C extends (p: any, ref?: any) => (VNode<any> | null)>(component: C): C {
    return forwardRef(component) as any;
}


export type TransitionComponent<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = {
    Transition: T;
} & Omit<Parameters<T>[0], "open">;


export type OptionalTransitionComponent<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = {
    Transition?: T;
} & Omit<Parameters<T>[0], "open">;

// Get all transform parameters with both a "block" version and an "inline" version
type ExtractGenericParameter1<T> = T extends `${infer U}Block` ? U : never
type ExtractGenericParameter2<T> = T extends `${infer U}Inline` ? U : never
type ExtractGenericParameters<T> = ExtractGenericParameter1<keyof T> & ExtractGenericParameter2<keyof T>;


type MakeDynamicTransitionProps<T> = {
    [K in ExtractGenericParameters<T> as `${ExtractGenericParameters<T>}Dynamic`]?: number;
} & Omit<T, `${string}Block` | `${string}Inline`>;

//type T8 = MakeDynamicTransitionProps<SlideZoomFadeProps<HTMLElement>>;

export type FlippableTransitionComponent<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = TransitionComponent<T> & {
    [K in Exclude<keyof Parameters<T>[0], "open"> as `${K & string}Dynamic`]?: number;
};


export function usePseudoActive<P extends { "data-pseudo-active"?: any } & h.JSX.HTMLAttributes<any>>({ "data-pseudo-active": active, ...props }: P) {
    return useMergedProps<any>()({ className: clsx((active == true || active == "true") && "active") }, props) as Omit<P, "data-pseudo-active">;
}

const SpinnerDelayContext = createContext(1000);
export function ProvideSpinnerDelay({ children, timeout }: { children: ComponentChildren; timeout: number }) {
    return <SpinnerDelayContext.Provider value={timeout}>{children}</SpinnerDelayContext.Provider>
}
export function useSpinnerDelay(pending: boolean, timeout?: number) {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (!pending) {
            setShowSpinner(false)
        }
    }, [pending]);

    const defaultDelay = useContext(SpinnerDelayContext)

    useTimeout({
        timeout: timeout ?? defaultDelay ?? 1000,
        callback: () => {
            setShowSpinner(pending);
        },
        triggerIndex: pending
    });

    return showSpinner;
}
