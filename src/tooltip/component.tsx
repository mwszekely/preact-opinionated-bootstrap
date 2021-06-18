import { cloneElement, ComponentChildren, Fragment, h, Ref, RefObject, RenderableProps, VNode } from "preact";
import { forwardElementRef, InputEmail } from "preact-async-input";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { usePopper } from "../dropdown/popper";
import { AllPopoverPlacementCombinations, AllTooltipPlacementCombinations, TooltipPropsMin } from "./props"
import { Instance, ModifierArguments, Placement } from "@popperjs/core"
import { BodyPortal } from "../portal";
import { useRefElement } from "preact-transition/src/use-ref-element";
import { Fade } from "preact-transition/src";
import { useHasFocus, useHasMouseover } from "../toast/utility";
import { clsx } from "../bootstrap-classes";
import { useOnClickOnLocation, useOnEscapeKey } from "../dialog/utility";
import { useMergedProps } from "../merge-props";
import { useRandomId } from "preact-async-input/src/provide-id";

const PopoverContent = forwardElementRef(function PopoverContent({ arrow, children, ...props }: { arrow: ComponentChildren } & h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ ref, class: "popover show bs-popover-auto", role: "tooltip" }, props)}>{arrow}{children}</div>)
});

export const PopoverHeader = forwardElementRef(function PopoverHeader(props: h.JSX.HTMLAttributes<HTMLHeadingElement>, ref: Ref<HTMLHeadingElement>) {
    return (<h3 {...useMergedProps({ className: "popover-header", ref }, props)} />)
});

export const PopoverBody = forwardElementRef(function PopoverHeader(props: h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (<div {...useMergedProps({ className: "popover-body", ref }, props)} />)
});

const TooltipContent = forwardElementRef(function TooltipContent({ children, arrow, ...props }: { arrow: ComponentChildren } & h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps({ ref, className: `tooltip show bs-tooltip-auto`, role: "tooltip" }, props)} >
            {arrow}
            <div class="tooltip-inner">{children}</div>
        </div>
    )
});

const TooltipArrow = forwardElementRef(function TooltipArrow(props: h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return <div {...useMergedProps({ className: "tooltip-arrow", ref }, props)} />
});

const PopoverArrow = forwardElementRef(function popoverArrow(props: h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    return <div {...useMergedProps({ className: "popover-arrow", ref }, props)} />
});

export interface TooltipProps<E extends HTMLElement> extends Omit<TooltipPropsMin<E>, "placement"> {
    open?: boolean;
    children: VNode;
    ref?: Ref<E>;
    tooltip: ComponentChildren | null;
    placement?: "auto" | AllTooltipPlacementCombinations;
}

export interface PopoverProps<E extends HTMLElement> extends Omit<TooltipPropsMin<E>, "placement"> {
    open?: boolean;
    children: VNode;
    header?: ComponentChildren;
    ref?: Ref<E>;
    placement?: "auto" | AllPopoverPlacementCombinations;
    body: ComponentChildren | null;
}

const isRTL = () => document.documentElement.dir === 'rtl'
/*function _handlePopperPlacementChange(popperData: Instance) {
    const { state } = popperData

    if (!state) {
      return
    }

    this.tip = state.elements.popper
    this._cleanTipClass()
    this._addAttachmentClass(this._getAttachment(state.placement))
  }*/

/**
 * Wraps a *single child*
 */
