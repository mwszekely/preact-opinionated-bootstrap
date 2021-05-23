import { cloneElement, ComponentChild, h, Ref, RenderableProps, VNode } from "preact";
import { forwardElementRef, useRefBackup } from "preact-async-input";
import { useRefElement } from "preact-async-input/src/use-ref-element";
import { ButtonGroup } from "../button-group/component";
import { Button, ButtonComponentProps } from "../button/component";
import { ButtonPropsMin } from "../button/props";
import { SimpleProps } from "../props-shared";
import { DropdownContainerPropsMin, dropdownContainerProps, DropdownItemPropsMin, dropdownItemProps, DropdownMenuPropsMin, dropdownMenuProps, DropdownSourcePropsMin, useDropdownSourceProps } from "./props";

export interface DropdownSourceProps<E extends HTMLElement> extends DropdownSourcePropsMin<E>, Omit<SimpleProps<E>, "children"> {
    children: VNode<any>;
}

export interface DropdownItemProps extends DropdownItemPropsMin, SimpleProps<HTMLLIElement> {
    children: VNode<any>;
}

export interface DropdownMenuProps<E extends HTMLElement> extends DropdownMenuPropsMin, SimpleProps<E> {
    children: VNode<any>;
}

export interface DropdownContainerProps<E extends HTMLElement> extends DropdownContainerPropsMin, SimpleProps<E> {
    children: VNode<any>;
}

export const DropdownSource = forwardElementRef(function <E extends HTMLElement>({ children, ...rest }: DropdownSourceProps<E>, givenRef: Ref<E>) {
    const { element, useRefElementProps } = useRefElement<E>();

    return cloneElement(children, useDropdownSourceProps<E>(element, useRefElementProps({ ...rest, ref: givenRef })));
})

export function DropdownMenu<E extends HTMLElement>({ children, ...rest }: DropdownMenuProps<E>) {
    return cloneElement(children, dropdownMenuProps(rest));
}

export function DropdownMenuItem({ children, active, header, ...rest }: DropdownItemProps) {
    return <li {...rest}>{cloneElement(children, dropdownItemProps({ active, header }))}</li>;
}

export const DropdownContainer = forwardElementRef(function <E extends HTMLElement>({ children, ...rest }: DropdownContainerProps<E>, givenRef: Ref<E>) {
    const { element, useRefElementProps } = useRefElement<E>();

    return cloneElement(children, dropdownContainerProps(useRefElementProps({ ...rest, ref: givenRef })));
})


interface DropdownButtonProps<E extends HTMLElement> extends Omit<DropdownMenuPropsMin, "className"> {
    direction?: DropdownContainerProps<E>["direction"];
    variant?: ButtonPropsMin["variant"];
    size?: ButtonPropsMin["size"];
    menuContents: VNode<{ className?: string | undefined; children: ComponentChild; }>;
    display?: DropdownSourcePropsMin<E>["display"];

    split?: boolean;

    children: VNode<{ className?: string }>
}

export const DropdownButton = forwardElementRef(function DropdownButton<E extends HTMLDivElement>({ children, display, direction, size, variant, split, menuContents, ...props }: DropdownButtonProps<E>, ref: Ref<E>) {

    if (split) {
        return (
            <DropdownContainer direction={direction} ref={ref}>
                <ButtonGroup size={size}>
                    {children}
                    <DropdownSource display={display}><Button className="dropdown-toggle-split"><span class="visually-hidden">Toggle Dropdown</span></Button></DropdownSource>
                    <DropdownMenu {...props}>{menuContents}</DropdownMenu>
                </ButtonGroup>
            </DropdownContainer>
        )
    }
    else {
        return (
            <DropdownContainer direction={direction} ref={ref}>
                <ButtonGroup size={size}>
                    <DropdownSource display={display}>{children}</DropdownSource>
                    <DropdownMenu {...props}>{menuContents}</DropdownMenu>
                </ButtonGroup>
            </DropdownContainer>
        )
    }
});

