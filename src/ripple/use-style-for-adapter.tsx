


import { h, RefObject } from "preact";
import { VeryCommonHTMLAttributes } from "preact-async-input/src/prop-types";
import { useCallback, useRef } from "preact/hooks";

const styleMap: { [K: string]: keyof h.JSX.CSSProperties } = {
    "max-height": "maxHeight",
    "transform-origin": "transformOrigin",
    "flex-basis": "flexBasis",
};

function mapPropName(propName: string) {
    let mappedName = styleMap[propName];
    if (mappedName == null && !propName.startsWith("-") && propName.indexOf("-") != -1)
        debugger;

    return mappedName || propName;
}

// Given a DOM element whose style we should manually manipulate outside of Preact's control
// and some props that you were going to pass to that element anyway that may or may not include a style
// this hook returns functions that will allow you to modify HTML elements' CSS styles without changing any state.
export function useStyleForAdapter<E extends HTMLElement>(element: E | null) {

    const styleRef = useRef<h.JSX.CSSProperties>({});
    

    const setStyleProperty = useCallback((varName: string, value: any) => {
        if (value == "")
            value = "unset";

        element?.style.setProperty(varName, value);
            if (styleRef.current) {

                styleRef.current[mapPropName(varName) as keyof h.JSX.CSSProperties] = value;
            }
        
    }, [element]);

    const removeStyleProperty = useCallback((varName: string) => {
        element?.style.removeProperty(varName);

            if (styleRef.current)
                delete styleRef.current[mapPropName(varName) as keyof h.JSX.CSSProperties];
        

    }, [element]);

    const useStyleProps = useCallback(<P extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonHTMLAttributes>>({ style, ...props }: P) => {

        return {
            ...props,
            style: (typeof style == "string")? `${style};${Object.entries(styleRef.current).map(([propName, value]) => `${propName}:${value}`).join(";")}` : {
                ...styleRef.current,
                ...style
            }
        }
    }, []);


    return { setStyleProperty, removeStyleProperty, useStyleProps };

}

