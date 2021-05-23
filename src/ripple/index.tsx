
import { EventType, SpecificEventListener } from '@material/base/types';
import { MDCRippleAdapter, MDCRippleFoundation } from "@material/ripple"
import { supportsCssVariables } from "@material/ripple/util"
import { applyPassive } from "@material/dom/events";
import clsx from "clsx";
import { Ref, useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks"
import { useEventHandlerForAdapter } from './use-event-handler-for-adapter';
import { useStyleForAdapter } from './use-style-for-adapter';
import { VeryCommonHTMLAttributes } from 'preact-async-input/src/prop-types';
import { h } from 'preact';
import { MDCFoundation } from '@material/base/foundation';

export interface PropsNeededByRipple<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes> {
    disabled: boolean;
    active: boolean;
    unbounded: boolean;
    useChildElement?: boolean;  // By default, ripples use ::before and ::after. If the CSS supports using a child element instead, set this to true.
    className?: string;
}

function browserSupportsCssVars() {
    return supportsCssVariables(window);
}

function useAdapter<A>(adapterProperties: { [K in keyof A]: A[K] | null }) {
    const [adapter, setAdapter] = useState<A | null>(null);

    useEffect(() => {

        if (!adapter) {

            let adapterReady = true;
            const entries = Object.entries(adapterProperties);
            for (let [funcName, func] of entries) {
                if (func == null) {
                    adapterReady = false;
                    break;
                }
            }

            if (adapterReady) {
                console.log("Creating adapter...")
                setAdapter(adapterProperties as A);
            }

        }

    })

    return adapter;
}

type AdapterTypeOfFoundation<F extends MDCFoundation<any>> = F extends MDCFoundation<infer A> ? A : {};

function useFoundation<F extends MDCFoundation<any>>(adapter: null | (AdapterTypeOfFoundation<F>), Foundation: { new(adapter: Partial<AdapterTypeOfFoundation<F>>): F }) {
    const [foundation, setFoundation] = useState<F | null>(null);

    useEffect(() => {
        if (adapter) {
            console.log("Creating foundation...")
            let foundation = new Foundation(adapter);
            foundation.init();

            setFoundation(foundation);

            return () => {
                console.log("Destroying foundation...")
                foundation.destroy();
                setFoundation(null);
            }
        }

    }, [adapter]);

    return foundation;
}

export function useContainsEventTarget<T extends HTMLElement>(element: T | null) {


    let f = useCallback((target: Node): boolean => {
        return element != target && ( element?.contains(target as Node) || false)
    }, [element]);

    return element ? f : null;
}

export function useRippleAdapter<E extends HTMLElement>(element: E | null) {

    const disabledRef = useRef(false);
    const activeRef = useRef(false);
    const unboundedRef = useRef(false);

    const { addClass, hasClass, removeClass, useClassNameProps } = useClassNameAdapter(element);

    const computeBoundingRect = useCustomFunctionForAdapter(element, useCallback((e: E) => e.getBoundingClientRect()!, []));
    const containsEventTarget = useContainsEventTarget(element);

    const { registerEventHandler: registerInteractionHandler, deregisterEventHandler: deregisterInteractionHandler, useEventHandlerProps } = useEventHandlerForAdapter(element);
    const { setStyleProperty: updateCssVariable, useStyleProps } = useStyleForAdapter(element);

    const isSurfaceActive = useCustomFunctionForAdapter(element, useCallback((e: E) => (activeRef.current || e.matches(':active')), []));
    const isSurfaceDisabled = () => (disabledRef.current);
    const isUnbounded = () => (unboundedRef.current);


    const adapter = useAdapter<MDCRippleAdapter>({

        addClass,
        removeClass,
        browserSupportsCssVars,
        computeBoundingRect,
        containsEventTarget,
        deregisterDocumentInteractionHandler,
        deregisterInteractionHandler,
        deregisterResizeHandler,
        getWindowPageOffset,
        isSurfaceActive,
        isSurfaceDisabled,
        isUnbounded,
        registerDocumentInteractionHandler,
        registerInteractionHandler,
        registerResizeHandler,
        updateCssVariable

    });

    const useRippleProps = useCallback(<P extends PropsNeededByRipple<E>>({ disabled, active, useChildElement, unbounded, className, ...props }: P) => {
        useLayoutEffect(() => { disabledRef.current = disabled; }, [disabled]);
        useLayoutEffect(() => { activeRef.current = active; }, [active]);
        useLayoutEffect(() => { unboundedRef.current = unbounded; }, [unbounded]);

        return useStyleProps(useEventHandlerProps(useClassNameProps({ ...props, className: clsx(!useChildElement && "mdc-ripple-surface", className) })));
    }, [useClassNameProps])

    return {
        adapter,
        useRippleProps
    }
}

export function useRippleFoundation<E extends HTMLElement>(element: E | null) {
    const { adapter, useRippleProps } = useRippleAdapter(element);
    const foundation = useFoundation(adapter, MDCRippleFoundation);

    return {
        adapter,
        foundation,
        useRippleProps
    }
}

export function useRippleProps<E extends HTMLElement, P extends PropsNeededByRipple<E>>(element: E | null, p: P) {
    
    const { adapter, foundation, useRippleProps } = useRippleFoundation(element);
    return useRippleProps(p);
}

type KeysOfType<T, U> = { [P in keyof T]: NonNullable<T[P]> extends U ? P : never; }[keyof T];
type KeysNotOfType<T, U> = { [P in keyof T]: NonNullable<T[P]> extends U ? never : P; }[keyof T];

type OmitFunction<T> = Pick<T, KeysNotOfType<T, Function>>;
type OnlyFunction<T> = Pick<T, KeysOfType<T, () => any>>;

function useCustomFunctionForAdapter<T extends Element, F extends (element: T) => any>(element: T | null, func: F) {
    const [foo, setFoo] = useState<(() => ReturnType<F>) | null>(null);

    useEffect(() => {
        if (element) {
            setFoo((oldFunc) => () => func(element));
        }
    }, [element, func]);

    return foo;
}



// Allows adding/removing a class from an element without re-rendering its subtree
// When the component is re-rendered, those classes are then properly added to the VDOM tree
function useClassNameAdapter<E extends Element>(element: E | null) {

    //const elementRef = propsToMutate?.ref;
    const classesRef = useRef<Set<string>>(new Set());

    const addClass = useCallback(function addClass(newClass: string) {
        classesRef.current.add(newClass);
        element?.classList.add(newClass);
    }, [classesRef, element]);

    const removeClass = useCallback(function removeClass(newClass: string) {
        classesRef.current.delete(newClass);
        element?.classList.remove(newClass);
    }, [classesRef, element]);

    const hasClass = useCallback(function hasClass(newClass: string) {
        return classesRef.current.has(newClass) || element?.classList.contains(newClass) || false;
    }, [classesRef, element]);

    const useClassNameProps = useCallback(<P extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes>>({ className, ...props }: P) => {
        return {
            className: clsx(...Array.from(classesRef.current), className),
            ...props,
        }
    }, [])

    //if (propsToMutate)
    //    propsToMutate.className = clsx(propsToMutate.className, ...Array.from(classesRef.current)/*.filter(c => !classesToIgnore?.includes(c))*/);

    return {
        addClass: element ? addClass : null,
        removeClass: element ? removeClass : null,
        hasClass: element ? hasClass : null,
        useClassNameProps
    }
}


function registerDocumentInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void {
    document.documentElement.addEventListener(evtType, handler, applyPassive());
}
function deregisterDocumentInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void {
    document.documentElement.removeEventListener(evtType, handler, applyPassive());
}

function registerResizeHandler(handler: SpecificEventListener<'resize'>): void {
    window.addEventListener('resize', handler)
}

function deregisterResizeHandler(handler: SpecificEventListener<'resize'>): void {
    window.removeEventListener('resize', handler)
}

function getWindowPageOffset() {
    return ({ x: window.pageXOffset, y: window.pageYOffset });
}
