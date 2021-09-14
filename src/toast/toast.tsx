import { Button } from "../button/button";
import { BodyPortal } from "../portal";
import { ComponentChildren, createContext, Fragment, h, cloneElement } from "preact";
import { ManagedChildInfo, useChildManager, useMergedProps, useRandomId, useRefElement, UseRefElementPropsReturnType, useState, useTimeout } from "preact-prop-helpers";
import { MergedProps } from "preact-prop-helpers/use-merged-props";
import { generateRandomId } from "preact-prop-helpers/use-random-id";
import { useCallback, useContext, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { GlobalAttributes } from "props";
import { useChildFlag } from "preact-prop-helpers/use-child-manager";
import { SlideFade } from "preact-transition";
import { findFirstFocusable } from "preact-prop-helpers/use-focus-trap";
import { UseToast, UseToastParameters, useToasts } from "preact-aria-widgets"

export type PushToast = (toast: h.JSX.Element) => void;
const PushToastContext = createContext<PushToast>(null!);
const DefaultToastTimeout = createContext(5000);
export function ToastsProvider({ children, defaultTimeout }: { children: ComponentChildren, defaultTimeout?: number }) {

    const [pushToast, setPushToast] = useState<PushToast | null>(null);

    return (
        <>
            <DefaultToastTimeout.Provider value={defaultTimeout ?? 5000}>
                <ToastsProviderHelper setPushToast={setPushToast} />
                {pushToast && <PushToastContext.Provider value={pushToast}>
                    {children}
                </PushToastContext.Provider>}
            </DefaultToastTimeout.Provider>
        </>
    )
}

export function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}

// Extracted to a separate component to avoid rerendering all non-toast children
function ToastsProviderHelper({ setPushToast }: { setPushToast: (pushToast: PushToast) => void }) {

    const [children, setChildren] = useState<h.JSX.Element[]>([]);
    const pushToast = useCallback((toast: h.JSX.Element) => { const randomKey = generateRandomId(); setChildren(prev => ([...prev, cloneElement(toast, { key: randomKey })])) }, []);
    useLayoutEffect(() => { setPushToast(_ => pushToast); }, [pushToast]);

    return (
        <BodyPortal>
            <ToastsContainerChildrenContext.Provider value={children}>
                <ToastsContainer />
            </ToastsContainerChildrenContext.Provider>
        </BodyPortal>
    )
}

export interface ToastProps extends Omit<UseToastParameters, "timeout"> { children: ComponentChildren; timeout?: number; }
interface ToastsContainerProps extends GlobalAttributes<HTMLDivElement> { }

const ToastsContainerChildrenContext = createContext<h.JSX.Element[]>([]);
const UseToastContext = createContext<UseToast>(null!);
function ToastsContainer(props: ToastsContainerProps) {
    const children = useContext(ToastsContainerChildrenContext);
    const { useToast, useToastContainerProps } = useToasts<HTMLDivElement>(props);

    return (
        <UseToastContext.Provider value={useToast}>
            <div {...useToastContainerProps(props)}>
                {children}
            </div>
        </UseToastContext.Provider>
    )
}

const ToastDismissContext = createContext<() => void>(null!);
export function Toast({ timeout, politeness, children }: ToastProps) {
    const useToast = useContext(UseToastContext);
    const defaultTimeout = useContext(DefaultToastTimeout);
    const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });

    return (
        <ToastDismissContext.Provider value={dismiss}>
            <SlideFade open={status != "dismissed"} slideTargetInline={1} animateOnMount={true} exitVisibility="removed">
                <div {...useToastProps({ class: "toast show", role: "alert", "aria-atomic": "true" })} >
                    <div class="d-flex">
                        <div class="toast-body">
                            {children}
                        </div>
                        <Button class="btn-close me-2 m-auto" aria-label="Close" onClick={dismiss} />
                    </div>
                </div>
            </SlideFade>
        </ToastDismissContext.Provider>
    )
}

/*
export function ToastHeader({ children }: { children: ComponentChildren }) {
    return (
        <div class="toast-header">
            <div class="me-auto">
                {children}
            </div>
            <Button class="btn-close" aria-label="Close" />
        </div>
    )
}*/
