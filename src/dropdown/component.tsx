import { cloneElement, ComponentChild, ComponentChildren, createContext, Fragment, h, Ref, RenderableProps, VNode } from "preact";
import { forwardElementRef, useRefBackup } from "preact-async-input";
import { useRefElement } from "preact-async-input/src/use-ref-element";
import { ButtonGroup } from "../button-group/component";
import { Button } from "../button/component";
import { ButtonPropsMin } from "../button/props";
import { SimpleProps } from "../props-shared";
import { createPopper } from "@popperjs/core"
import { DropdownContainerPropsMin, DropdownItemPropsMin, useDropdownItemProps, DropdownMenuPropsMin, dropdownMenuProps, DropdownSourcePropsMin, useDropdownHeaderProps, DropdownHeaderPropsMin } from "./props";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useContext } from "preact/hooks";
import { Fade, Zoom } from "preact-transition/src/index";
import { useOnClickOnLocation, useOnEscapeKey, useOnTabKey } from "../dialog/utility";
import { usePopper } from "./popper";
import { clsx } from "../bootstrap-classes";
import { useDropdownButton, WithKeyboardFocus } from "./utility";
import { useHasFocus } from "../toast/utility";
import { useMergedProps } from "../merge-props";



export interface DropdownSourceProps<E extends HTMLElement> extends DropdownSourcePropsMin<E> {
    children: VNode<any>;
}

export interface DropdownItemProps extends Omit<DropdownItemPropsMin, "id">, SimpleProps<HTMLLIElement> {
    children: VNode<any>;
}

export interface DropdownHeaderProps extends Omit<DropdownHeaderPropsMin, "id">, SimpleProps<HTMLLIElement> {
    children: VNode<any>;
}

/*export interface DropdownMenuProps<T extends keyof h.JSX.IntrinsicElements> extends DropdownMenuPropsMin, SimpleProps<h.JSX.IntrinsicElements[T] & HTMLElement> {
    tag: T;
    children: VNode<any>;
}*/

export interface DropdownContainerProps<E extends HTMLElement> extends DropdownContainerPropsMin, SimpleProps<E> {
    children: VNode<any>;
}
/*
export const DropdownSource = forwardElementRef(function <E extends HTMLElement>({ children, ...rest }: DropdownSourceProps<E>, givenRef: Ref<E>) {
    const { element, useRefElementProps } = useRefElement<E>();

    return cloneElement(children, useDropdownSourceProps(element, useRefElementProps({ ...rest, ...(children.props as {}), ref: givenRef })));
})*/

export const DropdownMenu = forwardElementRef(function DropdownMenu<T extends keyof h.JSX.IntrinsicElements>({ tag, ...rest }: { tag: T } & DropdownMenuPropsMin & SimpleProps<h.JSX.IntrinsicElements[T] & HTMLElement>, ref: Ref<h.JSX.IntrinsicElements[T] & HTMLElement>) {
    return h(tag, dropdownMenuProps({ ...rest, ref: ref as any }));
});

export function DropdownMenuItem({ children, index, active, ...rest }: DropdownItemProps) {

    const randomId = useRef(`item-${Math.floor(Math.random() * (2 ** 32)).toString(16).toUpperCase()}`);

    const innerOnClick = useContext(OnClickInnerItemContext);

    return <li {...rest}>{cloneElement(children, useDropdownItemProps({ active, role: "menuitem", onClick: innerOnClick, index, ...children.props, id: children.props.id ?? randomId.current }))}</li>;
}

export function DropdownMenuHeader({ children, ...rest }: DropdownHeaderProps) {

    const randomId = useRef(`item-${Math.floor(Math.random() * (2 ** 32)).toString(16).toUpperCase()}`);

    return <li {...rest}>{cloneElement(children, useDropdownHeaderProps({ ...children.props, id: children.props.id ?? randomId.current }))}</li>;
}

/*export const DropdownContainer = forwardElementRef(function <E extends HTMLElement>({ children, ...rest }: DropdownContainerProps<E>, givenRef: Ref<E>) {
    const { element, useRefElementProps } = useRefElement<E>();

    return cloneElement(children, dropdownContainerProps(useRefElementProps({ ...rest, ...(children.props as {}), ref: givenRef })));
})*/