export const Tooltip = forwardElementRef(function Tooltip<E extends HTMLElement>({ children, tooltip, ...props }: TooltipProps<E>, ref: Ref<E>) {

    const { arrowAttributes, sourceElement, tooltipElement, arrowStyles, open, popperAttributes, popperStyles, sourceElementProps: finalMergedProps, hideTooltip, tooltipElementRef, useTooltipElementProps, triggers } = useTooltip({ ...props, ref });


    useEffect(() => {
        let handler: (this: Document, ev: KeyboardEvent) => void;
        document.addEventListener("keydown", handler = (e => {
            if (e.code == "Escape")
                hideTooltip();
        }), { passive: true });

        return () => document.removeEventListener("keydown", handler);
    }, [hideTooltip]);


    return (
        <>
            {cloneElement(children, useMergedProps(finalMergedProps, children?.props ?? {}))}
            <BodyPortal>
                <Fade {...useTooltipElementProps({ className: "fade-transition-only", open, ref: tooltipElementRef as Ref<any> })}>
                    <TooltipContent {...popperAttributes} style={popperStyles as h.JSX.CSSProperties} arrow={<TooltipArrow {...arrowAttributes} style={arrowStyles as h.JSX.CSSProperties} />}>
                        {tooltip}
                    </TooltipContent>
                </Fade>
            </BodyPortal>
        </>
    );
});

export const Popover = forwardElementRef(function Popover<E extends HTMLElement>({ children, body, header, ...props }: PopoverProps<E>, ref: Ref<E>) {

    props.trigger ??= "click";

    const { arrowAttributes, sourceElement, tooltipElement, arrowStyles, open, popperAttributes, popperStyles, sourceElementProps: finalMergedProps, showTooltip, hideTooltip, tooltipElementRef, useTooltipElementProps, triggers } = useTooltip({ ...props, ref });


    useEffect(() => {
        let handler: (this: Document, ev: KeyboardEvent) => void;
        document.addEventListener("keydown", handler = (e => {
            if (e.code == "Escape")
                hideTooltip();
        }), { passive: true });

        return () => document.removeEventListener("keydown", handler);
    }, [hideTooltip]);


    return (
        <>
        {cloneElement(children, useMergedProps(finalMergedProps, children?.props ?? {}))}
            <BodyPortal>
                <Fade {...useTooltipElementProps({ className: "fade-transition-only", open, ref: tooltipElementRef as Ref<any> })}>
                    <PopoverContent {...popperAttributes} style={popperStyles as h.JSX.CSSProperties} arrow={<PopoverArrow {...arrowAttributes} style={arrowStyles as h.JSX.CSSProperties} />}>
                        {header != null && <PopoverHeader>{header}</PopoverHeader>}
                        <PopoverBody>
                            {body}
                        </PopoverBody>
                    </PopoverContent>
                </Fade>
            </BodyPortal>
        </>
    );
});



