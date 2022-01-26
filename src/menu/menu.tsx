import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import { useAriaMenu, UseMenuItem, usePressEventHandlers } from "preact-aria-widgets";
import { UseMenuItemDefaultInfo } from "preact-aria-widgets/use-menu";
import { useAsyncHandler, useElementSize, useHasFocus, useMergedProps, useMutationObserver, useRefElement, useStableCallback, useState } from "preact-prop-helpers";
import { ZoomFade, ZoomFadeProps } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext } from "preact/hooks";
import { ProvideDefaultButtonDropdownDirection } from "../button/defaults";
import { BodyPortal } from "../portal";
import { ProgressCircular } from "../progress";
import { FlippableTransitionComponent, forwardElementRef, GlobalAttributes, TagSensitiveProps, useLogRender, usePseudoActive } from "../props";
import { Tooltip } from "../tooltip/tooltip";
import { getDefaultFlips, usePopperApi, useShouldUpdatePopper } from "./popper-api";


export interface MenuProps<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> extends FlippableTransitionComponent<T>, Partial<TagSensitiveProps<E>> {
    anchor: VNode<{}>;
    anchorEventName?: string;
    anchorTag?: (keyof HTMLElementTagNameMap);
    children: ComponentChildren;
    side?: "block-start" | "block-end" | "inline-start" | "inline-end";
    align?: "start" | "end" | "center";
    forceOpen?: boolean;
}

export interface MenuItemProps extends GlobalAttributes<HTMLButtonElement> {
    children: ComponentChildren;
    index: number;
    onPress?(): (Promise<void> | void);
    disabled?: boolean;

    badge?: ComponentChildren;
    iconStart?: ComponentChildren;
    iconEnd?: ComponentChildren;
}


const HasTypeaheadContext = createContext(false);

