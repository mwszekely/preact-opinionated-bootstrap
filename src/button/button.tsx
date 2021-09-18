import clsx from "clsx";
import { ComponentChild, h, Ref } from "preact";
import { useAriaButton, UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useAsyncHandler, UseAsyncHandlerParameters, useStableGetter } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback, useContext } from "preact/hooks";
import { ProgressCircular } from "../progress";
import { ProgressAsChildContext } from "../progress/linear";
import { forwardElementRef, GlobalAttributes, useSpinnerDelay } from "../props";
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

interface ToggleButtonProps extends Omit<ButtonPropsBase<HTMLButtonElement>, "onClick" | "fillVariant" | "children">, Omit<UseAsyncHandlerParameters<HTMLButtonElement, h.JSX.TargetedEvent<HTMLButtonElement>, boolean>, "capture"> {
    pressed: boolean;
    onInput?(pressed: boolean, event: h.JSX.TargetedEvent<HTMLButtonElement>): void | Promise<void>;
    children?: ComponentChild;
    showAsyncSuccess?: boolean;
}


interface ButtonPropsB extends ButtonPropsBase<HTMLButtonElement>, Omit<UseAsyncHandlerParameters<HTMLButtonElement, h.JSX.TargetedEvent<HTMLButtonElement>, never>, "capture"> {
    tag?: "button";
    showAsyncSuccess?: boolean;
    onClick?: (never: never, event: h.JSX.TargetedEvent<HTMLButtonElement>) => (void | Promise<void>);
}

interface ButtonPropsA extends ButtonPropsBase<HTMLAnchorElement> {
    tag?: "a";
    href: string;
    rel?: LiteralUnion<LinkTypes>;
    referrerPolicy?: string;
    download?: true | string;
    target?: LiteralUnion<"_self" | "_blank" | "_parent" | "_top", string>;
}



export type ButtonProps = (ButtonPropsA | ButtonPropsB | ToggleButtonProps);


function ButtonR(p: ToggleButtonProps, ref?: Ref<HTMLButtonElement>): h.JSX.Element;
function ButtonR(p: ButtonPropsB, ref?: Ref<HTMLButtonElement>): h.JSX.Element;
function ButtonR(p: ButtonPropsA, ref?: Ref<HTMLAnchorElement>): h.JSX.Element;
function ButtonR(p: ButtonProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element;
function ButtonR(p: ButtonProps, ref?: Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>): h.JSX.Element {
    if ((p as ButtonPropsA | ButtonPropsB).tag?.toLowerCase() === "a" || !!(p as ButtonPropsA).href)
        return <AnchorButton ref={ref as Ref<HTMLAnchorElement>} {...(p as ButtonPropsA)} />;
    else if ((p as ToggleButtonProps).pressed != null)
        return <ToggleButton ref={ref as Ref<HTMLButtonElement>} {...(p as ToggleButtonProps)} />
    else
        return <ButtonButton ref={ref as Ref<HTMLButtonElement>} {...(p as ButtonPropsB)} />;

}

const AnchorButton = forwardElementRef(function AnchorButton(p: Omit<ButtonPropsA, "tag">, ref?: Ref<HTMLAnchorElement>) {

    let { colorVariant, size, fillVariant, disabled, ...props } = p;
    const buttonStyleInfo = useButtonStyles<HTMLAnchorElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    return <a {...(useButtonStylesProps({ ...props, ref }))} />
});

const ButtonButton = forwardElementRef(function ButtonButton(p: Omit<ButtonPropsB, "tag">, ref?: Ref<HTMLButtonElement>) {
    let { colorVariant, size, fillVariant, disabled, debounce, showAsyncSuccess, onClick: onClickAsync, ...props } = p;
    const { getSyncHandler, pending, settleCount, hasError } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return undefined!; }, []) });
    disabled ||= pending;
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button" });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    fillVariant = buttonStyleInfo.fillVariant;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    const onClick = getSyncHandler(pending ? null : onClickAsync);

    return (
        <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount && showAsyncSuccess) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...useAriaButtonProps(useButtonStylesProps(useMergedProps<HTMLButtonElement>()({ className: clsx(pending && "pending active", disabled && "disabled") }, { ...props, onClick, ref })))} />
        </ProgressCircular>
    )
});




export const ToggleButton = forwardElementRef(function ToggleButton(p: ToggleButtonProps, ref: Ref<HTMLButtonElement>) {

    let { colorVariant, size, disabled, pressed, debounce, onInput: onPressAsync, showAsyncSuccess, ...props } = p;
    const fillVariant = pressed ? "fill" : "outline";
    const inButtonGroup = !!useContext(UseButtonGroupChild);
    const getPressed = useStableGetter(pressed);
    const { getSyncHandler, pending, hasError, settleCount, hasCapture, currentCapture } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return !getPressed(); }, []) });
    disabled ||= pending;
    if (hasCapture && pending)
        pressed = currentCapture!;
        
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", pressed });

    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;

    const onClick = getSyncHandler(pending ? null : onPressAsync);

    return (
        <ProgressCircular mode={hasError ? "failed" : pending ? "pending" : (settleCount && showAsyncSuccess) ? "succeeded" : null} childrenPosition="child" colorFill={fillVariant == "fill" ? "foreground" : "background"}>
            <button {...useAriaButtonProps(useButtonStylesProps({ ...useMergedProps<HTMLButtonElement>()({ className: clsx("toggle-button", (pending || (inButtonGroup && pressed)) && "active"), onClick, ref }, props) }))} />
        </ProgressCircular>
    );
})


export const Button = forwardElementRef(ButtonR);

