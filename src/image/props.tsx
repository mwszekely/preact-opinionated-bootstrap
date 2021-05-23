
import clsx from "clsx";
import { SimpleHTMLImageProps } from "../props-shared";
//import { ImageBorderColor, ImageVariant, ImageRowVariant, ImageCellVariant } from "./types";

interface ImagePropsBase {
    thumbnail?: boolean;
    
}


export interface ImageProps extends ImagePropsBase, SimpleHTMLImageProps { 
    src: string; 
    alt: string;
}

export function useImageProps<P extends ImageProps>(props: P) {
    const { className, thumbnail, ...rest } = props;
    return {
        ...rest,
        className: clsx("img-fluid", thumbnail && "img-thumbnail", className)
    }
}
