import clsx from "clsx";
import { Component, ComponentChildren, Fragment, h, Ref } from "preact";
import { forwardElementRef, ProvideId, useProvidedId } from "preact-async-input";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";
import { useContext } from "preact/hooks";
import { InputGroupText, IsInInputGroupContext } from "../../input-group/component";
import { useInputGroupTextProps } from "../../input-group/props";
import { FloatingLabelContainerProps, useFloatingLabelContainerProps } from "../form-controls/props";
import { InToggleButton } from "../toggle-button/context";
import { FormLabelProps, useFormLabelProps } from "./props";

export interface LabelComponentProps<E extends HTMLElement = HTMLLabelElement> extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes | "htmlFor" | "for" | "children"> { }

interface ProvideLabelProps1 extends Omit<LabelComponentProps, "isHidden"> {
    position: "before" | "after" | "hidden"
    label: ComponentChildren;
}

interface ProvideLabelProps2 extends Omit<LabelComponentProps<HTMLDivElement>, "isHidden"> {
    position: "floating";
    label: ComponentChildren;
}

export type ProvideLabelProps = (ProvideLabelProps1 | ProvideLabelProps2);

/**
 * A component that wraps around another component and provides a label with the specified text at the specified position,
 * automatically hooking up htmlFor and id properly, and placing it earlier or later in the DOM tree (unless it's a floating label).
 * Useful inside of InputGroup components, in which case the Label it creates will itself create a InputGroupText.
 * 
 * @param p 
 * @returns 
 */
export function ProvideLabel(p: ProvideLabelProps) {
    if (p.position == "floating") {
        const { position, id, label: labelContents, children, ...props } = p;
        return (
            <ProvideId id={id}>
                <FloatingLabelContainer {...props}>
                    {children}
                    <FloatingLabel htmlFor={id} children={labelContents} />
                </FloatingLabelContainer>
            </ProvideId>
        )
    }
    else {
        const { position, id, label: labelContents, children, ...props } = p;

        const isHidden = (position == "hidden");
        return (
            <ProvideId id={id}>
                <Helper {...props} labelContents={labelContents} id={id} position={position as "before" | "after"} isHidden={isHidden}>{children}</Helper>
            </ProvideId>
        )
    }
}

// Child component to use the id provided by ProvideId
function Helper({ id, isHidden, position, labelContents, children, ...props }: Omit<ProvideLabelProps, "label"> & { isHidden: boolean, labelContents: ComponentChildren, children: ComponentChildren, position: "before" | "after" }) {
    id = useProvidedId("no-backup", id);
    const label = <Label htmlFor={id!} {...props} isHidden={isHidden}>{labelContents}</Label>;

    return (
        <>
            {position == "before" && label}
            {children}
            {position == "after" && label}
        </>
    )
}



interface FloatingLabelContainerComponentProps<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "ref" | "children" | "className">, FloatingLabelContainerProps {
    isHidden?: boolean;
}

// Also a helper child component
const FloatingLabelContainer = forwardElementRef(function FloatingLabelContainer(p: FloatingLabelContainerComponentProps<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    let props = useFloatingLabelContainerProps(p);
    return <div {...props} ref={ref} />
});


interface FloatingLabelProps extends Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "ref" | "children" | "htmlFor" | "className"> {
    isHidden?: boolean;
}

const FloatingLabel = forwardElementRef(function FloatingLabel(p: FloatingLabelProps, ref: Ref<HTMLLabelElement>) {
    let { children, htmlFor, ...props } = useFormLabelProps({ ...p, ref });
    htmlFor = useProvidedId("no-backup", htmlFor);
    return <label {...props} htmlFor={htmlFor}>{children}</label>
});





interface LabelProps extends Pick<h.JSX.HTMLAttributes<HTMLLabelElement>, "ref" | "children" | "htmlFor">, FormLabelProps {
    isHidden?: boolean;
    htmlFor: string;
}

/**
 * A standard label element that references an input element. If this is placed in an InputGroup, it will be wrapped in an InputGroupText.
 */
export const Label = forwardElementRef(function Label({ htmlFor, isHidden, ...p }: LabelProps, ref: Ref<HTMLLabelElement>) {
    htmlFor = useProvidedId("no-backup", htmlFor)!;
    let P1 = useFormLabelProps({ ...p, htmlFor, ref: ref });    
    const P2 = useInputGroupTextProps({ ...p, htmlFor, ref });

    const isInInputGroup = useContext(IsInInputGroupContext);
    const isToggleButton = useContext(InToggleButton);


    if (isInInputGroup && !isToggleButton && !isHidden)
        return <label {...P2} htmlFor={htmlFor} />;
    else
        return <label {...P1} className={clsx(isHidden && "visually-hidden", P1.className)} htmlFor={htmlFor} />;
})
