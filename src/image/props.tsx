
import clsx from "clsx";
import { useMergedProps } from "../merge-props";
import { SimpleHTMLImageProps } from "../props-shared";
//import { ImageBorderColor, ImageVariant, ImageRowVariant, ImageCellVariant } from "./types";

interface ImagePropsBase {
    thumbnail?: boolean;
    
}

export interface ImageProps extends ImagePropsBase, SimpleHTMLImageProps { 
    src: string; 
    alt: string;
}

export function useImageProps<P extends ImageProps>({ thumbnail, ...props }: P) {
    return useMergedProps({
        className: clsx("img-fluid", thumbnail && "img-thumbnail")
    }, props);
}
