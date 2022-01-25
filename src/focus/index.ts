import { ComponentChildren, createContext, Fragment, h } from "preact";
import { useGlobalHandler, useState } from "preact-prop-helpers";
import { useContext, useEffect } from "preact/hooks";

// TODO: Names are bad.  "keyboard" should be, like, ""
const FocusModeContext = createContext<"keyboard" | "mouse">("keyboard");

/**
 * Manages graphical effects related to focus management,
 * and specifically how the user's input device can affect that.
 * 
 * Certain components will use this information to slighly adjust
 * how some small details are handled visually.  For example,
 * this allows Tooltips to *not* show themselves when an
 * element with one (that's tabbable, like an <input>) receives focus,
 * but only when the user is using a mouse or other pointing device
 * (i.e. when tabbed into, the Tooltip will still show).
 * 
 * You can also provide `autoHideFocusRing`, which will cause the
 * CSS focus ring to become invisible when the user is using
 * a pointing device.  Ideally this should be a UI setting, because
 * some users may prefer it even while using a mouse.
 * 
 * @param param0 
 * @returns 
 */
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
