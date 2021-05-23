import clsx from "clsx";
import { h, Ref } from "preact";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { SimpleProps, SimplePropsWithExtras } from "../props-shared";
import { Dropdown as BSDropdown } from "bootstrap"
import { removeUndefinedFromObject } from "../remove-undefined";


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
    header?: boolean;
}

export interface DropdownSourcePropsMin<E extends Element> extends Pick<h.JSX.HTMLAttributes<E>, "className"> {
    boundary?: "clippingParents" | E;
    reference?: "toggle" | "parent" | { getBoundingClientRect: E["getBoundingClientRect"] }
    display?: "dynamic" | "static";
    offsetX?: number;
    offsetY?: number;
    autoClose?: true | "inner" | "outer" | false;
    ref: Ref<E>;
}


export function dropdownContainerProps({ direction, className, ...props }: DropdownContainerPropsMin) {
    return { ...props, className: clsx(`drop${direction ?? "down"}`, className) };
}

export function dropdownMenuProps({ className, align, alignMd, alignSm, alignLg, alignXl, alignXs, alignXxl, dark, ...props }: DropdownMenuPropsMin) {
    return {
        ...props,
        className: clsx(
            `dropdown-menu`,
            align == "end" && "dropdown-menu-end",
            alignXs && `dropdown-menu-xs-${alignXs}`,
            alignSm && `dropdown-menu-sm-${alignSm}`,
            alignMd && `dropdown-menu-md-${alignMd}`,
            alignLg && `dropdown-menu-lg-${alignLg}`,
            alignXl && `dropdown-menu-xl-${alignXl}`,
            alignXxl && `dropdown-menu-xxl-${alignXxl}`,
            dark && "dropdown-menu-dark", className)
    };
}
export function dropdownItemProps({ className, header, active, ...props }: DropdownItemPropsMin) {
    return { ...props, className: clsx(header? `dropdown-header` : `dropdown-item`, active && "active", className) };
}


export function useDropdownSourceProps<E extends HTMLElement>(sourceElement: E | null, { boundary, reference, display, offsetX, offsetY, autoClose, className, ...props }: DropdownSourcePropsMin<E>) {

    const [bsDropdown, setBsDropdown] = useState<BSDropdown | null>(null);
    console.log(`Dropdown: ${(!!bsDropdown).toString()}`);

    useEffect(() => {
        console.log("In effect");
        if (sourceElement) {
            console.log("Creating dropdown");
            let dropdown = new BSDropdown(sourceElement, removeUndefinedFromObject({
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
            };
        }

    }, [sourceElement, boundary, reference, display, offsetX, offsetY, autoClose]);

    return {
        ...props,
        ...{ "data-bs-toggle": "dropdown" },
        ...{ "data-bs-not-initialized": bsDropdown? "false" : "true" },
        className: clsx("dropdown-toggle", className)
    };
}