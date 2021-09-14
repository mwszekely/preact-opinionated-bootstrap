import { BasePlacement, Placement } from "@popperjs/core";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import { useAriaMenu } from "preact-aria-widgets";
import { UseMenuItem } from "preact-aria-widgets/use-menu";
import { LogicalDirectionInfo, useElementSize, useGlobalHandler, useMergedProps, useRefElement, useState, useTimeout } from "preact-prop-helpers";
import { useCallback, useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { BodyPortal } from "../portal";
import { FlippableTransitionComponent, TagSensitiveProps, TransitionComponent } from "../props";
import { CreateZoomProps, Zoom } from "preact-transition/zoom";
import { ZoomFade, ZoomFadeProps, SlideZoomFadeProps } from "preact-transition";
import { TransitionDirection, TransitionPhase } from "preact-transition/transitionable";
import { fixProps, placementToLogical, usePopperApi, useShouldUpdatePopper } from "./popper-api";
import { ElementSize } from "preact-prop-helpers/use-element-size";

export type MenuProps<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = FlippableTransitionComponent<T> & TagSensitiveProps<E> & {
    anchor: VNode<{}>;
    anchorTag?: (keyof HTMLElementTagNameMap);
    children: ComponentChildren;
}

export interface MenuItemProps {
    children: ComponentChildren;
    index: number;
}

function foo<P>(placement: BasePlacement, props: P) {

}

const OnCloseContext = createContext<(() => void) | undefined>(undefined);
const UseMenuItemContext = createContext<UseMenuItem<HTMLButtonElement>>(null!);
export function Menu<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ anchor, anchorTag, children, tag, Transition, ...rest }: MenuProps<E, T>) {



    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = () => setOpen(true);
    const { useElementSizeProps, elementSize } = useElementSize<any>();
    const { shouldUpdate: updatingForABit, onInteraction } = useShouldUpdatePopper(open, elementSize);
    const { usePopperArrow, usePopperPopup, usePopperSource, usedPlacement, getLogicalDirection } = usePopperApi({ position: "block-end", updating: updatingForABit });
    const { useMenuButton, useMenuItem, useMenuItemCheckbox, useMenuProps, useMenuSubmenuItem, focusMenu } = useAriaMenu<HTMLDivElement, HTMLButtonElement>({ open, onClose, onOpen });
    const { useMenuButtonProps } = useMenuButton<Element>({ tag: anchorTag ?? "button" });
    const { usePopperSourceProps } = usePopperSource<any>();
    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({open});
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();


    /*const [sentinelFocused, setSentinelFocused] = useState(false);
    useTimeout({ callback: () => { if (sentinelFocused) onClose(); setSentinelFocused(false); }, timeout: 1000, triggerIndex: sentinelFocused.toString() })*/

    const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
    useTimeout({ callback: () => { setFirstSentinelIsActive(open); }, timeout: 100, triggerIndex: `${firstSentinelIsActive}` })

    const menuChildren = (
        <>
            <div {...usePopperArrowProps({})} />
            <button className={"visually-hidden"} onFocus={!firstSentinelIsActive ? () => focusMenu() : () => onClose()} onClick={onClose}>Close menu</button>
            {children}
            {/*
                Add a sentinel to the end that catches attempts to tab out of the menu
                (Also a way for assistive technologies to find a way to close the menu)
            
            */}
            <button className={"visually-hidden"} onFocus={onClose} onClick={onClose}>Close menu</button>
        </>
    );

    const logicalDirection = getLogicalDirection();
    if (logicalDirection && usedPlacement)
        rest = fixProps(logicalDirection, "block-end", usedPlacement, rest) as typeof rest;

    return (
        <>
            <OnCloseContext.Provider value={onClose}>
                <UseMenuItemContext.Provider value={useMenuItem}>
                    {cloneElement(anchor, useMergedProps<any>()(useElementSizeProps({ ref: anchor.ref as Ref<Element>, class: `dropdown-toggle ${open ? "active" : ""}` }), usePopperSourceProps(useMenuButtonProps(anchor.props))))}
                    <BodyPortal>
                        <div {...usePopperPopupProps({ class: "dropdown-menu-popper" })}>
                            <Transition {...(useMenuProps(rest) as any)} open={open} onTransitionUpdate={onInteraction} exitVisibility="hidden">
                                <div>{h(tag, { children: menuChildren, className: "dropdown-menu" })}</div>
                            </Transition>
                        </div>
                    </BodyPortal>
                </UseMenuItemContext.Provider>
            </OnCloseContext.Provider>
        </>
    )
}


export function MenuItem({ children, index, ...rest }: MenuItemProps) {
    const useMenuItem = useContext(UseMenuItemContext);

    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, element } = useRefElement<HTMLButtonElement>();
    useLayoutEffect(() => {
        if (element)
            setText(element.innerText);
    }, [element]);

    const { useMenuItemProps } = useMenuItem({ index, text });
    return (
        <li ><button {...useMenuItemProps(useRefElementProps(useMergedProps<HTMLButtonElement>()(rest, { class: "dropdown-item" })))}>{children}</button></li>
    )
}

function flipTransitionComponent<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>(input: FlippableTransitionComponent<T>, { inline, block }: { inline: boolean, block: boolean }): TransitionComponent<T> {
    let output: TransitionComponent<T> = { ...input } as any;

    for (const propName in output) {
        if (output[`${propName}Flips`] === true) {
            let l = propName.toLowerCase();
            const isInline = l.includes("inline");
            const isBlock = l.includes("block");

            if ((isInline && inline) || (isBlock && block)) {
                delete output[`${propName}Flips`];
                output[propName as keyof typeof output] = -input[propName] as any;
            }
        }
    }

    return output;
}
