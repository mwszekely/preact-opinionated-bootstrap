import { ComponentChildren, h } from "preact";
import { FigureCaptionProps, FigureProps, useFigureCaptionProps, useFigureProps } from "./props";

export interface FigureComponentProps extends FigureProps {
    caption?: ComponentChildren;
    align?: FigureCaptionProps["align"];
}

export function Figure({ children, caption, align, ...rest }: FigureComponentProps) {
    return (
        <figure {...useFigureProps(rest)}>
            {children}
            <figcaption {...useFigureCaptionProps({ align })}>{caption}</figcaption>
        </figure>
    )
}
