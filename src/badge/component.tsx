import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { SimpleProps } from "../props-shared";
import { badgeProps, BadgePropsMin } from "./props";


export interface BadgeProps extends BadgePropsMin, SimpleProps<HTMLSpanElement> {
}

export const Badge = forwardElementRef(function <P extends BadgeProps>(p: P, ref: Ref<HTMLSpanElement>) {
    const props = badgeProps({ ...p, ref });
    return <span {...props}  />
})
