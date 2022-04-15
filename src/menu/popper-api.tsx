import "./popper-config";
import { BasePlacement, createPopper, Instance, Modifier, Placement, PositioningStrategy, State, StrictModifiers } from "@popperjs/core";
import { h } from "preact";
import { LogicalDirectionInfo, useActiveElement, useGlobalHandler, useLogicalDirection, useMergedProps, usePassiveState, useRefElement, useState, useTimeout } from "preact-prop-helpers";
import { useCallback, useEffect, useMemo } from "preact/hooks";
import { ZoomFade, Clip, ClipFade, Collapse, Zoom, SlideZoom, Fade, SlideFade, CollapseFade, SlideZoomFade, Flip, Slide } from "preact-transition";

function returnNull() { return null; }

export function usePopperApi({ updating, align, side, useArrow, followMouse, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight, childSelector }: UsePopperParameters) {

    const [popperInstance, setPopperInstance, getPopperInstance] = useState<Instance | null>(null);
    const [usedSide, setUsedSide] = useState<typeof side>(side);
    const [logicalDirection, setLogicalDirection] = useState<LogicalDirectionInfo | null>(null);
    const { useLogicalDirectionProps, convertToLogicalSide, convertToPhysicalSide } = useLogicalDirection<any>({ onLogicalDirectionChange: setLogicalDirection });
    useEffect(() => { 
        resetPopperInstance(getSourceElement() as any, getPopperElement() as any); 
    }, [side, align, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight, logicalDirection]);

    useArrow ??= false;

    const [getFocusedElement, setFocusedElement] = usePassiveState<Node | null>(null, returnNull);
    const { } = useActiveElement({
        onLastActiveElementChange: useCallback((activeElement: Node | null) => {
            if (getSourceElement()?.contains(activeElement)) {
                setFocusedElement(activeElement);
                setMouseX(null);
                setMouseY(null);
            }
            else {
                setFocusedElement(null);
                if (followMouse)
                    setPositionPreference("mouse");
            }
        }, [])
    });

    const [getPositionPreference, setPositionPreference] = usePassiveState(null, useCallback(() => "element" as ("element" | "mouse"), []))
    //const [getHasMouseover, setHasMouseover] = usePassiveState(null, () => false);
    const [getMouseX, setMouseX] = usePassiveState<number | null>(useCallback(() => void (getPopperInstance()?.update()), []), returnNull);
    const [getMouseY, setMouseY] = usePassiveState<number | null>(useCallback(() => void (getPopperInstance()?.update()), []), returnNull);

    const resetPopperInstance = useCallback((sourceElement: Element | null, popperElement: HTMLElement | null) => {
        if (sourceElement && popperElement) {
            const onFirstUpdate: (arg0: Partial<State>) => void = () => { };
            const strategy: PositioningStrategy | undefined = "absolute";

            let placement: Placement// = logicalToPlacement(logicalDirection!, inlinePosition, blockPosition, positionBlock);

            // TODO: There's probably a better way to do this...
            switch (side) {
                case "block-start": {
                    placement = `${logicalDirection?.blockOrientation === "vertical" ? logicalDirection.blockDirection === "ttb" ? "top" : "bottom" : logicalDirection?.blockDirection === "ltr" ? "left" : "right"}` as const;
                    break;
                }
                case "block-end": {
                    placement = `${logicalDirection?.blockOrientation === "vertical" ? logicalDirection.blockDirection === "ttb" ? "bottom" : "top" : logicalDirection?.blockDirection === "ltr" ? "right" : "left"}` as const;
                    break;
                }
                case "inline-start": {
                    placement = `${logicalDirection?.inlineOrientation === "horizontal" ? logicalDirection.inlineDirection === "ltr" ? "left" : "right" : logicalDirection?.inlineDirection === "ttb" ? "top" : "bottom"}` as const;
                    break;
                }
                case "inline-end": {
                    placement = `${logicalDirection?.inlineOrientation === "horizontal" ? logicalDirection.inlineDirection === "ltr" ? "right" : "left" : logicalDirection?.inlineDirection === "ttb" ? "bottom" : "top"}` as const;
                    break;
                }
            }
            if (align === "center")
                placement = `${placement}`;
            else
                placement = `${placement}-${align}`;


            const virtualElement = {
                getBoundingClientRect: () => {
                    const focusedElement = getFocusedElement();

                    let sourceElement = getSourceElement();
                    if (childSelector && sourceElement)
                        sourceElement = childSelector(sourceElement);

                    let baseRect = focusedElement ? (focusedElement as Element).getBoundingClientRect?.() : sourceElement?.getBoundingClientRect();
                    let x = baseRect?.x ?? 0;
                    let y = baseRect?.y ?? 0;
                    let width = baseRect?.width ?? 0;
                    let height = baseRect?.height ?? 0;

                    let mouseX = getMouseX();
                    let mouseY = getMouseY();



                    if (followMouse && getPositionPreference() == "mouse") {

                        if (mouseX == null || mouseY == null) {
                            switch (align) {
                                case "start":
                                    mouseX = x;
                                    mouseY = y;
                                    break;
                                case "center":
                                    mouseX = (x + (width / 2));
                                    mouseY = (y + (height / 2));
                                    break;
                                case "end":
                                    mouseX = (x + width);
                                    mouseY = (y + height);
                                    break;
                            }
                        }

                        if (side === "block-start" || side === "block-end") {
                            width = 0;
                            x = mouseX;
                        }
                        else if (side === "inline-start" || side === "inline-end") {
                            height = 0;
                            y = mouseY;
                        }

                        // Clamp
                        x = Math.max(baseRect?.x ?? 0, x);
                        y = Math.max(baseRect?.y ?? 0, y);

                        x = Math.min((baseRect?.x ?? 0) + (baseRect?.width ?? 0), x);
                        y = Math.min((baseRect?.y ?? 0) + (baseRect?.height ?? 0), y);
                    }
                    else {
                        if (align === "center" && focusedElement) {
                            if (side === "block-start" || side === "block-end") {
                                x = (x + width / 2);
                                width = 0;
                            }
                            else if (side === "inline-start" || side === "inline-end") {
                                y = y + (height / 2);
                                height = 0;
                            }
                        }
                    }
                    return DOMRectReadOnly.fromRect({ x, y, width, height });
                }
            }

            setPopperInstance(createPopper<StrictModifiers>(virtualElement, popperElement, {
                modifiers: [
                    { name: "flip", options: {} },
                    { name: 'arrow', options: { element: getArrowElement(), padding: 8 } },
                    { name: 'offset', options: { offset: [skidding ?? 0, distance ?? (useArrow ? 10 : 0)] } },
                    { name: "preventOverflow", options: { padding: { bottom: (paddingBottom ?? 0), top: (paddingTop ?? 0), left: (paddingLeft ?? 0), right: (paddingRight ?? 0) } } },
                    updateStateModifier as any,
                    { name: 'eventListeners', enabled: false },
                    { name: "applyStyles", enabled: false },
                ],
                onFirstUpdate,
                placement,
                strategy
            }));
        }
    }, [followMouse, useArrow, side, align, skidding, distance, paddingTop, paddingBottom, paddingLeft, paddingRight, logicalDirection, childSelector]);

    const { getElement: getSourceElement, useRefElementProps: useSourceElementRefProps } = useRefElement<Element>({ onElementChange: useCallback((e: any) => resetPopperInstance(e, (getPopperElement as any)()!), []) } as any);
    const { getElement: getPopperElement, useRefElementProps: usePopperElementRefProps } = useRefElement<HTMLElement>({ onElementChange: useCallback((e: HTMLElement | null) => resetPopperInstance((getSourceElement as any)()!, e), []) });
    const { getElement: getArrowElement, useRefElementProps: useArrowElementRefProps } = useRefElement<Element>({});

    const [sourceStyle, setSourceStyle] = useState<Partial<Omit<CSSStyleDeclaration, typeof Symbol["iterator"]>> | null>(null);
    const [sourceAttributes, setSourceAttributes] = useState<{ [key: string]: string | boolean; }>({});

    const [popperStyle, setPopperStyle] = useState<Partial<Omit<CSSStyleDeclaration, typeof Symbol["iterator"]>> | null>(null);
    const [popperAttributes, setPopperAttributes] = useState<{ [key: string]: string | boolean; }>({});

    const [arrowStyle, setArrowStyle] = useState<Partial<Omit<CSSStyleDeclaration, typeof Symbol["iterator"]>> | null>(null);
    const [arrowAttributes, setArrowAttributes] = useState<{ [key: string]: string | boolean; }>({});



    useEffect(() => {
        if (updating) {
            let rafHandle = 0;
            function raf() {

                let p = ((closed ? Promise.resolve() : getPopperInstance()?.update()) ?? Promise.resolve());
                p.then(_ => {

                    if (rafHandle != 0) {
                        rafHandle = requestAnimationFrame(raf);
                    }
                });

            }
            rafHandle = requestAnimationFrame(raf);

            return () => {
                cancelAnimationFrame(rafHandle);
                // Single-threaded languages are nice sometimes.
                rafHandle = 0;
            };
        }
    }, [updating]);

    const updateStateModifier = useMemo(() => {
        let modifier: Modifier<"updateState", {}> = {
            name: "updateState",
            enabled: true,
            phase: "write",
            fn: ({ state, options, name, instance }) => {

                let usedPlacement = state.placement;
                if (usedPlacement.includes("-"))
                    usedPlacement = usedPlacement.substr(0, usedPlacement.indexOf("-")) as BasePlacement;



                setUsedSide(convertToLogicalSide(usedPlacement as BasePlacement));

                if (state.styles.reference)
                    setSourceStyle(state.styles.reference);
                if (state.attributes.reference)
                    setSourceAttributes(state.attributes.reference);

                if (state.styles.popper)
                    setPopperStyle(state.styles.popper);
                if (state.attributes.popper)
                    setPopperAttributes(state.attributes.popper);

                if (state.styles.arrow)
                    setArrowStyle(state.styles.arrow);
                if (state.attributes.arrow)
                    setArrowAttributes(state.attributes.arrow);

            },
            requires: ["computeStyles", "flip"]
        };

        return modifier;
    }, []);




    function usePopperSource<E extends Element>() {
        function usePopperSourceProps<P extends h.JSX.HTMLAttributes<E>>(props: P) {
            let style = { ...(sourceStyle as h.JSX.CSSProperties) };
            return useSourceElementRefProps(useMergedProps<E>()(sourceAttributes as any, useMergedProps<E>()({
                style,
                onMouseMove: !followMouse ? undefined : (e) => {
                    const { clientX, clientY } = e;
                    setMouseX(clientX);
                    setMouseY(clientY);
                    setPositionPreference("mouse")
                }
            }, ((useLogicalDirectionProps(props) as any) as h.JSX.HTMLAttributes<E>))));
        }

        return { usePopperSourceProps };

    }

    function usePopperPopup<E extends Element>({ open }: { open: boolean }) {
        function usePopperPopupProps<P extends h.JSX.HTMLAttributes<E>>(props: P) {
            let style = { ...(popperStyle as h.JSX.CSSProperties), pointerEvents: open ? undefined : "none" };
            return usePopperElementRefProps(useMergedProps<E>()({ style }, props as any) as h.JSX.HTMLAttributes<E>);
        }

        return { usePopperPopupProps };
    }

    function usePopperArrow<E extends Element>() {
        function usePopperArrowProps<P extends h.JSX.HTMLAttributes<E>>(props: P) {
            let style = { ...(arrowStyle as h.JSX.CSSProperties) };
            return useMergedProps<E>()(popperAttributes as any, useMergedProps<E>()({ style }, useArrowElementRefProps(props as any) as h.JSX.HTMLAttributes<E>));
        }

        return { usePopperArrowProps };
    }

    const axis = (side.substring(0, side.indexOf('-')) as "inline" | "block")
    const axisPosition = (side.substring(side.indexOf('-') + 1) as "start" | "end");

    const usedAxis = (usedSide.substring(0, side.indexOf('-')) as "inline" | "block")
    const usedAxisPosition = (usedSide.substring(side.indexOf('-') + 1) as "start" | "end");

    let usedSideSwapsAxes = (usedAxis !== axis);
    let usedSideFlipsAxis = (axisPosition !== usedAxisPosition);



    /**
     * Given a set of props to pass to a Transition component,
     * and a list of prop names that should be adjusted when the Popper flips,
     * swaps and flips the original prop names and their values around to match what the Popper is showing.
     * 
     * Not all props need flipping, some just need swapping
     * (swapping is when an axis changes like "inline" to "block", flipping is when a position changes like "start" to "end").
     * If a property just needs swapping, set `flipFunction` to null. Otherwise,
     * it should be a function along the lines of `n => -n`, `n => 1-n`, etc.
     * 
     * 
     * @param originalProps 
     * @param affectedProps 
     * @returns 
     */
    const flipTransformProps = <E extends ((...args: any[]) => h.JSX.Element)>(originalProps: Parameters<E>[0], affectedProps: FlippablePropInfo<E>[]): Parameters<E>[0] => {

        type T = Parameters<E>[0];

        const props = { ...originalProps };

        for (const { inline, block, flipFunction } of affectedProps) {
            if (flipFunction)
                flip(props, inline, block, flipFunction);
            swap(props, inline, block);
        }

        return props;



        function flip(props: T, inlinePropName: keyof T, blockPropName: keyof T, flipFunction: (input: number) => number) {
            if (usedSideFlipsAxis) {
                if (axis === "inline") {
                    if (props[inlinePropName] != null)
                        (props[inlinePropName] as any as number) = flipFunction(props[inlinePropName] as any as number)
                }
                else {
                    if (props[blockPropName] != null)
                        (props[blockPropName] as any as number) = flipFunction(props[blockPropName] as any as number)
                }
            }
        }

        function swap(props: T, inlinePropName: keyof T, blockPropName: keyof T) {
            if (usedSideSwapsAxes) {
                const v1 = props[inlinePropName];
                const v2 = props[blockPropName];
                props[inlinePropName] = v2;
                props[blockPropName] = v1;
            }
        };
    };

    return {
        usePopperSource,
        usePopperPopup,
        usePopperArrow,
        flipTransformProps,
        usedSide,
        usedAxis,
        usedAxisPosition,
        logicalDirection
    };

}

