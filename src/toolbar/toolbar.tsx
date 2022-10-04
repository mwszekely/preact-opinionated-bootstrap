
import { cloneElement, ComponentChild, createContext, Ref, RenderableProps, VNode } from "preact";
import { defaultRenderToolbar, Toolbar as BaseToolbar, ToolbarChild as BaseToolbarChild, ToolbarProps as BaseToolbarProps, ToolbarChildProps as BaseToolbarChildProps } from "preact-aria-widgets"
import { useMergedProps } from "preact-prop-helpers";
import { useContext } from "preact/hooks";
import { forwardElementRef } from "props";

export interface ToolbarProps extends Pick<BaseToolbarProps<HTMLDivElement, any>, "orientation" | "role"> {
    label: string;
}

export interface ToolbarChildProps extends Pick<BaseToolbarChildProps<any>, "index" | "hidden"> {
    children: VNode;
}

const ToolbarContext = createContext(false);
const ToolbarChildContext = createContext(false);

export function useWithinToolbar() {
    return useContext(ToolbarContext);
}

export function useWithinToolbarChild() {
    return useContext(ToolbarChildContext);
}

function ToolbarU({ orientation, label, role, children }: RenderableProps<ToolbarProps>, ref: Ref<HTMLDivElement>) {
    return (
        <ToolbarContext.Provider value={true}>
            <BaseToolbar
                orientation={orientation}
                role={role}
                render={defaultRenderToolbar<HTMLDivElement, any>({ tagContainer: "div", makePropsContainer: () => ({ "aria-label": label, children, ref }) })}
            />
        </ToolbarContext.Provider>
    )
}

function ToolbarChildU({ index, hidden, children }: ToolbarChildProps) {
    return (
        <ToolbarChildContext.Provider value={true}>
            <BaseToolbarChild
                index={index}
                text=""
                hidden={hidden}
                render={(info, modifyProps) => {
                    return cloneElement(children, modifyProps(children.props))
                }}
            />
        </ToolbarChildContext.Provider>
    )
}

/**
 * Component that allows a number of widgets, combined, to be treated as one tab stop.
 * 
 * Each child must be wrapped in `ToolbarChild` and must in turn forward refs and props to *its* child.
 */
export const Toolbar = forwardElementRef(ToolbarU);

/**
 * All children of a Toolbar must be wrapped in a ToolbarChild, which will forward onto that child
 * all the props it needs to have in order to be a part of this composite widget (keyboard events, etc.)
 */
export const ToolbarChild = forwardElementRef(ToolbarChildU);
