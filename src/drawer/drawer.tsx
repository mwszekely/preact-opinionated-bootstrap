import { ComponentChildren, h, RenderableProps } from "preact";
import { useDrawer, UseDrawerParameters } from "preact-aria-widgets";
import { Fade } from "preact-transition/fade";
import { memo } from "preact/compat";
import { Button } from "../button";
import { BodyPortal } from "../portal";
import { TransitionComponent } from "../props";

export type DrawerProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = UseDrawerParameters & TransitionComponent<T> & {
    descriptive: boolean;
    title?: ComponentChildren;
};

export const Drawer = memo(function Drawer<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<DrawerProps<T>>) {

    const { useDrawerBackdrop, useDrawerBody, useDrawerProps, useDrawerTitle } = useDrawer<HTMLDivElement>({ open, onClose });
    const { useDrawerBackdropProps } = useDrawerBackdrop<HTMLDivElement>();
    const { useDrawerBodyProps, } = useDrawerBody<HTMLDivElement>({ descriptive });
    const { useDrawerTitleProps } = useDrawerTitle<HTMLDivElement>();


    return (
        <BodyPortal>
            <div>
                <Fade open={open}>
                    <div {...useDrawerBackdropProps({ class: "offcanvas-backdrop backdrop-filter-transition" })} />
                </Fade>
                <Transition {...{ open, ...rest } as any}>
                    <div {...useDrawerProps({ class: "offcanvas offcanvas-start", tabindex: -1 })}>
                        <div class="offcanvas-header">
                            <h5 {...useDrawerTitleProps({ class: "offcanvas-title" })}>Drawer</h5>
                            <Button tag="button" class="btn-close text-reset" aria-label="Close" onPress={() => onClose("escape")}></Button>
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
