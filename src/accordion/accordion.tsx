import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { Collapse } from "preact-transition";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, OptionalTransitionComponent, useLogRender, useDocument, useWindow } from "../props";
import { Accordion as BaseAccordion, AccordionSection as BaseAccordionSection, defaultRenderAccordionSection } from "preact-aria-widgets"

export interface AccordionProps {
    expandedIndex: number | null;
    setExpandedIndex(expandedIndex: number): (void | Promise<void>);
    children: ComponentChildren;
}


export type AccordionSectionProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> = OptionalTransitionComponent<T> & GlobalAttributes<HTMLDivElement> & {
    header: ComponentChildren;

    disabled?: boolean;
    index: number;
    open?: boolean;

    /**
     * If 1 - 6, uses h1 - h6 as the element.
     * If higher, uses a div with aria-level.
     * 
     * Default is 2.
     */
    headerLevel?: number;

    children: ComponentChildren;
}


export const Accordion = memo(forwardElementRef(function Accordion({ expandedIndex, setExpandedIndex, children, ...props }: AccordionProps, ref: Ref<HTMLDivElement>) {
    useLogRender("Accordion", `Rendering Accordion`);


    return (
        <BaseAccordion render={(_unused) => <div {...useMergedProps<HTMLDivElement>({ ref, className: "accordion", children }, props)} />} />
    );
}));


export const AccordionSection = memo(forwardElementRef(function AccordionSection<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ index, open, header, headerLevel, children, disabled, Transition, ...props }: AccordionSectionProps<T>, ref: Ref<HTMLDivElement>) {
    useLogRender("AccordionSection", `Rendering AccordionSection #${index}`);


    Transition ??= Collapse as T;

    headerLevel ??= 2;


    return (
        <div class="accordion-item">
            <BaseAccordionSection
                getDocument={useDocument()}
                getWindow={useWindow()}
                index={index}
                render={defaultRenderAccordionSection<HTMLHeadingElement, HTMLButtonElement, HTMLDivElement>({
                    makePropsHeadingButton: ({ accordionSection: { expanded } }) => ({ class: clsx("accordion-button", !expanded ? " collapsed" : "") }),
                    tagHeadingButton: "button",
                    tagBody: Transition,
                    makePropsBody: ({ accordionSection: { expanded, focused } }) => ({
                        children,
                        class: clsx("accordion-body", expanded && "elevation-depressed-2", "elevation-body-surface"),
                        "data-expanded": expanded,
                        "data-focused": focused,
                        ...{ show: expanded } as {}
                    }),
                    makePropsHeadingContainer: ({ accordionSection: { expanded, focused } }) => ({
                        children: header,
                        class: "accordion-header",
                        "data-expanded": expanded,
                        "data-focused": focused,
                    })
                })}
                open={open}
                disabled={disabled}
                tagButton="button"
            />
        </div>
    );
    /*
        const headerButtonProps = useAriaAccordionSectionHeaderProps({ type: "button", class: clsx("accordion-button", !expanded ? " collapsed" : "") });
        const headerProps = ({ class: "accordion-header", children: <button {...headerButtonProps}>{header}</button> });
        const headerJsx = headerLevel >= 1 && headerLevel <= 6 ? h(`h${headerLevel}`, headerProps as any) : h("div", as any);
        return (
            <div {...{ ref, class: "accordion-item" }}>
                {headerJsx}
                <Transition show={expanded} {...useAriaAccordionSectionBodyProps(useMergedProps<any>()(props, { class: "" })) as any}><div><div class={clsx("accordion-body", expanded && "elevation-depressed-2", "elevation-body-surface")}>{children}</div></div></Transition>
            </div>
        );
        */
}))