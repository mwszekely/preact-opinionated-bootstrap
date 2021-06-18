import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";
import { useRef } from "preact/hooks";
import { clsx } from "../bootstrap-classes";

type ElementFromTag<E extends keyof h.JSX.IntrinsicElements> = (
    h.JSX.IntrinsicElements[E] extends h.JSX.HTMLAttributes<infer H>? H : 
    h.JSX.IntrinsicElements[E] extends h.JSX.SVGAttributes<infer H>? H : 
    EventTarget);

interface CardProps extends SimpleProps<HTMLDivElement, never> { }
interface CardBodyProps extends SimpleProps<HTMLDivElement, never> { }
interface CardTextProps extends SimpleProps<HTMLDivElement, never> { }
interface CardHeaderProps extends SimpleProps<HTMLDivElement, never> { }
interface CardFooterProps extends SimpleProps<HTMLDivElement, never> { }
interface CardTitleProps<E extends keyof h.JSX.IntrinsicElements> extends SimpleProps<ElementFromTag<E>, never> { tag?: E; }
interface CardSubtitleProps<E extends keyof h.JSX.IntrinsicElements> extends SimpleProps<ElementFromTag<E>, never> { tag?: E; }
interface CardImageProps extends SimpleProps<HTMLImageElement, "src"> { position: "bottom" | "top"  }

type SimpleProps<E extends EventTarget, I extends keyof h.JSX.HTMLAttributes<E>> = Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes | I>;

export const Card = forwardElementRef(function Card(props: CardProps, ref: Ref<HTMLDivElement>) {
    const { className, ...p } = props;
    return (
        <div {...p} className={clsx("card", className)} ref={ref} />
    )
});

export const CardImageProps = forwardElementRef(function CardBody(props: CardImageProps, ref: Ref<HTMLImageElement>) {
    const { className, position, ...p } = props;
    return (
        <img {...p} className={clsx(`card-img-${position}`, className)} ref={ref} />
    )
});

export const CardBody = forwardElementRef(function CardBody(props: CardBodyProps, ref: Ref<HTMLDivElement>) {
    const { className, ...p } = props;
    return (
        <div {...p} className={clsx("card-body", className)} ref={ref} />
    )
});

export const CardText = forwardElementRef(function CardBody(props: CardTextProps, ref: Ref<HTMLDivElement>) {
    const { className, ...p } = props;
    return (
        <div {...p} className={clsx("card-text", className)} ref={ref} />
    )
});

export const CardHeader = forwardElementRef(function CardHeader(props: CardHeaderProps, ref: Ref<HTMLDivElement>) {
    const { className, ...p } = props;
    return (
        <div {...p} className={clsx("card-header", className)} ref={ref} />
    )
});

export const CardFooter = forwardElementRef(function CardHeader(props: CardFooterProps, ref: Ref<HTMLDivElement>) {
    const { className, ...p } = props;
    return (
        <div {...p} className={clsx("card-footer", className)} ref={ref} />
    )
});

export const CardTitle = forwardElementRef(function CardTitle<E extends keyof h.JSX.IntrinsicElements>(props: CardTitleProps<E>, ref: Ref<ElementFromTag<E>>) {
    const { className, tag, ...p } = props;
    return h(tag ?? "h5", { ...p, className: clsx("card-title", className), ref: ref } as any);
});

export const CardSubtitle = forwardElementRef(function CardSubtitle<E extends keyof h.JSX.IntrinsicElements>(props: CardSubtitleProps<E>, ref: Ref<ElementFromTag<E>>) {
    const { className, tag, ...p } = props;
    return h(tag ?? "h6", { ...p, className: clsx("card-subtitle", "mb-2", "text-muted", className), ref: ref } as any);
});
