import { cloneElement, h, Ref, RefObject, RenderableProps, VNode } from "preact";
import { forwardElementRef, InputEmail } from "preact-async-input";
import { useRef } from "preact/hooks";
import { useTooltipProps, TooltipProps } from "./props"


export interface TooltipComponentProps<E extends HTMLElement> extends TooltipProps<E> {

}

/**
 * Wraps a *single child*
 */
export const Tooltip = forwardElementRef(function Tooltip<E extends HTMLElement>({ children, ...props }: TooltipComponentProps<E> & { children: VNode<{ className?: string }> }, ref: Ref<E>) {
    return cloneTooltip(children, { ...props, ref });
})

/**
 * Clones a single element and allows it to display a tooltip
 */
function cloneTooltip<E extends HTMLElement>(element: VNode<h.JSX.HTMLAttributes<E>>, { ...rest }: TooltipComponentProps<E>) {
    return cloneElement(element, { ...useTooltipProps({ ...rest }) })
}



