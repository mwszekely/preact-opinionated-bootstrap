import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";
import { SimpleProps } from "../props-shared";
import { useBadgeProps, BadgePropsMin } from "./props";


export interface BadgeProps extends BadgePropsMin, SimpleProps<HTMLSpanElement> {
}

export const Badge = forwardElementRef(function Badge<P extends BadgeProps>(p: P, ref: Ref<HTMLSpanElement>) {
    const props = useBadgeProps({ ...p, ref });
    return <span {...props}  />
})
