import "wicg-inert";
import { cloneElement, ComponentChildren, createContext, h, Ref, RenderableProps, Fragment } from "preact";
import { useAriaDialog } from "preact-aria-widgets";
import { Clip, Fade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext, useEffect, useLayoutEffect } from "preact/hooks";
import { BodyPortal, BodyPortalRoot } from "../portal";
import { forwardElementRef, GlobalAttributes, OptionalTransitionComponent } from "../props";
import { useStableCallback, generateRandomId, useMergedProps, useState } from "preact-prop-helpers";
import { Button, ButtonButtonProps } from "../button";
import clsx from "clsx";

interface DialogSharedProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> extends OptionalTransitionComponent<T> {
    descriptive: boolean;
    title?: ComponentChildren;
    footer?: ComponentChildren;
    ref?: Ref<T>;
    children?: ComponentChildren;
    align?: "top" | "center" | "fill";  // Note: "fill" sets height to 100%, which is useful for custom overflow behavior
    maxWidth?: "sm" | "lg" | "xl" | "xxl";
    fullscreen?: `${"xxl" | "xl" | "lg" | "md" | "sm"}-down` | boolean;
};

interface DialogControlledProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> extends DialogSharedProps<T> {
    open: boolean;
    onClose(reason: "backdrop" | "escape" | undefined): void;
};


interface DialogUncontrolledProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> extends DialogSharedProps<T> {
    /**
     * When using an uncontrolled dialog, you'll need a way to remotely show the dialog, and know when it closes.
     * 
     * When the Dialog renders (not shown, it just needs to render), it will pass a `show` function to any `setShow` function you pass here.
     * 
     * When the dialog closes for any reason, the promise will resolve.
     */
    provideShow?: StateUpdater<() => Promise<void>>;

    /**
     * If true, this uncontrolled dialog cannot be closed by clicking on the backdrop or pressing the escape key.
     * 
     * Specifically, if any reason is given for the close, it won't be closed.
     */
    modal?: boolean;
};

export type DialogProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = DialogControlledProps<T> | DialogUncontrolledProps<T>;

const DialogControlled = memo(forwardElementRef(function DialogControlled<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ maxWidth, fullscreen, align, onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<DialogControlledProps<T>>, ref: Ref<HTMLDivElement>) {

    onClose = (onClose ?? (() => { }));

    const { useDialogBackdrop, useDialogBody, useDialogProps, useDialogTitle } = useAriaDialog<HTMLDivElement>({ open: open ?? false, onClose });
    const { useDialogBackdropProps } = useDialogBackdrop<HTMLDivElement>();
    const { useDialogBodyProps, } = useDialogBody<HTMLDivElement>({ descriptive });
    const { useDialogTitleProps } = useDialogTitle<HTMLDivElement>();

    if (!Transition) {
        Transition = (Clip! as NonNullable<typeof Transition>);
        (rest as any).clipOriginBlock = 0;
    }

    align ??= "center";

    return (
        <BodyPortal>
            <CloseDialogContext.Provider value={useStableCallback(() => onClose?.(undefined))}>
                <div class="modal-portal-container">
                    <Fade show={open}>
                        <div {...useDialogBackdropProps({ class: "modal-backdrop backdrop-filter-transition" })} />
                    </Fade>
                    <Transition {...{ ref, show: open, ...rest } as any}>
                        <div {...useDialogProps({ class: clsx("modal-dialog modal-dialog-scrollable", align == "center" ? "modal-dialog-centered" : "", maxWidth && `modal-${maxWidth}`, fullscreen === true ? "modal-fullscreen" : fullscreen ? `modal-fullscreen-${fullscreen}` : ""), })}>
                            <BodyPortalRoot>
                                <Fade show={open}>
                                    <div class={clsx("modal-content elevation-body-surface elevation-raised-6", align == "fill"? "modal-content-fill" : "")}>
                                        {title != null && <div {...useDialogTitleProps({ class: "modal-header" })}>
                                            <h1 class="modal-title">{title}</h1>
                                        </div>}
                                        <div {...useDialogBodyProps({ class: "modal-body" })}>
                                            {children}
                                        </div>
                                        {footer != null && <div class="modal-footer">
                                            {footer}
                                        </div>}
                                    </div>
                                </Fade>
                            </BodyPortalRoot>
                        </div>
                    </Transition>
                </div>
            </CloseDialogContext.Provider>
        </BodyPortal >
    )
}))

