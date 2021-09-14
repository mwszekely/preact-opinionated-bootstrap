import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaAccordion } from "preact-aria-widgets";
import { UseAriaAccordionParameters, UseAriaAccordionSection, UseAriaAccordionSectionBody, UseAriaAccordionSectionHeader, UseAriaAccordionSectionParameters } from "preact-aria-widgets/use-accordion";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useState } from "preact-prop-helpers/use-state";
import { Collapse } from "preact-transition";
import { useContext, useImperativeHandle } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, OptionalTransitionComponent } from "../props";

export interface AccordionProps extends UseAriaAccordionParameters {
    expandedIndex: number | null;
    setExpandedIndex(expandedIndex: number): (void | Promise<void>);
    children: ComponentChildren;
}


export type AccordionSectionProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = OptionalTransitionComponent<T> & UseAriaAccordionSectionParameters & GlobalAttributes<HTMLDivElement> & {
    header: ComponentChildren;

    /**
     * If 1 - 6, uses h1 - h6 as the element.
     * If higher, uses a div with aria-level.
     * 
     * Default is 2.
     */
    headerLevel?: number;

    children: ComponentChildren;
}

const UseAriaAccordionSectionContext = createContext<UseAriaAccordionSection<HTMLButtonElement>>(null!);
export const Accordion = forwardElementRef(function Accordion({ expandedIndex, setExpandedIndex, children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) {
    const { useAriaAccordionSection } = useAriaAccordion<HTMLDivElement, HTMLButtonElement>({ expandedIndex, setExpandedIndex });

    return (
        <div {...useMergedProps<HTMLDivElement>()({ ref, className: "accordian" }, props)}>
            <UseAriaAccordionSectionContext.Provider value={useAriaAccordionSection}>{children}</UseAriaAccordionSectionContext.Provider>
        </div>
    );
});

export const AccordionSection = forwardElementRef(function AccordionSection<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ index, open, header, headerLevel, children, Transition, ...props }: AccordionSectionProps<T>, ref: Ref<HTMLDivElement>) {
    const useAriaAccordionSection = useContext(UseAriaAccordionSectionContext);
    const { expanded, useAriaAccordionSectionHeader, useAriaAccordionSectionBody } = useAriaAccordionSection({ index, open });
    const { useAriaAccordionSectionHeaderProps } = useAriaAccordionSectionHeader({ tag: "button" });
    const { useAriaAccordionSectionBodyProps } = useAriaAccordionSectionBody<HTMLDivElement>();

    Transition ??= Collapse as T;

    headerLevel ??= 2;

    console.log(`${index}: ${expanded?.toString()}`)

    const headerButtonProps = useAriaAccordionSectionHeaderProps({ type: "button", class: clsx("accordion-button", !expanded ? " collapsed" : "") });
    const headerProps = ({ class: "accordion-header", children: <button {...headerButtonProps}>{header}</button> });
    const headerJsx = headerLevel >= 1 && headerLevel <= 6 ? h(`h${headerLevel}`, headerProps as any) : h("div", useMergedProps<HTMLDivElement>()(headerProps, { role: "heading", "aria-level": `${headerLevel}` }) as any);

    return (
        <div {...{ ref, class: "accordion-item" }}>
            {headerJsx}
            <Transition open={expanded} {...useAriaAccordionSectionBodyProps(useMergedProps<any>()(props, { class: "" })) as any}><div><div class="accordion-body">{children}</div></div></Transition>
        </div>
    );
})