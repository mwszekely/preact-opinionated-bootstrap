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
import { Tooltip } from "../tooltip/tooltip";

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

const HasTypeaheadContext = createContext(false);

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
    let { useMenuButton, useMenuItem, useMenuProps, useMenuSubmenuItem, focusMenu, useMenuSentinel, currentTypeahead, invalidTypeahead } = useAriaMenu<HTMLDivElement, HTMLButtonElement, UseMenuItemDefaultInfo<HTMLButtonElement>>({ shouldFocusOnChange: getMenuHasFocusInner, open, onClose, onOpen });
    const { useMenuButtonProps } = useMenuButton<Element>({ tag: anchorTag ?? "button" });
    const { usePopperSourceProps } = usePopperSource<any>();
    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({ open });
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();
    const { useMenuSentinelProps: useFirstMenuSentinelProps } = useMenuSentinel<HTMLButtonElement>();
    const { useMenuSentinelProps: useSecondMenuSentinelProps } = useMenuSentinel<HTMLButtonElement>();

    if (Transition == undefined) {
        Transition = ZoomFade as NonNullable<typeof Transition>;
        (rest as any).zoomOriginDynamic = 0;
        (rest as any).zoomMin = 0.85;
    }

    if (logicalDirection && usedPlacement)
        rest = fixProps(logicalDirection, side, usedPlacement, rest) as typeof rest;

    const onAnchorClick = () => setOpen(open => !open);

    if (currentTypeahead && invalidTypeahead)
        currentTypeahead = <>{currentTypeahead} <i class="bi bi-backspace"></i></> as any

    return (
        <>
            <HasTypeaheadContext.Provider value={!!currentTypeahead}>
                <OnCloseContext.Provider value={onClose}>
                    <UseMenuItemContext.Provider value={useMenuItem}>
                        <ProvideDefaultButtonDropdownDirection value={side}>
                            {cloneElement(anchor, useMergedProps<any>()({ [anchorEventName ?? "onPress"]: onAnchorClick, ref: anchor.ref as Ref<Element>, class: `${open ? "active" : ""}` }, useElementSizeProps(usePopperSourceProps(useMenuButtonProps(anchor.props)))))}
                        </ProvideDefaultButtonDropdownDirection>
                        <BodyPortal>
                            <div {...usePopperPopupProps({ class: "dropdown-menu-popper" })}>
                                <Tooltip tooltip={currentTypeahead || null} side="inline-end" align="center" className={clsx("typeahead-tooltip", invalidTypeahead ? "text-danger" : undefined)}>
                                    <Transition {...(useMenuProps(rest) as any)} show={open} onTransitionUpdate={onInteraction} exitVisibility="hidden" >
                                        <div {...useHasFocusProps({})}>

                                            <button {...useFirstMenuSentinelProps({ className: "visually-hidden" })}>Close menu</button>
                                            {h(tag ?? "ul", { children, className: "dropdown-menu elevation-raised-4 elevation-body-surface" })}
                                            {/*
                                        Add a sentinel to the end that catches attempts to tab out of the menu
                                        (Also a way for assistive technologies to find a way to close the menu)
                                    
                                    */}
                                            <button {...useSecondMenuSentinelProps({ className: "visually-hidden" })}>Close menu</button>
                                        </div>
                                    </Transition>
                                </Tooltip>
                            </div>
                        </BodyPortal>
                    </UseMenuItemContext.Provider>
                </OnCloseContext.Provider>
            </HasTypeaheadContext.Provider>
        </>
    )
}


export function MenuItem({ children, disabled, onPress: onPressAsync, index, ...rest }: MenuItemProps) {
    useLogRender("MenuItem", `Rendering MenuItem`);
    const useMenuItem = useContext(UseMenuItemContext);
    const hasTypeahead = useContext(HasTypeaheadContext);

    const isInteractive = (onPressAsync != null);
    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, getElement } = useRefElement<HTMLButtonElement>({ onElementChange: element => setText((element?.innerText ?? "").trim()) });
    useMutationObserver(getElement, { subtree: true, onCharacterData: (info) => setText((getElement()?.innerText ?? "").trim()) });

    const { useMenuItemProps } = useMenuItem({ index, text });

    const onClose = useContext(OnCloseContext);


    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;

    const onPress = getSyncHandler((disabled || !onPressAsync) ? null : () => onPressAsync?.()?.then(() => onClose?.()));

    const newProps = useMenuItemProps(useRefElementProps(useMergedProps<HTMLButtonElement>()(rest, { class: clsx(onPressAsync ? "dropdown-item" : "dropdown-item-text", disabled && "disabled"), "aria-disabled": disabled ? "true" : undefined })));
    const buttonProps = usePseudoActive(usePressEventHandlers<HTMLButtonElement>(disabled ? null : onPress, hasTypeahead? { space: "exclude" } : undefined)(newProps));

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
