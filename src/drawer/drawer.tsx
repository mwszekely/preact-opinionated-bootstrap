import { ComponentChildren, h, RenderableProps } from "preact";
import { useDrawer, UseDrawerParameters } from "preact-aria-widgets";
import { Slide } from "preact-transition";
import { Fade } from "preact-transition/fade";
import { memo } from "preact/compat";
import { Button } from "../button";
import { BodyPortal } from "../portal";
import { OptionalTransitionComponent } from "../props";

export type DrawerProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = UseDrawerParameters & OptionalTransitionComponent<T> & {
    descriptive: boolean;
    title?: ComponentChildren;
    closeButton?: h.JSX.Element;
};

export const Drawer = memo(function Drawer<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, closeButton, Transition, children, ...rest }: RenderableProps<DrawerProps<T>>) {

    const { useDrawerBackdrop, useDrawerBody, useDrawerProps, useDrawerTitle } = useDrawer<HTMLDivElement>({ open, onClose });
    const { useDrawerBackdropProps } = useDrawerBackdrop<HTMLDivElement>();
    const { useDrawerBodyProps, } = useDrawerBody<HTMLDivElement>({ descriptive });
    const { useDrawerTitleProps } = useDrawerTitle<HTMLDivElement>();

    if (!Transition) {
        Transition = Slide as NonNullable<typeof Transition>;
        (rest as any).slideTargetInline = -1;
    }

    return (
        <BodyPortal>
            <div>
                <Fade show={open}>
                    <div {...useDrawerBackdropProps({ class: "offcanvas-backdrop backdrop-filter-transition" })} />
                </Fade>
                <Transition {...{ show: open, ...rest } as any}>
                    <div {...useDrawerProps({ class: "offcanvas offcanvas-start elevation-raised-5 elevation-body-surface", tabindex: -1 })}>
                        <div class="offcanvas-header">
                            <h5 {...useDrawerTitleProps({ class: "offcanvas-title" })}>Drawer</h5>
                            {closeButton ?? <Button tag="button" class="btn-close text-reset" aria-label="Close" onPress={() => onClose("escape")}></Button>}
                        </div>
                        <div {...useDrawerBodyProps({ class: "offcanvas-body" })}>
                            {children}
                        </div>
                    </div>
                </Transition>
            </div >
        </BodyPortal >
    )
});
