import clsx from "clsx";
import { createContext, Fragment, h, RenderableProps } from "preact";
import { ElementToTag } from "preact-aria-widgets/props";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { ButtonColorVariant, ButtonFillVariant, ButtonPropsBase, ButtonSize, ButtonDropdownDirection, ButtonDropdownVariant } from "./types";



const DefaultFillStyleContext = createContext<ButtonFillVariant>("fill");
const DefaultColorStyleContext = createContext<ButtonColorVariant>("primary");
const DefaultDropdownDirectionContext = createContext<ButtonDropdownDirection>(null);
const DefaultSizeContext = createContext<ButtonSize>("md");
const DefaultDisabledContext = createContext<boolean | "soft" | "hard">(false);

export const ProvideDefaultButtonFill = memo(function ProvideDefaultButtonFill({ value, children }: RenderableProps<{ value: ButtonFillVariant }>) { return <DefaultFillStyleContext.Provider value={value}>{children}</DefaultFillStyleContext.Provider>; });
export const ProvideDefaultButtonColor = memo(function ProvideDefaultButtonColor({ value, children }: RenderableProps<{ value: ButtonColorVariant }>) { return <DefaultColorStyleContext.Provider value={value}>{children}</DefaultColorStyleContext.Provider>; });
export const ProvideDefaultButtonSize = memo(function ProvideDefaultButtonSize({ value, children }: RenderableProps<{ value: ButtonSize }>) { return <DefaultSizeContext.Provider value={value}>{children}</DefaultSizeContext.Provider>; });
export const ProvideDefaultButtonDisabled = memo(function ProvideDefaultButtonDisabled({ value, children }: RenderableProps<{ value: boolean | "soft" | "hard" }>) { return <DefaultDisabledContext.Provider value={value}>{children}</DefaultDisabledContext.Provider>; });
export const ProvideDefaultButtonDropdownDirection = memo(function ProvideDefaultButtonDropdownDirection({value, children}: RenderableProps<{ value: ButtonDropdownDirection }>) { return <DefaultDropdownDirectionContext.Provider value={value}>{children}</DefaultDropdownDirectionContext.Provider> })

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

export function useButtonDisabled(providedValue?: boolean | "soft" | "hard") {
    const defaultDisabled = useContext(DefaultDisabledContext);
    return providedValue ?? defaultDisabled;
}

export function useButtonDropdownDirection(providedValue?: ButtonDropdownDirection) {
    const defaultDirection = useContext(DefaultDropdownDirectionContext);
    return providedValue ?? defaultDirection;
}



export function useButtonStyles<E extends Element>(p: Pick<ButtonPropsBase<E>, "colorVariant" | "size" | "disabled" | "fillVariant">, tag: ElementToTag<E>) {
    let { colorVariant, size, fillVariant, disabled } = p;
    colorVariant = useButtonColorVariant(colorVariant);
    size = useButtonSize(size);
    fillVariant = useButtonFillVariant(fillVariant);
    disabled = useButtonDisabled(disabled);

    const useButtonStylesProps = <P extends h.JSX.HTMLAttributes<E>>({ children, ...props }: P) => useMergedProps<E>({ 
        type: tag === "button"? "button" : undefined, 
        "aria-disabled": disabled? "true" : undefined, 
        className: clsx(disabled && "disabled", "btn", `btn-${fillVariant == "outline" ? `outline-` : ``}${colorVariant}`, `btn-${size}`, disabled && "disabled"),
        children: <span class="btn-text-contents">{children}</span>
    }, props);
    return { colorVariant, size, fillVariant, disabled, useButtonStylesProps };
}
