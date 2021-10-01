import clsx from "clsx";
import { ComponentChild, createContext, h, Ref } from "preact";
import { UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useChildManager, useHasFocus, useListNavigation, UseListNavigationChild, useMergedProps, useState } from "preact-prop-helpers";
import { forwardElementRef, GlobalAttributes, useLogRender } from "../props";
import { useButtonColorVariant, useButtonDisabled, useButtonFillVariant, UseButtonGroupChild, useButtonSize } from "./defaults";
import { ButtonColorVariant, ButtonFillVariant, ButtonSize } from "./types";

import { ProvideDefaultButtonColor, ProvideDefaultButtonSize, ProvideDefaultButtonDisabled, ProvideDefaultButtonFill } from "./defaults"
import { ManagedChildInfo, UsedManagedChild } from "preact-prop-helpers/use-child-manager";
import { useContext, useEffect } from "preact/hooks";
import { AnchorButtonProps, Button, ButtonButtonProps, ButtonProps, ToggleButtonProps } from "./button";

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
}

export const ButtonGroup = forwardElementRef(function ButtonGroup(p: ButtonGroupProps, ref: Ref<HTMLDivElement>) {
    useLogRender("ButtonGroup", `Rendering ButtonGroup`);

    const [focusedInner, setFocusedInner, getFocusedInner] = useState(false);
    const { useHasFocusProps } = useHasFocus<HTMLDivElement>({ setFocusedInner });
    const { indicesByElement, managedChildren, useListNavigationChild, navigateToIndex, childCount } = useListNavigation<HTMLButtonElement>({ shouldFocusOnChange: getFocusedInner });

    // Styling props
    let { colorVariant, fillVariant, size, disabled, selectedIndex, wrap, children, ...p3 } = p;

    useEffect(() => {
        if (selectedIndex != null)
            navigateToIndex(selectedIndex);
    }, [selectedIndex]);

    // Build new DOM props to merge based off the styling props
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);
    const outerDomProps: h.JSX.HTMLAttributes<any> =  useHasFocusProps(useMergedProps<any>()({ ref, role: "grid", class: "btn-group-aria-gridrow" }, p3));
    const innerDomProps: h.JSX.HTMLAttributes<any> = { role: "gridrow", disabled, className: clsx("btn-group", wrap && "wrap") };

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
});

interface ButtonGroupChildBaseProps {
    index: number;
}

export interface ButtonGroupChildToggleButtonProps extends ToggleButtonProps, ButtonGroupChildBaseProps {}
export interface ButtonGroupChildButtonButtonProps extends ButtonButtonProps, ButtonGroupChildBaseProps {}
export interface ButtonGroupChildAnchorButtonProps extends AnchorButtonProps, ButtonGroupChildBaseProps {}


export type ButtonGroupChildProps = (ButtonGroupChildAnchorButtonProps | ButtonGroupChildButtonButtonProps | ButtonGroupChildToggleButtonProps);


export const ButtonGroupChild = forwardElementRef(function ButtonGroupChild1({ index, ...buttonProps }: ButtonGroupChildProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element {
    useLogRender("ButtonGroupChild", `Rendering ButtonGroupChild #${index}`);

    // This is more-or-less forced to be a separate component because of the index prop.
    // It would be really nice to find a way to make that implicit based on DOM location,
    // specifically for small things like button groups...

    const useButtonGroupChild = useContext(UseButtonGroupChild);
    const { tabbable, useListNavigationChildProps, useListNavigationSiblingProps } = useButtonGroupChild!({ index, text: null });

    const p = useListNavigationChildProps({ ref, role: "gridcell", ...buttonProps as any });
    return <Button {...p as any} />
});

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

