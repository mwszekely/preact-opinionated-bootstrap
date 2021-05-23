
import { clsx } from "../bootstrap-classes";
import { uniqueId } from "lodash";
import { cloneElement, ComponentChild, ComponentChildren, createContext, Fragment, FunctionComponent, RenderableProps, VNode } from "preact";
import { h, } from "preact";
import { StateUpdater, useState, useEffect, useCallback, useRef, useContext, useLayoutEffect } from "preact/hooks";
import { Children } from "preact/compat";
import { clipProps, Fade, fadeProps, slideProps, SwapContainer, zoomProps } from "preact-transition/src"
import { Transition } from "preact-transition/src/use-transition";

/*export function TabsContainer({ className, orientation, ...props }: { orientation: "horizontal" | "vertical" } & h.JSX.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(className, "tabs-container", orientation)} />;
}*/

export function TabsControlled({ localStorageKey, children, ...attributes }: { localStorageKey: string } & RenderableProps<h.JSX.HTMLAttributes<HTMLUListElement>>) {
    const [selectedTab, setSelectedTab] = useLocalStorageState(localStorageKey, "");

    return <TabsUncontrolled {...attributes} selectedTab={selectedTab} onSelectedTabChange={setSelectedTab}>{children}</TabsUncontrolled>
}


