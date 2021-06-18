
import { useRefElement } from "preact-async-input";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { createFocusTrap, FocusTrap } from "focus-trap";
import { Ref } from "preact";



export interface FocusTrapProps<T extends HTMLElement> {
    ref?: Ref<T>;
}

export function useOnClickOnLocation<E extends HTMLElement>(element: E | undefined | null, onClickOn: (location: "outer" | "inner", e: MouseEvent) => void) {

    const onClickOnRef = useRef(onClickOn);
    useEffect(() => { onClickOnRef.current = onClickOn; }, [onClickOn]);

    useLayoutEffect(() => {
        if (element) {
            const h1 = (e: MouseEvent) => { onClickOnRef.current?.(element.contains(e.target as HTMLElement) ? "inner" : "outer", e); };
            document.addEventListener("mouseup", h1, { passive: true });
            return () => { document.removeEventListener("mouseup", h1); };
        }
    }, [element]);
}

type KnownKeys = "Escape" | "Tab"

export function useOnKey<E extends HTMLElement>(element: E | undefined | null, keyCode: KnownKeys, onKey: (location: "outer" | "inner", e: KeyboardEvent) => void) {

    const onKeyRef = useRef(onKey);
    useEffect(() => { onKeyRef.current = onKey; }, [onKey]);

    const keyCodeRef = useRef(keyCode);
    useEffect(() => { keyCodeRef.current = keyCode; }, [keyCode]);

    useLayoutEffect(() => {
        if (element) {
            const h1 = (e: KeyboardEvent) => {
                if (e.key == keyCodeRef.current)
                    onKeyRef.current?.(element.contains(e.target as HTMLElement) ? "inner" : "outer", e);
            };

            document.addEventListener("keydown", h1, { passive: true });
            return () => { document.removeEventListener("keydown", h1, {}); };
        }
    }, [element]);
}

export function useOnEscapeKey<E extends HTMLElement>(element: E | undefined | null, onEscapeKey: (location: "outer" | "inner", e: KeyboardEvent) => void) {
    useOnKey(element, "Escape", onEscapeKey);
}

export function useOnTabKey<E extends HTMLElement>(element: E | undefined | null, onTabKey: (location: "outer" | "inner", e: KeyboardEvent) => void) {
    useOnKey(element, "Tab", onTabKey);
}

// Note: it is important for active to be false whenever the container in question is "hidden"
// (e.g. display: none)
export function useFocusTrapProps<P extends FocusTrapProps<any>>(active: boolean, p: P) {
    type InferredElementType = P extends FocusTrapProps<infer E> ? E : HTMLElement;
    const { element, useRefElementProps } = useRefElement<InferredElementType>();
    const [focusTrap, setFocusTrap] = useState<FocusTrap | null>(null);

    const [savedFocus, setSavedFocus] = useState(document.activeElement);
    const savedFocusRef = useRef<Element | null>(savedFocus);
    useEffect(() => { savedFocusRef.current = savedFocus; }, [savedFocus]);

    useEffect(() => {
        if (element) {
            try {
                let f = createFocusTrap(element, { escapeDeactivates: false });
                setFocusTrap(f);
                return () => { f.deactivate(); f.pause(); setFocusTrap(null); };
            }
            catch (ex) {
                debugger;
                console.assert(false, "Dialogs (and all modal elements) need at least one focusable child.");
                //throw ex;
            }
        }
    }, [element]);

    useEffect(() => {
        if (focusTrap) {
            try {
                // The setTimeouts are needed in Chrome, otherwise it can't find any focusable elements?
                if (active) {
                    setSavedFocus(mostRecentNonBodyElement as HTMLElement);
                    setTimeout(() => { focusTrap.activate(); }, 50);
                }
                else {
                    setTimeout(() => {
                        focusTrap.deactivate();

                        // The focus trap wasn't able to successfully re-focus to whatever was focused before
                        if (document.activeElement == document.body || element?.contains(document.activeElement)) {
                            (savedFocusRef.current as HTMLElement).focus();
                        }
                    }, 50);
                }
            }
            catch (ex) {
                debugger;
                console.assert(false, "Dialogs (and all modal elements) need at least one focusable child.");
            }
        }
    }, [active, element, focusTrap]);

    const props = useRefElementProps<P>(p);
    return props;
}

/**
 * Allows for hiding the scroll bar of the root HTML element
 * without shifting the layout of the page more than adding a fow pixels
 * of paadding to the root element if necessary.
 * @param hideScroll 
 */
