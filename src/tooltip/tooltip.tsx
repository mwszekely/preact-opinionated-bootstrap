import { BodyPortal } from "../portal";
import { cloneElement, ComponentChild, h, VNode, Fragment, ComponentChildren } from "preact";
import { useAriaTooltip, UseTooltip } from "preact-aria-widgets/use-tooltip";
import { useElementSize } from "preact-prop-helpers/use-element-size";
import { fixProps, usePopperApi, useShouldUpdatePopper } from "../menu/popper-api"
import { FlippableTransitionComponent } from "props";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";

type UseTooltipProps = Parameters<typeof useAriaTooltip>[0];

export type TooltipProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> =
    UseTooltipProps &
    FlippableTransitionComponent<T> &
    {
        children: ComponentChild;
        tooltip: ComponentChildren;
        position: "block-start" | "block-end" | "inline-start" | "inline-end";
    }

export function Tooltip<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ children, position, tooltip, Transition, mouseoverDelay, ...rest }: TooltipProps<T>) {
    const { getIsOpen, isOpen, useTooltip, useTooltipTrigger } = useAriaTooltip({ mouseoverDelay });
    const { useElementSizeProps, elementSize } = useElementSize<any>();

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
    const { shouldUpdate, onInteraction } = useShouldUpdatePopper(isOpen, elementSize);
    const { getLogicalDirection, usePopperArrow, usePopperPopup, usePopperSource, usedPlacement } = usePopperApi({ updating: shouldUpdate, position, });

    const { usePopperPopupProps } = usePopperPopup<HTMLDivElement>({open: isOpen});
    const { usePopperArrowProps } = usePopperArrow<HTMLDivElement>();
    const { usePopperSourceProps } = usePopperSource();


    const logicalDirection = getLogicalDirection();
    if (logicalDirection && usedPlacement)
        rest = fixProps(logicalDirection, "block-end", usedPlacement, rest) as typeof rest;

    // TODO: It's required for this to be exitVisibility="hidden" for transforms to work?
    // Probably an issue in the Transition element itself because it's not browser-specific but it's a little weird
    return <>
        {cloneElement(cloneable, useMergedProps<any>()({ ref: cloneable.ref! },  useTooltipTriggerProps(useElementSizeProps(usePopperSourceProps(cloneable.props)))))}
        <BodyPortal>
            <div {...usePopperPopupProps({ class: "tooltip-wrapper" })} >
                <Transition {...rest as any} open={isOpen} onTransitionUpdate={onInteraction} exitVisibility="hidden">
                    <div {...(useTooltipProps(useMergedProps<HTMLDivElement>()({ class: "tooltip show", role: "tooltip" }, {})) as any)}>
                        <div {...usePopperArrowProps({ class: "tooltip-arrow" })}></div>
                        <div class="tooltip-inner">{tooltip}</div>
                    </div>
                </Transition>
            </div>
        </BodyPortal>
    </>;
}
