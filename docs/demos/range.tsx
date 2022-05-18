import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { Badge } from "../../badge";
import { Card, CardElement } from "../../card/card";
import { BootstrapIcon } from "../../icon";
import { Checkbox, Input, InputGroup } from "../../input-group";
import { Range, RangeProps, RangeThumb, RangeThumbProps } from "../../range";
import { Toast, usePushToast } from "../../toast";
import { useCallback } from "preact/hooks";
import { ButtonGroup, ButtonGroupChild } from "../../button";

export function DemoRanges() {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(10);
    const [step, setStep] = useState(1);
    const [snap, setSnap] = useState<RangeProps["snap"]>("discrete");
    const [vt, setVt] = useState(false);

    const [value, setValue] = useState(0);

    const getValueText = useCallback((n: number) => { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.round(n)]; }, []);

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Ranges</CardElement>
                <CardElement>
                    <Range label="Test range" step={step} snap={snap} min={min} max={max} value={value} onValueChange={setValue} getValueText={vt? getValueText : undefined} />
                </CardElement>

                <CardElement>
                    A range allows for selection of a number between some minimum and maximum values.
                    Ranges can optionally have a step value that determines which numbers within the [min, max] range are acceptable, and this can be optional, allowing a continuous selection of values with only an initial snap to those preferred values.
                </CardElement>
                <CardElement>
                    The <code>snap</code> prop can be set to either <code>"discrete"</code> (default) or <code>"continuous"</code>. The former allows selection <em>only</em> of values that match the <code>step</code> prop. The latter will <em>prefer</em> selection of those values, but will allow any number within the range.
                </CardElement>
                <CardElement>
                    The range is linear by default, but you can use the <code>getValueText</code> prop to show other number scales, such as logarithmic scales, text-based scales, etc. The <code>getTooltipText</code> prop is similar, defaulting to whatever<code>getValueText</code> is, and is the value displayed by the tooltip itself (<code>getValueText</code> is used by the tick markers and assistive technologies).
                </CardElement>
                <CardElement>
                    <ButtonGroup>
                        <ButtonGroupChild index={0} pressed={snap == "discrete"} onPressToggle={p => { p && setSnap("discrete")}}>Discrete</ButtonGroupChild>
                        <ButtonGroupChild index={1} pressed={snap == "continuous"} onPressToggle={p => { p && setSnap("continuous")}}>Continuous</ButtonGroupChild>
                    </ButtonGroup>
                    <Input type="number" value={step} onValueChange={setStep} nonNullable>Step</Input>
                    <Checkbox checked={vt} onCheck={setVt}>Use text label instead</Checkbox>
                </CardElement>
            </Card>
        </div>
    );
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

