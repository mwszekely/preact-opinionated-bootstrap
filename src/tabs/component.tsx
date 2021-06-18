
import { clsx } from "../bootstrap-classes";
import { cloneElement, ComponentChild, ComponentChildren, createContext, Fragment, FunctionComponent, RenderableProps, VNode } from "preact";
import { h, } from "preact";
import { StateUpdater, useState, useEffect, useCallback, useRef, useContext, useLayoutEffect } from "preact/hooks";
import { Children } from "preact/compat";
import { clipProps, Fade, fadeProps, slideProps, SwapContainer, zoomProps } from "preact-transition/src"
import { Transition } from "preact-transition/src/use-transition";
import { MakeFocusableOnly, useArrowKeyNavigatableProps, useArrowKeyNavigation, useWhyDidYouUpdate } from "../dropdown/utility";
import { useRefElement } from "preact-async-input/src/use-ref-element";
import { useProvidedId } from "preact-async-input";
import { useRandomId } from "preact-async-input/src/provide-id";
import { useMergedProps } from "../merge-props";

/*export function TabsContainer({ className, orientation, ...props }: { orientation: "horizontal" | "vertical" } & h.JSX.HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(className, "tabs-container", orientation)} />;
}*/

interface TabsControlledPropsMin {
    fill?: boolean;
    variant?: "tabs" | "pills";
    orientation?: "horizontal" | "vertical";
}

interface TabsUncontrolledPropsMin extends TabsControlledPropsMin {
    selectedTab: string;
    onSelectedTabChange: (id: string) => void;
}


export function TabsControlled({ localStorageKey, children, ...attributes }: { localStorageKey: string } & RenderableProps<TabsControlledPropsMin & h.JSX.HTMLAttributes<HTMLUListElement>>) {
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

const TablistIdContext = createContext("");
const SelectedTabIdContext = createContext("");
const OnSelectedTabIdChangeContext = createContext<(id: string) => void>(null!);
const RegisterTabPanelContext = createContext<(i: number, id: string, component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => void>(null!);
const RegisterTabLabelContext = createContext<(i: number, id: string, component: FunctionComponent<{ active: boolean, selectedIndex: number }>) => void>(null!);

export function TabsUncontrolled({ selectedTab, onSelectedTabChange: userSuppliedOnChange, className, variant, fill, orientation, children, id, ...attributes }: RenderableProps<TabsUncontrolledPropsMin & h.JSX.HTMLAttributes<HTMLUListElement>>) {

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
    }, [selectedTab]);


    const backupId = useRandomId();
    id ??= backupId;

    const [labbelledBy, setLabelledBy] = useState<undefined | string>(undefined);
    const tabLabelContainerRef = useRef<HTMLUListElement>(null);
    const { element, useRefElementProps } = useRefElement<HTMLUListElement>()
    //const { useArrowKeyTabNavigationProps } = useArrowKeyNavigation(({ container: element }));
    const tabLabelContainerProps: h.JSX.HTMLAttributes<HTMLUListElement> = {
        ref: tabLabelContainerRef,
        role: "tablist",
        ...({ "aria-labelledby": labbelledBy, "aria-orientation": orientation == "vertical" ? "vertical" : undefined } as {}),
        children: tabLabels.current.map(({ id, Component }, index) => <Component key={id} active={id === selectedTab} selectedIndex={selectedIndex} />),
        className: clsx("nav", `nav-${variant ?? "tabs"}`, fill && "nav-fill", orientation == "vertical" && "flex-column", className),
        id,
        ...attributes
    }


    const { setFocusToPrev, useArrowKeyTabNavigationProps, setFocusToNext, setFocusToLast, Context, setFocusToCurrent, setFocusToFirst, setFocusById, ready: keyNavigationReady } = useArrowKeyNavigation();

    const onSelectedTabChange = useCallback<typeof userSuppliedOnChange>((id) => {
        userSuppliedOnChange(id);
    }, [setLabelledBy, userSuppliedOnChange])

    useEffect(() => {
        setLabelledBy(makeTabLabelId(selectedTab));
    }, [selectedTab])

    useEffect(() => {
        if (keyNavigationReady) {
            setFocusById(makeTabLabelId(selectedTab), MakeFocusableOnly);
        }
    }, [keyNavigationReady])

    return (
        <Context>
            <SelectedTabIdContext.Provider value={selectedTab}>
                <OnSelectedTabIdChangeContext.Provider value={onSelectedTabChange}>
                    <RegisterTabPanelContext.Provider value={registerTabPanel}>
                        <RegisterTabLabelContext.Provider value={registerTabLabel}>
                            <TablistIdContext.Provider value={id}>
                                {Children.map(children, (child, i) => <TabIndexContext.Provider value={i}>{child}</TabIndexContext.Provider>)}
                                <ul {...useArrowKeyTabNavigationProps(useRefElementProps(tabLabelContainerProps))} />
                                <SwapContainer>
                                    <div className={clsx("tab-content")}>
                                        {tabPanels.current.map(({ id, Component }, index) => <Component key={id} active={id === selectedTab} selectedIndex={selectedIndex} />)}
                                    </div>
                                </SwapContainer>
                            </TablistIdContext.Provider>
                        </RegisterTabLabelContext.Provider>
                    </RegisterTabPanelContext.Provider>
                </OnSelectedTabIdChangeContext.Provider>
            </SelectedTabIdContext.Provider>
        </Context>
    )

}