export interface FlippablePropInfo<T extends <E extends any>(...props: any[]) => h.JSX.Element> {

    /** The name of the prop to use for inline values */
    inline: keyof (Parameters<T>[0]);
    /** The name of the prop to use for block values */
    block: keyof (Parameters<T>[0]);

    /** 
     * When flipping along the same axis, how does the value change?
     * 
     * Generally `n => -n` or `n => 1-n`, but some props, like
     * minimum value props, don't get flipped and would just
     * pass `null` instead.
     * 
     */
    flipFunction: null | ((input: number) => number);
}



export function getDefaultFlips<T extends <E extends any>(...props: any[]) => h.JSX.Element>(Transition: T): FlippablePropInfo<T>[] {

    const FlipAngle = { inline: "flipAngleInline", block: "flipAngleBlock", flipFunction: (n: number) => -n } as const;
    const SlideTarget = { inline: "slideTargetInline", block: "slideTargetBlock", flipFunction: (n: number) => -n } as const;
    const ClipOrigin = { inline: "clipOriginInline", block: "clipOriginBlock", flipFunction: (n: number) => 1 - n } as const;
    const ClipMin = { inline: "clipMinInline", block: "clipMinBlock", flipFunction: null } as const;
    const ZoomMin = { inline: "zoomMinInline", block: "zoomMinBlock", flipFunction: null } as const;
    const ZoomOrigin = { inline: "zoomOriginInline", block: "zoomOriginBlock", flipFunction: (n: number) => 1 - n } as const;

    switch (Transition) {
        case Zoom:
        case ZoomFade:
            return [ZoomMin, ZoomOrigin] as FlippablePropInfo<any>[];

        case Clip:
        case ClipFade:
            return [ClipMin, ClipOrigin] as FlippablePropInfo<any>[];

        case Slide:
        case SlideFade:
            return [SlideTarget] as FlippablePropInfo<any>[];

        case SlideZoom:
        case SlideZoomFade:
            return [SlideTarget, ZoomMin, ZoomOrigin] as FlippablePropInfo<any>[];
        case Flip:
            return [FlipAngle] as FlippablePropInfo<any>[];

        default:
            console.warn(`An unknown Transition was provided without also providing TransitionPropFlips, so this Popper component will not animate its transitions properly when flipped.`);
            return [];
    }
}


