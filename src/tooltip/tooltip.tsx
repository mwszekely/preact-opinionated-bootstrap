import { cloneElement, ComponentChild, ComponentChildren, Fragment, h, VNode } from "preact";
import { useAriaTooltip } from "preact-aria-widgets";
import { useElementSize, useMergedProps, useState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { useEffect } from "preact/hooks";
import { fixProps, usePopperApi, useShouldUpdatePopper } from "../menu/popper-api";
import { BodyPortal } from "../portal";
import { FlippableTransitionComponent } from "../props";

type UseTooltipProps = Parameters<typeof useAriaTooltip>[0];

export type TooltipProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> =
    UseTooltipProps &
    FlippableTransitionComponent<T> &
    {
        children: ComponentChild;
        tooltip: ComponentChildren;
        side?: "block-start" | "block-end" | "inline-start" | "inline-end";
        positionBlock?: "start" | "end";
    }

export function Tooltip<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ children, side, align, tooltip, Transition, mouseoverDelay, ...rest }: TooltipProps<T>) {
    side ??= "block-end";
    align ??= "start";

    const { getIsOpen, isOpen, useTooltip, useTooltipTrigger } = useAriaTooltip({ mouseoverDelay });

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
    const { useElementSizeProps } = useElementSize<any>({ onSizeChange: onInteraction ?? (() => {}) });
    const { logicalDirection, usePopperArrow, usePopperPopup, usePopperSource, usedPlacement } = usePopperApi({ updating: shouldUpdate, side, align });

    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({ open: isOpen });
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();
    const { usePopperSourceProps } = usePopperSource();


    if (logicalDirection && usedPlacement)
        rest = fixProps(logicalDirection, "block-end", usedPlacement, rest) as typeof rest;

    if (Transition == undefined) {
        Transition = ZoomFade as NonNullable<typeof Transition>;
        (rest as any).zoomOriginDynamic = 0;
        (rest as any).zoomMin = 0.85;
    }

    // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
    // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird
    return <>
        {cloneElement(cloneable, useMergedProps<any>()({ ref: cloneable.ref! }, useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(cloneable.props)))))}
        <BodyPortal>
            <div {...usePopperPopupProps({ class: "tooltip-wrapper" })} >
                <Transition {...rest as any} show={isOpen} onTransitionUpdate={onInteraction} exitVisibility="hidden">
                    <div {...(useTooltipProps(useMergedProps<HTMLDivElement>()({ class: "tooltip show", role: "tooltip" }, {})) as any)}>
                        <div {...usePopperArrowProps({ class: "tooltip-arrow" })}></div>
                        <div class="tooltip-inner">{tooltip}</div>
                    </div>
                </Transition>
            </div>
        </BodyPortal>
    </>;
}