function makeTabLabelId(baseId: string) {
    return "tab-label-" + baseId;
}

function makeTabPanelId(baseId: string) {
    return "tab-panel-" + baseId;
}

const TabIndexContext = createContext(-1);
const TabBaseIdContext = createContext("");
const TabLabelIdContext = createContext("");
const TabPanelIdContext = createContext("");
export function Tab({ id, children }: RenderableProps<{ id: string }>) {
    const tabLabelId = makeTabLabelId(id);
    const tabPanelId = makeTabPanelId(id);
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

export function TabPanel(p: TabPanelProps) {
    //const { className, children, ...attributes } = props;

    const [forceUpdateActualComponent, setForceUpdateActualComponent] = useState<null | (() => void)>(null);
    const tabBaseId = useContext(TabBaseIdContext);
    const tabPanelId = useContext(TabPanelIdContext);
    const tabLabelId = useContext(TabLabelIdContext);
    const index = useContext(TabIndexContext);
    const registerTabPanel = useContext(RegisterTabPanelContext);




    const propsRef = useRef<typeof p>(p);
    useLayoutEffect(() => {
        propsRef.current = { ...p };
        forceUpdateActualComponent?.();
    });


    const ActualComponent = useCallback(<P extends { active: boolean, selectedIndex: number }>({ active, selectedIndex }: P) => {
        const { element, useRefElementProps } = useRefElement<HTMLDivElement>();
        const { ref, children, ...props } = useRefElementProps(propsRef.current);
        const [_i, setI] = useState(0);
        const forceUpdate = useCallback(() => setI(i => ++i), [setI]);
        useEffect(() => { setForceUpdateActualComponent(() => forceUpdate) }, [forceUpdate]);

        let direction = Math.sign((index - selectedIndex));
        return <Transition open={active} {...fadeProps(slideProps({ "aria-labelledby": tabLabelId, role: "tabpanel", id: tabPanelId, ...props, x: (index - selectedIndex) * (0.125 / 2) }))}>{children}</Transition>
    }, [tabBaseId, tabLabelId, tabPanelId, index])


    useEffect(() => {
        return registerTabPanel(index, tabBaseId, ActualComponent);
    }, [ActualComponent, registerTabPanel]);

    return <></>;
}


interface TabPanelProps extends Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "id" | "children"> { children: VNode<any> }
interface TabLabelProps extends Omit<h.JSX.HTMLAttributes<HTMLButtonElement>, "id"> { }

export function TabLabel(p: TabLabelProps) {
    //const allProps = useRefElementProps({ ...p, ref: useRef<HTMLLIElement>(null) });
    //const { onClick: userSuppliedOnClick, disabled, ...props } = allProps;

    const [forceUpdateActualComponent, setForceUpdateActualComponent] = useState<null | (() => void)>(null);

    const tabBaseId = useContext(TabBaseIdContext);
    const tabPanelId = useContext(TabPanelIdContext);
    const tabLabelId = useContext(TabLabelIdContext);
    const index = useContext(TabIndexContext);
    const registerTabLabel = useContext(RegisterTabLabelContext);
    const onSelectedTabChange = useContext(OnSelectedTabIdChangeContext);


    const propsRef = useRef<typeof p>(p);
    useLayoutEffect(() => {
        propsRef.current = { ...p };
        forceUpdateActualComponent?.();
    });


    const ActualComponent = useCallback(<P extends { active: boolean }>({ active }: P) => {
        const { element, useRefElementProps } = useRefElement<HTMLButtonElement>();
        const { disabled, ref, onClick: userSuppliedOnClick, children, ...props } = useRefElementProps(propsRef.current);
        const [_i, setI] = useState(0);
        const forceUpdate = useCallback(() => setI(i => ++i), [setI]);
        useEffect(() => { setForceUpdateActualComponent(() => forceUpdate) }, [forceUpdate]);
        const ariaControls = useContext(TablistIdContext);
        const onClick = useCallback(function (this: HTMLButtonElement, e: h.JSX.TargetedMouseEvent<HTMLButtonElement>) {
            onSelectedTabChange(tabBaseId);
            userSuppliedOnClick?.bind(this, e);
        }, [tabBaseId, userSuppliedOnClick, onSelectedTabChange]);
        return (
            <>
                <li {...({ style: undefined, className: clsx("tab-label", active && "active") })}>
                    <button {...useArrowKeyNavigatableProps(useMergedProps({
                        className: clsx("nav-link", active && "active", disabled && "disabled"),
                        role: "tab",
                        id: tabLabelId,
                        index,
                        "aria-disabled": disabled ? "true" : undefined,
                        //"aria-current": active ? "page" : undefined,
                        "aria-controls": ariaControls,
                        "aria-selected": active ? "true" : undefined,
                        ref,
                        onClick,
                        onFocus: onClick,
                        type: "button"
                    }, props))}>{children}</button>
                </li>
            </>
        )
    }, [tabBaseId, tabLabelId, index, onSelectedTabChange])


    useEffect(() => {
        return registerTabLabel(index, tabBaseId, ActualComponent);
    }, [ActualComponent, registerTabLabel]);

    return <></>;
}

