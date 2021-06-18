import { ComponentChildren, createContext, h, Ref } from "preact";
import { forwardElementRef, ProvideId, useProvidedId, useRefElement } from "preact-async-input";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { SimpleHTMLDialogProps, SimpleHTMLDivProps } from "../props-shared";
//import dialogPolyfill from 'dialog-polyfill'
import { BodyPortal } from "../portal";
import { Transition } from "preact-transition/src/use-transition";
import { fadeProps, zoomProps } from "preact-transition/src";
import { useOnClickOnLocation, useOnEscapeKey, useFocusTrapProps, useHideScroll, useElementSize } from "./utility";
import { clsx } from "../bootstrap-classes";
import { useMergedProps } from "../merge-props";
import { useRandomId } from "preact-async-input/src/provide-id";

export interface DialogPropsMin {
    onClose?(reason: "escape" | "backdrop"): void;
    open: boolean;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "max";
    noFullscreen?: boolean;
    ref?: Ref<HTMLDivElement>;
}

export interface DialogProps extends Omit<SimpleHTMLDivProps, "open" | "tabIndex">, DialogPropsMin {
}

export interface DialogHeaderPropsMin { className?: string; }
export interface DialogBodyPropsMin { className?: string; }
export interface DialogFooterPropsMin { className?: string; }

export interface DialogHeaderProps extends DialogHeaderPropsMin, SimpleHTMLDivProps {
    onClose?(reason: "escape" | "backdrop" | "other"): void;
    closeButton?: boolean;
}

export interface DialogBodyProps extends DialogBodyPropsMin, SimpleHTMLDivProps { }
export interface DialogFooterProps extends DialogFooterPropsMin, SimpleHTMLDivProps { }

const NativelySupportsDialog = ("HTMLDialogElement" in window) && (window["HTMLDialogElement"].prototype instanceof HTMLElement);


export function useDialogProps<P extends DialogPropsMin>(p: P) {

    const [animating, setAnimating] = useState(false);
    //const animatingRef = useRef(animating);
    //useEffect(() => { animatingRef.current = animating }, [animating]);

    const { useRefElementProps, element } = useRefElement<HTMLDivElement>();

    const { className, open, onClose, size, noFullscreen, ...props } = useFocusTrapProps(p.open, useRefElementProps<P>(p));

    const onCloseRef = useRef(onClose);
    useEffect(() => { onCloseRef.current = onClose; }, [onClose])

    const openRef = useRef(open);
    useEffect(() => {
        openRef.current = open;
    }, [open]);

    useHideScroll(open);

    useLayoutEffect(() => {
        if (element) {

            const h2 = (e: KeyboardEvent) => {
                if (openRef.current && e.key == "Escape" && element.contains(e.target as HTMLElement)) {
                    onCloseRef.current?.("escape");
                }
            };

            document.addEventListener("keydown", h2, { passive: true });

            return () => {
                document.removeEventListener("keydown", h2);
            }
        }
    }, [element]);

    const animateIfDidntClose = useCallback(() => {
        //const keyframes: Keyframe[] = [{ transform: "scale(1)", easing: "cubic-bezier(.06,1,.35,1)" }, { transform: "scale(1.3)", easing: "cubic-bezier(.06,1,.35,1)" }, { transform: "scale(1)", easing: "cubic-bezier(.06,1,.35,1)" }]
        setTimeout(() => {
            if (openRef.current) {
                setAnimating(animating => {
                    if (animating)
                        shakeDialog(animating);


                    return true;
                });
            }
        }, 50)
    }, [element, setAnimating])

    useOnClickOnLocation(element, (location) => { if (open && location == "outer") { onClose?.("backdrop"); animateIfDidntClose(); } });
    useOnEscapeKey(element, (location) => { if (open && location == "inner" || document.activeElement === document.body) { onClose?.("escape"); animateIfDidntClose(); } });

    const onAnimationEnd = useCallback(() => {
        setAnimating(false);
    }, [setAnimating]);

    const shakeDialog = useCallback((animating: boolean) => {
        const contentElement = element?.querySelector<HTMLElement>(".modal-content");
        void (contentElement?.offsetTop);
        contentElement?.classList.remove("dialog-shake");
        void (contentElement?.offsetTop);

        if (animating)
            contentElement?.classList.add("dialog-shake");
        void (contentElement?.offsetTop);
    }, [element, animating]);

    useEffect(() => {
        shakeDialog(animating);
    }, [animating, shakeDialog])


    return useMergedProps({ open, onAnimationEnd, className: clsx(className, "modal-dialog", "modal-dialog-centered", `modal-${size ?? "md"}`, size != "max" && !noFullscreen && `modal-fullscreen-${size}-down`) }, props);
}