const DialogUncontrolled = memo(forwardElementRef(function DialogUncontrolled<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ provideShow, modal, ...props }: DialogUncontrolledProps<T>, ref?: Ref<any>) {

    const [state, setState, getState] = useState<{ resolve: () => void; reject: (ex: any) => any; promise: Promise<void> } | null>(null);

    const show = useCallback(async () => {
        const state = getState();
        if (!state) {
            let resolve!: () => void;
            let reject!: (ex: any) => void;
            let promise = new Promise<void>((res, rej) => { resolve = res; reject = rej; }).finally(() => {
                setState(prev => null);
            });
            setState({ promise, resolve, reject });
            return promise;
        }
        else {
            return Promise.reject("This dialog is already being shown");
        }
    }, []);

    const onClose = useCallback<DialogControlledProps<T>["onClose"]>((reason) => {
        if (reason) {
            if (!modal) {
                getState()?.resolve();
                //getState()?.reject(reason);
                return;
            }
        }

        getState()?.resolve();
    }, [modal])

    useEffect(() => provideShow?.(prev => show), [provideShow, show])

    return <DialogControlled {...props} open={!!state} onClose={onClose} />
}));

export const Dialog = memo(forwardElementRef(function Dialog<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>(props: DialogProps<T>, ref?: Ref<any>) {
    if ((props as DialogUncontrolledProps<T>).provideShow)
        return <DialogUncontrolled {...(props as DialogUncontrolledProps<T>)} ref={ref} />;
    if ((props as DialogControlledProps<T>).onClose)
        return <DialogControlled {...(props as DialogControlledProps<T>)} ref={ref} />
    else
        return <DialogUncontrolled {...(props as DialogUncontrolledProps<T>)} ref={ref} />
}))



export type StateUpdater<S> = (value: ((prevState: S) => S)) => void;
export type PushDialog = (dialog: h.JSX.Element) => Promise<void>;
export type CloseDialog = () => void;
export type UpdateDialog = (index: Promise<void>, newDialog: h.JSX.Element) => void;
const PushDialogContext = createContext<PushDialog>(null!);
const CloseDialogContext = createContext<CloseDialog>(null!);
const UpdateDialogContext = createContext<UpdateDialog>(null!);
const DefaultDialogTimeout = createContext(5000);
export function DialogsProvider({ children, defaultTimeout }: { children: ComponentChildren, defaultTimeout?: number }) {

    const [pushDialog, setPushDialog] = useState<PushDialog | null>(null);
    const [updateDialog, setUpdateDialog] = useState<UpdateDialog | null>(null);

    const pushDialogStable = useStableCallback<NonNullable<typeof pushDialog>>((dialog) => {
        return pushDialog?.(dialog) ?? Promise.reject();
    });

    const updateDialogStable = useStableCallback<NonNullable<typeof updateDialog>>((index, dialog) => {
        return updateDialog?.(index, dialog);
    });

    return (
        <>
            <DefaultDialogTimeout.Provider value={defaultTimeout ?? 5000}>
                <DialogsProviderHelper setPushDialog={setPushDialog} setUpdateDialog={setUpdateDialog} />
                {pushDialog && updateDialog &&
                    <PushDialogContext.Provider value={pushDialogStable}>
                        <UpdateDialogContext.Provider value={updateDialogStable}>
                            {children}
                        </UpdateDialogContext.Provider>
                    </PushDialogContext.Provider>
                }
            </DefaultDialogTimeout.Provider>
        </>
    )
}

/**
 * Returns a function that immediately displays the given JSX Dialog element and returns a promise when it closes.
 * 
 * In general it's assumed that you're using an uncontrolled dialog, so you do not need to supply `open` or `onClose` props.
 */
