import { cloneElement, ComponentChildren, createContext, Fragment, h, JSX, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { Fade, fadeProps, slideProps } from "preact-transition/src";
import { Transition, TransitionDirection, TransitionPhase } from "preact-transition/src/use-transition";
import { useCallback, useContext, useEffect, useRef, useState } from "preact/hooks";
import { clsx } from "../bootstrap-classes";
import { Button } from "../button";
import { useMergedProps } from "../merge-props";
import { BodyPortal } from "../portal";
import { LinearProgress } from "../progress";
import { SimpleHTMLDivProps } from "../props-shared";
import { useHasFocus, useHasMouseover } from "./utility";

export interface ToastHeaderPropsMin {
    className?: string;
}

export interface ToastBodyPropsMin {
    className?: string;
}

export interface ToastPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLDivElement>, "onMouseEnter" | "onMouseLeave"> {
    className?: string;
    timeout: number;
    onClose?(): void;
    role?: string;
    ref?: Ref<HTMLDivElement>;
}

export interface ToastProps extends ToastPropsMin, SimpleHTMLDivProps { }

export interface ToastHeaderProps extends ToastHeaderPropsMin, SimpleHTMLDivProps { }
export interface ToastBodyProps extends ToastBodyPropsMin, SimpleHTMLDivProps { }

const OnCloseContext = createContext<() => void>(null!);

function useToastIsActive() {

    const { hasFocus, useHasFocusProps } = useHasFocus();
    const { hasMouseover, useHasMouseoverProps } = useHasMouseover();

    const cancelHide = (hasMouseover || hasFocus);


    return {
        active: cancelHide,
        useToastIsActiveProps: function <PropType extends { ref: Ref<any> } & Pick<ToastPropsMin, "onMouseEnter" | "onMouseLeave">>(props: PropType) {
            return useHasFocusProps(useHasMouseoverProps(props))
        }

    }
}

export function useToastProps<P extends ToastPropsMin>(cancelHide: boolean, { timeout, role, onClose, ...props }: P) {

    timeout ??= 5000;

    const onCloseRef = useRef<typeof onClose>(onClose);
    useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

    useEffect(() => {
        if (!cancelHide) {
            const handle = setTimeout(() => {
                onCloseRef.current?.();
            }, timeout);

            return () => clearTimeout(handle);
        }
    }, [timeout, cancelHide])

    return useMergedProps({
        role: role ?? "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        "data-cancel-hide": cancelHide.toString(),
        className: clsx("toast showing")
    }, props)


}

export function toastHeaderProps<P extends ToastHeaderPropsMin>(props: P) {
    return useMergedProps({
        className: clsx("toast-header", "justify-content-between")
    }, props);
}

export function toastBodyProps<P extends ToastBodyPropsMin>(props: P) {
    return useMergedProps({
        className: clsx("toast-body")
    }, props)
}

export const Toast = forwardElementRef(function Toast(p: ToastProps, r: Ref<HTMLDivElement>) {
    const { active, useToastIsActiveProps } = useToastIsActive();

    const { ...props } = useToastProps(active, useToastIsActiveProps({ ...p, ref: r, children: <>{p.children}{isFinite(p.timeout) && <ToastCloseProgress timeout={active ? Infinity : p.timeout} active={active} />}</> }));

    return (
        <OnCloseContext.Provider value={p.onClose!}>
            <div {...props} />
        </OnCloseContext.Provider>
    )
});

export const ToastHeader = forwardElementRef(function ToastHeader(p: ToastHeaderProps, r: Ref<HTMLDivElement>) {
    const { children, ...props } = toastHeaderProps({ ...p, ref: r });
    const onClose = useContext(OnCloseContext);
    return (
        <div {...props}>
            {children}
            {onClose && <Button variant="outline-secondary" className="toast-close-button" onClick={onClose} aria-label="Close" />}
        </div>
    )
});

export const ToastBody = forwardElementRef(function ToastBody(p: ToastBodyProps, r: Ref<HTMLDivElement>) {
    const { children, ...props } = toastBodyProps({ ...p, ref: r })
    return (
        <div {...props}>
            {children}
        </div>
    )
});


export const PushToastContext = createContext<null | ((toastElement: JSX.Element) => void)>(null);
export function ToastManager({ children, max }: { children: ComponentChildren, max: number }) {

    const [currentToastIndex, setCurrentToastIndex] = useState(0);
    const [toastCount, setToastCount] = useState(0);
    const [waitingForClose, setWaitingForClose] = useState(false);

    const allToasts = useRef<JSX.Element[]>([]);
    const pushToast = useCallback((toastElement: JSX.Element) => {
        allToasts.current.push(toastElement);
        setToastCount(c => ++c);
    }, [allToasts]);

    //const showToast = useCallback((toast: JSX.Element) => { }, []);

    const onCurrentToastClose = useCallback(() => {
        setCurrentToastIndex(i => ++i);
        setWaitingForClose(true);
    }, [])

    const onTransitionUpdate = useCallback((direction: TransitionDirection, phase: TransitionPhase) => {
        if (direction === "exit" && phase == "finalize")
            setWaitingForClose(false);
    }, [])


    return (
        <>
            <PushToastContext.Provider value={pushToast}>{children}</PushToastContext.Provider>
            <BodyPortal>
                <div className={clsx("flex-column-reverse toasts-container")}>
                    {allToasts.current.map((toast, i) =>
                        ((i + +waitingForClose) >= currentToastIndex + max)? null :
                            <Transition onTransitionUpdate={onTransitionUpdate} animateOnMount {...fadeProps(slideProps({ x: 0.7, open: i >= currentToastIndex }))} >
                                <div>{cloneElement(toast, { key: i, timeout: i > currentToastIndex ? Infinity : toast.props.timeout, onClose: i == currentToastIndex ? onCurrentToastClose : undefined })}</div>
                            </Transition>)}
                </div>
            </BodyPortal>
        </>
    )
}

function ToastCloseProgress({ active, timeout }: { active: boolean, timeout: number }) {

    const [currentTime, setCurrentTime] = useState(+new Date());

    const [startTime, setStartTime] = useState(+new Date());
    const startTimeRef = useRef<typeof startTime>(startTime);
    useEffect(() => { startTimeRef.current = startTime; }, [startTime])

    useEffect(() => { setCurrentTime(+new Date()); setStartTime(+new Date()); }, [active]);

    useEffect(() => {
        const fn = () => {
            handle = requestAnimationFrame(fn);
            setCurrentTime(+new Date());
        };
        let handle = requestAnimationFrame(fn);
        return () => cancelAnimationFrame(handle);
    }, [])

    const min = startTime;
    const max = min + timeout;
    let value = currentTime;
    value = Math.min(max, value);
    value = Math.max(min, value);

    return <LinearProgress style={{ opacity: Math.pow((value - min) / (max - min), 3) }} variant="solid" color="primary" className="toast-progress" min={min} max={max} value={value} />
}



export function usePushToast(): (toastElement: h.JSX.Element) => void;
export function usePushToast(toastElement: h.JSX.Element): void;
export function usePushToast(toastElement?: h.JSX.Element) {
    const pushToast = useContext(PushToastContext);
    if (toastElement) {
        return pushToast?.(toastElement);
    }
    return pushToast;
}
