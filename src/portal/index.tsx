import { ComponentChildren, createContext, VNode, h } from "preact";
import { generateRandomId } from "preact-prop-helpers";
import { createPortal, memo } from "preact/compat";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { forwardElementRef } from "props";

const baseId = generateRandomId("render-portal-container-")

const BodyPortalClassContext = createContext("");

export const SetBodyPortalClass = memo(function SetBodyPortalClass({ className, children }: { className: string, children: ComponentChildren }) {
    return <BodyPortalClassContext.Provider value={className}>{children}</BodyPortalClassContext.Provider>
})

export function BodyPortal({ children }: { children: VNode<{}> }) {
    const id = useRef<string | null>(null);
    const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
    const bodyPortalClass = useContext(BodyPortalClassContext);
    useEffect(() => {
        if (id.current == null) {
            id.current = generateRandomId();
        }

        let container = document.getElementById(baseId);
        if (!container) {
            container = document.createElement("div");
            container.id = baseId;
            container.className = "body-portal-container"
            document.body.appendChild(container);
        }
        let element = document.getElementById(id.current) as HTMLDivElement | null;
        if (!element) {
            element = document.createElement("div");
            element.className = `body-portal ${bodyPortalClass}`;
            element.id = id.current!;
            container.appendChild(element);
        }

        setPortalElement(element);

        return () => document.contains(element) ? element?.remove() : undefined;

    }, [bodyPortalClass]);

    if (portalElement)
        return createPortal(children, portalElement);
    else
        return null;
}
