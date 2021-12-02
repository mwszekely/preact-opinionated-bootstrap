import clsx from "clsx";
import { ComponentChild, Fragment, h, Ref } from "preact";
import { useAriaButton } from "preact-aria-widgets";
import { useAsyncHandler, UseAsyncHandlerParameters, useMergedProps, useStableGetter } from "preact-prop-helpers";
import { useCallback, useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { forwardElementRef, usePseudoActive } from "../props";
import { useButtonDropdownDirection, UseButtonGroupChild, useButtonStyles } from "./defaults";
import { ButtonPropsBase, ButtonDropdownDirection, ButtonDropdownVariant } from "./types";

export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

type LinkTypes =
    "alternate" |
    "author" |
    "bookmark" |
    "external" |
    "help" |
    "license" |
    "nofollow" |
    "noopener" |
    "noreferrer" |
    "opener" |
    "search" |
    "tag" |
    "next" |
    "prev"
//"canonical" |
//"dns-prefetch" |
//"icon" |
//"manifest" |
//"modulepreload" |
//"pingback" |
//"preconnect" |
//"prefetch" |
//"preload" |
//"prerender" |
//"stylesheet" |;

export interface ToggleButtonProps extends Omit<ButtonPropsBase<HTMLButtonElement>, "onPress" | "fillVariant" | "children">, Omit<UseAsyncHandlerParameters<HTMLButtonElement, h.JSX.TargetedEvent<HTMLButtonElement>, boolean>, "capture"> {
    pressed: boolean;

    onPressToggle?(pressed: boolean, event: h.JSX.TargetedEvent<HTMLButtonElement>): void | Promise<void>;
    children?: ComponentChild;
    showAsyncSuccess?: boolean;
}


export interface ButtonButtonProps extends ButtonPropsBase<HTMLButtonElement>, Omit<UseAsyncHandlerParameters<HTMLButtonElement, h.JSX.TargetedEvent<HTMLButtonElement>, never>, "capture"> {
    tag?: "button";
    onPress?: (never: never, event: h.JSX.TargetedEvent<HTMLButtonElement>) => (void | Promise<void>);
    dropdownVariant?: null | undefined | ButtonDropdownVariant;
    dropdownDirection?: null | undefined | ButtonDropdownDirection;
    spinnerTimeout?: number;
}

export interface AnchorButtonProps extends ButtonPropsBase<HTMLAnchorElement> {
    tag?: "a";
    href: string;
    rel?: LiteralUnion<LinkTypes>;
    referrerPolicy?: string;
    download?: true | string;
    target?: LiteralUnion<"_self" | "_blank" | "_parent" | "_top", string>;
}



export type ButtonProps = (AnchorButtonProps | ButtonButtonProps | ToggleButtonProps);


function ButtonR(p: ToggleButtonProps, ref?: Ref<HTMLButtonElement>): h.JSX.Element;
function ButtonR(p: ButtonButtonProps, ref?: Ref<HTMLButtonElement>): h.JSX.Element;
function ButtonR(p: AnchorButtonProps, ref?: Ref<HTMLAnchorElement>): h.JSX.Element;
function ButtonR(p: ButtonProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element;
function ButtonR(p: ButtonProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element {
    if ((p as AnchorButtonProps | ButtonButtonProps).tag?.toLowerCase() === "a" || !!(p as AnchorButtonProps).href)
        return <AnchorButton ref={ref as Ref<HTMLAnchorElement>} {...(p as AnchorButtonProps)} />;
    else if ((p as ToggleButtonProps).pressed != null)
        return <ToggleButton ref={ref as Ref<HTMLButtonElement>} {...(p as ToggleButtonProps)} />
    else
        return <ButtonButton ref={ref as Ref<HTMLButtonElement>} {...(p as ButtonButtonProps)} />;

}

const AnchorButton = forwardElementRef(function AnchorButton(p: Omit<AnchorButtonProps, "tag">, ref?: Ref<HTMLAnchorElement>) {
    let { colorVariant, size, fillVariant, disabled, ...props } = p;
    const buttonStyleInfo = useButtonStyles<HTMLAnchorElement>({ colorVariant, size, fillVariant, disabled }, "a");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    return <a {...(usePseudoActive(useButtonStylesProps({ ...props, ref })))} />
});

const ButtonButton = forwardElementRef(function ButtonButton(p: Omit<ButtonButtonProps, "tag">, ref?: Ref<HTMLButtonElement>) {
    let { dropdownVariant, dropdownDirection, colorVariant, size, fillVariant, disabled, debounce, spinnerTimeout, onPress: onPressAsync, children, ...props } = p;
    dropdownDirection = useButtonDropdownDirection(dropdownDirection);
    if (dropdownDirection) {
        if (children)
            dropdownVariant ??= "combined";
        else
            dropdownVariant = "separate";
    }

    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;

    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", onPress });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled }, "button");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    // Bootstrap why are you like this?
    if (dropdownVariant == "combined")
        children = <>{" "}{children}{" "}</>

    return (
        <ProgressCircular spinnerTimeout={spinnerTimeout} mode={hasError ? "failed" : pending ? "pending" : (settleCount) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...usePseudoActive(useButtonStylesProps(useMergedProps<HTMLButtonElement>()({
                type: "button",
                className: clsx(
                    pending && "pending active",
                    disabled && "disabled",
                    dropdownVariant && `dropdown-toggle`,
                    dropdownDirection == "inline-start" && "dropstart",
                    dropdownDirection == "inline-end" && "dropend",
                    dropdownDirection == "block-start" && "dropup", // TODO, don't really want to add logical direction testing for *every* button :/
                    dropdownDirection == "block-end" && "dropdown",
                    dropdownVariant === "separate" && `dropdown-toggle-split`
                )
            }, useAriaButtonProps({ ...props, children, onPress, ref }))))} />
        </ProgressCircular>
    )
});




export const ToggleButton = forwardElementRef(function ToggleButton(p: ToggleButtonProps, ref: Ref<HTMLButtonElement>) {
    let { colorVariant, size, disabled, pressed, debounce, onPressToggle: onPressAsync, showAsyncSuccess, ...props } = p;
    const inButtonGroup = !!useContext(UseButtonGroupChild);
    const getPressed = useStableGetter(pressed);
    const { getSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return !getPressed(); }, []) });
    if (hasCapture && pending)
        pressed = !!currentCapture;
    disabled ||= pending;

    const fillVariant = pressed ? "fill" : "outline";

    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", pressed, onPress });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled }, "button");
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;


    return (
        <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount && showAsyncSuccess) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...usePseudoActive(useAriaButtonProps(useButtonStylesProps({ ...useMergedProps<HTMLButtonElement>()({ className: clsx("toggle-button", (pressed) && "active"), ref }, props) })))} />
        </ProgressCircular>
    );
})


export const Button = forwardElementRef(ButtonR);

