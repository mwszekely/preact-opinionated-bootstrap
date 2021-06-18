import { useCallback, useEffect } from "preact/hooks";
// @ts-ignore
//import { Tooltip } from "bootstrap"
import { removeUndefinedFromObject } from "../remove-undefined";
import { useRefElement } from "preact-async-input";
import { ComponentChildren, Ref } from "preact";
import { usePopper } from "../dropdown/popper"


export interface TooltipPropsMin<E extends HTMLElement> {
  //animation?: boolean;
  //container?: string | E | false;
  showDelay?: number;
  hideDelay?: number;
  //html?: boolean;
  //attachment?: "top" | "bottom" | "start" | "end" | "auto";
  placement?: "auto" | AllPopoverPlacementCombinations;
  trigger?: ShowOnType;

  boundary?: "clippingParents" | HTMLElement;

  className?: string;

  offsetX?: number;
  offsetY?: number;

  ref?: Ref<E>;
}

type ShowOnHover = "hover";
type ShowOnClick = "click";
type ShowOnFocus = "focus";

// 100% this could be better but I suck at math
type XOrY<X extends string, Y extends string> = `${X} ${Y}` | `${Y} ${X}`;
type XOrYOrZ<X extends string, Y extends string, Z extends string> = `${X} ${XOrY<Y, Z>}` | `${Y} ${XOrY<X, Z>}` | `${Z} ${XOrY<Y, X>}`;

type ShowOnHC = XOrY<ShowOnHover, ShowOnClick>;
type ShowOnHF = XOrY<ShowOnHover, ShowOnFocus>;
type ShowOnCF = XOrY<ShowOnClick, ShowOnFocus>;

type ShowOnHCF = XOrYOrZ<ShowOnHover, ShowOnClick, ShowOnFocus>;

type ShowOnD1 = ShowOnHover | ShowOnClick | ShowOnFocus;
type ShowOnD2 = ShowOnD1 | ShowOnHC | ShowOnHF | ShowOnCF;
type ShowOnD3 = ShowOnD2 | ShowOnHCF;
export type ShowOnType = "manual" | Permute<["focus", "click", "hover"]> | Permute<["focus", "hover"]> | Permute<["focus", "click"]> | Permute<["click", "hover"]> | Permute<["click", "focus"]> | Permute<["hover", "click"]> | Permute<["hover", "focus"]> | "hover" | "focus" | "click";

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


type FilterTypeFromTuple<T extends unknown[], UnwantedType> = T extends [] ? [] :
  T extends [infer H, ...infer R] ?
  H extends UnwantedType ? FilterTypeFromTuple<R, UnwantedType> : [H, ...FilterTypeFromTuple<R, UnwantedType>] : T;
/*
type TupleToString1<T extends string[]> = `${T extends [infer U] ? U : ""}`;
type TupleToString2<T extends string[]> = `${T extends [infer U, ...any] ? U : ""} ${T extends [any, infer U] ? U : ""}`;
type TupleToString3<T extends string[]> = `${T extends [infer U, ...any] ? U : ""} ${T extends [any, infer U, ...any] ? U : ""} ${T extends [any, any, infer U] ? U : ""}`;
type TupleToString4<T extends string[]> = `${T extends [infer U, ...any] ? U : ""} ${T extends [any, infer U, ...any] ? U : ""} ${T extends [any, any, infer U, ...any] ? U : ""} ${T extends [any, any, any, infer U] ? U : ""}`;
type TupleToString<T extends string[]> =
    T extends { length: 1 } ? TupleToString1<T> :
    T extends { length: 2 } ? TupleToString2<T> :
    T extends { length: 3 } ? TupleToString3<T> : TupleToString4<T>;*/

//type TupleToString1<T1 extends string> = `${T1}`;
//type TupleToString2<T1 extends string, T2 extends string> = `${T1} ${T2}`;
//type TupleToString3<T1 extends string, T2 extends string, T3 extends string> = `${T1} ${T2}`;
//type TupleToString4<T1 extends string, T2 extends string, T3 extends string, T4 extends string> = `${T1} ${T2} ${T3} ${T4}`;

//type AttachmentSides = 'top' | 'end' | 'bottom' | 'start';

type PermuteHelper<FirstSide extends string, RemainingSides extends string[]> = RemainingSides extends { length: 0 } ? `${FirstSide}` : `${FirstSide} ${Permute<RemainingSides>}`

