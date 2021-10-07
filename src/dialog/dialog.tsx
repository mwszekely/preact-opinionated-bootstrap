import "wicg-inert";
import { ComponentChildren, h, Ref, RenderableProps } from "preact";
import { useAriaDialog } from "preact-aria-widgets";
import { Fade } from "preact-transition/fade";
import { memo } from "preact/compat";
import { BodyPortal } from "../portal";
import { forwardElementRef, TransitionComponent } from "../props";

export type DialogProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = TransitionComponent<T> & {
    open: boolean;
    onClose(reason: "backdrop" | "escape" | undefined): void;
    descriptive: boolean;
    title?: ComponentChildren;
    footer?: ComponentChildren;
};

export const Dialog = memo(forwardElementRef(function Dialog<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<DialogProps<T>>, ref: Ref<HTMLDivElement>) {

    const { useDialogBackdrop, useDialogBody, useDialogProps, useDialogTitle } = useAriaDialog<HTMLDivElement>({ open, onClose });
    const { useDialogBackdropProps } = useDialogBackdrop<HTMLDivElement>();
    const { useDialogBodyProps, } = useDialogBody<HTMLDivElement>({ descriptive });
    const { useDialogTitleProps } = useDialogTitle<HTMLDivElement>();

    return (
        <BodyPortal>
            <div class="modal-portal-container">
                <Fade open={open}>
                    <div {...useDialogBackdropProps({ class: "modal-backdrop  backdrop-filter-transition" })} />
                </Fade>
                <Transition {...{ ref, open, ...rest } as any}>
                    <div {...useDialogProps({ class: "modal-dialog modal-dialog-scrollable" })}>
                        <div class="modal-content ">
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
                    </div>
                </Transition>
            </div>
        </BodyPortal>
    )
}))
