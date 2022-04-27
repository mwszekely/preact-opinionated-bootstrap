import { ComponentChildren, createContext, Fragment, h } from "preact";
import { useActiveElement, useGlobalHandler, usePassiveState, useState } from "preact-prop-helpers";
import { useCallback, useContext, useEffect } from "preact/hooks";

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
export function FocusVisibilityManager({ children, autoHideFocusRing, body }: { children: ComponentChildren, autoHideFocusRing?: boolean, body?: HTMLElement }) {
    const [usingPointer, setUsingPointer] = useState(false);
    body ??= document.body;


    // Any time the focus changes on the page, and we haven't moved the pointer in a bit,
    // we'll start showing the focus ring automatically.
    // While we can catch the Tab key and listen for that, it's tricker for components
    // that manually manage focus in whatever way.
    // This is just a rough heuristic to see if any recent change in focus
    // looked like it was mouse-initiated or not (with the acceptable caveat that
    // unrelated mouse movement still counts just fine).
    const [getHadRecentKeyPress, setHadRecentKeyPress] = usePassiveState<boolean>(useCallback((recentKeyPress: boolean) => {
        if (recentKeyPress) {
            const handle = setTimeout(() => { setHadRecentKeyPress(false); }, 100);
            return () => clearInterval(handle);
        }
    }, []), returnFalse);
    useGlobalHandler(body, "focusin", () => {
        if (getHadRecentKeyPress())
            setUsingPointer(false);
    }, { capture: true, passive: true })

    // Listen for different types of pointer events that would imply we're not using keyboard navigation
    body.addEventListener("mousemove", ev => { setUsingPointer(true); setHadRecentKeyPress(false); }, { passive: true });
    body.addEventListener("touchstart", ev => { setUsingPointer(true); setHadRecentKeyPress(false); }, { passive: true });
    body.addEventListener("pointerdown", ev => { setUsingPointer(true); setHadRecentKeyPress(false); }, { passive: true });
    body.addEventListener("pointermove", ev => { setUsingPointer(true); setHadRecentKeyPress(false); }, { passive: true });

    // Key press events are handled differently--
    // the Tab key immediately re-activates the focus ring,
    // while other navigation keys only activate it when we're not in an <input>-ish element.
    body.addEventListener("keydown", ev => {
        if (ev.key == "Tab")
            setUsingPointer(false);

        if (NavigationKeys.includes(ev.key) && !((ev.target as HTMLElement).tagName == "INPUT" || (ev.target as HTMLElement).tagName == "TEXTAREA"))
            setHadRecentKeyPress(true);
    }, { capture: true, passive: false });


    useEffect(() => {
        const hideFocusRing = (!!autoHideFocusRing && usingPointer);
        body!.style.setProperty("--input-btn-focus-color-opacity", hideFocusRing ? "0" : "0.25");
        body!.style.setProperty("--btn-active-box-shadow-opacity", hideFocusRing ? "0" : "0.4");
        body!.style.setProperty("--input-btn-check-focus-color-opacity", hideFocusRing ? "0" : "0.5");
        if (hideFocusRing)
            body!.classList.add("hide-focus-ring");
        else
            body!.classList.remove("hide-focus-ring");

        return () => {
            body!.style.removeProperty("--input-btn-focus-color-opacity");
            body!.style.removeProperty("--btn-active-box-shadow-opacity");
            body!.style.removeProperty("--input-btn-check-focus-color-opacity");
            if (hideFocusRing)
                body!.classList.remove("hide-focus-ring");
        }
    }, [usingPointer, body, !!autoHideFocusRing]);

    return h(FocusModeContext.Provider, { value: usingPointer ? "mouse" : "keyboard", children });
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

function returnFalse() { return false; }

const NavigationKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"];