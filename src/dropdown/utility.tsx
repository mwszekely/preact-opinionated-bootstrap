import { ComponentChildren, createContext, h, Ref } from "preact";
import { useRefElement } from "preact-async-input";
import { useCallback, useContext, useEffect, useRef, useState } from "preact/hooks";
//import { tabbable } from "tabbable";
import { useMergedProps } from "../merge-props";

/*export function useGetFirstFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getFirstFocusableElementS(menuContainer) : null }, [menuContainer]); }
export function useGetLastFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getLastFocusableElementS(menuContainer) : null }, [menuContainer]); }
export function useGetNextFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getNextFocusableElementS(menuContainer) : null }, [menuContainer]); }
export function useGetPrevFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getPrevFocusableElementS(menuContainer) : null }, [menuContainer]); }

export function useGetParentNextFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getParentNextFocusableElementS(menuContainer) : null; }, [menuContainer]); }
export function useGetParentPrevFocusableElement<E extends HTMLElement>(menuContainer: E | null | undefined) { return useCallback(() => { return menuContainer ? getParentPrevFocusableElementS(menuContainer) : null; }, [menuContainer]); }*/

interface InfoNeededByMenuContainer {
    setFocus(enabled: boolean, mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly | null): void;
    id: string;
}

interface InfoNeededByMenuContainer2 extends InfoNeededByMenuContainer {
    index: number;
    //element: HTMLElement | SVGElement;
    //prev: InfoNeededByMenuContainer2 | null;
    //next: InfoNeededByMenuContainer2 | null;
}
/*
function compareElementPositions({ element: a }: InfoNeededByMenuContainer2, { element: b }: InfoNeededByMenuContainer2) {
    if (a === b) {
        return 0;
    }

    var position = a.compareDocumentPosition(b);

    if ((position & Node.DOCUMENT_POSITION_FOLLOWING) || (position & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
        return -1;
    }
    else if ((position & Node.DOCUMENT_POSITION_PRECEDING) || (position & Node.DOCUMENT_POSITION_CONTAINS)) {
        return 1;
    }
    else {
        return 0;
    }

}*/

export const WithKeyboardFocus = Symbol();
export const MakeFocusableOnly = Symbol();


/**
 * Allows for the use of a roving tabIndex for better aria-compatible keyboard navigation.
 * Used in Tabs, Lists, etc.
 * 
 * @param param0 
 * @returns 
 */
