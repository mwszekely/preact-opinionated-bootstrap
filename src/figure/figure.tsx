import clsx from "clsx";
import { cloneElement, ComponentChildren, h, VNode } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { GlobalAttributes } from "../props";

export interface FigureProps extends Omit<GlobalAttributes<HTMLElement>, "children"> {
    caption: ComponentChildren;
    align?: "start" | "end" | "center";
    children: VNode<any>;
}

export function Figure({ children, caption, align, ...props }: FigureProps) {
    return (
        <figure {...useMergedProps<HTMLElement>()({ className: "figure" }, props)}>
            {cloneElement(children, useMergedProps<HTMLImageElement>()({ className: "figure-img", ref: children.props.ref }, children.props))}
            <figcaption className={clsx("figure", align === "end" && "text-end", align == "center" && "text-center")}>{caption}</figcaption>
        </figure>
    )
}
