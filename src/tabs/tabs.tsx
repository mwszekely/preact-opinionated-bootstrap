import clsx from "clsx";
import { cloneElement, ComponentChildren, createContext, Fragment, h, Ref, VNode } from "preact";
import { EventDetail, TabsChangeEvent, useAriaTabs, UseAriaTabsParameters, UseTab, UseTabPanel, UseTabPanelParameters, UseTabParameters } from "preact-aria-widgets";
import { UseTabInfo } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps } from "preact-prop-helpers";
import { Swappable } from "preact-transition";
import { memo } from "preact/compat";
import { useContext } from "preact/hooks";
import { forwardElementRef, GlobalAttributes, TagSensitiveProps, TransitionComponent } from "../props";

export interface TabsProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseAriaTabsParameters, "orientation" | "collator" | "typeaheadTimeout" | "keyNavigation" | "onSelect">, Omit<GlobalAttributes<E>, "children"> {
    children: ComponentChildren[];
    visualVariant?: "tabs" | "pills";
    orientation?: "inline" | "block" | undefined;
    onSelect(index: number): void | Promise<void>;
}

export interface TabProps extends Omit<UseTabParameters<HTMLButtonElement, UseTabInfo>, "text" | "tag">, GlobalAttributes<HTMLButtonElement> {

}

export type TabPanelProps<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element> =
    Omit<UseTabPanelParameters, "visible" | "setVisible"> &
    GlobalAttributes<HTMLLIElement> &
    TransitionComponent<T>

const UseTabContext = createContext<UseTab<HTMLButtonElement, UseTabInfo>>(null!);
const UseTabPanelContext = createContext<UseTabPanel<HTMLDivElement>>(null!);

export const Tabs = memo(function Tabs<E extends HTMLUListElement | HTMLOListElement>({ onSelect: onSelectAsync, orientation, selectedIndex, selectionMode, children, visualVariant, ...props }: TabsProps<E>) {
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
                    <div class="tab-content elevation-depressed-3 elevation-body-surface">
                        {...children.slice(1)}
                    </div>
                </Swappable>
            </UseTabPanelContext.Provider>
        </div>
    );
});

export const Tab = memo(forwardElementRef(function Tab({ index, children, ...props }: TabProps, ref?: Ref<HTMLButtonElement>) {
    const useTabContext = useContext(UseTabContext);
    const { useTabProps, selected } = useTabContext({ index, text: null, tag: "button" })
    return <li className="nav-item" role="presentation"><button {...useTabProps(useMergedProps<HTMLButtonElement>()({ ref, class: clsx(`nav-link`, selected && `active`) }, props))}>{children}</button></li>
}))



export const TabPanel = memo(forwardElementRef(function TabPanel<T extends <E extends HTMLElement>(...args: any[]) => h.JSX.Element>({ index, children, Transition, ...rest }: TabPanelProps<T>, ref?: Ref<any>) {
    const useTabPanel = useContext(UseTabPanelContext);
    const { useTabPanelProps, visible } = useTabPanel({ index });

    return h(Transition, useTabPanelProps({ ref, show: visible, children, ...(rest as any) }));
}));
