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

export type OffcanvasProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = UseAriaOffcanvasParameters & TransitionComponent<T> & {
    descriptive: boolean;
    title?: ComponentChildren;
};

export interface UseAriaOffcanvasParameters {
    open: boolean;
    onClose(reason: "backdrop" | "escape" | undefined): void;
}

export function useAriaOffcanvas<OffcanvasElement extends HTMLElement>({ open, onClose }: UseAriaOffcanvasParameters) {


    const [offcanvasDescribedByBody, setOffcanvasDescribedByBody] = useState(false);

    const { id: offcanvasId, useRandomIdProps: useOffcanvasIdProps, useReferencedIdProps: useOffcanvasReferencingIdProps } = useRandomId({ prefix: "aria-offcanvas-" });
    const { id: bodyId, useRandomIdProps: useBodyIdProps, useReferencedIdProps: useBodyReferencingIdProps } = useRandomId({ prefix: "aria-offcanvas-body-" });
    const { id: titleId, useRandomIdProps: useTitleIdProps, useReferencedIdProps: useTitleReferencingIdProps } = useRandomId({ prefix: "aria-offcanvas-title-" });

    useGlobalHandler(window, "mousedown", (e) => {
        if (!(offcanvasId && e.target instanceof Element && document.getElementById(offcanvasId)?.contains(e.target))) {
            onClose("backdrop");
        }
    }, { capture: true })

    const onKeyDown: h.JSX.EventHandler<h.JSX.TargetedKeyboardEvent<Element>> = (e) => {
        if (e.key === "Escape") {
            onClose("escape");
        }
    }


    const useOffcanvasBackdrop = function <BackdropElement extends HTMLElement>() {

        //const onClick: h.JSX.EventHandler<h.JSX.TargetedEvent<BackdropElement>> = e => onClose("escape");
        function useOffcanvasBackdropProps<P extends h.JSX.HTMLAttributes<BackdropElement>>(props: P) {
            return useMergedProps<BackdropElement>()({  }, props);
        }

        return { useOffcanvasBackdropProps }
    }

    const useOffcanvasProps = function <P extends h.JSX.HTMLAttributes<OffcanvasElement>>({ "aria-modal": ariaModal, role, ...p0 }: P) {
        const { useFocusTrapProps } = useFocusTrap<OffcanvasElement>({ trapActive: open });
        const p1 = useTitleReferencingIdProps("aria-labelledby")(p0);
        const p2 = useOffcanvasIdProps(p1);
        const pFinal = useBodyReferencingIdProps("aria-describedby")(p2);
        return useFocusTrapProps(useMergedProps<OffcanvasElement>()({ role: "offcanvas", onKeyDown }, offcanvasDescribedByBody ? pFinal : p2));
    }

    function useOffcanvasTitle<TitleElement extends Element>() {

        const useOffcanvasTitleProps = function <P extends h.JSX.HTMLAttributes<TitleElement>>(props: P) {
            return useTitleIdProps(props);
        }

        return { useOffcanvasTitleProps };
    }

    function useOffcanvasBody<BodyElement extends Element>({ descriptive }: { descriptive: boolean }) {
        setOffcanvasDescribedByBody(descriptive);

        const useOffcanvasBodyProps = function <P extends h.JSX.HTMLAttributes<BodyElement>>(props: P) {
            return useBodyIdProps(props);
        }

        return { useOffcanvasBodyProps };
    }



    return {
        useOffcanvasProps,
        useOffcanvasTitle,
        useOffcanvasBody,
        useOffcanvasBackdrop
    }
}

export function Offcanvas<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ onClose, open, descriptive, title, footer, Transition, children, ...rest }: RenderableProps<OffcanvasProps<T>>) {

    const { useOffcanvasBackdrop, useOffcanvasBody, useOffcanvasProps, useOffcanvasTitle } = useAriaOffcanvas<HTMLDivElement>({ open, onClose });
    const { useOffcanvasBackdropProps } = useOffcanvasBackdrop<HTMLDivElement>();
    const { useOffcanvasBodyProps, } = useOffcanvasBody<HTMLDivElement>({ descriptive });
    const { useOffcanvasTitleProps } = useOffcanvasTitle<HTMLDivElement>();


    return (
        <BodyPortal>
            <div>
                <Fade open={open}>
                    <div {...useOffcanvasBackdropProps({ class: "offcanvas-backdrop backdrop-filter-transition" })} />
                </Fade>
                <Transition {...{ open, ...rest } as any}>
                    <div {...useOffcanvasProps({ class: "offcanvas offcanvas-start", tabindex: -1 })}>
                        <div class="offcanvas-header">
                            <h5 {...useOffcanvasTitleProps({ class: "offcanvas-title" })}>Offcanvas</h5>
                            <Button tag="button" class="btn-close text-reset" aria-label="Close" onClick={() => onClose("escape")}></Button>
                        </div>
                        <div {...useOffcanvasBodyProps({ class: "offcanvas-body" })}>
                            Content for the offcanvas goes here.You can place just about any Bootstrap component or custom elements here.
                        </div>
                    </div>
                </Transition>
            </div >
        </BodyPortal >
    )
}