export function useDialogHeaderProps<P extends DialogHeaderPropsMin>({ className, ...props }: P) { return useMergedProps({ className: clsx("modal-header", className) }, props); }
export function useDialogBodyProps<P extends DialogBodyPropsMin>({ className, ...props }: P) { return useMergedProps({ className: clsx("modal-body", className) }, props); }
export function useDialogFooterProps<P extends DialogFooterPropsMin>({ className, ...props }: P) { return useMergedProps({ className: clsx("modal-footer", className) }, props); }

export const Dialog = forwardElementRef(function Dialog(p: DialogProps, ref: Ref<HTMLDivElement>) {
    const { children, open, ...props } = useDialogProps({ ...p, ref });
    const headerId = useRandomId(); //useProvidedId("backup", undefined);



    return (
        <BodyPortal>
            <Transition open={open} className="modal fade2 backdrop-filter-transition">
                <div>
                    <Transition measure {...zoomProps({ ...props, open, originX: 0.5, originY: 0.5, minX: 0.8, minY: 0.8 })}>
                        <div role="dialog" aria-labelledby={headerId} aria-modal={open ? "true" : undefined}>
                            <div className="modal-content">
                                <ProvideId id={headerId}>
                                    {children}
                                </ProvideId>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </BodyPortal>
    )
});

export const DialogHeader = forwardElementRef(function DialogHeader({ closeButton, children, onClose, ...props }: DialogHeaderProps, ref: Ref<HTMLDivElement>) {
    const onClick = useCallback(() => { onClose?.("escape") }, [onClose]);
    const describedBy = useProvidedId("no-backup", undefined);
    return (<div {...useDialogHeaderProps(props)} ref={ref}><h5 id={describedBy} className="modal-title">{children}</h5>{closeButton && <button onClick={onClick} type="button" className="btn-close" aria-label="Close"></button>}</div>)
});

export const DialogBody = forwardElementRef(function DialogHeader({ children, ...props }: DialogHeaderProps, ref: Ref<HTMLDivElement>) {
    const { element, useRefElementProps } = useRefElement<HTMLDivElement>()
    const { height, scrollHeight, width, scrollWidth, scrollTop, scrollLeft, overflowX, overflowY } = useElementSize(element);

    let cssVariables: h.JSX.CSSProperties = {};
    if (height != null && scrollHeight != null && scrollTop != null && scrollLeft != null && scrollWidth != null && width != null && scrollLeft != null) {
        cssVariables = {
            "--scroll-overflow-x": +overflowX,
            "--scroll-overflow-y": +overflowY,
            "--scroll-top": `${scrollTop}px`,
            "--scroll-bottom": `${scrollHeight - height - scrollTop}px`,
            "--scroll-left": `${scrollLeft}px`,
            "--scroll-right": `${scrollWidth - width - scrollLeft}px`,
        };
    }
    return (<div {...useRefElementProps(useDialogBodyProps(useMergedProps({ style: cssVariables, ref }, props)))}>{children}<div className="scroll-container"><div className="scroll-fade scroll-fade-top" /><div className="scroll-fade scroll-fade-bottom" /></div></div>)
});

export const DialogFooter = forwardElementRef(function DialogHeader(props: DialogHeaderProps, ref: Ref<HTMLDivElement>) {
    return (<div {...useDialogFooterProps(props)} ref={ref} />)
});


/*const ShowDialogContext = createContext<() => void>(null!)
export function ShowDialogProvider() {

}*/

// Pass this hook a function that returns the props to pass to the <Dialog> component.
// The function will receive a Close function that can be used for buttons inside 
// props.children to close the containing dialog.
export function useShowDialog<P extends Omit<DialogProps, "open" | "onClose">>(getPropsGivenCloseFunction: (close: (reason: "other") => void) => P) {
    const [open, setOpen] = useState(false);

    const [currentResolve, setCurrentResolve] = useState<((reason: "backdrop" | "escape" | "other") => void) | null>(null);

    const onClose = useCallback((reason: "backdrop" | "escape" | "other") => {
        setOpen(false);
        currentResolve?.(reason);
        setCurrentResolve(null);
    }, [setOpen, currentResolve]);

    const showDialog = useCallback(() => {

        setOpen(true);

        return new Promise<"backdrop" | "escape" | "other">((resolve, reject) => {
            setCurrentResolve(() => (b: any) => resolve(b));
        });
    }, [])

    return {
        showDialog,
        close: onClose as (reason: "other") => void,
        jsx: <Dialog {...getPropsGivenCloseFunction(onClose)} open={open} onClose={onClose} />
    }
}