export function usePushDialog() {
    const pushDialog = useContext(PushDialogContext);
    return pushDialog;
}

/**
 * Given the promise that's currently associated with an open dialog, allows you to re-render the dialog to update its contents.
 * 
 * You could use this to render a controlled dialog, for example, instead of the usual uncontrolled dialog.
 */
export function useUpdateDialog() {
    const updateDialog = useContext(UpdateDialogContext);
    return updateDialog;
}

/**
 * Returns a function that can be used to close whatever dialog the component that uses the hook is in. *Primarily for use in uncontrolled dialogs*, but can be used anywhere.
 * 
 * The function is stable across all renders (but cannot be called *during* render).
 */
export function useCloseDialog() {
    const closeDialog = useContext(CloseDialogContext);
    return closeDialog;
}

/**
 * A specialized button that closes the dialog it's contained in when clicked. In all other regards, a normal button that does normal button things.
 * 
 * This is most useful for uncontrolled dialogs, but can be used anywhere.
 */
export const CloseDialogButton = memo(forwardElementRef(function CloseDialogButton(props: ButtonButtonProps, ref?: Ref<any>) {
    return <Button {...(useMergedProps<any>()(props as any, { ref, onPress: useCloseDialog() }) as any)} />
}))

// Extracted to a separate component to avoid rerendering all non-dialog children
function DialogsProviderHelper({ setPushDialog, setUpdateDialog }: { setPushDialog: StateUpdater<PushDialog | null>, setUpdateDialog: StateUpdater<UpdateDialog | null> }) {

    const [children, setChildren, getChildren] = useState<Map<Promise<void>, { key: string, promise: Promise<void>; resolve: () => void; reject: (ex: any) => void; children: h.JSX.Element }>>(new Map());
    const pushDialog: PushDialog | null = useCallback((dialog: h.JSX.Element) => {
        const randomKey = generateRandomId();

        let resolve!: () => void;
        let reject!: (ex: any) => void;
        const promise = new Promise<void>((res, rej) => { resolve = res; reject = rej; });

        let show!: () => Promise<void>;
        const provideShow: StateUpdater<typeof show> = (s) => {
            show = s(show);
            show().then(resolve).catch(reject);
        };
        const clonedDialogProps: Partial<DialogUncontrolledProps<any>> = { provideShow };

        setChildren(prev => {
            let ret = new Map(prev);


            const clonedDialog = cloneElement(dialog, {
                ...clonedDialogProps,
                key: randomKey,
            });

            ret.set(promise, {
                key: randomKey,
                promise,
                resolve,
                reject,
                children: clonedDialog
            });

            return ret;
        });

        return promise;
    }, []);

    const updateDialog: UpdateDialog | null = useCallback((index: Promise<void>, dialog: h.JSX.Element) => {
        const info = getChildren().get(index);
        console.assert(!!info);
        if (info) {
            setChildren(prev => {
                let newChildren = new Map(prev);
                newChildren.set(index, { ...info, children: cloneElement(dialog, { key: info.key }) });
                return newChildren;
            });
            return index;
        }
    }, []);

    useLayoutEffect(() => { setPushDialog(_ => pushDialog); }, [pushDialog]);
    useLayoutEffect(() => { setUpdateDialog(_ => updateDialog); }, [updateDialog]);

    return (
        <BodyPortal>
            <DialogsContainerChildrenContext.Provider value={children}>
                <DialogsContainer />
            </DialogsContainerChildrenContext.Provider>
        </BodyPortal>
    )
}

interface DialogsContainerProps extends GlobalAttributes<HTMLDivElement> { }

const DialogsContainerChildrenContext = createContext<Map<Promise<void>, { key: string, promise: Promise<void>; resolve: () => void; reject: (ex: any) => void; children: h.JSX.Element }>>(new Map());
function DialogsContainer(props: DialogsContainerProps) {
    const children = useContext(DialogsContainerChildrenContext);

    return (
        <div {...(useMergedProps<HTMLDivElement>()({}, props))}>
            {Array.from(children).map(([key, { children }]) => { return children; })}
        </div>
    )
}