const OnCloseContext = createContext<(() => void) | undefined>(undefined);
const UseMenuItemContext = createContext<UseMenuItem<HTMLButtonElement, UseMenuItemDefaultInfo<HTMLButtonElement>>>(null!);
function MenuU<E extends Element, T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ anchor, anchorEventName, anchorTag, children, tag, side, align, Transition, TransitionProps, TransitionPropFlips, forceOpen, ...restAnchorProps }: MenuProps<E, T>, ref?: Ref<any>) {
    useLogRender("Menu", `Rendering Menu`);
    side ??= "block-end";
    align ??= "start";


    let [open, setOpen] = useState(!!forceOpen);
    open ||= !!forceOpen;

    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = () => setOpen(true);
    const { shouldUpdate: updatingForABit, onInteraction } = useShouldUpdatePopper(open);

    const { useElementSizeProps } = useElementSize<any>({ onSizeChange: useStableCallback(onInteraction ?? (() => { })) });

    const { useHasFocusProps, getFocusedInner: getMenuHasFocusInner } = useHasFocus<HTMLDivElement>({});
    const { usePopperArrow, usePopperPopup, usePopperSource, logicalDirection, flipTransformProps } = usePopperApi({ align, side, updating: updatingForABit });
    let { useMenuButton, useMenuItem, useMenuProps, focusMenu, useMenuSentinel, currentTypeahead, invalidTypeahead } = useAriaMenu<HTMLDivElement, HTMLButtonElement, UseMenuItemDefaultInfo<HTMLButtonElement>>({ shouldFocusOnChange: getMenuHasFocusInner, open, onClose, onOpen });
    const { useMenuButtonProps } = useMenuButton<Element>({ tag: anchorTag ?? "button" });
    const { usePopperSourceProps } = usePopperSource<any>();
    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({ open });
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();
    const { useMenuSentinelProps: useFirstMenuSentinelProps } = useMenuSentinel<HTMLButtonElement>();
    const { useMenuSentinelProps: useSecondMenuSentinelProps } = useMenuSentinel<HTMLButtonElement>();

    // Set up the default transition if none was provided
    TransitionProps ??= {} as never;
    if (Transition == undefined) {
        const sideIsBlock = (side.startsWith("block"));
        const sideIsInline = !sideIsBlock;

        const sideIsStart = (side.endsWith("start"));
        const sideIsEnd = !sideIsStart;


        Transition = ZoomFade as NonNullable<typeof Transition>;
        (TransitionProps as ZoomFadeProps<any>)[`zoomOrigin${sideIsInline ? "Block" : "Inline"}`] = 0.5;
        (TransitionProps as ZoomFadeProps<any>)[`zoomOrigin${sideIsBlock ? "Block" : "Inline"}`] = (sideIsStart ? 1 : 0);
        (TransitionProps as any).zoomMin = 0.85;
    }
    TransitionPropFlips ??= getDefaultFlips(Transition);



    const onAnchorClick = () => setOpen(open => !open);

    if (currentTypeahead && invalidTypeahead)
        currentTypeahead = <>{currentTypeahead} <i class="bi bi-backspace"></i></> as any;

    let anchorProps = anchor.props as any;
    anchorProps = useMenuButtonProps(useElementSizeProps(usePopperSourceProps(anchorProps)));
    anchorProps = useMergedProps<any>()(anchorProps, { ref: anchor.ref! });
    anchorProps = useMergedProps<any>()(anchorProps, { ref });
    anchorProps = useMergedProps<any>()(anchorProps, { [anchorEventName ?? "onPress"]: onAnchorClick, ref: anchor.ref as Ref<Element>, class: `${open ? "active" : ""}` });
    anchorProps = useMergedProps<any>()(anchorProps, restAnchorProps);

    return (
        <>
            <HasTypeaheadContext.Provider value={!!currentTypeahead}>
                <OnCloseContext.Provider value={onClose}>
                    <UseMenuItemContext.Provider value={useMenuItem}>
                        <ProvideDefaultButtonDropdownDirection value={side}>
                            {cloneElement(anchor, anchorProps)}
                        </ProvideDefaultButtonDropdownDirection>
                        <BodyPortal>
                            <div {...usePopperPopupProps({ class: "dropdown-menu-popper" })}>
                                <Tooltip tooltip={currentTypeahead || null} side="inline-end" align="center">
                                    <Transition {...(useMenuProps(flipTransformProps<T>(TransitionProps ?? ({} as never), TransitionPropFlips)) as any)} show={open} onTransitionUpdate={onInteraction} exitVisibility="hidden">
                                        <div {...useHasFocusProps({ className: clsx("typeahead-tooltip", invalidTypeahead ? "text-danger" : undefined) })}>

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


function MenuItemU({ children, disabled, onPress: onPressAsync, index, iconStart, iconEnd, badge, ...rest }: MenuItemProps, ref?: Ref<any>) {
    useLogRender("MenuItem", `Rendering MenuItem`);
    const useMenuItem = useContext(UseMenuItemContext);
    const hasTypeahead = useContext(HasTypeaheadContext);

    const isInteractive = (onPressAsync != null);
    const [text, setText] = useState<string | null>(null);
    const { useRefElementProps, getElement } = useRefElement<HTMLLIElement>({ onElementChange: useCallback((element: Node | null) => setText(((element as HTMLElement)?.innerText ?? "").trim()),[]) });
    useMutationObserver(getElement, { subtree: true, onCharacterData: (info) => setText((getElement()?.innerText ?? "").trim()) });

    const { useMenuItemProps } = useMenuItem({ index, text });

    const onClose = useContext(OnCloseContext);


    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;

    const onPress = getSyncHandler((disabled || !onPressAsync) ? null : () => onPressAsync?.()?.then(() => onClose?.()));

    const newProps = useMenuItemProps(useRefElementProps(useMergedProps<HTMLButtonElement>()(rest, { ref, class: clsx(onPressAsync ? "dropdown-item" : "dropdown-item-text", "dropdown-multiline", !!badge && "with-badge", !!iconStart && "with-start", !!(badge || iconEnd) && "with-end", disabled && "disabled", pending && "pending"), "aria-disabled": disabled ? "true" : undefined })));
    const buttonProps = usePseudoActive(usePressEventHandlers<HTMLButtonElement>(disabled ? null : onPress, hasTypeahead ? { space: "exclude" } : undefined)(newProps));




    const childrenWithIcons = <>{iconStart && <span class="dropdown-item-start-icon">{iconStart}</span>}{children}{badge && <span class="dropdown-item-badge">{badge}</span>}{iconEnd && <span className="dropdown-item-end-icon">{iconEnd}</span>}</>



    if (isInteractive) {
        return (
            <li>
                <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount) ? "succeeded" : null} childrenPosition="child" colorFill="foreground-only" colorVariant="info">
                    <button {...buttonProps}>
                        {childrenWithIcons}
                    </button>
                </ProgressCircular>
            </li>
        )
    }
    else {
        return (
            <li {...newProps as any}>
                {childrenWithIcons}
            </li>
        )
    }

}

export const Menu: typeof MenuU = memo(forwardElementRef(MenuU));
export const MenuItem: typeof MenuItemU = memo(forwardElementRef(MenuItemU));


