import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { ImageProps, useImageProps } from "./props";

export const Image = forwardElementRef(function Image(props: ImageProps, ref: Ref<HTMLImageElement>) {
    return <img {...useImageProps(props)} ref={ref} />
})