export function useArrowKeyNavigation() {


    const allChildrenInfoRef = useRef<InfoNeededByMenuContainer2[]>([]);
    const childrenInfoById2Ref = useRef<Map<string, InfoNeededByMenuContainer2>>(new Map());
    const [hasAnyChildren, setHasAnyChildren] = useState(false);

    // These two need to always be paired together
    const [focusMode, setFocusMode] = useState<null | typeof WithKeyboardFocus | typeof MakeFocusableOnly>(null);
    const [focusableIndex, setFocusableIndex] = useState<number | null>(null);
    const focusableIndexRef = useRef<number>(0);

    // When the ID of the element with focus changes (so it becomes focusable with tabIndex=0),
    // actually focus that element.
    useEffect(() => {
        if (allChildrenInfoRef.current.length != 0 && focusableIndex != null) {
            let previousActiveIndex = focusableIndexRef.current;
            if (previousActiveIndex != null && focusableIndex !== previousActiveIndex) {
                // Ask the previously focused element to set its tabIndex to -1
                allChildrenInfoRef.current[previousActiveIndex].setFocus(false, focusMode);
            }
            // Ask the new element to be focused to set its tabIndex to 0 and focus itself afterwards
            allChildrenInfoRef.current[focusableIndex!].setFocus(true, focusMode);

            // Allow us to access the focusable index without requiring it as a dependency.
            focusableIndexRef.current = focusableIndex;

        }
    }, [focusMode, hasAnyChildren, focusableIndex])

    // Child components register themselves with their index, and ID, which we use later when moving focus between items.
    const registerChild = useCallback((index: number, info: null | InfoNeededByMenuContainer) => {
        if (info) {
            const { setFocus, id } = info;
            console.assert(index != null);

            let newInfo: InfoNeededByMenuContainer2 = { index, setFocus, id };
            allChildrenInfoRef.current.push(newInfo);
            allChildrenInfoRef.current.sort(({ index: lhsIndex }, { index: rhsIndex }) => lhsIndex - rhsIndex);
            childrenInfoById2Ref.current.set(info.id, newInfo);
        }
        else {
            const id = allChildrenInfoRef.current[index].id;
            allChildrenInfoRef.current.splice(index, 1);
            childrenInfoById2Ref.current.delete(id);
        }
        setHasAnyChildren(allChildrenInfoRef.current.length != 0);

        return { setSelfToBeFocused: (mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => { setFocusableIndex(index); setFocusMode(mode); } }
    }, []);

    const getFirstFocusableElement = useCallback((): InfoNeededByMenuContainer2 => {
        return allChildrenInfoRef.current[0];
    }, [allChildrenInfoRef]);

    const getLastFocusableElement = useCallback((): InfoNeededByMenuContainer2 => {
        return allChildrenInfoRef.current[allChildrenInfoRef.current.length - 1];
    }, [allChildrenInfoRef]);

    const getPrevFocusableElement = useCallback((): InfoNeededByMenuContainer2 => {
        let prevIndex = focusableIndexRef.current! - 1;
        if (prevIndex < 0)
            return getLastFocusableElement();
        else
            return allChildrenInfoRef.current[prevIndex]

    }, [getLastFocusableElement]);

    const getNextFocusableElement = useCallback((): InfoNeededByMenuContainer2 => {
        let nextIndex = focusableIndexRef.current! + 1;
        if (nextIndex >= allChildrenInfoRef.current.length)
            return getFirstFocusableElement();
        else
            return allChildrenInfoRef.current[nextIndex];
    }, [getFirstFocusableElement]);


    const handleKeyNav = useCallback((e: KeyboardEvent) => {
        console.log(`Handling key event ${e.key}`);
        const isDown = (e.key === "ArrowDown" || e.key === "ArrowRight");
        const isUp = (e.key === "ArrowUp" || e.key === "ArrowLeft");
        const isHome = e.key === "Home";
        const isEnd = e.key === "End";
        //const isTab = (e.key === "Tab");
        let handled = false;
        let focusedElement: string | null = null;
        if (isUp) {
            focusedElement = getPrevFocusableElement().id;
            handled = true;
        }
        if (isDown) {
            focusedElement = getNextFocusableElement().id;
            handled = true;
        }
        if (isHome) {
            focusedElement = getFirstFocusableElement().id;
            handled = true;
        }
        if (isEnd) {
            focusedElement = getLastFocusableElement().id;
            handled = true;
        }

        // We don't actually focus the element yet
        // Instead, we set the tabIndex and wait until that's rendered
        // *then* focus the element.
        if (focusedElement) {
            console.assert(focusedElement);
            console.log(`Changing index to ${childrenInfoById2Ref.current.get(focusedElement)?.index}`);
            setFocusableIndex(childrenInfoById2Ref.current.get(focusedElement)?.index ?? 0);
            setFocusMode(WithKeyboardFocus);
            e.preventDefault();
        }

    }, [getPrevFocusableElement, getNextFocusableElement, getFirstFocusableElement, getLastFocusableElement]);

    useEffect(() => {
        setFocusMode(null);
    }, [focusMode])

    return {
        useArrowKeyTabNavigationProps: <P extends {}>(props: P) => { return useMergedProps({ onKeyDown: handleKeyNav, style: undefined }, props) },
        Context: useCallback((props: { children: ComponentChildren }) => <RegisterChildContext.Provider value={registerChild}>{props.children}</RegisterChildContext.Provider>, []),
        setFocusToFirst: useCallback((mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => { setFocusMode(mode); setFocusableIndex(index => getFirstFocusableElement()?.index ?? index) }, [getFirstFocusableElement]),
        setFocusToLast: useCallback((mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => { setFocusMode(mode); setFocusableIndex(index => getLastFocusableElement()?.index ?? index) }, [getLastFocusableElement]),
        setFocusToNext: useCallback((mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => { setFocusMode(mode); setFocusableIndex(index => getNextFocusableElement()?.index ?? index) }, [getNextFocusableElement]),
        setFocusToPrev: useCallback((mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => { setFocusMode(mode); setFocusableIndex(index => getPrevFocusableElement()?.index ?? index) }, [getPrevFocusableElement]),
        setFocusToCurrent: useCallback((mode: typeof WithKeyboardFocus) => { setFocusMode(mode); allChildrenInfoRef.current[focusableIndexRef.current!].setFocus(true, mode); }, [getPrevFocusableElement]),
        setFocusById: useCallback((id: string, mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly) => {
            const info = childrenInfoById2Ref.current.get(id);
            if (info) {
                setFocusMode(mode);
                setFocusableIndex(info.index);
            }
        }, []),
        ready: hasAnyChildren
    }
}



export function useWhyDidYouUpdate<P extends {}>(name: string, props: P) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef<P>(null!);
    useEffect(() => {
        if (previousProps.current) {
            // Get all keys from previous and current props
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            // Use this object to keep track of changed props
            const changesObj: Partial<{ [K in keyof P]: { from: any, to: any } }> = {};
            // Iterate through keys
            allKeys.forEach((key) => {
                // If previous is different from current
                if (previousProps.current[key as keyof P] !== props[key as keyof P]) {
                    // Add to changesObj
                    changesObj[key as keyof P] = {
                        from: previousProps.current[key as keyof P],
                        to: props[key as keyof P],
                    };
                }
            });
            // If changesObj not empty then output to console
            if (Object.keys(changesObj).length) {
                console.log("[why-did-you-update]", name, changesObj);
            }
        }
        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
}



const RegisterChildContext = createContext<null | ((index: number, info: null | InfoNeededByMenuContainer) => { setSelfToBeFocused(mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly): void })>(null);

export function useArrowKeyNavigatableProps<PropType extends { index: number, id: string, tabIndex?: number, ref?: Ref<any> }>({ index, id, tabIndex, ...props }: PropType) {
    const registerSelf = useContext(RegisterChildContext)!;

    type ElementType = HTMLElement & (PropType["ref"] extends Ref<infer E> ? E : EventTarget);

    const { element, useRefElementProps } = useRefElement<ElementType>();
    const [requestSelfToBeFocused, setRequestSelfToBeFocused] = useState<null | (() => void)>(null);

    const [focusMode, setFocusMode] = useState<typeof WithKeyboardFocus | typeof MakeFocusableOnly | null>(null);
    const [focusable, setFocusable] = useState<boolean>(false);
    const focusableRef = useRef(focusable);
    useEffect(() => { focusableRef.current = focusable }, [focusable]);

    const setFocus = useCallback((focusable: boolean, mode: typeof WithKeyboardFocus | typeof MakeFocusableOnly | null) => {
        //if (focusable && focusableRef.current == true)
        //    element?.focus();
        //else
        setFocusable(focusable);
        setFocusMode(mode);
    }, [element, setFocusable]);

    useEffect(() => {
        if (focusable && focusMode == WithKeyboardFocus) {
            element?.focus();
        }
    }, [focusMode, focusable, element]);

    console.assert(index != null);

    useEffect(() => {
        if (element) {
            const { setSelfToBeFocused } = registerSelf(index, { setFocus, id });
            console.assert(setSelfToBeFocused);
            setRequestSelfToBeFocused(() => setSelfToBeFocused);
            return () => registerSelf(index, null);
        }
    }, [setRequestSelfToBeFocused, registerSelf, index, id, element, setFocus]);

    useEffect(() => {
        setFocusMode(null);
    }, [focusMode]);

    const onClick = useCallback(function (this: any) {
        console.assert(requestSelfToBeFocused);
        requestSelfToBeFocused?.();
    }, [requestSelfToBeFocused]);

    return useMergedProps({ onClick, tabIndex: focusable === true ? 0 : focusable === false ? -1 : tabIndex, style: undefined }, useRefElementProps({ id, ...props }));
}



export function useDropdownButton({ setOpen, menuContainer }: { menuContainer: HTMLOListElement | HTMLUListElement | null, setOpen: (open: boolean | ((prev: boolean) => boolean)) => void }) {

    // This is used so that we can focus an element *after* we've opened it and its HTML is rendered, etc.
    //const [elementToFocus, setElementToFocus] = useState<"first" | "last" | null>(null);

    /*const getFirstFocusableElement = useCallback(() => { getFirstFocusableElementS(menuContainer) }, [menuContainer]);
    const getLastFocusableElement = useCallback(() => {  getLastFocusableElementS(menuContainer) }, [menuContainer]);
    const getNextFocusableElement = useCallback(() => {  getNextFocusableElementS(menuContainer) }, [menuContainer]);
    const getPrevFocusableElement = useCallback(() => {  getPrevFocusableElementS(menuContainer) }, [menuContainer]);*/



    /*useEffect(() => {
        if (elementToFocus === "first")
            getFirstFocusableElement();
        if (elementToFocus === "last")
            getLastFocusableElement();

        setElementToFocus(null);
    }, [elementToFocus, getFirstFocusableElement, getLastFocusableElement]);*/

    const { Context, useArrowKeyTabNavigationProps, setFocusToCurrent, setFocusToFirst, setFocusToLast, setFocusToNext, setFocusToPrev, setFocusById } = useArrowKeyNavigation();

    const handleKeyNav = useCallback((e: KeyboardEvent) => {
        const isDown = e.key === "ArrowDown";
        const isUp = e.key === "ArrowUp";
        const isEnter = e.key === "Enter";
        const isHome = e.key === "Home";
        const isEnd = e.key === "End";
        let handled = false;

        if (isEnter || isDown || isEnd) {
            setOpen(true);
            if (isEnd)
                setFocusToLast(WithKeyboardFocus);
            else
                setFocusToCurrent(WithKeyboardFocus);
            handled = true;
        }
        if (isUp || isHome) {
            setOpen(true);
            if (isHome)
                setFocusToFirst(WithKeyboardFocus);
            else
                setFocusToCurrent(WithKeyboardFocus);
            handled = true;
        }

        if (handled) {
            e.preventDefault();
        }
    }, [setFocusToFirst, setFocusToLast, setFocusToCurrent]);

    const handleClick = useCallback(() => {
        setOpen(o => !o);
    }, [setFocusToCurrent]);


    return {
        useDropdownButtonProps: <P extends { onKeyDown?: any, className?: string }>({ onKeyDown, ...props }: P) => {
            return useMergedProps({
                "aria-haspopup": "menu",
                onKeyDown: handleKeyNav,
                onClick: handleClick,
                style: undefined,
                className: undefined
            }, props)
        },
        useMenuProps: <P extends { role?: string, className?: string }>({ role, ...props }: P) => { return useMergedProps({ role: role ?? "menu", style: undefined }, useArrowKeyTabNavigationProps(props)) },
        Context,
        setFocusToFirst, setFocusToLast, setFocusToNext, setFocusToPrev, setFocusToCurrent, setFocusById
    };
}

/*
function getParentNextFocusableElementS<E extends HTMLElement>(originElement: E, currentParentElement: Element | null | undefined, tabbableChildren: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    if (!currentParentElement)
        currentParentElement = originElement.parentElement;

    // Skip over any parents that don't have any siblings
    while (currentParentElement && !currentParentElement.nextElementSibling)
        currentParentElement = currentParentElement.parentElement;

    if (!currentParentElement)
        return null;

    //tabbableChildren ??= tabbable(originElement);
    let parentTabbableChildren = tabbable(currentParentElement);

    if (tabbableChildren[tabbableChildren.length - 1] != parentTabbableChildren[parentTabbableChildren.length - 1]) {
        let lastIndexInParent = parentTabbableChildren.indexOf(tabbableChildren[tabbableChildren.length - 1]);
        console.assert(lastIndexInParent != -1);
        console.assert(lastIndexInParent < parentTabbableChildren.length - 1);
        parentTabbableChildren[lastIndexInParent + 1].focus();
        return parentTabbableChildren[lastIndexInParent + 1];
    }
    else {
        return getParentNextFocusableElementS(originElement, currentParentElement.parentElement, tabbableChildren);
    }
}


function getParentPrevFocusableElementS<E extends HTMLElement>(originElement: E, currentParentElement: Element | null | undefined, tabbableChildren: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    if (!currentParentElement)
        currentParentElement = originElement.parentElement;

    // Skip over any parents that don't have any siblings
    if (currentParentElement && !currentParentElement.previousElementSibling)
        currentParentElement = currentParentElement.parentElement;

    if (!currentParentElement)
        return null;

    tabbableChildren ??= tabbable(originElement);
    let parentTabbableChildren = tabbable(currentParentElement);

    if (tabbableChildren[0] != parentTabbableChildren[0]) {
        let firstIndexInParent = parentTabbableChildren.indexOf(tabbableChildren[0]);
        console.assert(firstIndexInParent != -1);
        console.assert(firstIndexInParent > 0);
        parentTabbableChildren[firstIndexInParent - 1].focus();
        return parentTabbableChildren[firstIndexInParent - 1];
    }
    else {
        return getParentPrevFocusableElementS(originElement, currentParentElement.parentElement, tabbableChildren)
    }
}
/*
function getFirstFocusableElementS<E extends HTMLElement>(element: E, tabbableChildren: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    //tabbableChildren ??= tabbable(element);
    tabbableChildren[0].focus();
    return tabbableChildren[0];
}
function getLastFocusableElementS<E extends HTMLElement>(element: E, tabbableChildren: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    //tabbableChildren ??= tabbable(element);
    tabbableChildren[tabbableChildren.length - 1].focus();
    return tabbableChildren[tabbableChildren.length - 1];
}
function getNextFocusableElementS<E extends HTMLElement>(element: E, tabbableChildren: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    tabbableChildren ??= tabbable(element);
    //const focusedElementInfo = getFocusedElement(element);
    const focusedIndex = tabbableChildren.indexOf(document.activeElement as HTMLElement);
    if (focusedIndex != -1) {
        let nextIndex = focusedIndex + 1;
        if (nextIndex < tabbableChildren.length) {
            tabbableChildren[nextIndex].focus();
            return tabbableChildren[nextIndex];
        }
        else {
            return getFirstFocusableElementS(element, tabbableChildren);
        }
    }
    return null;
}
function getPrevFocusableElementS<E extends HTMLElement>(element: E, tabbableChildren?: (HTMLElement | SVGElement)[]): (HTMLElement | SVGElement) | null {
    tabbableChildren ??= tabbable(element);
    //const focusedElementInfo = getFocusedElement(element);
    const focusedIndex = tabbableChildren.indexOf(document.activeElement as HTMLElement);
    if (focusedIndex != -1) {
        let nextIndex = focusedIndex - 1;
        if (nextIndex >= 0) {
            tabbableChildren[nextIndex].focus();
            return tabbableChildren[nextIndex];
        }
        else {
            return getLastFocusableElementS(element, tabbableChildren);
        }
    }
    return null;
}*/