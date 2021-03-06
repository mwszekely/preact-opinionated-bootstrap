import { ButtonColorVariant } from "../button";
import { cloneElement, ComponentChildren, createContext, Fragment, h } from "preact";
import { UseToast, UseToastParameters, useToasts } from "preact-aria-widgets";
import { generateRandomId, useMergedProps, useMutationObserver, useStableCallback, useState } from "preact-prop-helpers";
import { SlideFade } from "preact-transition";
import { useCallback, useContext, useEffect, useErrorBoundary, useLayoutEffect } from "preact/hooks";
import { Button } from "../button/button";
import { BodyPortal } from "../portal";
import { GlobalAttributes } from "../props";
import clsx from "clsx";


export type StateUpdater<S> = (value: ((prevState: S) => S)) => void;
export type PushToast = (toast: h.JSX.Element) => number;
export type UpdateToast = (index: number, toast: h.JSX.Element) => void;
const PushToastContext = createContext<PushToast>(null!);
const UpdateToastContext = createContext<UpdateToast>(null!);
const DefaultToastTimeout = createContext(5000);
export function ToastsProvider({ children, defaultTimeout }: { children: ComponentChildren, defaultTimeout?: number }) {

    const [pushToast, setPushToast] = useState<PushToast | null>(null);
    const [updateToast, setUpdateToast] = useState<UpdateToast | null>(null);

    const pushToastStable = useStableCallback<NonNullable<typeof pushToast>>((toast) => {
        return pushToast?.(toast) ?? -1;
    });

    const updateToastStable = useStableCallback<NonNullable<typeof updateToast>>((index, toast) => {
        return updateToast?.(index, toast);
    });

    return (
        <>
            <DefaultToastTimeout.Provider value={defaultTimeout ?? 5000}>
                <ToastsProviderHelper setPushToast={setPushToast} setUpdateToast={setUpdateToast} />
                {pushToast && updateToast &&
                    <PushToastContext.Provider value={pushToastStable}>
                        <UpdateToastContext.Provider value={updateToastStable}>
                            {children}
                        </UpdateToastContext.Provider>
                    </PushToastContext.Provider>
                }
            </DefaultToastTimeout.Provider>
        </>
    )
}

export function usePushToast() {
    const pushToast = useContext(PushToastContext);
    return pushToast;
}

export function useUpdateToast() {
    const updateToast = useContext(UpdateToastContext);
    return updateToast;
}

// Extracted to a separate component to avoid rerendering all non-toast children
function ToastsProviderHelper({ setPushToast, setUpdateToast }: { setPushToast: StateUpdater<PushToast | null>, setUpdateToast: StateUpdater<UpdateToast | null> }) {

    const [children, setChildren, getChildren] = useState<h.JSX.Element[]>([]);
    const pushToast: PushToast | null = useCallback((toast: h.JSX.Element) => {
        const randomKey = generateRandomId();
        let index = getChildren().length;
        setChildren(prev => ([...prev, cloneElement(toast, { key: randomKey })]));
        return index;
    }, []);

    const updateToast: UpdateToast | null = useCallback((index: number, toast: h.JSX.Element) => {
        const key = getChildren()[index]?.key;
        console.assert(key);
        if (key) {
            setChildren(prev => {
                let newChildren = prev.slice();
                newChildren.splice(index, 1, cloneElement(toast, { key: key as string }));
                return newChildren;
            });
            return index;
        }
    }, []);

    useLayoutEffect(() => { setPushToast(_ => pushToast); }, [pushToast]);
    useLayoutEffect(() => { setUpdateToast(_ => updateToast); }, [updateToast]);

    return (
        <BodyPortal>
            <ToastsContainerChildrenContext.Provider value={children}>
                <ToastsContainer />
            </ToastsContainerChildrenContext.Provider>
        </BodyPortal>
    )
}

export interface ToastProps extends Omit<UseToastParameters, "timeout"> { children: ComponentChildren; timeout?: number; colorVariant?: ButtonColorVariant }
interface ToastsContainerProps extends GlobalAttributes<HTMLDivElement> { }

const ToastsContainerChildrenContext = createContext<h.JSX.Element[]>([]);
const UseToastContext = createContext<UseToast>(null!);
function ToastsContainer(props: ToastsContainerProps) {
    const children = useContext(ToastsContainerChildrenContext);
    const { useToast, useToastContainerProps } = useToasts<HTMLDivElement>(props);

    const [theme, setTheme] = useState(oppositeTheme());

    useEffect(() => {
        const mo = new MutationObserver((info) => {
            for (let i of info) {
                if (i.attributeName === "class") {
                    setTheme(oppositeTheme())
                }
            }
        })

        mo.observe(document.documentElement, { attributeFilter: ["class"] });
        return () => mo.disconnect();
    }, []);

    return (
        <UseToastContext.Provider value={useToast}>
            <div {...useToastContainerProps(useMergedProps<HTMLDivElement>()({ className: `set-theme ${theme}` }, props))}>
                {children}
            </div>
        </UseToastContext.Provider>
    )
}


function oppositeTheme() {
    if (document.documentElement.classList.contains("theme-dark"))
        return "theme-light";
    else if (document.documentElement.classList.contains("theme-light"))
        return "theme-dark";
    else
        return "";
}

const ToastDismissContext = createContext<() => void>(null!);
export function Toast({ timeout, politeness, colorVariant, children }: ToastProps) {
    const useToast = useContext(UseToastContext);
    const defaultTimeout = useContext(DefaultToastTimeout);
    const { useToastProps, dismiss, status } = useToast<HTMLDivElement>({ timeout: timeout ?? defaultTimeout, politeness });

    const show = (status != "dismissed");

    return (
        <ToastDismissContext.Provider value={dismiss}>
            <SlideFade show={show} slideTargetInline={1} animateOnMount={show} exitVisibility="removed">
                <div {...useToastProps({ class: clsx("toast show", colorVariant && `text-bg-${colorVariant}`) })} >
                    <div class="d-flex">
                        <div class="toast-body">
                            {children}
                        </div>
                        <Button class="btn-close me-2 m-auto" aria-label="Dismiss alert" onPress={dismiss} />
                    </div>
                </div>
            </SlideFade>
        </ToastDismissContext.Provider>
    )
}

function defaultErrorToToast(error: any) {
    return <Toast timeout={Infinity}>{error instanceof Error ? error.message : JSON.stringify(error)}</Toast>
}

/**
 * A component that will catch any errors thrown during render
 * and present them as toasts.
 * 
 * Ideally you should provide a custom errorToToast function that can handle expected types of errors,
 * but having a default one at the root of the app probably isn't a bad idea.
 * @param param0 
 * @returns 
 */
export function ToastErrorBoundary({ errorToToast, children }: { errorToToast?: (error: any) => h.JSX.Element, children: ComponentChildren }) {
    const pushToast = usePushToast();
    const [error, resetError] = useErrorBoundary(error => void (pushToast((errorToToast ?? defaultErrorToToast)(error))));
    return <>{children}</>;
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
