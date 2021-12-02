import clsx from "clsx";
import { ComponentChild, h, Ref } from "preact";
import { useHasFocus, useListNavigation, UseListNavigationChildInfo, useLogicalDirection, useMergedProps, usePassiveState, useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext, useEffect } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, useLogRender } from "../props";
import { AnchorButtonProps, Button, ButtonButtonProps, ToggleButtonProps } from "./button";
import { ProvideDefaultButtonColor, ProvideDefaultButtonDisabled, ProvideDefaultButtonFill, ProvideDefaultButtonSize, useButtonColorVariant, useButtonDisabled, useButtonFillVariant, UseButtonGroupChild, useButtonSize } from "./defaults";
import { ButtonColorVariant, ButtonFillVariant, ButtonSize } from "./types";

export interface ButtonGroupStyleProps {
    colorVariant?: ButtonColorVariant;
    fillVariant?: ButtonFillVariant;
    size?: ButtonSize;
    disabled?: boolean;
    selectedIndex?: number;
    wrap?: boolean;
}

export interface ButtonGroupProps extends ButtonGroupStyleProps, GlobalAttributes<HTMLDivElement> {
    children?: ComponentChild;
    orientation?: "inline" | "block" | undefined;
}

export const ButtonGroup = memo(forwardElementRef(function ButtonGroup(p: ButtonGroupProps, ref: Ref<HTMLDivElement>) {
    useLogRender("ButtonGroup", `Rendering ButtonGroup`);

    // Styling props
    let { colorVariant, fillVariant, size, disabled, selectedIndex, wrap, orientation: logicalOrientation, children, ...p3 } = p;

    logicalOrientation ??= "inline";

    const { useHasFocusProps, getFocusedInner  } = useHasFocus<HTMLDivElement>({  });
    const { indicesByElement, managedChildren, useListNavigationChild, navigateToIndex, childCount } = useListNavigation<HTMLButtonElement, UseListNavigationChildInfo>({ shouldFocusOnChange: getFocusedInner, keyNavigation: logicalOrientation });

    const [physicalOrientation, setPhysicalOrientation] = useState<"horizontal" | "vertical">("horizontal");
    const { getLogicalDirectionInfo, convertToPhysicalOrientation, useLogicalDirectionProps } = useLogicalDirection<HTMLDivElement>({ onLogicalDirectionChange: logicalDirectionInfo => setPhysicalOrientation(convertToPhysicalOrientation(logicalOrientation!, logicalDirectionInfo)) });


    useEffect(() => {
        if (selectedIndex != null)
            navigateToIndex(selectedIndex);
    }, [selectedIndex]);

    // Build new DOM props to merge based off the styling props
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);
    const outerDomProps: h.JSX.HTMLAttributes<any> = useLogicalDirectionProps(useHasFocusProps(useMergedProps<any>()({ ref, class: "btn-group-aria-gridrow" }, p3)));
    const innerDomProps: h.JSX.HTMLAttributes<any> = { role: "toolbar", disabled, className: clsx("btn-group", wrap && "wrap", physicalOrientation == "vertical" && "btn-group-vertical") };

    // Remaining props, forwarded onto the DOM
    //const domProps =newDomProps, p3));
    (outerDomProps as any)["data-child-count"] = `${childCount}`;

    return (
        <UseButtonGroupChild.Provider value={useListNavigationChild}>
            <ProvideDefaultButtonColor value={colorVariant}>
                <ProvideDefaultButtonFill value={fillVariant}>
                    <ProvideDefaultButtonSize value={size}>
                        <ProvideDefaultButtonDisabled value={disabled}>
                            <div {...outerDomProps}>
                                <div {...innerDomProps}>{children}</div>
                            </div>
                        </ProvideDefaultButtonDisabled>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </ProvideDefaultButtonColor>
        </UseButtonGroupChild.Provider>
    );
}));

interface ButtonGroupChildBaseProps {
    index: number;
}

export interface ButtonGroupChildToggleButtonProps extends ToggleButtonProps, ButtonGroupChildBaseProps { }
export interface ButtonGroupChildButtonButtonProps extends ButtonButtonProps, ButtonGroupChildBaseProps { }
export interface ButtonGroupChildAnchorButtonProps extends AnchorButtonProps, ButtonGroupChildBaseProps { }


export type ButtonGroupChildProps = (ButtonGroupChildAnchorButtonProps | ButtonGroupChildButtonButtonProps | ButtonGroupChildToggleButtonProps);


export const ButtonGroupChild = memo(forwardElementRef(function ButtonGroupChild1({ index, ...buttonProps }: ButtonGroupChildProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element {
    useLogRender("ButtonGroupChild", `Rendering ButtonGroupChild #${index}`);

    // This is more-or-less forced to be a separate component because of the index prop.
    // It would be really nice to find a way to make that implicit based on DOM location,
    // specifically for small things like button groups...

    const useButtonGroupChild = useContext(UseButtonGroupChild);
    const { tabbable, useListNavigationChildProps, useListNavigationSiblingProps } = useButtonGroupChild!({ index, text: null });

    const p = useListNavigationChildProps(useMergedProps<any>()({ ref }, { ...buttonProps as any }));
    return <Button {...p as any} />
}));

() => {
    <ButtonGroupChild index={0} pressed={true} onPressToggle={b => { }} />;
    <ButtonGroupChild index={0} tag="a" href=" " />;
    <ButtonGroupChild index={0} onPress={(n, e) => { }} />;


    <ButtonGroupChild tag="button" index={0} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="button" />;

    /// @ts-expect-error
    <ButtonGroupChild tag="button" index={0} pressed={true} onPress={b => { }} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="a" index={0} pressed={true} onPress={b => { }} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="a" index={0} onPress={b => { }} />;

}

<Button pressed={true} onPress={p => console.log(p)}></Button>

