import { ComponentChildren, createContext, Ref } from "preact";
import { Heading as BaseHeading, HeadingReset as BaseHeadingReset } from "preact-aria-widgets";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, OptionalTagSensitiveProps } from "../props";

export interface HeadingProps<E extends Element> extends OptionalTagSensitiveProps<E>, GlobalAttributes<HTMLHeadingElement> {
    heading: ComponentChildren;
    display?: DisplayHeadingType | null | undefined;
}

type DisplayHeadingType = `${"d" | "h"}${1 | 2 | 3 | 4 | 5 | 6}`;

const HeadingContext = createContext<DisplayHeadingType | null>(null);

export const HeadingReset = BaseHeadingReset;

export const Heading = memo(forwardElementRef(function Heading<E extends Element>({ tag, display, heading, children, ...rest }: HeadingProps<E>, ref?: Ref<any>) {
    const parentDisplay = useContext(HeadingContext);
    
    const usedDisplay = (display ?? `${parentDisplay == null ? "h1" :
            parentDisplay == "d6" ? "h1" :
                parentDisplay == "h6" ? "h6" :
                    parentDisplay[0] == "d" ? `${parentDisplay[0]}${(+parentDisplay[1] + 1) as 2 | 3 | 4 | 5 | 6}` as const :
                        `h1`
        }`);

    return (
        <HeadingContext.Provider value={usedDisplay}>
            <BaseHeading heading={heading} {...useMergedProps({ class: usedDisplay, ref }, rest)}>{children}</BaseHeading>
        </HeadingContext.Provider>
    )
}));
