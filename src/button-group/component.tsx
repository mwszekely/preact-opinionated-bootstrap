import { createContext, h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { SimpleHTMLDivProps } from "../props-shared";
import { useButtonGroupProps, ButtonGroupPropsMin } from "./props";

export interface ButtonGroupProps extends ButtonGroupPropsMin, SimpleHTMLDivProps { }

export const InButtonGroupContext = createContext(false);

export const ButtonGroup = forwardElementRef(function ButtonGroup(p: ButtonGroupProps, ref: Ref<HTMLDivElement>) {
    const props = useButtonGroupProps({ ...p, ref });
    return (
        <InButtonGroupContext.Provider value={true}>
            <div {...props} />
        </InButtonGroupContext.Provider>
    )
});

