import { ComponentChildren, Fragment, h } from "preact";
import { useGlobalHandler, useState } from "preact-prop-helpers";
import { useEffect } from "preact/hooks";

export function FocusRingVisibilityManager({ children }: { children: ComponentChildren }) {
    const [hideFocusRing, setHideFocusRing] = useState(false);

    document.addEventListener("mousemove", ev => setHideFocusRing(true), { passive: true });
    document.addEventListener("touchstart", ev => setHideFocusRing(true), { passive: true });
    document.addEventListener("pointermove", ev => setHideFocusRing(true), { passive: true });
    document.addEventListener("keydown", ev => {
        if (ev.key == "Tab") {
            setHideFocusRing(false);
        }
    });

    useEffect(() => {
        document.body.style.setProperty("--input-btn-focus-color-opacity", hideFocusRing? "0" : "0.25");
        document.body.style.setProperty("--btn-active-box-shadow-opacity", hideFocusRing? "0" : "0.4");
        document.body.style.setProperty("--input-btn-check-focus-color-opacity", hideFocusRing? "0" : "0.5");
    }, [hideFocusRing]);

    return h(Fragment, {}, children);

}
