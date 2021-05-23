import { createContext, Fragment, h, RenderableProps } from "preact";
import { ButtonColor } from "./types";


export const DefaultFillStyleContext = createContext<"fill" | "outline">("fill");
export const DefaultColorStyleContext = createContext<ButtonColor>("primary");
export const DefaultSizeContext = createContext<"sm" | "md" | "lg">("md");

export function ProvideDefaultButtonFill({ value, children }: RenderableProps<{ value: "fill" | "outline" }>) { return <DefaultFillStyleContext.Provider value={value}>{children}</DefaultFillStyleContext.Provider>; }
export function ProvideDefaultButtonColor({ value, children }: RenderableProps<{ value: ButtonColor }>) { return <DefaultColorStyleContext.Provider value={value}>{children}</DefaultColorStyleContext.Provider>; }
export function ProvideDefaultButtonSize({ value, children }: RenderableProps<{ value: "sm" | "md" | "lg" }>) { return <DefaultSizeContext.Provider value={value}>{children}</DefaultSizeContext.Provider>; }

