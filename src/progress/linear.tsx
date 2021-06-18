import { ComponentChildren, h } from "preact";
import { clsx } from "../bootstrap-classes";
import { ButtonColor } from "../button/types";
import { SimpleHTMLDivProps } from "../props-shared";

export interface LinearProgressPropsMin {
    min?: number;
    max?: number;
    value: number;
    striped?: boolean;
    variant?: "solid" | "striped" | "animated";
    color?: ButtonColor;
}

export interface LinearProgressProps extends LinearProgressPropsMin, SimpleHTMLDivProps {
    children?: ComponentChildren;
}

export function LinearProgress(p: LinearProgressProps) {
    let { value, max, min, children, color, variant, className, ...props } = p;
    min ??= 0;
    max ??= 1;
    value ??= min;

    console.assert(min < max);
    console.assert(value >= min);
    console.assert(value <= max);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div {...props} className={clsx("progress", className)}>
            <div className={clsx("progress-bar", color && `bg-${color}`, variant == "animated" && "progress-bar-animated", variant && variant != "solid" && "progress-bar-striped")} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={(percentage).toFixed(2)} aria-valuemin="0" aria-valuemax={max} />
            {children != null && <div className="progress-bar-label">
                <div className="progress-bar-label-on-pb" style={{ clipPath: `inset(0 ${(100 - percentage).toString()}% 0 0)` }}>{children}</div>
                <div className="progress-bar-label-on-bg" style={{ clipPath: `inset(0 0 0 ${percentage.toString()}%)` }} aria-hidden="true">{children}</div>
            </div>}
        </div>
    )
}