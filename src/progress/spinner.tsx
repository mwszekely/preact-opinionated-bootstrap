import clsx from "clsx";
import { h, Ref } from "preact";
import { forwardElementRef } from "preact-async-input";


// :)
const R = ((new Date()).getDate() % 2);

export const NewtonsCradleSpinner = forwardElementRef(function (p: h.JSX.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) {
    const {className, ...props} = p;
    return (
        <div {...props} ref={ref} style={{ "--newton-cradle-count": 3 + R} as any} className={clsx("newton-cradle-container", className)}>
            <div className="newton-cradle">
                <div />
                <div />
                <div />
                {R == 1 && <div />}
            </div>
        </div>
    )
})

