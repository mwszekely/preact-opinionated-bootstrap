import { VNode } from "preact";
import { createPortal, useEffect, useRef, useState } from "preact/compat";

function RandomId(p = "render-portal-") {
    return p + (
        Math.floor(Math.random() * 2 ** 32).toString(16) +
        Math.floor(Math.random() * 2 ** 32).toString(16) +
        Math.floor(Math.random() * 2 ** 32).toString(16) +
        Math.floor(Math.random() * 2 ** 32).toString(16)
    )
}

const baseId = RandomId("render-portal-container-")

export function BodyPortal({ children }: { children: VNode<{}> }) {
    const id = useRef<string | null>(null);
    const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
    useEffect(() => {
        if (id.current == null) {
            id.current = RandomId();
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

        return () => document.removeChild(element!);

    }, []);

    if (portalElement)
        return createPortal(children, portalElement);
    else
        return null;
}
