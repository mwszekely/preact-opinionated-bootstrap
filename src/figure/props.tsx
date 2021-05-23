import clsx from "clsx";
import { SimpleHTMLFigureProps, SimpleHTMLFigureCaptionProps, SimpleHTMLImageProps } from "../props-shared";
//import { FigureBorderColor, FigureVariant, FigureRowVariant, FigureCellVariant } from "./types";

interface FigurePropsBase {
}

interface FigureCaptionPropsBase {
    align?: "start" | "end" | "center";
}

interface FigureImagePropsBase { }

export interface FigureProps extends FigurePropsBase, SimpleHTMLFigureProps { }
export interface FigureImageProps extends FigureImagePropsBase, SimpleHTMLImageProps { }
export interface FigureCaptionProps extends FigureCaptionPropsBase, SimpleHTMLFigureCaptionProps { }

export function useFigureProps<P extends FigureProps>(props: P) {
    const { className, ...rest } = props;
    return {
        ...rest,
        className: clsx("figure", className)
    }
}

export function useFigureImageProps<P extends FigureImageProps>(props: P) {
    const { className, ...rest } = props;
    return {
        ...rest,
        className: clsx("figure-img", className)
    }
}

export function useFigureCaptionProps<P extends FigureCaptionProps>(props: P) {
    const { className, align, ...rest } = props;
    return {
        ...rest,
        className: clsx("figure", align === "end" && "text-end", align == "center" && "text-center", className)
    }
}
