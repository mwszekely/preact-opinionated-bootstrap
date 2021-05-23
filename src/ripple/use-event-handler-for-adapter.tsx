import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";
import { EventType, SpecificEventListener } from '@material/base/types';
import { h } from "preact";
import { useStableCallback } from "preact-async-input";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";

const handlerMap //:{ [K in EventType]: keyof h.JSX.DOMAttributes<HTMLElement> } 
    = {
        dblclick: "onDblClick",
        contextmenu: "onContextMenu",
        drag: "onDrag",
        dragenter: "onDragEnter",
        dragend: "onDragEnd",
        dragexit: "onDragExit",
        dragleave: "onDragLeave",
        dragover: "onDragOver",
        dragstart: "onDragStart",
        drop: "onDrop",
        focusin: "onfocusin" as any as "onFocus",
        focusout: "onfocusout" as any as "onBlur",
        focus: "onFocus",
        blur: "onBlur",
        mouseenter: "onMouseEnter",
        mouseleave: "onMouseLeave",
        mousemove: "onMouseMove",
        mouseout: "onMouseOut",
        mouseover: "onMouseOut",
        click: 'onClick',
        abort: 'onAbort',
        animationend: "onAnimationEnd",
        animationstart: "onAnimationStart",
        touchstart: "onTouchStart",
        touchend: "onTouchEnd",
        touchcancel: "onTouchCancel",
        touchmove: "onTouchMove",
        pointerdown: "onPointerDown",
        pointerup: "onPointerUp",
        keydown: "onKeyDown",
        keyup: "onKeyUp",
        mousedown: "onMouseDown",
        mouseup: "onMouseUp",
        transitionend: "onTransitionEnd",
        input: "onInput",
        change: "onChange",
        scroll: "onScroll",
        pointermove: "onPointerMove",
        pointercancel: "onPointerCancel",
        pointerenter: "onPointerEnter",
        pointerleave: "onPointerLeave",
        pointerout: "onPointerOut",
        pointerover: "onPointerOver"

    } as const



export interface FoundationEventHandlers {
    registerEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    deregisterEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    useEventHandler<K extends EventType>(evtType: K, handler: null | SpecificEventListener<K>): void;
}


/**
 * 
 * Allows for event handlers to be added to a set of props remotely
 * 
 * @param propsToMutate The props that you were originally going to pass to some HTML element. This function will modify those props and merge any handlers inside.
 */
export function useEventHandlerForAdapter<E extends Element>(element: E | null) {


    const registeredEvents = useRef<{ [K in EventType]?: Set<h.JSX.EventHandler<h.JSX.TargetedEvent>> }>({});
    const [updateIndex, setUpdateIndex] = useState(1);

    const registerEventHandler = useCallback(function registerEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
        if (!registeredEvents.current[evtType])
            registeredEvents.current[evtType] = new Set();

        registeredEvents.current[evtType]!.add(handler as any);
        setUpdateIndex(i => ++i);
    }, [registeredEvents, setUpdateIndex]);

    const deregisterEventHandler = useCallback(function deregisterEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
        if (registeredEvents.current[evtType]) {
            registeredEvents.current[evtType]!.delete(handler as any);
        }

        setUpdateIndex(i => ++i);
    }, [registeredEvents, setUpdateIndex]);

    

    const useEventHandlerProps = useCallback(<P extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes>>(p: P) => {

        let propsToMutate = {
            ...p
        };

        for (let eventType in registeredEvents.current) {
            let camelCaseName = handlerMap[eventType as keyof typeof handlerMap] as keyof P;

            if (camelCaseName) {
                let mdcHandlers = registeredEvents.current[eventType as EventType];
                let userSuppliedHandler = propsToMutate[camelCaseName];

                propsToMutate[camelCaseName as keyof P] = ((e: Event) => {
                    let allHandlers = [userSuppliedHandler, ...Array.from(mdcHandlers ?? [])].reverse();

                    let restIndex = 0;
                    while (!e.defaultPrevented && restIndex < allHandlers.length) {
                        let nextHandler = allHandlers[restIndex] as ((e: Event) => void);
                        if (nextHandler) {
                            //const f = nextHandler.bind(e.currentTarget);
                            (nextHandler as any)(e);
                        }
                        ++restIndex;
                    }
                }) as any
            }
            else {
                console.error(`Unknown event type ${eventType}`);
                alert(`Unknown event type ${eventType}`)
            }
        }

        return propsToMutate;
    }, [])


    return {
        registerEventHandler: element? registerEventHandler : null,
        deregisterEventHandler: element? deregisterEventHandler : null,

        useEventHandlerProps
    }

}




