import clsx from "clsx";
import { h, Fragment, createContext, ComponentChildren, cloneElement, VNode } from "preact";
import { useAriaTabs } from "preact-aria-widgets";
import { UseAriaTabsParameters, UseTab, UseTabPanel, UseTabPanelParameters, UseTabParameters, TabsChangeEvent } from "preact-aria-widgets/use-tabs";
import { EventDetail } from "preact-aria-widgets/props";
import { useAsyncHandler } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useState } from "preact-prop-helpers/use-state";
import { Fade, Swappable, Zoom } from "preact-transition";
import { useContext } from "preact/hooks";
import { GlobalAttributes, TagSensitiveProps, TransitionComponent } from "../props";

export interface TabsProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseAriaTabsParameters, "orientation" | "collator" | "typeaheadTimeout" | "keyNavigation" | "onSelect">, Omit<GlobalAttributes<E>, "children">, TagSensitiveProps<E> {
    children: ComponentChildren[];
    visualVariant?: "tabs" | "pills";
    orientation?: "inline" | "block" | undefined;
    onSelect(index: number): void | Promise<void>;
}

export interface TabProps extends Omit<UseTabParameters<HTMLButtonElement>, "text" | "tag">, GlobalAttributes<HTMLButtonElement> {

}

export type TabPanelProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> =
    Omit<UseTabPanelParameters, "visible" | "setVisible"> &
    GlobalAttributes<HTMLLIElement> &
    TransitionComponent<T>

const UseTabContext = createContext<UseTab<HTMLButtonElement>>(null!);
const UseTabPanelContext = createContext<UseTabPanel<HTMLDivElement>>(null!);

export function Tabs<E extends HTMLUListElement | HTMLOListElement>({ onSelect: onSelectAsync, orientation, selectedIndex, selectionMode, tag, children, visualVariant, ...props }: TabsProps<E>) {
    const capture = (e: TabsChangeEvent<E>) => { return e[EventDetail].selectedIndex };
    orientation ??= "inline";
    const { getSyncHandler } = useAsyncHandler<E>()({ capture: capture as any as () => number });
    const onSelect = getSyncHandler(onSelectAsync) as any as h.JSX.EventHandler<any>;
    const { useTab, useTabPanel, useTabsLabel, useTabsList } = useAriaTabs<E, HTMLButtonElement, HTMLDivElement>({ onSelect, selectedIndex, selectionMode, orientation });

    const { useTabListProps } = useTabsList();


    return (
        <div class={clsx("tabs-container", `tabs-orientation-${orientation}`)}>
            <UseTabContext.Provider value={useTab}>
                {cloneElement(children[0] as any, useTabListProps(useMergedProps<E>()({ className: clsx("nav", visualVariant == "pills"? "nav-pills" : "nav-tabs") }, { ...props })), (children[0] as VNode<any>).props.children)}
            </UseTabContext.Provider>
            <UseTabPanelContext.Provider value={useTabPanel}>
                <Swappable>
                    <div class="tab-content">
                        {...children.slice(1)}
                    </div>
                </Swappable>
            </UseTabPanelContext.Provider>
        </div>
    );
}

export function Tab({ index, children, ...props }: TabProps) {
    const useTabContext = useContext(UseTabContext);
    const { useTabProps, selected } = useTabContext({ index, text: null, tag: "button" })
    return <li className="nav-item" role="presentation"><button {...useTabProps(useMergedProps<HTMLButtonElement>()({ class: clsx(`nav-link`, selected && `active`) }, props))}>{children}</button></li>
}



export function TabPanel<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ index, children, Transition, ...rest }: TabPanelProps<T>) {
    const useTabPanel = useContext(UseTabPanelContext);
    const { useTabPanelProps, selected } = useTabPanel({ index });

    return h(Transition, useTabPanelProps({ class: "", open: selected, children, ...(rest as any) }));
}