export function useTooltip<P extends Omit<TooltipPropsMin<any>, "ref">>({ placement, id, open: userOpen, offsetX, offsetY, boundary, trigger, hideDelay, showDelay, ref, ...props }: P & { id?: string, open?: boolean, ref: Ref<any> }) {
    //attachment ??= "auto";
    type E = P extends Omit<TooltipProps<infer H>, "tooltip"> ? H : HTMLElement;
    trigger ??= "hover focus";

    const triggers = new Set((trigger ?? "").split(" ") as ["manual"] | ("click" | "hover" | "focus")[]);


    const tooltipElementRef = useRef<HTMLDivElement>(null);
    const { element: sourceElement, useRefElementProps: useSourceElementProps } = useRefElement<E>();
    const { element: tooltipElement, useRefElementProps: useTooltipElementProps } = useRefElement<E>();

    const [open, setOpen] = useState(false);
    const showTooltip = useCallback(() => { setOpen(true) }, [setOpen]);
    const hideTooltip = useCallback(() => { setOpen(false) }, [setOpen]);

    const { hasMouseover: sourceHasMouseover, useHasMouseoverProps: useSourceHasMouseoverProps } = useHasMouseover();
    const { hasMouseover: tooltipHasMouseover, useHasMouseoverProps: useTooltipHasMouseoverProps } = useHasMouseover();
    let hasMouseover = (sourceHasMouseover || tooltipHasMouseover);

    const backupId = useRandomId();
    id ??= backupId;


    // No matter how we do it, any method of opening/closing
    // the tooltip logically shares these two functions.
    const genericOpen = useCallback(() => {
        if (showDelay) {
            const handle = setTimeout(() => { setOpen(true) }, showDelay);
            return () => clearTimeout(handle);
        }
        else {
            setOpen(true);
        }
    }, [showDelay]);

    const genericClose = useCallback(() => {
        if (hideDelay) {
            const handle = setTimeout(() => { setOpen(false) }, hideDelay);
            return () => clearTimeout(handle);
        }
        else {
            setOpen(false);
        }
    }, [hideDelay]);

    // Things related to the auto trigger
    const { hasFocus, useHasFocusProps } = useHasFocus<E>();
    const [lastClickWasInside, setLastClickWasInside] = useState(false);

    let shouldBeOpen =
        (triggers.has("focus") ? (hasFocus) : false) ||
        (triggers.has("hover") ? hasMouseover : false) ||
        (triggers.has("click") ? lastClickWasInside : false);

    // The open prop overrides whenever we automatically decided we should show
    if (userOpen != undefined)
        shouldBeOpen = userOpen;

    useOnClickOnLocation(sourceElement, useCallback((location) => {
        setLastClickWasInside(isAlreadyInside => isAlreadyInside ? false : location == "inner");
    }, []));

    useEffect(() => {
        if (shouldBeOpen)
            genericOpen();
        else
            genericClose();
    }, [shouldBeOpen]);



    //placement = placement == "start" ? (isRTL() ? "left" : "right") : placement == "end" ? (isRTL() ? "right" : "left") : placement == undefined? "auto" : placement;

    let parsedPlacements: Placement[] = placement === "auto" ? [] : placement?.split(" ").map(p => (p == "start" ? (isRTL() ? "left" : "right") : p == "end" ? (isRTL() ? "right" : "left") : (p! ?? "top")) as Placement) ?? [];
    const { attributes: { arrow: arrowAttributes, popper: popperAttributes }, forceUpdate, styles: { arrow: arrowStyles, popper: popperStyles } } = usePopper(sourceElement ?? undefined, tooltipElement ?? undefined, {
        placement: parsedPlacements[0],
        modifiers: [
            {
                name: 'flip',
                options: {
                    fallbackPlacements: parsedPlacements.slice(1)
                }
            },
            {
                name: 'offset',
                options: {
                    offset: [offsetX, offsetY]
                }
            },
            {
                name: 'preventOverflow',
                options: { boundary: boundary ?? "clippingParents" }
            },
            {
                name: 'arrow',
                options: {
                    element: `.tooltip-arrow,.popover-arrow`
                }
            },
            /*{
                name: 'onChange',
                enabled: true,
                phase: 'afterWrite',
                fn: handlePopperPlacementChange
            }*/
        ],
        /*onFirstUpdate: data => {
            if (data.options?.placement !== data.placement) {
                handlePopperPlacementChange(data)
            }
        }*/
    });
    const p1 = useMergedProps({ "aria-describedby": id, onClick: triggers.has("click") ? showTooltip : undefined, ref: ref as Ref<any>, className: clsx("auto", props.className), style: { ...((props as any).style ?? {}) }, onMouseLeave: undefined }, props);
    const p2 = useSourceHasMouseoverProps(p1);
    const p3 = useHasFocusProps(p2);
    let finalMergedProps = useSourceElementProps(p3);

    // Whenever we open/close, forcibly update the position just in case
    useLayoutEffect(() => {
        forceUpdate?.();
    }, [open, forceUpdate]);
    
    return {
        useTooltipElementProps: <P extends {}>(p: P) => { return useTooltipElementProps(useTooltipHasMouseoverProps({ ref: undefined, onMouseEnter: undefined, id, ...p })); },
        open,
        tooltipElementRef,
        tooltipElement,
        sourceElement,
        popperAttributes,
        arrowAttributes,
        popperStyles,
        arrowStyles,
        triggers,
        showTooltip,
        hideTooltip,

        sourceElementProps: finalMergedProps
    };
}

/**
 * Clones a single element and allows it to display a tooltip
 */
/*function cloneTooltip<E extends HTMLElement>(element: VNode<h.JSX.HTMLAttributes<E>>, { ...rest }: TooltipProps<E>) {
    return cloneElement(element, { ...useTooltipProps({ ...rest }) })
}*/