type Permute1<Sides extends string[]> = `${PermuteHelper<Sides[0], FilterTypeFromTuple<Sides, Sides[0]>>}`;
type Permute2<Sides extends string[]> = `${PermuteHelper<Sides[0], FilterTypeFromTuple<Sides, Sides[0]>>}` | `${PermuteHelper<Sides[1], FilterTypeFromTuple<Sides, Sides[1]>>}`;
type Permute3<Sides extends string[]> = `${PermuteHelper<Sides[0], FilterTypeFromTuple<Sides, Sides[0]>>}` | `${PermuteHelper<Sides[1], FilterTypeFromTuple<Sides, Sides[1]>>}` | `${PermuteHelper<Sides[2], FilterTypeFromTuple<Sides, Sides[2]>>}`;
type Permute4<Sides extends string[]> = `${PermuteHelper<Sides[0], FilterTypeFromTuple<Sides, Sides[0]>>}` | `${PermuteHelper<Sides[1], FilterTypeFromTuple<Sides, Sides[1]>>}` | `${PermuteHelper<Sides[2], FilterTypeFromTuple<Sides, Sides[2]>>}` | `${PermuteHelper<Sides[3], FilterTypeFromTuple<Sides, Sides[3]>>}`;

type Permute<Sides extends string[]> =
  Sides extends { length: 0 } ? "" :
  Sides extends { length: 1 } ? Permute1<Sides> :
  Sides extends { length: 2 } ? Permute2<Sides> :
  Sides extends { length: 3 } ? Permute3<Sides> :
  Sides extends { length: 4 } ? Permute4<Sides> :
  "";
//PermuteHelper<Sides[number], Sides extends [any, ...infer R]? R : []>

type AllAttachmentSideCombinations1 = Permute<["top"]> | Permute<["bottom"]> | Permute<["start"]> | Permute<["end"]>;
type AllAttachmentSideCombinations2 =
  Permute<["top", "bottom"]> | Permute<["top", "end"]> | Permute<["top", "start"]> |
  Permute<["bottom", "top"]> | Permute<["bottom", "end"]> | Permute<["bottom", "start"]> |
  Permute<["start", "bottom"]> | Permute<["start", "end"]> | Permute<["start", "top"]> |
  Permute<["end", "bottom"]> | Permute<["end", "top"]> | Permute<["end", "start"]>
  ;
type AllAttachmentSideCombinations3 = Permute<["bottom", "start", "end"]> | Permute<["top", "start", "end"]> | Permute<["top", "bottom", "end"]> | Permute<["top", "bottom", "start"]>;
type AllAttachmentSideCombinations4 = Permute<["top", "bottom", "start", "end"]>;

export type AllTooltipPlacementCombinations = AllAttachmentSideCombinations1 | AllAttachmentSideCombinations2;
export type AllPopoverPlacementCombinations = AllAttachmentSideCombinations1 | AllAttachmentSideCombinations2 | AllAttachmentSideCombinations3 | AllAttachmentSideCombinations4;

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
/*
export function useTooltipProps<P extends TooltipPropsMin<any>>(p: P) {

    type E = P extends TooltipPropsMin<infer E>? E : any;

    // const { tooltip, animation, container, showDelay, hideDelay, html, placement, showOnClick, showOnFocus, showOnHover, boundary, className, sanitize, offsetX, offsetY, ...props }
    const { useRefElementProps, element } = useRefElement<E>();

    const { trigger, placement, boundary, showDelay, hideDelay, offsetX, offsetY, tooltip, ...props } = useRefElementProps(p);



    const { attributes: { popper: popperAttributes }, styles: { popper: popperStyles }, forceUpdate: forcePopperUpdate } = usePopper(sourceElement ?? undefined, menuContainer, {
        placement: attachment,
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: this._config.fallbackPlacements
            }
          },
          {
            name: 'offset',
            options: {
              offset: this._getOffset()
            }
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: this._config.boundary
            }
          },
          {
            name: 'arrow',
            options: {
              element: `.${this.constructor.NAME}-arrow`
            }
          },
          {
            name: 'onChange',
            enabled: true,
            phase: 'afterWrite',
            fn: data => this._handlePopperPlacementChange(data)
          }
        ],
        onFirstUpdate: data => {
          if (data.options.placement !== data.placement) {
            this._handlePopperPlacementChange(data)
          }
        }
      });

    /*useEffect(() => {

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
    }, [tooltip, element, animation, showDelay, hideDelay, html, placement, trigger, boundary, sanitize, offsetX, offsetY])*_/

    const {} = usePopper(element, )

    return {
        ...props,
        ...{ "data-bs-toggle": "tooltip" } as any,
    }




}*/


