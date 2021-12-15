import { ComponentChild, h, Ref } from "preact";
import { memo } from "preact/compat";
import { forwardElementRef } from "props";
import { Tooltip } from "tooltip";

export interface FontIconProps extends Omit<h.JSX.HTMLAttributes<HTMLElement>, "label"> { 
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
}

/**
 * Generic way to represent any icon that's based on a font using some specific class to choose which icon to display.
 * 
 * 
 */
export const FontIcon = memo(forwardElementRef(function FontIcon({ label, tooltip, role, "aria-label": ariaLabel, ...props }: FontIconProps, ref: Ref<HTMLElement>) {

    const iconElement = <i {...props} role={label? "img" : "presentation"} aria-label={ariaLabel || (label ?? undefined)} ref={ref} />;

    if (tooltip)
        return <Tooltip tooltip={tooltip}>{iconElement}</Tooltip>;

    return iconElement;
}));
