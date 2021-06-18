import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useProvidedId, ProvideId, forwardElementRef, useRefElement } from "preact-async-input";
import { Fade, Slide } from "preact-transition/src/index";
import { Transition } from "preact-transition/src/use-transition";
import { useCallback, useRef, useContext } from "preact/hooks";
import { Button } from "../button";
import { useFocusTrapProps, useHideScroll, useOnClickOnLocation, useOnEscapeKey } from "../dialog/utility";
import { BodyPortal } from "../portal";

const isRTL = () => document.documentElement.dir === 'rtl'

const OffcanvasCloseContext = createContext<OffcanvasProps["onClose"]>(null!);

export function Offcanvas({ children, modal, open, onClose, position }: OffcanvasProps) {
    const id = useProvidedId("backup", null);

    let slideX = position == "start" ? -1 : position == "end" ? 1 : 0;
    let slideY = position == "bottom" ? 1 : position == "top" ? -1 : 0;

    if (isRTL())
        slideX = -slideX;

    const ref = useRef<HTMLDivElement>(null);

    const { useRefElementProps, element } = useRefElement<HTMLElement>()
    useOnEscapeKey(element, (location, e) => { if (location == "inner") onClose("escape"); });
    useOnClickOnLocation(element, (location, e) => { if (location == "outer") onClose("backdrop"); });

    useHideScroll(!!open && !!modal);

    return (
        <BodyPortal>
            <OffcanvasCloseContext.Provider value={onClose}>
                <ProvideId id={id}>
                    {modal && <Transition open={open} className="modal fade2 backdrop-filter-transition"><div className="modal-offcanvas-backdrop" /></Transition>}
                    <Slide open={open} x={slideX} y={slideY} {...useFocusTrapProps(open && (modal ?? false), useRefElementProps({ ref }))}>
                        <div role="dialog" aria-modal={open ? "true" : undefined} className={clsx(`offcanvas offcanvas-${position}`, modal && "modal-offcanvas")} tabIndex={-1} aria-labelledby={id}>
                            {children}
                        </div>
                    </Slide>
                </ProvideId>
            </OffcanvasCloseContext.Provider>
        </BodyPortal>
    )
}

export const OffcanvasHeader = forwardElementRef(function OffcanvasHeader({ className, children, ...props }: OffcanvasHeaderProps, ref: Ref<HTMLDivElement>) {
    const titleId = useProvidedId("no-backup", null);
    const onClose = useContext(OffcanvasCloseContext);

    const onCloseClick = useCallback(() => {
        return onClose?.("escape");
    }, [onClose])
    return (
        <div {...props} ref={ref} className={clsx("offcanvas-header", className)}>
            <ProvideId id={undefined}>
                <h5 className="offcanvas-title" id={titleId}>{children}</h5>
                <Button variant="outline-secondary" className="offcanvas-close-button" aria-label="Close" onClick={onCloseClick}></Button>
            </ProvideId>
        </div>
    )
});

export interface OffcanvasProps {
    position: "start" | "end" | "top" | "bottom";
    open: boolean;
    modal?: boolean;
    onClose(reason: "backdrop" | "escape" | "other"): void;
    children?: ComponentChildren;
}

export interface OffcanvasBodyProps extends h.JSX.HTMLAttributes<HTMLDivElement> { }
export interface OffcanvasHeaderProps extends h.JSX.HTMLAttributes<HTMLDivElement> { }

export const OffcanvasBody = forwardElementRef(function OffcanvasBody({ className, ...props }: OffcanvasBodyProps, ref: Ref<HTMLDivElement>) {
    return (
        <ProvideId id={undefined}>
            <div {...props} ref={ref} className={clsx("offcanvas-body", className)} />
        </ProvideId>
    )
});
