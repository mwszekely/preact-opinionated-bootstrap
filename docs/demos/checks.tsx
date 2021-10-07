import { ComponentChildren, h, VNode } from "preact";
import { useState } from "preact-prop-helpers";
import { Button, ButtonGroup, ProvideDefaultButtonColor, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../../button";
import { Toast, usePushToast } from "../../toast";
import { Card, CardElement } from "../../card/card";
import { ButtonGroupChild } from "../../button/button-group";
import { Checkbox, Input, InputGroup, Radio, RadioGroup, Switch } from "../../input-group";
import { ButtonColorVariant } from "../../button/types";
import { GlobalAttributes, TagSensitiveProps } from "../../props";
import { useCallback } from "preact/hooks";
import type { CheckboxProps } from "../../input-group/input-check";
import { InputGrid } from "../../input-group/input-group";

type LabelPosition = NonNullable<CheckboxProps["labelPosition"]>;

export function DemoChecks() {
    const [asyncFails, setAsyncFails] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    const [demoChecked, setDemoChecked] = useState(false);
    const [demoRadio, setDemoRadio] = useState(0);
    const [radioCount, setRadioCount] = useState(3);

    const [disabled, setDisabled] = useState(false);

    const [labelPosition, setLabelPosition] = useState<LabelPosition>("end");

    const asyncCheckboxInput = useCallback(async (checked: boolean) => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Attempt to change checkbox & radio failed");
        setDemoChecked(checked);
    }, [asyncTimeout, asyncFails]);

    const asyncRadioInput = useCallback(async (value: number) => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Attempt to change radio failed");
        setDemoRadio(value);
    }, [asyncTimeout, asyncFails]);

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2" >Checkboxes, switches, &amp; radios</CardElement>
                <CardElement><Checkbox checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>I'm a checkbox</Checkbox></CardElement>

                <CardElement>
                    Several components related to on/off togglable form-like selection controls are provided:
                    <ul>
                        <li><code>Checkbox</code></li>
                        <li><code>Switch</code></li>
                        <li><code>Radio</code></li>
                        <li><code>Checkbox Group</code></li>
                    </ul>
                    <code>Checkbox</code> and <code>Switch</code> work as you'd expect. <code>RadioGroup</code> is
                    a parent around a set of <code>Radio</code> components that communicate with each other.
                    The children <code>Radio</code> components can be any descendant of the parent <code>RadioGroup</code> &ndash;
                    the DOM structure <em>does not</em> matter beyond requiring they be somewhere descendant. <code>CheckboxGroup</code> works
                    similarly to <code>RadioGroup</code> in that way.
                </CardElement>
                <CardElement>
                    See Also: Single Select lists for an alternative to <code>RadioGroup</code>, and Multi Select lists for an alternative to <code>CheckboxGroup</code>.
                </CardElement>

                <CardElement type="subtitle" tag="h3">Async inputs</CardElement>
                <CardElement>
                    The <code>onInput</code> event handler for all types of inputs can be sync or async.

                    <InputGrid>
                        <InputGroup><Checkbox onCheck={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                        <InputGroup><Checkbox onCheck={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                        <InputGroup><Input disabled={!usesAsync} type="number" onInput={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                        <InputGroup><Input type="number" onInput={setRadioCount} value={radioCount}># of radio buttons</Input></InputGroup>
                    </InputGrid>
                </CardElement>
                <CardElement>
                    <Checkbox checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox>
                    <Switch checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch>
                </CardElement>
                <CardElement >
                    <RadioGroup<number> name="radio-demo-1" selectedValue={demoRadio} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                        {Array.from(function*(){
                            for (let i = 0; i < radioCount; ++i) {
                                yield <Radio index={i} value={i} key={i}>Radio #{i + 1}</Radio>
                            }
                        }())}
                    </RadioGroup>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>
<Switch checked={checked} onInput={onInput}>Switch</Switch>
<RadioGroup name="radio-demo-1" selectedValue={value} onInput={setValue}>
<Radio index={0} value="value1">Radio #1</Radio>
<Radio index={1} value="value2">Radio #2</Radio>
<Radio index={2} value="value3">Radio #3</Radio>
</RadioGroup>`}</code>
                </CardElement>

                <hr />






                <CardElement type="subtitle" tag="h3">Disabling</CardElement>
                <CardElement>
                    When disabled, all inputs remain focusable so that they can still be announced by screen readers, have tooltips via mouseover, etc.
                    <InputGroup><Checkbox onCheck={setDisabled} checked={disabled} labelPosition="start">Inputs disabled</Checkbox></InputGroup>
                </CardElement>
                <CardElement>
                    <Checkbox disabled={disabled} checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox>
                    <Switch disabled={disabled} checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch>
                </CardElement>
                <CardElement >
                    <RadioGroup<number> name="radio-demo-2" selectedValue={Math.min(2, demoRadio)} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                        <Radio disabled={disabled} index={0} value={0}>Radio #1</Radio>
                        <Radio disabled={disabled} index={1} value={1}>Radio #2</Radio>
                        <Radio disabled={disabled} index={2} value={2}>Radio #3</Radio>
                    </RadioGroup>
                </CardElement>

                <hr />

                <CardElement type="subtitle" tag="h3"><code>InputGroup</code> styling</CardElement>

                <CardElement type="paragraph">
                    An <code>&lt;InputGroup&gt;</code> can be used to significantly change the styling of input components.
                    The inputs and their labels will style themselves or automatically wrap themselves in <code>&lt;InputGroupText&gt;</code> as appropriate.
                </CardElement>
                <CardElement>
                    <InputGrid>
                        <InputGroup>
                            <Checkbox checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox>
                        </InputGroup>
                        <InputGroup>
                            <Switch checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch>
                        </InputGroup>
                        <RadioGroup<number> name="radio-demo-5" selectedValue={Math.min(2, demoRadio)} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                            <InputGroup><Radio index={0} value={0}>Radio #1</Radio></InputGroup>
                            <InputGroup><Radio index={1} value={1}>Radio #2</Radio></InputGroup>
                            <InputGroup><Radio index={2} value={2}>Radio #3</Radio></InputGroup>
                        </RadioGroup>
                    </InputGrid>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<InputGroup>
    <Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>
</InputGroup>
<InputGroup>
    <Switch checked={checked} onInput={onInput}>Switch</Switch>
</InputGroup>
<RadioGroup name="radio-demo-5" selectedValue={value} onInput={setValue}>
    <InputGroup>
        <Radio index={0} value="value1" labelPosition="start">Radio #1</Radio>
        <Radio index={1} value="value2" labelPosition="hidden">Radio #2</Radio>
        <Radio index={2} value="value3" labelPosition="end">Radio #3</Radio>
    </InputGroup>
</RadioGroup>`}</code>
                </CardElement>


                <hr />


                <CardElement type="subtitle" tag="h3">Labels</CardElement>
                <CardElement>
                    By default, the label is positioned after the checkbox, radio, or switch.  You can change this with <code>labelPosition</code>.</CardElement>
                <CardElement>Note that the <code>start</code> label position only has any visual effect while in an <code>InputGroup</code>, as Bootstrap places "naked" checkboxes and such in the margin area before the label no matter what order they come in the DOM.</CardElement>
                <CardElement>
                    <RadioGroup<LabelPosition> name="radio-demo-6" selectedValue={labelPosition} onValueChange={setLabelPosition} labelPosition={labelPosition}>
                        <Radio<LabelPosition> labelPosition={labelPosition} index={0} value={"start"}>Before</Radio>
                        <Radio<LabelPosition> labelPosition={labelPosition} index={1} value={"end"}>After</Radio>
                        <Radio<LabelPosition> labelPosition={labelPosition} index={2} value={"hidden"}>Hidden (still announced verbally)</Radio>
                    </RadioGroup>
                </CardElement>
                <CardElement>
                    <InputGrid>
                        <InputGroup><Checkbox labelPosition={labelPosition} checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox></InputGroup>
                        <InputGroup><Switch labelPosition={labelPosition} checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch></InputGroup>
                        <RadioGroup<number> name="radio-demo-7" selectedValue={Math.min(2, demoRadio)} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                            <InputGroup><Radio labelPosition={labelPosition} index={0} value={0}>Radio #1</Radio></InputGroup>
                            <InputGroup><Radio labelPosition={labelPosition} index={1} value={1}>Radio #2</Radio></InputGroup>
                            <InputGroup><Radio labelPosition={labelPosition} index={2} value={2}>Radio #3</Radio></InputGroup>
                        </RadioGroup>
                    </InputGrid>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

