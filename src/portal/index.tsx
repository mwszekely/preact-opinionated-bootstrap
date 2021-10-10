import { VNode } from "preact";
import { generateRandomId } from "preact-prop-helpers";
import { createPortal } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

const baseId = generateRandomId("render-portal-container-")

export function BodyPortal({ children }: { children: VNode<{}> }) {
    const id = useRef<string | null>(null);
    const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
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
            element.className = "body-portal";
            element.id = id.current!;
            container.appendChild(element);
        }

        setPortalElement(element);

        return () => document.contains(element) ? document.removeChild(element!) : undefined;

    }, []);

    if (portalElement)
        return createPortal(children, portalElement);
    else
        return null;
}
