import clsx from "clsx";
import { useMergedProps } from "../merge-props";
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
    return useMergedProps({ className: clsx("figure") }, props);
}

export function useFigureImageProps<P extends FigureImageProps>(props: P) {
    return useMergedProps({ className: clsx("figure-img") }, props);
}

export function useFigureCaptionProps<P extends FigureCaptionProps>({ align, ...props }: P) {
    return useMergedProps({ className: clsx("figure", align === "end" && "text-end", align == "center" && "text-center"), style: undefined }, props);
}