export function useHideScroll(hideScroll: boolean) {
    useEffect(() => {
        if (hideScroll) {
            let widthWithScrollBar = document.documentElement.offsetWidth;
            document.documentElement.classList.add("document-scroll-hidden");
            //document.documentElement.style.overflow = "hidden";
            document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") + 1).toString();
            let widthWithoutScrollBar = document.documentElement.offsetWidth;

            const scrollbarWidth = (widthWithoutScrollBar - widthWithScrollBar);
            //document.documentElement.style.paddingInlineEnd = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);

            return () => {
                document.documentElement.dataset["scrollHiders"] = (+(document.documentElement.dataset["scrollHiders"] || "0") - 1).toString();
                if (document.documentElement.dataset["scrollHiders"] == "0") {
                    document.documentElement.removeAttribute("data-scroll-hiders");
                    document.documentElement.classList.remove("document-scroll-hidden")
                    //document.documentElement.style.removeProperty("overflow");
                    //document.documentElement.style.removeProperty("padding-inline-end");
                }
            }

        }
    }, [hideScroll])
}


interface ScrollPosition {
    x: number;
    y: number;
}


function getScrollPosition(): ScrollPosition {
    return { x: window.pageXOffset, y: window.pageYOffset };
}

export function useScrollPosition<E extends EventTarget>(element: E): ScrollPosition {
    const [position, setScrollPosition] = useState(getScrollPosition());

    useEffect(() => {

        const handler = () => {
            setScrollPosition(getScrollPosition());
        };
        element.addEventListener("scroll", handler, { passive: true });
        return () => element.removeEventListener("scroll", handler);
    }, [element]);

    return position;
}

export function useElementSize<E extends HTMLElement>(element: E | null): SizeInfo {
    //const [position, setScrollPosition] = useState(getScrollPosition());

    const [overflowX, setOverflowX] = useState(false);
    const [overflowY, setOverflowY] = useState(false);
    const [x, setX] = useState<number | null>(null);
    const [y, setY] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);

    const [scrollWidth, setScrollWidth] = useState<number | null>(null);
    const [scrollHeight, setScrollHeight] = useState<number | null>(null);
    const [scrollTop, setScrollTop] = useState<number | null>(null);
    const [scrollLeft, setScrollLeft] = useState<number | null>(null);

    useEffect(() => {

        if (element) {
            const raf = () => {
                handle = requestAnimationFrame(raf);

                //const { x, y, width, height } = element.getBoundingClientRect();
                const { scrollWidth, scrollHeight, scrollTop, scrollLeft, offsetLeft, offsetTop, offsetWidth, offsetHeight, clientWidth, clientHeight } = element;
                setX(offsetLeft);
                setY(offsetTop);
                setWidth(offsetWidth);
                setHeight(offsetHeight);
                setScrollWidth(scrollWidth);
                setScrollHeight(scrollHeight);
                setScrollLeft(scrollLeft);
                setScrollTop(scrollTop);

                setOverflowX(scrollWidth > clientWidth);
                setOverflowY(scrollHeight > clientHeight);
            };

            let handle = requestAnimationFrame(raf);
            return () => cancelAnimationFrame(handle);
        }
    }, [element]);

    return {
        x,
        y,
        width,
        height,
        scrollWidth,
        scrollHeight,
        scrollTop,
        scrollLeft,

        overflowX,
        overflowY
    } as SizeInfo1;
}

export type SizeInfo = SizeInfo1 | SizeInfo2;

interface SizeInfo1 {
    x: number;
    y: number;
    width: number;
    height: number;
    scrollWidth: number;
    scrollHeight: number;
    scrollTop: number;
    scrollLeft: number;

    overflowX: boolean;
    overflowY: boolean;
}

interface SizeInfo2 {
    x: null;
    y: null;
    width: null;
    height: null;
    scrollWidth: null;
    scrollHeight: null;
    scrollTop: null;
    scrollLeft: null;

    overflowX: boolean;
    overflowY: boolean;
}






// Fix a weird bug in Chrome where, when opening a dialog, for some reason,
// document.activeElement will only ever return the body if you try to focus
// anything outside of the dialog.  This is true even if it's just role="dialog",
// or something--it doesn't need to be an actual dialog.  But it makes it impossible
// to tell what element was focused by the time you've opened something that's
// dialog-ish, so, uh, here we go, let's track every non-body element every frame.
export let mostRecentNonBodyElement: Element = null!;
requestAnimationFrame(focusedElementWatcher);
function focusedElementWatcher() {
    requestAnimationFrame(focusedElementWatcher);

    if (document.activeElement && document.activeElement != document.body)
        mostRecentNonBodyElement = document.activeElement;
}