import { ComponentChildren, h, Ref } from "preact";
import { useMutationObserver, useRefElement, useState } from "preact-prop-helpers";
import { useCallback, useEffect } from "preact/hooks";

/**
 * Utility function for a parent that quickly needs the text content of its children, 
 * ideally as the `children` prop, but will fall back to a mutation observer if necessary.
 * 
 * Returns the text content, and the modified props to use for the parent.
 * 
 * @param props 
 * @returns 
 */
export function useChildrenTextProps<P extends { children?: ComponentChildren; ref?: Ref<any>; }>(props: P) {
    type E = P extends { ref?: Ref<infer E> } ? E : HTMLElement;

    const children = props.children;

    const childrenNotStringable = !childrenIsStringable(children);
    const [text, setText] = useState<string | null>(() => childrenNotStringable ? null : childrenToString(children));

    const onElementUpdate = useCallback((element: E | null) => {
        if (childrenNotStringable) {
            setText(((element as Element)?.textContent ?? "").trim());
        }
    }, [childrenNotStringable])

    const { useRefElementProps, getElement } = useRefElement<E>({ onElementChange: onElementUpdate });
    const { useMutationObserverProps } = useMutationObserver(childrenNotStringable ? { subtree: true, onCharacterData: (info) => onElementUpdate(getElement()) } : null);
    useEffect(() => {
        if (!childrenNotStringable) {
            setText(childrenToString(children as any));
        }
    }, [childrenNotStringable, childrenNotStringable ? null : children]);


    return { childrenText: text, props: useMutationObserverProps(useRefElementProps(props)) as P };
}

function childrenToString(children: ComponentChildren): string {
    if (children == null)
        return "";
    else if (Array.isArray(children))
        return children.map(child => childrenToString(child)).join("");
    else if (typeof children == "string")
        return children;
    else if (typeof children == "boolean")
        return "";
    return `${children}`;
}

function childrenIsStringable(children: ComponentChildren): boolean {
    if (children == null)
        return true;
    else if (Array.isArray(children)) {
        for (let child of children) {
            if (!childrenIsStringable(child))
                return false;
        }
        return true;
    }
    else if (typeof children === "string")
        return true;
    else if (typeof children === "number")
        return true;
    else if (typeof children === "bigint")
        return true;
    else if (typeof children === "boolean")
        return true;

    return false;
}

