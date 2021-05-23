import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { SimpleHTMLDivProps } from "../props-shared";
import { buttonGroupProps, ButtonGroupPropsMin } from "./props";

export interface ButtonGroupProps extends ButtonGroupPropsMin, SimpleHTMLDivProps {}

export const ButtonGroup = forwardElementRef(function ButtonGroup(p: ButtonGroupProps, ref: Ref<HTMLDivElement>) {
    const props = { ...p, ref };
    return (
        <div {...buttonGroupProps(props)} />
    )
});

