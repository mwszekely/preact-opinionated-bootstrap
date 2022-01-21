import { useFocusMode } from "../focus";
import { cloneElement, ComponentChild, ComponentChildren, Fragment, h, Ref, VNode } from "preact";
import { useAriaTooltip } from "preact-aria-widgets";
import { useElementSize, useMergedProps, useStableCallback, useState } from "preact-prop-helpers";
import { ZoomFade, ZoomFadeProps } from "preact-transition";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import { fixProps, getDefaultFlips, usePopperApi, useShouldUpdatePopper } from "../menu/popper-api";
import { BodyPortal } from "../portal";
import { FlippableTransitionComponent, forwardElementRef } from "../props";

type UseTooltipProps = Parameters<typeof useAriaTooltip>[0];

export interface TooltipProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> extends UseTooltipProps, FlippableTransitionComponent<T> {
    children: ComponentChild;
    tooltip: ComponentChildren;
    side?: "block-start" | "block-end" | "inline-start" | "inline-end";
    align?: "start" | "end" | "center";
}

export const Tooltip = memo(forwardElementRef(function Tooltip<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ children, side, align, tooltip, Transition, TransitionProps, TransitionPropFlips, mouseoverDelay, mouseoutDelay, focusDelay, ...restAnchorProps }: TooltipProps<T>, ref?: Ref<any>) {
    side ??= "block-start";
    align ??= "center";

    const focusMode = useFocusMode();

    let { getIsOpen, isOpen, useTooltip, useTooltipTrigger } = useAriaTooltip({ mouseoverDelay, mouseoutDelay, focusDelay: focusMode === "mouse"? Infinity : undefined });

    // TODO: This is probably the most benign mutation during render issue ever
    // It's just used to preserve the last shown value when the tooltip is fading out because `tooltip` is null.
    const lastUsedTooltipRef = useRef(tooltip);
    lastUsedTooltipRef.current = (tooltip || lastUsedTooltipRef.current);

    isOpen &&= !!tooltip;

    let cloneable: VNode;
    if (typeof children === "string" || typeof children === "number" || typeof children == "boolean" || typeof children === "bigint") {
        cloneable = <span>{children}</span>
    }
    else if (Array.isArray(children)) {
        cloneable = <span>{children}</span>;
    }
    else {
        cloneable = children as VNode<any>;
    }

    const { useTooltipProps } = useTooltip<HTMLDivElement>();
    const { useTooltipTriggerProps } = useTooltipTrigger();
    const { shouldUpdate, onInteraction } = useShouldUpdatePopper(isOpen);
    const { useElementSizeProps } = useElementSize<any>({ onSizeChange: useStableCallback(onInteraction ?? (() => { })) });
    const { logicalDirection, usePopperArrow, usePopperPopup, usePopperSource, flipTransformProps } = usePopperApi({ updating: shouldUpdate, side, align, useArrow: true, followMouse: true });

    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({ open: isOpen });
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();
    const { usePopperSourceProps } = usePopperSource();


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
    TransitionProps = flipTransformProps(TransitionProps ?? ({} as never), TransitionPropFlips);

    let anchorProps = cloneable.props as any;
    anchorProps = useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(anchorProps)));
    anchorProps = useMergedProps<any>()(anchorProps, { ref: cloneable.ref!, class: "tooltip-anchor" });
    anchorProps = useMergedProps<any>()(anchorProps, { ref });
    anchorProps = useMergedProps<any>()(anchorProps, restAnchorProps);

    // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
    // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird
    return <>
        {cloneElement(cloneable, anchorProps)}
        <BodyPortal>
            <div {...usePopperPopupProps({ class: "tooltip-wrapper" })} >
                <Transition {...TransitionProps as any} show={isOpen} onTransitionUpdate={onInteraction} exitVisibility="hidden">
                    <div {...(useTooltipProps(useMergedProps<HTMLDivElement>()({ class: "tooltip show", role: "tooltip" }, {})) as any)}>
                        <div {...usePopperArrowProps({ class: "popper-arrow" })}></div>
                        <div class="tooltip-inner">{tooltip || lastUsedTooltipRef.current}</div>
                    </div>
                </Transition>
            </div>
        </BodyPortal>
    </>;
}))
