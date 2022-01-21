import { ComponentChildren, createContext, Fragment, h } from "preact";
import { useGlobalHandler, useState } from "preact-prop-helpers";
import { useContext, useEffect } from "preact/hooks";

// 
const FocusModeContext = createContext<"keyboard" | "mouse">("keyboard");
export function FocusVisibilityManager({ children, autoHideFocusRing }: { children: ComponentChildren, autoHideFocusRing?: boolean }) {
    const [usingPointer, setUsingPointer] = useState(false);

    document.addEventListener("mousemove", ev => setUsingPointer(true), { passive: true });
    document.addEventListener("touchstart", ev => setUsingPointer(true), { passive: true });
    document.addEventListener("pointermove", ev => setUsingPointer(true), { passive: true });
    document.addEventListener("keydown", ev => {
        if (ev.key == "Tab") {
            setUsingPointer(false);
        }
    });

    useEffect(() => {
        const hideFocusRing = (!!autoHideFocusRing && usingPointer);
        document.body.style.setProperty("--input-btn-focus-color-opacity", hideFocusRing? "0" : "0.25");
        document.body.style.setProperty("--btn-active-box-shadow-opacity", hideFocusRing? "0" : "0.4");
        document.body.style.setProperty("--input-btn-check-focus-color-opacity", hideFocusRing? "0" : "0.5");
    }, [usingPointer, !!autoHideFocusRing]);

    return h(FocusModeContext.Provider, { value: usingPointer? "mouse" : "keyboard", children });
}

/**
 * Returns whether it's more likely that the user is currently
 * navigating with the keyboard or mouse.
 * 
 * **FOR VISUAL EFFECTS ONLY.** There should be no actual logic
 * that depends on this very rough heuristic. Tooltips, for example,
 * use this to determine whether to show on focus (which otherwise
 * only happens for focusable-but-not-tabbable elements)
 */
export function useFocusMode() {
    return useContext(FocusModeContext);
}