export interface UsePopperParameters {



    // Is this a dropdown, dropleft, etc.
    side: "block-start" | "block-end" | "inline-start" | "inline-end";

    // (If a dropdown) are we left-, right-, or center-aligned?
    align: "start" | "end" | "center";

    // If true, the popper will adjust its alignment based on the mouse position.
    // It will still appear against the edge of the specified side; 
    // that axis' position will not be affected.
    followMouse?: boolean;

    // If true, the "arrow" modifier will be used and a default `distance` will be provided if none was already.
    useArrow?: boolean;

    skidding?: number;
    distance?: number;

    /**
     * Used to manually control Popper updates (instead of scroll event listeners, which can be laggy)
     */
    updating: boolean;

    paddingTop?: number;
    paddingRight?: number;
    paddingLeft?: number;
    paddingBottom?: number;

    // If given, the tooltip will react via mouseover to the entire source
    // but be limited to the child that matches the selector.
    childSelector?: (e: Element) => Element;
}

//type T = HTMLDivElement["style"];


function placementToLogical(logicalDirection: LogicalDirectionInfo, placement: BasePlacement) {
    const { blockDirection, blockOrientation, inlineDirection, inlineOrientation } = logicalDirection;

    let logical: `${"block" | "inline"}-${"start" | "end"}`;


    switch (`${inlineDirection}-${blockDirection},${placement}` as const) {

        // There's a pattern, and it could be coded as a pattern
        case "ltr-ttb,top": logical = "block-start"; break;
        case "ltr-btt,bottom": logical = "block-start"; break;
        case "rtl-ttb,top": logical = "block-start"; break;
        case "rtl-btt,bottom": logical = "block-start"; break;
        case "ttb-ltr,left": logical = "block-start"; break;
        case "btt-ltr,right": logical = "block-start"; break;
        case "ttb-rtl,left": logical = "block-start"; break;
        case "btt-rtl,right": logical = "block-start"; break;

        case "ltr-ttb,bottom": logical = "block-end"; break;
        case "rtl-ttb,bottom": logical = "block-end"; break;
        case "ltr-btt,top": logical = "block-end"; break;
        case "rtl-btt,top": logical = "block-end"; break;
        case "ttb-ltr,right": logical = "block-end"; break;
        case "ttb-rtl,right": logical = "block-end"; break;
        case "btt-ltr,left": logical = "block-end"; break;
        case "btt-rtl,left": logical = "block-end"; break;

        case "ttb-ltr,top": logical = "inline-start"; break;
        case "ttb-rtl,top": logical = "inline-start"; break;
        case "btt-ltr,bottom": logical = "inline-start"; break;
        case "btt-rtl,bottom": logical = "inline-start"; break;
        case "ltr-ttb,left": logical = "inline-start"; break;
        case "rtl-ttb,left": logical = "inline-start"; break;
        case "ltr-btt,right": logical = "inline-start"; break;
        case "rtl-btt,right": logical = "inline-start"; break;

        case "ttb-ltr,bottom": logical = "inline-end"; break;
        case "ttb-rtl,bottom": logical = "inline-end"; break;
        case "btt-ltr,top": logical = "inline-end"; break;
        case "btt-rtl,top": logical = "inline-end"; break;
        case "ltr-ttb,right": logical = "inline-end"; break;
        case "rtl-ttb,right": logical = "inline-end"; break;
        case "ltr-btt,left": logical = "inline-end"; break;
        case "rtl-btt,left": logical = "inline-end"; break;





        // Shouldn't happen, but here for type correctness.
        case "ttb-ttb,bottom": case "ttb-ttb,top": case "btt-btt,bottom": case "btt-btt,top":
        case "ltr-ltr,bottom": case "ltr-ltr,top": case "rtl-rtl,bottom": case "rtl-rtl,top":
        case "ttb-btt,bottom": case "btt-ttb,top": case "btt-ttb,bottom": case "ttb-btt,top":
        case "ltr-rtl,bottom": case "rtl-ltr,top": case "rtl-ltr,bottom": case "ltr-rtl,top":
        case "ttb-ttb,right": case "ttb-ttb,left": case "btt-btt,right": case "btt-btt,left":
        case "ltr-ltr,right": case "ltr-ltr,left": case "rtl-rtl,right": case "rtl-rtl,left":
        case "ttb-btt,right": case "btt-ttb,left": case "btt-ttb,right": case "ttb-btt,left":
        case "ltr-rtl,right": case "rtl-ltr,left": case "rtl-ltr,right": case "ltr-rtl,left":
            debugger;
            logical = logical!;
            break;
    }

    return logical;
}


