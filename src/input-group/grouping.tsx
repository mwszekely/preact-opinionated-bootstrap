import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref } from "preact";
import { TagSensitiveProps } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes } from "../props";
import { InInputGridContext, InInputGroupContext } from "./props";

export interface InputGroupProps<E extends Element> extends Partial<TagSensitiveProps<E>>, GlobalAttributes<E> {

}

export interface InputGridProps<E extends Element> extends Partial<TagSensitiveProps<E>>, GlobalAttributes<E> {
    size?: "sm" | "md" | "lg";
}

export interface InputGroupTextProps<E extends Element> extends Partial<TagSensitiveProps<E>>, Omit<h.JSX.HTMLAttributes<E>, "children"> {
    children: ComponentChildren;
    disabled?: boolean;
}

export const InputGrid = memo(forwardElementRef(function InputGrid<E extends Element>({ tag, size, children, ...props }: InputGridProps<E>, ref: Ref<E>) {
    return createElement(tag ?? "div" as any, useMergedProps<E>()({ class: clsx("input-grid", size && size != "md" && `input-group-${size}`), ref }, props),
        <InInputGridContext.Provider value={useContext(InInputGridContext) + 1}>{children}</InInputGridContext.Provider>
    );
}));

/**
 * An InputGroup, that puts an Input and its Label together, visually, into one component.
 * 
 * All Input-type components automatically detect when they're in an InputGroup and render different accordingly.
 */
export const InputGroup = memo(forwardElementRef(function InputGroup<E extends Element>({ children, tag, ...props }: InputGroupProps<E>, ref: Ref<E>) {
    return (
        createElement(tag ?? "div" as any, useMergedProps<E>()({ class: "input-group", ref }, props),
            <InInputGroupContext.Provider value={true}>
                {children}
            </InInputGroupContext.Provider>
        )
    );
}));

/**
 * Not generally needed, since most input components come with labels that do this for you.
 * 
 * That being said, if you just need a static block of text not hooked up to any input element, this is your component.
 */
export const InputGroupText = forwardElementRef(function InputGroupText<E extends Element>({ tag, children, disabled, ...props }: InputGroupTextProps<E>, ref: Ref<E>) {
    return createElement(tag ?? "div" as any, useMergedProps<E>()({ class: clsx(disabled && "disabled", "input-group-text"), ref }, props), children);
})
