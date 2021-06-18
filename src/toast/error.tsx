import { Component, ComponentChildren, createContext, Fragment, h } from "preact";
import { useError } from "preact-async-input/src/use-async-event-handler";
import { useContext, useEffect, useRef } from "preact/hooks";
import { clsx } from "../bootstrap-classes";
import { PushToastContext, Toast, ToastBody, ToastHeader, ToastProps, usePushToast } from "./toast";

export interface ErrorToastProps extends ToastProps {
    header?: ComponentChildren;
    children: ComponentChildren;
}

export function ErrorToast({ header, children, ...props }: ErrorToastProps) {
    return (
        <Toast {...props}>
            <ToastHeader>{header ?? <div className={clsx("d-flex", "gap-2", "flex-nowrap")}><div>❌</div><div>Error</div></div>}</ToastHeader>
            <ToastBody>{children}</ToastBody>
        </Toast>
    )
}

interface ErrorToastProviderProps {
    errorToToast(error: unknown): h.JSX.Element;
}

const ErrorToToastContext = createContext<null | ErrorToastProviderProps["errorToToast"]>(null);

// Requires you have as ToastManager higher in the tree
// Catches errors thrown *while rendering* and sends them to an ErrorToast.
export class ErrorToastProvider extends Component<ErrorToastProviderProps, { error: unknown | undefined }> {
    componentDidCatch(error: any, errorInfo: any): void {
        this.setState({ error });
    }
    render() {
        const { errorToToast, children } = this.props;
        const { error } = this.state;

        //const pushToast = usePushToast();


        return (
            <ErrorToToastContext.Provider value={errorToToast}>
                <PushToastContext.Consumer>{(pushToast) => {
                    if (error !== undefined && pushToast) {
                        pushToast(errorToToast(error));
                        this.setState({ error: undefined })
                    }
                    return (<>{children}</>);
                }}</PushToastContext.Consumer>

            </ErrorToToastContext.Provider>
        )
    }
}

// Listens to changes in error from an async input (from preact-async-input)
// and pushes a new toast if one happens (and we have)
export function useErrorFromAsyncInput() {
    const error = useError();
    const errorToToast = useContext(ErrorToToastContext);
    const pushToast = usePushToast();

    const errorToToastRef = useRef<typeof errorToToast>(errorToToast);
    useEffect(() => { errorToToastRef.current = errorToToast }, []);

    useEffect(() => {
        if (error !== undefined) {
            const toast = errorToToastRef.current?.(error);
            if (toast != null)
                pushToast(toast);
        }
    }, [error])
}

export function AsyncInputErrorToastSentinel() {
    useErrorFromAsyncInput();
    return <></>
}
