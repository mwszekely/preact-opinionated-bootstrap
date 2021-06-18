
import { h, Ref } from "preact";
import { Button as ButtonB, ButtonProps as ButtonPropsB, forwardElementRef, useAsyncEventHandler } from "preact-async-input";
import { useContext } from "preact/hooks";
import { DefaultSizeContext, useNormalizedVariant } from "./defaults";
import { ButtonPropsMin, useButtonButtonProps, useAnchorButtonProps } from "./props";
import { ButtonColor, ButtonVariant } from "./types";

export type ButtonComponentVariant = ButtonVariant | `${"fill"}-${ButtonColor}`

export interface ButtonProps<E extends HTMLElement = HTMLButtonElement> extends ButtonPropsB<E>, Omit<ButtonPropsMin, "variant"> {
    variant?: ButtonComponentVariant;
    size?: "sm" | "md" | "lg";
}

export const Button = forwardElementRef(function Button(p: ButtonProps<HTMLButtonElement>, ref: Ref<HTMLButtonElement>) {
    let { variant, children, size, ...props } = p;
    let defaultSize = useContext(DefaultSizeContext);
    size ??= defaultSize;
    variant = useNormalizedVariant(variant);

    return <ButtonB {...useButtonButtonProps({ variant, size, ref, ...props })}>{children}</ButtonB>;
})

export const AnchorButton = forwardElementRef(function AnchorButton(p: ButtonProps<HTMLAnchorElement>, ref: Ref<HTMLAnchorElement>) {
    let { variant, disabled, onClick, ...props } = p;


    variant = useNormalizedVariant(variant);

    const { pending, syncHandler } = useAsyncEventHandler({ convertEvent: () => null, asyncHandler: onClick })

    if (pending) {
        disabled = true;
    }

    return <a {...useAnchorButtonProps({ variant, disabled, onClick: syncHandler, ...props })} ref={ref} />;
})
