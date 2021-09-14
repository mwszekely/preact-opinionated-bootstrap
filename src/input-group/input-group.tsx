import { ComponentChildren, createContext, Fragment, h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { forwardElementRef } from "../props";
import { InInputGroupContext } from "./props";

export interface InputGroupProps {
    children: ComponentChildren;
}

export interface InputGroupTextProps {
    children: ComponentChildren;
}

/**
 * An InputGroup, that puts an Input and its Label together, visually, into one component.
 * 
 * All Input-type components automatically detect when they're in an InputGroup and render different accordingly.
 */
export const InputGroup = forwardElementRef(function InputGroup({ children, ...rest }: InputGroupProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>()({ class: "input-group", ref }, rest)}>
            <InInputGroupContext.Provider value={true}>
                {children}
            </InInputGroupContext.Provider>
        </div>
    )
});

/**
 * Not generally needed, since most input components come with labels that do this for you.
 * 
 * That being said, if you just need a static block of text not hooked up to any input element, this is your component.
 */
export const InputGroupText = forwardElementRef(function InputGroupText({ children, ...rest }: InputGroupTextProps, ref: Ref<HTMLSpanElement>) {
    return <span {...useMergedProps<HTMLSpanElement>()({ class: "input-group-text", ref }, rest)} />
})
