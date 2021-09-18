import clsx from "clsx";
import { ComponentChild, createContext, h, Ref } from "preact";
import { UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useChildManager, useHasFocus, useListNavigation, UseListNavigationChild, useMergedProps } from "preact-prop-helpers";
import { forwardElementRef, GlobalAttributes } from "../props";
import { useButtonColorVariant, useButtonDisabled, useButtonFillVariant, UseButtonGroupChild, useButtonSize } from "./defaults";
import { ButtonColorVariant, ButtonFillVariant, ButtonSize } from "./types";

import { ProvideDefaultButtonColor, ProvideDefaultButtonSize, ProvideDefaultButtonDisabled, ProvideDefaultButtonFill } from "./defaults"
import { ManagedChildInfo, UsedManagedChild } from "preact-prop-helpers/use-child-manager";
import { useContext, useEffect } from "preact/hooks";
import { Button, ButtonProps } from "./button";

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

    const { lastFocusedInner, useHasFocusProps } = useHasFocus<HTMLDivElement>();
    const { indicesByElement, managedChildren, useListNavigationChild, navigateToIndex, childCount } = useListNavigation<HTMLButtonElement>({ focusOnChange: lastFocusedInner });

    // Styling props
    let { colorVariant, fillVariant, size, disabled, selectedIndex, wrap, ...p3 } = p;

    useEffect(() => {
        if (selectedIndex != null)
            navigateToIndex(selectedIndex);
    }, [selectedIndex]);

    // Build new DOM props to merge based off the styling props
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);
    const newDomProps: h.JSX.HTMLAttributes<any> = { ref, role: "group", disabled, className: clsx("btn-group", wrap && "wrap") };

    // Remaining props, forwarded onto the DOM
    const domProps = useHasFocusProps(useMergedProps<any>()(newDomProps, p3));
    (domProps as any)["data-child-count"] = `${childCount}`;

    return (
        <UseButtonGroupChild.Provider value={useListNavigationChild}>
            <ProvideDefaultButtonColor value={colorVariant}>
                <ProvideDefaultButtonFill value={fillVariant}>
                    <ProvideDefaultButtonSize value={size}>
                        <ProvideDefaultButtonDisabled value={disabled}>
                            <div {...domProps} />
                        </ProvideDefaultButtonDisabled>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </ProvideDefaultButtonColor>
        </UseButtonGroupChild.Provider>
    );
});

export type ButtonGroupChildProps = ButtonProps & {
    index: number
}


export const ButtonGroupChild = forwardElementRef(function ButtonGroupChild1({ index, ...buttonProps }: ButtonGroupChildProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element {
    // This is more-or-less forced to be a separate component because of the index prop.
    // It would be really nice to find a way to make that implicit based on DOM location,
    // specifically for small things like button groups...

    const useButtonGroupChild = useContext(UseButtonGroupChild);
    const { tabbable, useListNavigationChildProps, useListNavigationSiblingProps } = useButtonGroupChild!({ index, text: null });

    // TODO: It's kinda fragile here how the sync onClick of listNavigation 
    // and the async onClick of button are mixing.
    const p = useListNavigationChildProps({ ref, ...buttonProps as any });
    return <Button {...p as any} />
});

() => {
    <ButtonGroupChild index={0} pressed={true} onInput={b => { }} />;
    <ButtonGroupChild index={0} tag="a" href=" " />;
    <ButtonGroupChild index={0} onClick={(n, e) => { }} />;


    <ButtonGroupChild tag="button" index={0} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="button" />;

    /// @ts-expect-error
    <ButtonGroupChild tag="button" index={0} pressed={true} onClick={b => { }} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="a" index={0} pressed={true} onClick={b => { }} />;
    /// @ts-expect-error
    <ButtonGroupChild tag="a" index={0} onClick={b => { }} />;

}