export function useShouldUpdatePopper(open: boolean) {
    // Since scroll events are asynchronous, especially on iOS devices,
    // just manually adjust the position of the popper for a bit
    // any time basically any user interaction happens.
    const [updatingForABit, setUpdatingForABit] = useState(0);
    useTimeout({ callback: () => { setUpdatingForABit(0); }, timeout: 100, triggerIndex: updatingForABit });

    let onInteraction: ((() => void) | null) = useCallback(() => { setUpdatingForABit(u => ++u) }, [closed]);
    if (!open)
        onInteraction = null;

    useGlobalHandler(document, "keydown", onInteraction, { passive: true, capture: true });
    useGlobalHandler(window, "click", onInteraction, { passive: true, capture: true });
    useGlobalHandler(window, "scroll", open ? onInteraction : null, { passive: true, capture: true });
    useGlobalHandler(window, "pointermove", open ? onInteraction : null, { passive: true, capture: true });
    useGlobalHandler(window, "resize", open ? onInteraction : null, { passive: true, capture: true });

    return { shouldUpdate: !!updatingForABit, onInteraction };

}



/**
 * Handle the e.g. zoomOriginDynamic props, to turn them into zoomOriginInline or zoomOriginBlock as appropriate.
 * TODO: Right now, all *Dynamic props are just handled as 1 - prop. Some probably need to be -1 * prop though.
 */
