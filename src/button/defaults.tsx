import { createContext, Fragment, h, RenderableProps } from "preact";
import { useContext } from "preact/hooks"
import { ButtonComponentVariant } from "./component";
import { ButtonColor, ButtonVariant } from "./types";


export const DefaultFillStyleContext = createContext<"fill" | "outline">("fill");
export const DefaultColorStyleContext = createContext<ButtonColor>("primary");
export const DefaultSizeContext = createContext<"sm" | "md" | "lg">("md");

export function ProvideDefaultButtonFill({ value, children }: RenderableProps<{ value: "fill" | "outline" }>) { return <DefaultFillStyleContext.Provider value={value}>{children}</DefaultFillStyleContext.Provider>; }
export function ProvideDefaultButtonColor({ value, children }: RenderableProps<{ value: ButtonColor }>) { return <DefaultColorStyleContext.Provider value={value}>{children}</DefaultColorStyleContext.Provider>; }
export function ProvideDefaultButtonSize({ value, children }: RenderableProps<{ value: "sm" | "md" | "lg" }>) { return <DefaultSizeContext.Provider value={value}>{children}</DefaultSizeContext.Provider>; }



export function useNormalizedVariant(variant: ButtonComponentVariant | undefined): ButtonVariant {
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