export function useLocalStorageState<T>(key: string, defaultValue: T | (() => T)): [T, StateUpdater<T>] {
    const [value, setValue] = useState<T>(() => {
        const value = window.localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue instanceof Function ? defaultValue() : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}


const SelectedTabIdContext = createContext("");
const OnSelectedTabIdChangeContext = createContext<(id: string) => void>(null!);
const RegisterTabPanelContext = createContext<(i: number, id: string, component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => void>(null!);
const RegisterTabLabelContext = createContext<(i: number, id: string, component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => void>(null!);

export function TabsUncontrolled({ selectedTab, onSelectedTabChange, className, children, ...attributes }: RenderableProps<{ selectedTab: string, onSelectedTabChange: (id: string) => void } & h.JSX.HTMLAttributes<HTMLUListElement>>) {

    const [_, set_] = useState(0);
    const forceUpdate = useCallback(() => set_(_ => ++_), [set_]);

    const tabLabels = useRef<{ id: string, Component: FunctionComponent<{ active: boolean, selectedIndex: number }> }[]>([]);
    const tabPanels = useRef<{ id: string, Component: FunctionComponent<{ active: boolean, selectedIndex: number }> }[]>([]);

    const registerTabPanel = useCallback((i: number, id: string, Component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => {
        tabPanels.current[i] = { id, Component };
        forceUpdate();
        return () => { forceUpdate(); delete tabPanels.current[i]; }
    }, [tabPanels, forceUpdate]);

    const registerTabLabel = useCallback((i: number, id: string, Component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => {
        tabLabels.current[i] = { id, Component };
        forceUpdate();
        return () => { forceUpdate(); delete tabLabels.current[i]; }
    }, [tabLabels, forceUpdate]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
        setSelectedIndex(tabPanels.current.findIndex(panel => panel.id == selectedTab));
    }, [selectedTab])

    return (
        <SelectedTabIdContext.Provider value={selectedTab}>
            <OnSelectedTabIdChangeContext.Provider value={onSelectedTabChange}>
                <RegisterTabPanelContext.Provider value={registerTabPanel}>
                    <RegisterTabLabelContext.Provider value={registerTabLabel}>
                        {Children.map(children, (child, i) => <TabIndexContext.Provider value={i}>{child}</TabIndexContext.Provider>)}
                        <ul className={clsx("nav", "nav-tabs", className)} {...attributes}>{tabLabels.current.map(({ id, Component }, index) => <Component key={id} active={id === selectedTab} selectedIndex={selectedIndex} /> /*cloneElement(component, { key: id })*/)}</ul>
                        <SwapContainer>
                            <div className={clsx("tab-content")}>
                                {tabPanels.current.map(({ id, Component }, index) => <Component key={id} active={id === selectedTab} selectedIndex={selectedIndex} /> /*cloneElement(component, { key: id })*/)}
                            </div>

                        </SwapContainer>
                    </RegisterTabLabelContext.Provider>
                </RegisterTabPanelContext.Provider>
            </OnSelectedTabIdChangeContext.Provider>
        </SelectedTabIdContext.Provider>
    )

}



const TabIndexContext = createContext(-1);
const TabBaseIdContext = createContext("");
const TabLabelIdContext = createContext("");
const TabPanelIdContext = createContext("");
export function Tab({ id, children }: RenderableProps<{ id: string }>) {
    const tabLabelId = "tab-label-" + id;
    const tabPanelId = "tab-panel-" + id;
    return (
        <TabBaseIdContext.Provider value={id}>
            <TabLabelIdContext.Provider value={tabLabelId}>
                <TabPanelIdContext.Provider value={tabPanelId}>
                    {children}
                </TabPanelIdContext.Provider>
            </TabLabelIdContext.Provider>
        </TabBaseIdContext.Provider>
    )
}

export function TabPanel(props: Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "id" | "children"> & { children: VNode<any> }) {
    const { className, children, ...attributes } = props;
    const tabBaseId = useContext(TabBaseIdContext);
    const tabPanelId = useContext(TabPanelIdContext);
    const tabLabelId = useContext(TabLabelIdContext);
    const index = useContext(TabIndexContext);
    const registerTabPanel = useContext(RegisterTabPanelContext);



    const propsRef = useRef<typeof props>({ ...props });
    useLayoutEffect(() => {
        Object.assign(propsRef.current, props);
    });

    useEffect(() => {
        const { className, children, ...attributes } = propsRef.current
        return registerTabPanel(index, tabBaseId, ({ active, selectedIndex }: { active: boolean, selectedIndex: number }) => {
            let direction = Math.sign((index - selectedIndex));
            return <Transition open={active} {...fadeProps(slideProps({ x: (index - selectedIndex) * (0.125 / 2) }))}>{children}</Transition>
        });
    }, [registerTabPanel, index, tabBaseId, tabLabelId, tabPanelId]);
    return <></>;
}


export function TabLabel(props: Omit<h.JSX.HTMLAttributes<HTMLLIElement>, "id">) {
    const { className, onClick: userSuppliedOnClick, disabled, children, ...attributes } = props;

    const tabBaseId = useContext(TabBaseIdContext);
    const tabPanelId = useContext(TabPanelIdContext);
    const tabLabelId = useContext(TabLabelIdContext);
    const index = useContext(TabIndexContext);
    const registerTabLabel = useContext(RegisterTabLabelContext);
    const onSelectedTabChange = useContext(OnSelectedTabIdChangeContext);
    const onClick = useCallback(function (this: HTMLLIElement, e: h.JSX.TargetedMouseEvent<HTMLLIElement>) {
        onSelectedTabChange(tabBaseId);
        userSuppliedOnClick?.bind(this, e);
    }, [tabBaseId, userSuppliedOnClick, onSelectedTabChange]);

    const propsRef = useRef<typeof props & { onClick: typeof onClick }>({ ...props, onClick });
    useLayoutEffect(() => {
        Object.assign(propsRef.current, props);
        propsRef.current.onClick = onClick;
    });

    useEffect(() => {
        const { onClick, className, children, disabled, ...attributes } = propsRef.current;
        return registerTabLabel(index, tabBaseId, ({ active }: { active: boolean }) =>
        (
            <li id={tabLabelId} {...attributes} onClick={onClick} className={clsx("tab-label", active && "active", className)}>
                <a className={clsx("nav-link", active && "active", disabled && "disabled")} aria-disabled={disabled? "true" : undefined} aria-current={active? "page" : undefined} role="tab" href="#">{children}</a>
            </li>
        ));
    }, [propsRef, index, tabBaseId, tabLabelId, tabPanelId]);
    return <></>;
}

