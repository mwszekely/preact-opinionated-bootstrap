import { BodyPortal } from "../portal";
import { ComponentChildren, createContext, h, Ref, RenderableProps } from "preact";
import { useAriaDialog } from "preact-aria-widgets";
import { forwardElementRef, TransitionComponent } from "../props";
import { Fade } from "preact-transition/fade";
import "wicg-inert";

//type UseDialogTitle = Required<ReturnType<typeof useAriaDialog>["useDialogTitle"]>;

//const UseDialogTitleContext = createContext<UseDialogTitle>(null!);

export type DialogProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = TransitionComponent<T> & {
    open: boolean;
    onClose(reason: "backdrop" | "escape" | undefined): void;
    descriptive: boolean;
    title?: ComponentChildren;
    footer?: ComponentChildren;
};

export const Dialog = forwardElementRef(function Dialog<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<DialogProps<T>>, ref: Ref<HTMLDivElement>) {
    
    const { useDialogBackdrop, useDialogBody, useDialogProps, useDialogTitle } = useAriaDialog<HTMLDivElement>({ open, onClose });
    const { useModalBackdropProps } = useDialogBackdrop<HTMLDivElement>();
    const { useModalBodyProps, } = useDialogBody<HTMLDivElement>({ descriptive });
    const { useModalTitleProps } = useDialogTitle<HTMLDivElement>();

    return (
        <BodyPortal>
            <div class="modal-portal-container">
                <Fade open={open}>
                    <div {...useModalBackdropProps({ class: "modal-backdrop  backdrop-filter-transition", onPointerUp: () => onClose("backdrop") })} />
                </Fade>
                <Transition {...{ ref, open, ...rest } as any}>
                    <div {...useDialogProps({ class: "modal-dialog modal-dialog-scrollable" })}>
                        <div class="modal-content ">
                            {title != null && <div {...useModalTitleProps({ class: "modal-header" })}>
                                <h1 class="modal-title">{title}</h1>
                            </div>}
                            <div {...useModalBodyProps({ class: "modal-body" })}>
                                {children}
                            </div>
                            {footer != null && <div class="modal-footer">
                                {footer}
                            </div>}
                        </div>
                    </div>
                </Transition>
            </div>
        </BodyPortal>
    )
})
