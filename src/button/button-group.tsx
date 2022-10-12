import clsx from "clsx";
import { ComponentChild, createContext, h, Ref } from "preact";
import { LogicalDirectionInfo, useHasFocus, useListNavigation, useLogicalDirection, useMergedProps, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback, useContext, useEffect } from "preact/hooks";
import { Toolbar, useWithinToolbar } from "toolbar/toolbar";
import { forwardElementRef, GlobalAttributes, useLogRender } from "../props";
import { AnchorButtonProps, Button, ButtonButtonProps, ToggleButtonProps } from "./button";
import { ProvideDefaultButtonColor, ProvideDefaultButtonDisabled, ProvideDefaultButtonFill, ProvideDefaultButtonSize, useButtonColorVariant, useButtonDisabled, useButtonFillVariant, useButtonSize } from "./defaults";
import { ButtonColorVariant, ButtonFillVariant, ButtonSize } from "./types";

export interface ButtonGroupStyleProps {
    colorVariant?: ButtonColorVariant;
    fillVariant?: ButtonFillVariant;
    size?: ButtonSize;
    disabled?: boolean | "soft" | "hard";
    wrap?: boolean;
}

export interface ButtonGroupProps extends ButtonGroupStyleProps, GlobalAttributes<HTMLDivElement> {
    children?: ComponentChild;
    orientation?: "horizontal" | "vertical" | undefined;
    label: string;
}

const ButtonGroupContext = createContext(false);
export function useWithinButtonGroup() {
    return useContext(ButtonGroupContext);
}

/**
 * A ButtonGroup is a specialization of a Toolbar.
 * 
 * All children must be a ToolbarChild, or a single ref/prop-accepting component contained within a ToolbarChild
 */
export const ButtonGroup = memo(forwardElementRef(function ButtonGroup({ colorVariant, fillVariant, size, disabled, wrap, orientation, children, label, ...p3 }: ButtonGroupProps, ref: Ref<HTMLDivElement>) {
    useLogRender("ButtonGroup", `Rendering ButtonGroup`);

    const inToolbar = useWithinToolbar();
    orientation ??= "horizontal";

    // Build new DOM props to merge based off the styling props
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);
    
    const innerDomProps: h.JSX.HTMLAttributes<any> = useMergedProps(p3, { ref, className: clsx("btn-group", wrap && "wrap", orientation == "vertical" && "btn-group-vertical") });
    let outerDom = inToolbar ?
        // This is a group within a pre-existing toolbar
        <div {...useMergedProps({ role: "group" }, innerDomProps)}>
            {children}
        </div>
        :
        // This button group is just a singular toolbar itself, with no grouping
        <Toolbar orientation={orientation} label={label} role="toolbar">
            <div {...innerDomProps}>
                {children}
            </div>
        </Toolbar>

    return (
        <ButtonGroupContext.Provider value={true}>
            <ProvideDefaultButtonColor value={colorVariant}>
                <ProvideDefaultButtonFill value={fillVariant}>
                    <ProvideDefaultButtonSize value={size}>
                        <ProvideDefaultButtonDisabled value={disabled}>
                            {outerDom}
                        </ProvideDefaultButtonDisabled>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </ProvideDefaultButtonColor>
        </ButtonGroupContext.Provider>
    );
}));
