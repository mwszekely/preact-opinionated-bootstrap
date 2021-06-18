import { useRefElement } from "preact-async-input";
import { useCallback, useEffect, useState } from "preact/hooks";
import { h, Ref } from "preact"
import { ToastPropsMin } from "./toast";
import { useMergedProps } from "../merge-props";

export function useHasMouseover() {

    const [hasMouseover, setHasMousevoer] = useState(false);


    return {
        hasMouseover,
        useHasMouseoverProps: <P extends {}>(props: P) => useMergedProps({
            className: undefined,
            onMouseEnter: useCallback<NonNullable<h.JSX.HTMLAttributes<HTMLDivElement>["onMouseEnter"]>>((e) => { setHasMousevoer(true); }, [setHasMousevoer]),
            onMouseLeave: useCallback<NonNullable<h.JSX.HTMLAttributes<HTMLDivElement>["onMouseLeave"]>>((e) => { setHasMousevoer(false); }, [setHasMousevoer]),
        }, props)
    };
}


export function useHasFocus<E extends HTMLElement>() {

    const [hasFocus, setHasFocus] = useState(false);


    return {
        hasFocus,
        useHasFocusProps: function <PropType extends { ref: Ref<E>; }>({ ...rest }: PropType) {

            const { element, useRefElementProps } = useRefElement<E>();

            useEffect(() => {
                const h1 = (e: FocusEvent) => {
                    // We specifically use :focus instead of activeElement
                    const activeElement = document.querySelector("*:focus");
                    setHasFocus(!!activeElement && (element == activeElement || !!element?.contains(activeElement)));
                };
                //const h3 = (e: FocusEvent) => { /*setHasFocus(false);*/ }
                document.addEventListener("focusin", h1, { passive: true });

                // We also check any time we click because there's no other way to track :focus
                document.addEventListener("mouseup", h1, { passive: true });
                //window.addEventListener("blur", h3);
                return () => {
                    document.removeEventListener("mouseup", h1);
                    document.removeEventListener("focusin", h1);
                    //window.removeEventListener("blur", h3);
                }
            }, [element]);

            return useRefElementProps(rest);
        }
    };
}
