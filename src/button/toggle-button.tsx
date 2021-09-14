import clsx from "clsx";
import { ComponentChild, h, Ref } from "preact";
import { useAriaButton, UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useAsyncHandler, UseAsyncHandlerParameters, useStableCallback, useStableGetter } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback } from "preact/hooks";
import { forwardElementRef, GlobalAttributes } from "../props";
import { useButtonColorVariant, useButtonDisabled, useButtonSize, useButtonStyles } from "./defaults";
import { ButtonColorVariant, ButtonPropsBase, ButtonSize } from "./types";


export interface ToggleButtonProps extends 
Omit<UseAriaButtonParameters<HTMLButtonElement>, "tag" | "onClick">, 
GlobalAttributes<HTMLButtonElement>,
Omit<UseAsyncHandlerParameters<HTMLButtonElement, h.JSX.TargetedEvent<HTMLButtonElement>, boolean>, "capture">,
Pick<ButtonPropsBase<HTMLButtonElement>, "colorVariant" | "size" | "disabled"> {
    pressed: boolean;
    onClick?(pressed: boolean, event: h.JSX.TargetedEvent<HTMLButtonElement>): void | Promise<void>;
    children?: ComponentChild;
}



export const ToggleButton = forwardElementRef(function ToggleButton(p: ToggleButtonProps, ref: Ref<HTMLButtonElement>) {
    
    let { colorVariant, size, disabled, pressed, debounce, onClick: onClickAsync, ...props } = p;
    const fillVariant = pressed? "fill" : "outline";
    const getPressed = useStableGetter(pressed);
    const { getSyncHandler, pending } = useAsyncHandler<HTMLButtonElement>()({ debounce, capture: useCallback(() => { return !getPressed(); }, []) });
    disabled ||= pending;
    const { useAriaButtonProps } = useAriaButton<HTMLButtonElement>({ tag: "button", pressed });
    
    const buttonStyleInfo = useButtonStyles<HTMLButtonElement>({ colorVariant, size, fillVariant, disabled });
    disabled = buttonStyleInfo.disabled;
    colorVariant = buttonStyleInfo.colorVariant;
    size = buttonStyleInfo.size;
    const useButtonStylesProps = buttonStyleInfo.useButtonStylesProps;
    
    const onClick = getSyncHandler(pending ? null : onClickAsync);

    return <button {...useAriaButtonProps(useButtonStylesProps({ ...props, onClick, ref }))} />
})
