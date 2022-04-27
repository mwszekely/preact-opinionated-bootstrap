import { createContext, createElement, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { forwardRef, memo } from "preact/compat";
import { useContext, useMemo } from "preact/hooks"
import { forwardElementRef, GlobalAttributes, OptionalTagSensitiveProps, TagSensitiveProps } from "../props";

export interface HeadingLevel {
    level: number;
    display: `${"d" | "h"}${1 | 2 | 3 | 4 | 5 | 6}` | null;
}

export interface HeadingProps<E extends Element> extends OptionalTagSensitiveProps<E>, GlobalAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6 | number;
    display?: HeadingLevel["display"] | null | undefined;
}

const HeadingContext = createContext<HeadingLevel | null>(null);

export const Heading = memo(forwardElementRef(function Heading<E extends Element>({ tag, display, level, ...rest }: HeadingProps<E>, ref?: Ref<any>) {
    const { display: parentDisplay, level: parentLevel } = (useContext(HeadingContext) ?? { level: 0, display: null });
    const usedLevel = (level ?? (parentLevel + 1));
    //const parentDisplayType = (parentDisplay?.[0] ?? "h") as "d" | "h";
    //const parentDisplayLevel = (parentDisplay?.[1] ?? 1) as 1 | 2 | 3 | 4 | 5 | 6;
    let validHeadingLevel = (usedLevel >= 1 && usedLevel <= 6)
    const usedDisplay = (display ?? `${parentDisplay == null ? "h1" :
        parentDisplay == "d6" ? "h1" :
            parentDisplay == "h6" ? "h6" :
                parentDisplay[0] == "d" ? `${parentDisplay[0]}${(+parentDisplay[1] + 1) as 2 | 3 | 4 | 5 | 6}` as const : `h1`}`);

    const element = (tag ?? (validHeadingLevel ? `h${usedLevel as 1}` : `p`) as "h1");
    let isHeadingElement = (element[0].toLowerCase() == "h") && element.length == 2;

    return (
        <HeadingContext.Provider value={useMemo(() => ({ level: usedLevel, display: usedDisplay }), [usedLevel, usedDisplay])}>
            {createElement(element as "h1", useMergedProps<any>()(rest, { ref, className: `${usedDisplay[0] == "d" ? "display-" : "h"}${usedDisplay[1]}`, role: isHeadingElement ? undefined : "heading", "aria-level": isHeadingElement ? undefined : `${level}` }))}
        </HeadingContext.Provider>
    );
}));
