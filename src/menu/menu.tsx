import { ProvideDefaultButtonDropdownDirection } from "../button/defaults";
import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import { useAriaMenu, usePressEventHandlers, UseMenuItem } from "preact-aria-widgets";
import { UseMenuItemDefaultInfo } from "preact-aria-widgets/use-menu";
import { useAsyncHandler, useElementSize, useHasFocus, useMergedProps, useMutationObserver, useRefElement, useState, useTimeout, usePassiveState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { useCallback, useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { BodyPortal } from "../portal";
import { ProgressCircular } from "../progress";
import { FlippableTransitionComponent, TagSensitiveProps, TransitionComponent, useLogRender, usePseudoActive } from "../props";
import { fixProps, usePopperApi, useShouldUpdatePopper } from "./popper-api";

export type MenuProps<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = FlippableTransitionComponent<T> & Partial<TagSensitiveProps<E>> & {
    anchor: VNode<{}>;
    anchorEventName?: string;
    anchorTag?: (keyof HTMLElementTagNameMap);
    children: ComponentChildren;
    side?: "block-start" | "block-end" | "inline-start" | "inline-end";
    align?: "start" | "end" | "center";
    forceOpen?: boolean;
}

export interface MenuItemProps {
    children: ComponentChildren;
    index: number;
    onPress?(): (Promise<void> | void);
    disabled?: boolean;
}

const OnCloseContext = createContext<(() => void) | undefined>(undefined);
const UseMenuItemContext = createContext<UseMenuItem<HTMLButtonElement, UseMenuItemDefaultInfo<HTMLButtonElement>>>(null!);
export function Menu<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ anchor, anchorEventName, anchorTag, children, tag, side, align, Transition, forceOpen, ...rest }: MenuProps<E, T>) {
    useLogRender("Menu", `Rendering Menu`);
    side ??= "block-end";
    align ??= "start";


    let [open, setOpen] = useState(!!forceOpen);
    open ||= !!forceOpen;

    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = () => setOpen(true);
    const { shouldUpdate: updatingForABit, onInteraction } = useShouldUpdatePopper(open);

    const { useElementSizeProps } = useElementSize<any>({ onSizeChange: onInteraction ?? (() => { }) });

    const { useHasFocusProps, getFocusedInner: getMenuHasFocusInner } = useHasFocus<HTMLDivElement>({});
    const { usePopperArrow, usePopperPopup, usePopperSource, usedPlacement, logicalDirection } = usePopperApi({ align, side, updating: updatingForABit });
    const { useMenuButton, useMenuItem, useMenuProps, useMenuSubmenuItem, focusMenu } = useAriaMenu<HTMLDivElement, HTMLButtonElement, UseMenuItemDefaultInfo<HTMLButtonElement>>({ shouldFocusOnChange: getMenuHasFocusInner, open, onClose, onOpen });
    const { useMenuButtonProps } = useMenuButton<Element>({ tag: anchorTag ?? "button" });
    const { usePopperSourceProps } = usePopperSource<any>();
    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({ open });
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();


    /*const [sentinelFocused, setSentinelFocused] = useState(false);
    useTimeout({ callback: () => { if (sentinelFocused) onClose(); setSentinelFocused(false); }, timeout: 1000, triggerIndex: sentinelFocused.toString() })*/

    const [firstSentinelIsActive, setFirstSentinelIsActive] = useState(false);
    useTimeout({ callback: () => { setFirstSentinelIsActive(open); }, timeout: 100, triggerIndex: `${firstSentinelIsActive}` });

    if (Transition == undefined) {
        Transition = ZoomFade as NonNullable<typeof Transition>;
        (rest as any).zoomOriginDynamic = 0;
        (rest as any).zoomMin = 0.85;
    }

    if (logicalDirection && usedPlacement)
        rest = fixProps(logicalDirection, side, usedPlacement, rest) as typeof rest;

    const onAnchorClick = () => setOpen(open => !open);


    return (
        <>
            <OnCloseContext.Provider value={onClose}>
                <UseMenuItemContext.Provider value={useMenuItem}>
                    <ProvideDefaultButtonDropdownDirection value={side}>
                        {cloneElement(anchor, useMergedProps<any>()({ [anchorEventName ?? "onPress"]: onAnchorClick, ref: anchor.ref as Ref<Element>, class: `${open ? "active" : ""}` }, useElementSizeProps(usePopperSourceProps(useMenuButtonProps(anchor.props)))))}
                    </ProvideDefaultButtonDropdownDirection>
                    <BodyPortal>
                        <div {...usePopperPopupProps({ class: "dropdown-menu-popper" })}>
                            <Transition {...(useMenuProps(rest) as any)} show={open} onTransitionUpdate={onInteraction} exitVisibility="hidden" >
                                <div {...useHasFocusProps({})}>

                                    {/*<div {...usePopperArrowProps({ className: "popper-arrow elevation-raised-4 elevation-body-surface" })} />*/}
                                    <button className={"visually-hidden"} onFocus={!firstSentinelIsActive ? () => focusMenu?.() : () => onClose()} onClick={onClose}>Close menu</button>
                                    {h(tag ?? "ul", { children, className: "dropdown-menu elevation-raised-4 elevation-body-surface" })}
                                    {/*
                                        Add a sentinel to the end that catches attempts to tab out of the menu
                                        (Also a way for assistive technologies to find a way to close the menu)
                                    
                                    */}
                                    <button className={"visually-hidden"} onFocus={onClose} onClick={onClose}>Close menu</button>
                                </div>
                            </Transition>
                        </div>
                    </BodyPortal>
                </UseMenuItemContext.Provider>
            </OnCloseContext.Provider>
        </>
    )
}


export function MenuItem({ children, disabled, onPress: onPressAsync, index, ...rest }: MenuItemProps) {
    useLogRender("MenuItem", `Rendering MenuItem`);
    const useMenuItem = useContext(UseMenuItemContext);

    const isInteractive = (onPressAsync != null);
    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, getElement } = useRefElement<HTMLButtonElement>({ onElementChange: element => setText(element?.innerText ?? "") });
    useMutationObserver(getElement, { subtree: true, onCharacterData: (info) => setText(getElement()?.innerText ?? "") });

    const { useMenuItemProps } = useMenuItem({ index, text });

    const onClose = useContext(OnCloseContext);


    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;

    const onPress = getSyncHandler((disabled || !onPressAsync) ? null : () => onPressAsync?.()?.then(() => onClose?.()));

    const newProps = useMenuItemProps(useRefElementProps(useMergedProps<HTMLButtonElement>()(rest, { class: clsx(onPressAsync ? "dropdown-item" : "dropdown-item-text", disabled && "disabled"), "aria-disabled": disabled ? "true" : undefined })));
    const buttonProps = usePseudoActive(usePressEventHandlers<HTMLButtonElement>(disabled ? null : onPress, undefined)(newProps));

    if (isInteractive) {
        return (
            <li>
                <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount) ? "succeeded" : null} childrenPosition="child" colorFill="foreground-only" colorVariant="info">
                    <button {...buttonProps}>
                        {children}
                    </button>
                </ProgressCircular>
            </li>
        )
    }
    else {
        return (
            <li {...newProps as any}>
                {children}
            </li>
        )
    }

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
