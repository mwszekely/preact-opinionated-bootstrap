import clsx from "clsx";
import { createContext, Fragment, h, RenderableProps } from "preact";
import { UseListNavigationChild, useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ButtonColorVariant, ButtonFillVariant, ButtonPropsBase, ButtonSize } from "./types";


export const UseButtonGroupChild = createContext<UseListNavigationChild<HTMLButtonElement> | null>(null);

const DefaultFillStyleContext = createContext<ButtonFillVariant>("fill");
const DefaultColorStyleContext = createContext<ButtonColorVariant>("primary");
const DefaultSizeContext = createContext<ButtonSize>("md");
const DefaultDisabledContext = createContext(false);

export const ProvideDefaultButtonFill = memo(function ProvideDefaultButtonFill({ value, children }: RenderableProps<{ value: ButtonFillVariant }>) { return <DefaultFillStyleContext.Provider value={value}>{children}</DefaultFillStyleContext.Provider>; });
export const ProvideDefaultButtonColor = memo(function ProvideDefaultButtonColor({ value, children }: RenderableProps<{ value: ButtonColorVariant }>) { return <DefaultColorStyleContext.Provider value={value}>{children}</DefaultColorStyleContext.Provider>; });
export const ProvideDefaultButtonSize = memo(function ProvideDefaultButtonSize({ value, children }: RenderableProps<{ value: ButtonSize }>) { return <DefaultSizeContext.Provider value={value}>{children}</DefaultSizeContext.Provider>; });
export const ProvideDefaultButtonDisabled = memo(function ProvideDefaultButtonDisabled({ value, children }: RenderableProps<{ value: boolean }>) { return <DefaultDisabledContext.Provider value={value}>{children}</DefaultDisabledContext.Provider>; });

export function useButtonFillVariant(providedValue?: ButtonFillVariant) {
    const defaultFill = useContext(DefaultFillStyleContext);
    return providedValue ?? defaultFill;
}

export function useButtonColorVariant(providedValue?: ButtonColorVariant) {
    const defaultColor = useContext(DefaultColorStyleContext);
    return providedValue ?? defaultColor;
}

export function useButtonSize(providedValue?: ButtonSize) {
    const defaultSize = useContext(DefaultSizeContext);
    return providedValue ?? defaultSize;
}

export function useButtonDisabled(providedValue?: boolean) {
    const defaultDisabled = useContext(DefaultDisabledContext);
    return providedValue ?? defaultDisabled;
}



export function useButtonStyles<E extends Element>(p: Pick<ButtonPropsBase<E>, "colorVariant" | "size" | "disabled" | "fillVariant">) {
    let { colorVariant, size, fillVariant, disabled } = p;
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);

    const useButtonStylesProps = <P extends h.JSX.HTMLAttributes<E>>(props: P) => useMergedProps<E>()({ "aria-disabled": disabled? "true" : undefined, className: clsx(disabled && "disabled", "btn", `btn-${fillVariant == "outline" ? `outline-` : ``}${colorVariant}`, `btn-${size}`, disabled && "disabled") }, props);
    return { colorVariant, size, fillVariant, disabled, useButtonStylesProps };
}
