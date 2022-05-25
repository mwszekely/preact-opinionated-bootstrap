import { ComponentChildren, createContext, VNode, h } from "preact";
import { generateRandomId, useRefElement, useState } from "preact-prop-helpers";
import { createPortal, memo } from "preact/compat";
import { useCallback, useContext, useEffect, useRef } from "preact/hooks";
import { forwardElementRef } from "../props";

const baseId = generateRandomId("render-portal-container-")

const BodyPortalClassContext = createContext("");
const BodyPortalRootContext = createContext<() => (HTMLElement | null)>(() => document.getElementById(baseId));

export const SetBodyPortalClass = memo(function SetBodyPortalClass({ className, children }: { className: string, children: ComponentChildren }) {
    return <BodyPortalClassContext.Provider value={className}>{children}</BodyPortalClassContext.Provider>
})

function useBodyPortalRoot(): HTMLElement {
    const valueFromContext = useContext(BodyPortalRootContext);
    let container: HTMLElement | null = null;

    // Prefer using a container provided via context, if one's available.
    if (valueFromContext)
        container = valueFromContext();

    // If not, try to use the default body portal
    if (!container)
        container = document.getElementById(baseId);

    // If we haven't created the default body portal yet, do so.
    if (!container) {
        container = document.createElement("div");
        container.id = baseId;
        container.className = "body-portal-container"
        document.body.appendChild(container);
    }

    return container;
}

export function BodyPortalRoot({ children }: { children: VNode<{}> }) {
    const [element, setElement, getElement] = useState<HTMLElement | null>(null);
    const { useRefElementProps } = useRefElement<HTMLDivElement>({ onElementChange: setElement })
    return (
        <BodyPortalRootContext.Provider value={useCallback(() => (getElement()?.parentElement ?? null), [])}>{children}<div {...useRefElementProps({ hidden: true })} /></BodyPortalRootContext.Provider>
    )
}

export function BodyPortal({ children }: { children: VNode<{}> }) {
    const id = useRef<string | null>(null);
    const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
    const bodyPortalClass = useContext(BodyPortalClassContext);
    const container = useBodyPortalRoot();

    useEffect(() => {
        if (id.current == null) {
            id.current = generateRandomId();
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

    }, [container, bodyPortalClass]);

    if (portalElement)
        return createPortal(children, portalElement);
    else
        return null;
}
