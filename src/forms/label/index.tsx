import clsx from "clsx";
import { h, VNode, Ref, ComponentChildren } from "preact";
import { forwardElementRef, ProvideId, useProvidedId } from "preact-async-input";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";
import { useContext } from "preact/hooks";
import { InputGroupText, IsInInputGroupContext } from "../../input-group/component";
import { FloatingLabelContainerProps, useFloatingLabelContainerProps, useFormLabelProps, FormLabelProps } from "../form-controls/props";

export interface LabelComponentProps<E extends HTMLElement = HTMLLabelElement> extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes | "htmlFor" | "for" | "children"> {}

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
 * A component that wraps around another component and provides a label with the specified text at the specified position.
 * (Basically just placing it earlier or later in the DOM tree, unless it's a floating label)
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
        const label = <Label {...props} isHidden={isHidden}>{labelContents}</Label>;
        const isAfter = (position == "after");
        return (
            <ProvideId id={id}>
                {!isAfter && label}
                {children}
                {isAfter && label}
            </ProvideId>
        )
    }
}



interface FloatingLabelContainerComponentProps<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, "ref" | "children" | "className">, FloatingLabelContainerProps {
    isHidden?: boolean;
}

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
}

/**
 * A standard label element that references an input element. If this is placed in an InputGroup, it will be wrapped in an InputGroupText.
 */
export const Label = forwardElementRef(function Label(p: LabelProps, ref: Ref<HTMLLabelElement>) {
    let { children, isHidden, className, htmlFor, ...props } = useFormLabelProps({ ...p, ref: ref });
    const isInInputGroup = useContext(IsInInputGroupContext);
    htmlFor = useProvidedId("no-backup", htmlFor);


    if (isInInputGroup && !isHidden)
        return <InputGroupText><label {...props} htmlFor={htmlFor}>{children}</label></InputGroupText>;
    else
        return <label {...props} className={clsx(isHidden && "visually-hidden", className)} htmlFor={htmlFor}>{children}</label>;
})
