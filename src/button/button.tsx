import clsx from "clsx";
import { ComponentChild, h, Ref } from "preact";
import { useAriaButton, UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useAsyncHandler, UseAsyncHandlerParameters, useStableGetter } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback, useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { ProgressAsChildContext } from "../progress/linear";
import { forwardElementRef, GlobalAttributes, usePseudoActive, useSpinnerDelay } from "../props";
import { useButtonColorVariant, useButtonDisabled, useButtonFillVariant, UseButtonGroupChild, useButtonSize, useButtonStyles } from "./defaults";
import { ButtonColorVariant, ButtonFillVariant, ButtonPropsBase, ButtonSize } from "./types";

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
    dropdownVariant?: null | undefined | "separate" | "combined";
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
    const buttonStyleInfo = useButtonStyles<HTMLAnchorElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    return <a {...(usePseudoActive(useButtonStylesProps({ ...props, ref })))} />
});

const ButtonButton = forwardElementRef(function ButtonButton(p: Omit<ButtonButtonProps, "tag">, ref?: Ref<HTMLButtonElement>) {
    let { dropdownVariant, colorVariant, size, fillVariant, disabled, debounce, onPress: onPressAsync, ...props } = p;
    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;

    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", onPress });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;


    return (
        <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...usePseudoActive(useAriaButtonProps(useButtonStylesProps(useMergedProps<HTMLButtonElement>()({ className: clsx(pending && "pending active", disabled && "disabled", dropdownVariant && `dropdown-toggle`, dropdownVariant === "separate" && `dropdown-toggle-split`) }, { ...props, onPress, ref }))))} />
        </ProgressCircular>
    )
});




export const ToggleButton = forwardElementRef(function ToggleButton(p: ToggleButtonProps, ref: Ref<HTMLButtonElement>) {
    let { colorVariant, size, disabled, pressed, debounce, onPressToggle: onPressAsync, showAsyncSuccess, ...props } = p;
    const fillVariant = pressed ? "fill" : "outline";
    const inButtonGroup = !!useContext(UseButtonGroupChild);
    const getPressed = useStableGetter(pressed);
    const { getSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return !getPressed(); }, []) });
    disabled ||= pending;
    if (hasCapture && pending)
        pressed = currentCapture!;
        
    const onPress = getSyncHandler(pending ? null : onPressAsync);
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", pressed, onPress });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;


    return (
        <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount && showAsyncSuccess) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...usePseudoActive(useAriaButtonProps(useButtonStylesProps({ ...useMergedProps<HTMLButtonElement>()({ className: clsx("toggle-button", (pending || (inButtonGroup && pressed)) && "active"), ref }, props) })))} />
        </ProgressCircular>
    );
})


export const Button = forwardElementRef(ButtonR);

