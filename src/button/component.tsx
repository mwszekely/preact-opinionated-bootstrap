
import { Ref, Context, h, RefCallback, RefObject, RenderableProps } from "preact";
import { useCallback, useContext } from "preact/hooks";
import { forwardElementRef, useAsyncEventHandler, ButtonProps as ButtonPropsB, Button as ButtonB, useRefBackup } from "preact-async-input";
import { DefaultColorStyleContext, DefaultFillStyleContext, DefaultSizeContext, ProvideDefaultButtonColor, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "./defaults";
import { anchorButtonProps, buttonButtonProps, ButtonPropsMin } from "./props";
import { ButtonColor, ButtonVariant } from "./types";
import { useRippleProps } from "../ripple";
import clsx from "clsx";

export type ButtonComponentVariant = ButtonVariant | `${"fill"}-${ButtonColor}`

export interface ButtonComponentProps<E extends HTMLElement = HTMLButtonElement> extends ButtonPropsB<E>, Omit<ButtonPropsMin, "variant"> {
    variant?: ButtonComponentVariant;
    size?: "sm" | "md" | "lg";
}

function useNormalizedVariant(variant: ButtonComponentVariant | undefined): ButtonVariant {
    let defaultColor = useContext(DefaultColorStyleContext);
    let defaultFill = useContext(DefaultFillStyleContext);
    if (variant == undefined) {
        variant = defaultFill == "outline" ? `${defaultFill}-${defaultColor}` as const : defaultColor;
    }

    if (variant!.startsWith("outline-")) {
        // Do nothing, the variant specifies both options and it's just a valid class.
    }
    else if (variant!.startsWith("fill-")) {
        // The "fill-" variants aren't "actual" styles, they're the default in Bootstrap, 
        // so don't actually use them literally as class names
        variant = variant.substr(5) as any;
    }
    else {
        // Get the default fill variant
        variant = `${defaultFill}-${variant as ButtonColor}` as ButtonVariant;
    }
    // The "fill-" variants aren't "actual" styles, they're the default in Bootstrap, 
    // so don't actually use them as class names
    if (variant && variant.startsWith("fill-")) {
        variant = variant.substr(5) as any;
    }

    return variant as ButtonVariant;
}

export const Button = forwardElementRef(function Button(p: ButtonComponentProps<HTMLButtonElement>, ref: Ref<HTMLButtonElement>) {

    let { variant, children, size, ...props } = p;
    let defaultSize = useContext(DefaultSizeContext);
    size ??= defaultSize;
    variant = useNormalizedVariant(variant);

    return (
        <ButtonB {...buttonButtonProps({ variant, size, ref, ...props })}>
            <span class="mdc-button__label">{children}</span>
        </ButtonB>
    );
})

export const AnchorButton = forwardElementRef(function AnchorButton(p: ButtonComponentProps<HTMLAnchorElement>, ref: Ref<HTMLAnchorElement>) {
    let { variant, disabled, onClick, ...props } = p;


    variant = useNormalizedVariant(variant);

    const { pending, syncHandler } = useAsyncEventHandler({ convertEvent: () => null, asyncHandler: onClick })

    if (pending) {
        disabled = true;
    }

    return <a {...anchorButtonProps({ variant, disabled, onClick: syncHandler, ...props })} ref={ref} />;
})
