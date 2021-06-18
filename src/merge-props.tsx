import clsx from "clsx";
import { h, Fragment, VNode } from "preact";
import { useCallback } from "preact/hooks"
import type { Ref, RefObject, RefCallback } from "preact"
import { useMergedRefs } from "preact-async-input";




type CompatiblePropNames = "style" | "className" | "class" | "ref" | "children";
export interface CompatibleProps<E extends EventTarget> extends Pick<h.JSX.HTMLAttributes<E>, CompatiblePropNames> { ref?: Ref<E> }

function mergeClasses({ class: lhsClass, className: lhsClassName }: { class?: string, className?: string }, { class: rhsClass, className: rhsClassName }: { class?: string, className?: string }) {
    let lhsClasses = new Set(clsx(lhsClass, lhsClassName).split(" "));
    let rhsClasses = new Set(clsx(rhsClass, rhsClassName).split(" "));

    return [...Array.from(lhsClasses), ...Array.from(rhsClasses)].join(" ");
}

function mergeStyles(lhs: h.JSX.HTMLAttributes<any>["style"] | null | undefined, rhs: h.JSX.HTMLAttributes<any>["style"] | null | undefined): h.JSX.HTMLAttributes<any>["style"] {
    if (typeof lhs != typeof rhs) {
        if (lhs && !rhs)
            return lhs;
        if (!lhs && rhs)
            return rhs;
        if (lhs && rhs) {
            if (typeof lhs == "string")
                return mergeStyles(Object.fromEntries(lhs.split(";").map(statement => statement.split(":"))) as any, rhs);
            if (typeof rhs == "string")
                return mergeStyles(lhs, Object.fromEntries(rhs.split(";").map(statement => statement.split(":"))) as any);
        }
        return undefined;
    }
    if (typeof lhs == "string") {
        return `${lhs};${rhs}`
    }
    return {
        ...lhs as {},
        ...rhs as {}
    }
}

function mergeFunctions<F extends (...args: any[]) => void>(lhs: F, rhs: F) {
    return (...args: Parameters<F>) => {
        lhs(...args);
        rhs(...args);
    }
}

/*type A ={B?:"B"} & {C?:"C"}
type A2 = { B?: "B", C?: "C" }
let a: A = { B: "B" }
let a2: A2 = { B: "B" }*/

/*type MergedProps<Lhs extends CompatibleProps<HTMLElement>, Rhs extends CompatibleProps<HTMLElement>> =
    { ref: RefCallback<(Lhs extends CompatibleProps<infer E> ? E : EventTarget) | (Rhs extends CompatibleProps<infer E> ? E : EventTarget)> } &
    Omit<Lhs, "className" | "style" | "class" | "ref" | "children"> &
    Omit<Rhs, "className" | "style" | "class" | "ref" | "children"> &
    Pick<Lhs, "style" | "className"> &
    Pick<Rhs, "style" | "className"> &
    { children: VNode<any> };*/


export interface MergedPropsBase<Lhs extends CompatibleProps<HTMLElement>, Rhs extends CompatibleProps<HTMLElement>> {
    ref: RefCallback<(Lhs extends CompatibleProps<infer E> ? E : EventTarget) | (Rhs extends CompatibleProps<infer E> ? E : EventTarget)>;
    className: string;
    style?: h.JSX.CSSProperties | string;
    children: VNode<any>;
} 

export type MergedProps<Lhs extends CompatibleProps<HTMLElement>, Rhs extends CompatibleProps<HTMLElement>> = MergedPropsBase<Lhs, Rhs> & 
Omit<Lhs, "className" | "style" | "class" | "ref" | "children"> &
Omit<Rhs, "className" | "style" | "class" | "ref" | "children">;

/**
 * Merges two sets of props together, merging className, class, style, and all event handlers (functions that start with "on").
 * @param lhs 
 * @param rhs 
 * @returns 
 */
export function useMergedProps<Lhs extends CompatibleProps<any>, Rhs extends CompatibleProps<any>>(lhs: Lhs, rhs: Rhs): MergedProps<Lhs, Rhs> {

    type LhsElement = Lhs extends CompatibleProps<infer E> ? E : EventTarget;
    type RhsElement = Rhs extends CompatibleProps<infer E> ? E : EventTarget;

    const { class: lhsClass, children: lhsChildren, ref: lhsRef, className: lhsClassName, style: lhsStyle, ...lhsPropsRest } = lhs;
    const { class: rhsClass, children: rhsChildren, ref: rhsRef, className: rhsClassName, style: rhsStyle, ...rhsPropsRest } = rhs;

    let ret = {
        ...lhsPropsRest,
        ...rhsPropsRest,

        children: h(Fragment, {}, lhsChildren, rhsChildren),
        className: mergeClasses(lhs, rhs),
        style: mergeStyles(lhsStyle, rhsStyle),
        ref: useMergedRefs<LhsElement & RhsElement>(lhsRef, rhsRef)
    };

    Object.entries(rhsPropsRest).forEach((record) => {
        type K = keyof Rhs;
        const [key, value] = record as [K, Rhs[K]];

        if (key in ret) {
            // This needs to be merged, whatever it is

            const lhsValue = (lhs as { [K in keyof Rhs]: unknown })[key] as Lhs[keyof Lhs];
            const rhsValue = value;

            if (lhsValue == null && rhsValue == null) {
                // Do nothing
            }
            else if (lhsValue == null && rhsValue != null) {
                // Overwrite the null value with rhsValue
                (ret as any)[key] = rhsValue;
            }
            else if (lhsValue != null && rhsValue == null) {
                // Overwrite the value with lhsValue (just in case)
                (ret as any)[key] = lhsValue;
            }
            else {
                // Merge these two values
                if (typeof key == "string" && key.startsWith("on") && typeof lhsValue === "function" && typeof rhsValue === "function") {
                    (ret as any)[key] = mergeFunctions(lhsValue as any, rhsValue as any);
                }
                else {
                    throw new Error(`Unknown prop cannot be merged: ${key}, which is typeof ${typeof lhsValue}.`)
                }
            }

        }

    });


    return ret;



    /*const lhsKeys = new Set(Object.keys(lhs));
    const rhsExclusiveKeys = new Set(Object.keys(rhs));

    for (let key of lhsKeys) {
        if (rhsExclusiveKeys.has(key))
            rhsExclusiveKeys.delete(key);
    }

    let iWish = {
        ...lhs,
        ...rhs
    }

    return {

    }*/
}