export function fixProps<P extends {}>(logicalDirection: LogicalDirectionInfo, requestedPlacement: `${"block" | "inline"}-${"start" | "end"}`, usedPlacement: BasePlacement, props: P) {
    let logicalSnake = placementToLogical(logicalDirection, usedPlacement);

    let propAxis: `${"Block" | "Inline"}`;
    let reverse: boolean;
    switch (logicalSnake) {
        case "block-start": propAxis = "Block"; reverse = (requestedPlacement == "block-end"); break;
        case "block-end": propAxis = "Block"; reverse = (requestedPlacement == "block-start"); break;
        case "inline-start": propAxis = "Inline"; reverse = (requestedPlacement == "inline-end"); break;
        case "inline-end": propAxis = "Inline"; reverse = (requestedPlacement == "inline-start"); break;
    }

    let newProps = { ...props };
    for (let propName in props) {
        if (propName.endsWith("Dynamic") && typeof (props as any)[propName] === "number") {
            let newPropName = `${propName.substr(0, propName.indexOf("Dynamic"))}${propAxis}`;
            newProps[newPropName as keyof typeof newProps] = (!reverse ? newProps[propName] : 1 - (newProps[propName as keyof typeof newProps] as any as number)) as any;
            delete newProps[propName];
        }
    }

    return newProps;
}
