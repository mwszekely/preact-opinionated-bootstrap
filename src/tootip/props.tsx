import { useCallback, useEffect } from "preact/hooks";
import { Tooltip } from "bootstrap"
import { removeUndefinedFromObject } from "../remove-undefined";
import { useRefElement } from "preact-async-input";
import { Ref } from "preact";


export interface TooltipProps<E extends HTMLElement> {
    tooltip: string | null;
    animation?: boolean;
    container?: string | E | false;
    showDelay?: number;
    hideDelay?: number;
    html?: boolean;
    placement?: "top" | "bottom" | "left" | "right" | "auto";
    trigger?: ShowOnType;

    boundary?: "clippingParents" | E;

    className?: string;
    sanitize?: true;

    offsetX?: number;
    offsetY?: number;

    ref?: Ref<E>;
}

type ShowOnHover = "hover";
type ShowOnClick = "click";
type ShowOnFocus = "focus";

// 100% this could be better but I suck at math
type XOrY<X extends string, Y extends string> =  `${X} ${Y}` | `${Y} ${X}`;
type XOrYOrZ<X extends string, Y extends string, Z extends string> =  `${X} ${XOrY<Y, Z>}` | `${Y} ${XOrY<X, Z>}` | `${Z} ${XOrY<Y, X>}`;

type ShowOnHC = XOrY<ShowOnHover, ShowOnClick>;
type ShowOnHF = XOrY<ShowOnHover, ShowOnFocus>;
type ShowOnCF = XOrY<ShowOnClick, ShowOnFocus>;

type ShowOnHCF = XOrYOrZ<ShowOnHover, ShowOnClick, ShowOnFocus>;

type ShowOnD1 = ShowOnHover | ShowOnClick | ShowOnFocus;
type ShowOnD2 = ShowOnD1 | ShowOnHC | ShowOnHF | ShowOnCF;
type ShowOnD3 = ShowOnD2 | ShowOnHCF;
export type ShowOnType = "manual" | ShowOnD3;

const a: { [K in ShowOnType]: 0 } = {
    manual: 0,
    click: 0,
    "click focus": 0,
    "click hover": 0,
    "click focus hover": 0,
    "click hover focus": 0,

    hover: 0,
    "hover focus": 0,
    "hover click": 0,
    "hover focus click": 0,
    "hover click focus": 0,

    focus: 0,
    "focus click": 0,
    "focus hover": 0,
    "focus click hover": 0,
    "focus hover click": 0
}



/*interface TooltipPropsNever<E extends HTMLElement> extends TooltipPropsBase<E> {

    showOnHover: false;
    showOnClick: false;
    showOnFocus: false;
}


interface TooltipPropsHover<E extends HTMLElement> extends TooltipPropsBase<E> {

    showOnHover: true;
    showOnClick?: boolean;
    showOnFocus?: boolean;
}


interface TooltipPropsClick<E extends HTMLElement> extends TooltipPropsBase<E> {

    showOnHover?: boolean;
    showOnClick: true;
    showOnFocus?: boolean;
}


interface TooltipPropsFocus<E extends HTMLElement> extends TooltipPropsBase<E> {

    showOnHover?: boolean;
    showOnClick?: boolean;
    showOnFocus: true;
}*/

//export type TooltipProps<E extends HTMLElement> = (TooltipPropsNever<E> | TooltipPropsHover<E> | TooltipPropsClick<E> | TooltipPropsFocus<E>);

export function useTooltipProps<P extends TooltipProps<any>>(p: P) {

    type E = P extends TooltipProps<infer E>? E : any;

    // const { tooltip, animation, container, showDelay, hideDelay, html, placement, showOnClick, showOnFocus, showOnHover, boundary, className, sanitize, offsetX, offsetY, ...props }
    const { useRefElementProps, element } = useRefElement<E>();

    const { trigger, animation, container, html, placement, boundary, sanitize, showDelay, hideDelay, offsetX, offsetY, tooltip, ...props } = useRefElementProps(p);

    useEffect(() => {

        if (element) {

            let b = new Tooltip(element, removeUndefinedFromObject({
                animation,
                delay: { show: showDelay ?? 0, hide: hideDelay ?? 0 },
                container,
                html,
                placement,
                title: tooltip ?? undefined,


                trigger: trigger as Exclude<ShowOnType, "hover click" | "focus hover" | "focus click" | "hover click focus" | "hover focus click" | "click focus hover" | "focus click hover" | "focus hover click">,

                boundary,

                sanitize,

                offset: `${offsetX ?? 0},${offsetY ?? 0}`
            }));

            

            return () => b.dispose();
        }
    }, [tooltip, element, animation, showDelay, hideDelay, html, placement, trigger, boundary, sanitize, offsetX, offsetY])

    return {
        ...props,
        ...{ "data-bs-toggle": "tooltip" } as any,
    }




}


