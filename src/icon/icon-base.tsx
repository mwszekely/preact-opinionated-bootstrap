import { cloneElement, ComponentChild, h, Ref, VNode } from "preact";
import { useMergedProps, useMergedRefs } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../props";
import { Tooltip } from "../tooltip";


export interface IconProps<E extends Element> extends Omit<h.JSX.HTMLAttributes<E>, "label" | "children"> {
    /**
     * All icons must either have an accessible label, or
     * explicitly declare that they do not have a label (and are implicitly presentation-only).
     */
    label: string | null;


    /**
     * Some icons, like a "help" icon, are actually interactive components that
     * are used to display help in a tooltip. If a tooltip is provided, then this
     * icon will become focusable for keyboard users (besides also, well, having a tooltip).
     */
    tooltip?: ComponentChild;

    children: VNode<any>;
}

export const Icon = memo(forwardElementRef(function Icon<E extends Element>({ label, tooltip, role, "aria-label": ariaLabel, children, ref: ref3, ...props }: IconProps<E>, ref2: Ref<HTMLElement>) {

    const iconProps = useMergedProps<any>(props, {
        class: "icon",
        [children.type === "img" ? "alt" : "aria-label"]: (ariaLabel || (label ?? undefined)),
        role: (role || (label ? "img" : "presentation")),
        ref: useMergedRefs<any>({ ref: ref2 }, { ref: ref3 })
    })

    const iconElement = cloneElement(children, useMergedProps<any>(children.props, iconProps)); //<i {...props} role={label? "img" : "presentation"} aria-label={ariaLabel || (label ?? undefined)} ref={ref} />;

    if (tooltip)
        return <Tooltip tooltip={tooltip}>{iconElement}</Tooltip>;

    return iconElement;
}));