const noop = () => { };

const OnClickInnerItemContext = createContext<null | (() => void)>(null!);

interface DropdownButtonProps<E extends HTMLElement> extends DropdownContainerPropsMin {
    variant?: ButtonPropsMin["variant"];
    size?: ButtonPropsMin["size"];
    menuContents: VNode<{ className?: string | undefined; children: ComponentChild; }>;
    display?: DropdownSourcePropsMin<E>["display"];
    //autoClose?: DropdownSourcePropsMin<E>["autoClose"];
    autoClose?: "both" | "inner" | "outer" | "none";
    boundary?: DropdownSourcePropsMin<E>["boundary"];

    offsetX?: number;
    offsetY?: number;
    split?: boolean;
    disabled?: boolean | "primary" | "dropdown" | "both";

    menuTag?: "ol" | "ul";
    align?: "start" | "end";
    dark?: boolean;



    children: ComponentChildren;
}


export const DropdownButton = forwardElementRef(function DropdownButton<E extends HTMLDivElement>({ children, disabled, display, menuTag, offsetX, offsetY, direction, boundary, size, autoClose, variant, align, split, menuContents, className, dark, ...props }: DropdownButtonProps<E>, ref: Ref<E>) {

    const [hasEverOpened, setHasEverOpened] = useState(false);
    const [open, setOpen] = useState(false);
    const openRef = useRef(open);
    useEffect(() => { openRef.current = open; }, [open])
    //const setOpen = useCallback((o: boolean | ((prev: boolean) => boolean)) => { if (o == false) setOpen2(o) }, [setOpen2]);

    autoClose ??= "both";

    let onClose = useCallback((reason: "escape" | "inner" | "outer") => {
        if (reason == "escape")
            setOpen(false);
        if (autoClose == "both" || autoClose == reason) {
            setOpen(false);
        }
    }, [autoClose]);

    if (!open)
        onClose = noop!;

    const onCloseInner = useCallback(() => {
        onClose("inner");
    }, [onClose])

    useEffect(() => {
        if (open)
            setHasEverOpened(true);
    }, [open])

    const sourceRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLUListElement | HTMLOListElement | null>(null);
    const menuContainer = menuRef.current;
    const sourceElement = sourceRef.current;

    const { hasFocus: menuHasFocus, useHasFocusProps: useMenuHasFocusProps } = useHasFocus();
    const { hasFocus: sourceHasFocus, useHasFocusProps: useSourceHasFocusProps } = useHasFocus();
    let neitherHasFocus = (!menuHasFocus && !sourceHasFocus);

    if (document.activeElement == document.body) {
        // If we click on a header or other non-item area, it sends focus to the body.
        // This technically means nothing is focused, which is annoying?
        // So wait until something, like, *real* is focused.
        // (we use useOnClickOnLocation to catch *actual* body clicks)
        neitherHasFocus = false;
    }



    useEffect(() => {
        if (neitherHasFocus) {
            onClose("outer");
        }
    }, [neitherHasFocus]);

    useOnEscapeKey(sourceElement, (location, e) => { if (location == "inner") onClose("escape"); });
    useOnEscapeKey(menuContainer, (location, e) => { if (location == "inner") onClose("escape"); });
    useOnClickOnLocation(menuContainer, (location, e) => { if (location == "outer") onClose(location); });

    const { attributes: { popper: popperAttributes }, styles: { popper: popperStyles }, forceUpdate: forcePopperUpdate } = usePopper(sourceElement ?? undefined, menuContainer, {
        placement: _getPlacement(direction ?? "down"),
        modifiers: [{
            name: 'preventOverflow',
            options: { boundary: boundary ?? "clippingParents" }
        },
        {
            name: 'eventListeners',
            options: { scroll: true, resize: true }
        },
        {
            name: 'offset',
            options: {
                offset: [offsetX, offsetY]
            }
        }]
    });


    // Always make sure the popper is in the right position when we open/close it, just to be safe.
    // (Also fixes a bug where dropdowns in offcanvas components are off until you scroll)
    useEffect(() => { forcePopperUpdate?.(); }, [open]);

    const { Context, setFocusToFirst, setFocusToLast, setFocusToNext, setFocusToPrev, setFocusToCurrent, useDropdownButtonProps, useMenuProps } = useDropdownButton({ setOpen, menuContainer });
    //const { useArrowKeyTabNavigationProps } = useArrowKeyNavigation({ container: menuContainer })
    //const cloneToDropdownSource = (e: VNode<any>) => { return cloneElement(e,  }

    const useFooProps = <Props extends {}>(p: Props) => useDropdownButtonProps(useMergedProps(useSourceHasFocusProps({ className: clsx("position-relative", "dropdown-toggle"), ref: sourceRef, onTransitionEnd: forcePopperUpdate }), p));


    const F = (useMenuProps(useMenuHasFocusProps({ className: "fade-transition-only", open, onKeyDown: undefined, ref: menuRef as any as Ref<any> })));
    //let B = <Button {...useButtonProps({ onKeyDown: undefined })} variant={variant} disabled={disabled && disabled != "dropdown"} size={size}>{children}</Button>;
    const M = <Fade {...F}><DropdownMenu align={align} tag={menuTag ?? "ul"} dark={dark} style={popperStyles as h.JSX.CSSProperties}>{menuContents}</DropdownMenu></Fade>;

    // When the dropdown opens, always focus its focusable element
    useEffect(() => {
        if (open)
            setFocusToCurrent(WithKeyboardFocus);
    }, [open]);

    // When the dropdown menu closes, always focus the source button
    useEffect(() => {
        if (hasEverOpened && !open && (menuHasFocus || document.activeElement === document.body)) {
            sourceElement?.focus();
        }
    }, [hasEverOpened, sourceElement, open, menuHasFocus])

    let dropdownSourceProps = useFooProps(split ? {
        ref: sourceRef,
        "aria-expanded": open ? "true" : undefined,
        variant,
        style: undefined,
        disabled: disabled && disabled != "primary",
        className: "dropdown-toggle-split",
        children: <span className="visually-hidden">Toggle Dropdown</span>
    } : {
        style: undefined,
        "aria-expanded": open ? "true" : undefined,
        variant,
        disabled: disabled && disabled != "dropdown",
        size,
        children
    });

    if (split) {
        return (
            <Context>
                <OnClickInnerItemContext.Provider value={onCloseInner}>
                    <ButtonGroup size={size} >

                        {
                            <Button variant={variant} disabled={disabled && disabled != "dropdown"} size={size}>{children}</Button>
                            //B
                        }

                        {
                            <Button {...dropdownSourceProps} />
                            //cloneToDropdownSource(<Button ref={sourceRef} variant={variant} disabled={disabled && disabled != "primary"} className="dropdown-toggle-split"><span className="visually-hidden">Toggle Dropdown</span></Button>)
                        }
                        {M}
                    </ButtonGroup>
                </OnClickInnerItemContext.Provider>
            </Context>
        )
    }
    else {
        return (
            <Context>
                <OnClickInnerItemContext.Provider value={onCloseInner}>
                    {
                        <Button {...dropdownSourceProps} />
                        //cloneToDropdownSource(B)
                    }
                    {M}
                </OnClickInnerItemContext.Provider>
            </Context>
        );

    }
});








const isRTL = () => document.documentElement.dir === 'rtl'
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start'
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end'
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start'
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end'
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start'
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start'
function _getPlacement(direction: "down" | "up" | "start" | "end") {

    if (direction == "end") {
        return PLACEMENT_RIGHT;
    }

    if (direction == "start") {
        return PLACEMENT_LEFT;
    }

    // We need to trim the value because custom properties can also include spaces
    //const isEnd = getComputedStyle(menuElement).getPropertyValue('--bs-position').trim() === 'end'

    if (direction == "up") {
        return /*isEnd ? PLACEMENT_TOPEND :*/ PLACEMENT_TOP;
    }

    return /*isEnd ? PLACEMENT_BOTTOMEND :*/ PLACEMENT_BOTTOM;
}

