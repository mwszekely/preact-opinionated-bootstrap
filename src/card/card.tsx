import clsx from "clsx";
import { ComponentChildren, createElement, Fragment, h, Ref, VNode } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps } from "../props";



interface CardProps extends GlobalAttributes<HTMLDivElement> { }
interface CardBodyProps extends GlobalAttributes<HTMLDivElement> { }
interface CardTextProps extends GlobalAttributes<HTMLDivElement> { }
interface CardHeaderProps extends GlobalAttributes<HTMLDivElement> { }
interface CardFooterProps extends GlobalAttributes<HTMLDivElement> { }
interface CardTitleProps<E extends Element> extends GlobalAttributes<E>, TagSensitiveProps<E> { }
interface CardSubtitleProps<E extends Element> extends GlobalAttributes<E>, TagSensitiveProps<E> { }
interface CardImageProps extends GlobalAttributes<HTMLImageElement> { src: string, position: "bottom" | "top" | "both" }


export const Card = forwardElementRef(function Card(p: CardProps, ref: Ref<HTMLDivElement>) {
    let { children, ...props } = p;

    return (
        <div {...useMergedProps<HTMLDivElement>()({ ref, className: "card" }, props)}>{children}</div>
    )
});

export interface CardElementParagraphProps<E extends Element> extends GlobalAttributes<E> {
    /**
     * * `paragraph`: Any generic text. The default. Will be padded around the edges.
     */
    type: "paragraph" | "footer";
    children: ComponentChildren;
}
export interface CardElementTitleProps<E extends HTMLHeadingElement> extends GlobalAttributes<E>, TagSensitiveProps<E> {
    /**
     * * `title`: The title at the top of the card.
     * * `subtitle`: The optional subtitle below the title.
     */
    type: "title" | "subtitle";
    children: ComponentChildren;
}
export interface CardElementImageProps<E extends Element> extends GlobalAttributes<E> {
    /**
     * * `image`: A header/footer image
     */
    type: "image";
    src: string;
    children: ComponentChildren;
}
export interface CardElementFlushProps<E extends Element> extends GlobalAttributes<E>, TagSensitiveProps<E> {
    /**
     * * `flush` Any non-card content that needs to have no padding. A list, for example.
     */
    type: "flush";
    children: ComponentChildren;
}
export interface CardElementFooterProps<E extends Element> extends GlobalAttributes<E> {
    /**
     * * `footer`: A small, separated blurb of info at the bottom of the card.
     */
    type?: "paragraph" | "footer";
    children: ComponentChildren;
}
export type CardElementProps<E extends Element> = CardElementParagraphProps<E> | CardElementFooterProps<E> | CardElementImageProps<E> | CardElementTitleProps<E & HTMLHeadingElement> | CardElementFlushProps<E>;


function CardElement2<E extends Element>({ children, ...p }: CardElementProps<E>, ref: Ref<E>): VNode<any> {
    switch (p.type) {
        default:
        case "paragraph": {
            const { type, ...props } = p;
            return <CardBody {...props} ref={ref as any}><CardText>{children}</CardText></CardBody>;
        }
        case "footer": {
            const { type, ...props } = p;
            return <CardFooter {...props} ref={ref as any}>{children}</CardFooter>;
        }
        case "subtitle": {
            const { type, tag, ...props } = p;
            return <CardBody {...props} ref={ref as any}><CardSubtitle tag={tag}>{children}</CardSubtitle></CardBody>;
        }
        case "title": {
            const { type, tag, ...props } = p;
            return <CardBody {...props} ref={ref as any}><CardTitle tag={tag}>{children}</CardTitle></CardBody>;
        }
        case "image": {
            const { type, src, ...props } = p;
            return <CardImage src={src} position="both" {...props} ref={ref as any}>{children}</CardImage>;
        }
        case "flush": {
            const { tag, ...props } = p;
            return createElement(tag as any, props, children);
        }
    }
}

export const CardElement = forwardElementRef(CardElement2);

const CardImage = forwardElementRef(function CardImage(p: CardImageProps, ref: Ref<HTMLImageElement>) {
    const { position, ...props } = p;
    return (
        <img {...useMergedProps<HTMLImageElement>()(props, { ref, className: `card-img${position == "both" ? "" : `-${position}`}` })} />
    )
});

const CardBody = forwardElementRef(function CardBody(props: CardBodyProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>()(props, { ref, className: "card-body" })} />
    )
});

const CardFooter = forwardElementRef(function CardHeader(props: CardFooterProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>()(props, { ref, className: "card" })} />
    )
});

const CardTitle = forwardElementRef(function CardTitle<E extends Element>(p: CardTitleProps<E>, ref: Ref<E>) {
    const { tag, ...props } = p;
    return h(tag ?? "h5", useMergedProps<E>()(props, { ref, className: "card-title" }) as any);
});

const CardSubtitle = forwardElementRef(function CardSubtitle<E extends Element>(p: CardSubtitleProps<E>, ref: Ref<E>) {
    const { tag, ...props } = p;
    return h(tag ?? "h5", useMergedProps<E>()(props, { ref, className: clsx("card-subtitle", "mb-2", "text-muted") }) as any);
});


const CardText = forwardElementRef(function CardText(props: CardTextProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>()(props, { ref, className: "card-text" })} />
    )
});

const CardHeader = forwardElementRef(function CardHeader(props: CardHeaderProps, ref: Ref<HTMLDivElement>) {
    return (
        <div {...useMergedProps<HTMLDivElement>()(props, { ref, className: "card-header" })} />
    )
});

const a2 = <CardElement type="title" tag="h1" children="" class="" />