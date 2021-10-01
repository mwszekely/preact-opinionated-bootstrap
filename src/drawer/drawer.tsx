import { h, ComponentChildren, RenderableProps } from "preact";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useRandomId } from "preact-prop-helpers/use-random-id";
import { useState } from "preact-prop-helpers/use-state";
import { useFocusTrap } from "preact-prop-helpers/use-focus-trap";
import { TransitionComponent } from "../props";
import { BodyPortal } from "../portal";
import { Fade } from "preact-transition/fade";
import { Button } from "../button";
import { useGlobalHandler } from "preact-prop-helpers";
import { useDrawer, UseDrawerParameters } from "preact-aria-widgets/use-drawer";
import { useCallback } from "preact/hooks";

export type DrawerProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = UseDrawerParameters & TransitionComponent<T> & {
    descriptive: boolean;
    title?: ComponentChildren;
};

export function Drawer<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<DrawerProps<T>>) {

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
}
