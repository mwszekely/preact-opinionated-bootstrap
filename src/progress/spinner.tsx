import clsx from "clsx";
import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";


export const NewtonsCradleSpinner = forwardElementRef(function (p: h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    const {className, ...props} = p;
    return (
        <div {...props} ref={ref} className={clsx("newton-cradle-container", className)}>
            <div class="newton-cradle">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
})

