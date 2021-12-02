import "wicg-inert";
import { ComponentChildren, h, Ref, RenderableProps } from "preact";
import { useAriaDialog } from "preact-aria-widgets";
import { Clip, Fade } from "preact-transition";
import { memo } from "preact/compat";
import { BodyPortal, BodyPortalRoot } from "../portal";
import { forwardElementRef, OptionalTransitionComponent } from "../props";

export type DialogProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = OptionalTransitionComponent<T> & {
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

    if (!Transition) {
        Transition = (Clip! as NonNullable<typeof Transition>);
        (rest as any).clipOriginBlock = 0;
    }

    return (
        <BodyPortal>
            <div class="modal-portal-container">
                <Fade show={open}>
                    <div {...useDialogBackdropProps({ class: "modal-backdrop backdrop-filter-transition" })} />
                </Fade>
                <Transition {...{ ref, show: open, ...rest } as any}>
                    <div {...useDialogProps({ class: "modal-dialog modal-dialog-scrollable" })}>
                        <BodyPortalRoot>
                            <Fade show={open}>
                                <div class="modal-content elevation-body-surface elevation-raised-6">
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
        </BodyPortal >
    )
}))
