import clsx from "clsx";
import { h, Ref } from "preact";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { SimpleProps, SimplePropsWithExtras } from "../props-shared";
import { removeUndefinedFromObject } from "../remove-undefined";
import { createPopper, Instance } from "@popperjs/core"
import { useOnClickOnLocation, useOnEscapeKey } from "../dialog/utility";
import { usePopper } from "./popper";
import { useMergedProps } from "../merge-props";
import { useArrowKeyNavigatableProps } from "./utility"


/*export interface DropdownSourcePropsMin<E extends HTMLElement> {
    ref: Ref<E>;
}*/

export interface DropdownContainerPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
    direction?: "down" | "up" | "start" | "end";
}

export interface DropdownMenuPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
    align?: "start" | "end";
    alignXs?: "start" | "end";
    alignSm?: "start" | "end";
    alignMd?: "start" | "end";
    alignLg?: "start" | "end";
    alignXl?: "start" | "end";
    alignXxl?: "start" | "end";
    dark?: boolean;
}

export interface DropdownItemPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
    active?: boolean;
    id: string;
    index: number;
    tabIndex?: number;
}

export interface DropdownHeaderPropsMin extends Pick<h.JSX.HTMLAttributes<HTMLElement>, "className"> {
}

export interface DropdownSourcePropsMin<E extends Element> extends Pick<h.JSX.HTMLAttributes<E>, "className"> {
    boundary?: "clippingParents" | E;
    reference?: "toggle" | "parent" | { getBoundingClientRect: E["getBoundingClientRect"] }
    display?: "dynamic" | "static";
    offsetX?: number;
    offsetY?: number;
    //autoClose?: true | "inside" | "outside" | false;
    onClose(reason: "escape" | "inner" | "outer"): void;
    direction?: "down" | "up" | "start" | "end";
    style?: Partial<h.JSX.CSSProperties>;
    ref: Ref<E>;
}


export function useDropdownContainerProps<P extends DropdownContainerPropsMin>({ direction, ...props }: P) {
    return useMergedProps({ className: `drop${direction ?? "down"}` }, props);
}

export function dropdownMenuProps<P extends DropdownMenuPropsMin>({ align, alignMd, alignSm, alignLg, alignXl, alignXs, alignXxl, dark, ...props }: P) {
    return useMergedProps({
        className: clsx(
            `dropdown-menu`,
            align == "end" && "dropdown-menu-end",
            alignXs && `dropdown-menu-xs-${alignXs}`,
            alignSm && `dropdown-menu-sm-${alignSm}`,
            alignMd && `dropdown-menu-md-${alignMd}`,
            alignLg && `dropdown-menu-lg-${alignLg}`,
            alignXl && `dropdown-menu-xl-${alignXl}`,
            alignXxl && `dropdown-menu-xxl-${alignXxl}`,
            dark && "dropdown-menu-dark")
    }, props);
}
export function useDropdownItemProps<P extends DropdownItemPropsMin>({ active, tabIndex, ...props }: P) {
    return useArrowKeyNavigatableProps(useMergedProps({ className: clsx(`dropdown-item`, active && "active", tabIndex) }, props));
}

export function useDropdownHeaderProps<P extends DropdownItemPropsMin>(props: P) {
    return (useMergedProps({ className: clsx(`dropdown-header`) }, props));
}




/*
export function useDropdownSourceProps<P extends DropdownSourcePropsMin<any>>(sourceElement: (P extends DropdownSourcePropsMin<infer E>? E : HTMLElement) | null, { style, direction, boundary, reference, display, offsetX, offsetY, onClose, className, ...props }: P) {

    //const [bsDropdown, setBsDropdown] = useState<BSDropdown | null>(null);

    //console.log(`Dropdown: ${(!!bsDropdown).toString()}`);
    //const [popper, setPopper] = useState<Instance | null>(null);

    const menuContainer = (sourceElement as HTMLElement)?.nextElementSibling as HTMLElement;

    useOnEscapeKey(sourceElement, (location, e) => { if (location == "inner") onClose("escape") });
    useOnEscapeKey(menuContainer, (location, e) => { if (location == "inner") onClose("escape") });
    useOnClickOnLocation(menuContainer, (location, e) => { onClose(location); });

    const usePopperResult = usePopper(sourceElement ?? undefined, menuContainer, {
        placement: _getPlacement(direction ?? "down"),
        modifiers: [{
            name: 'preventOverflow',
            options: { boundary: boundary ?? "clippingParents" }
        },{
            name: 'eventListeners',
            options: { scroll: true, resize: true }
        },
        {
            name: 'offset',
            options: {
                offset: [offsetX, offsetY]
            }
        }]
    });

    const { attributes: { popper: popperAttributes }, styles: { popper: popperStyles } } = usePopperResult;

   /* useEffect(() => {
        console.log("In effect");
        if (sourceElement) {
            console.log("Creating dropdown");
            debugger;
            //const parentContainer = sourceElement.parentElement as HTMLElement;
            const menuElement = sourceElement.nextElementSibling as HTMLElement;

            const p = createPopper(sourceElement!, menuElement, {
                placement: _getPlacement(direction ?? "down"),
                modifiers: [{
                    name: 'preventOverflow',
                    options: { boundary }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [offsetX, offsetY]
                    }
                }]
            });

            setPopper(p);

            //p.setOptions({})
            return () => { setPopper(null); p.destroy(); }
            /*let dropdown = new BSDropdown(sourceElement, removeUndefinedFromObject({
                boundary,
                reference: reference as any,
                display,
                offset: `${offsetX ?? 0},${offsetY ?? 0}`,

                autoClose: (autoClose ?? true)
            }));

            setBsDropdown(dropdown);


            return () => {
                console.log("Destroying dropdown")
                dropdown.hide();
                dropdown.dispose();


                setBsDropdown(null);
            };*\/
        }

    }, [sourceElement, boundary, reference, display, offsetX, offsetY]);*/

/*useEffect(() => {
    if (sourceElement && popper) {
        popper.setOptions({
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [offsetX ?? 0, offsetY ?? 0]
                }
            }]
        });
    }
}, [popper, sourceElement, offsetX, offsetY]);

useEffect(() => {
    if (popper) {
        popper.setOptions({
            placement: _getPlacement(direction ?? "down")
        });
    }
}, [popper, direction]);*\/

return {
    //...popperAttributes,
    sourceProps: {

        ...props,
        style: {...popperStyles, ...style },
        //...{ "data-bs-toggle": "dropdown" },
        className: clsx("dropdown-toggle", className)
    },
    menuProps: {
        style: popperStyles
    }
};
}*/