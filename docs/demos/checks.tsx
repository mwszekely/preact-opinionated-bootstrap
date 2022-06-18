import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";
import { Card, CardElement } from "../../card/card";
import { Checkbox, Input, InputGroup, Radio, RadioGroup, Switch, InputGrid, CheckboxProps } from "../../input-group";
import { GridStatic } from "../../layout";

type LabelPosition = NonNullable<CheckboxProps["labelPosition"]>;

export function DemoChecks() {
    const [asyncFails, setAsyncFails] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState<number | null>(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    const [tristate, setTristate] = useState(false);

    const [demoChecked, setDemoChecked] = useState(false);
    const [demoRadio, setDemoRadio] = useState(0);
    const [radioCount, setRadioCount] = useState<number | null>(3);

    const [disabled, setDisabled] = useState(false);

    const [labelPosition, setLabelPosition] = useState<LabelPosition>("end");

    const asyncCheckboxInput = useCallback(async (checked: boolean) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Attempt to change checkbox & radio failed");
        setDemoChecked(checked);
    }, [asyncTimeout, asyncFails]);

    const asyncRadioInput = useCallback(async (value: number) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Attempt to change radio failed");
        setDemoRadio(value);
    }, [asyncTimeout, asyncFails]);

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2" >Checkboxes, switches, &amp; radios</CardElement>
                <CardElement><Checkbox checked={demoChecked} tristate={tristate} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>I'm a checkbox</Checkbox></CardElement>

                <CardElement>
                    Several components related to on/off togglable form-like selection controls are provided:
                    <ul>
                        <li><code>Checkbox</code></li>
                        <li><code>Switch</code></li>
                        <li><code>RadioGroup</code></li>
                        <li><code>CheckboxGroup</code></li>
                    </ul>
                    <code>Checkbox</code> and <code>Switch</code> work as you'd expect, though <code>Checkbox</code>
                    comes with a <code>tristate</code> prop that no other toggle has. <code>RadioGroup</code> is
                    a parent around a set of <code>Radio</code> components that communicate with each other.
                    The children <code>Radio</code> components can be any descendant of the parent <code>RadioGroup</code> &ndash;
                    the DOM structure <em>does not</em> matter beyond requiring they be somewhere descendant. <code>CheckboxGroup</code> works
                    similarly to <code>RadioGroup</code> in that way.
                </CardElement>
                <CardElement>
                    See Also: Single Select lists for an alternative to <code>RadioGroup</code>, and Multi Select lists for an alternative to <code>CheckboxGroup</code>.
                </CardElement>

                <CardElement>
                    Like other components, the event handlers can be sync or async, and when disabled, all inputs remain focusable so that they can still be announced by screen readers, have tooltips via mouseover, etc.
                </CardElement>

                <CardElement type="subtitle" tag="h3">Checkbox</CardElement>
                <CardElement><Checkbox disabled={disabled} checked={demoChecked} tristate={tristate} labelPosition={labelPosition} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox></CardElement>
                <CardElement>The <code>checked</code> prop can be <code>true</code>, <code>false</code>, or <code>mixed</code>.
                    The <code>onCheck</code> event fires when the user initiates a change.</CardElement>

                <CardElement type="subtitle" tag="h3">Switch</CardElement>
                <CardElement><Switch disabled={disabled} checked={demoChecked} labelPosition={labelPosition} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch></CardElement>
                <CardElement>In terms of props (not use-case), largely identical to a <code>Checkbox</code>, though it cannot have a <code>mixed</code> state.</CardElement>

                <CardElement type="subtitle" tag="h3">Radio group</CardElement>
                <CardElement>
                    <RadioGroup<number> name="radio-demo-0" selectedValue={demoRadio} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                        {Array.from(function* () {
                            for (let i = 0; i < (radioCount ?? 0); ++i) {
                                yield <Radio disabled={disabled} labelPosition={labelPosition} index={i} value={i} key={i}>Radio #{i + 1}</Radio>
                            }
                        }())}
                    </RadioGroup>
                </CardElement>
                <CardElement>The individual <code>RadioButton</code>s <strong>do not</strong> accept a <code>checked</code> prop; instead, the parent <code>RadioGroup</code> accepts a <code>selectedValue</code>. Similarly, the <code>onValueChange</code> event handler lives on that parent <code>RadioGroup</code>. The individual child <code>Radio</code>s can be, e.g., marked as <code>disabled</code>, styled, etc. but all the logic happens with the parent.</CardElement>

                <CardElement type="subtitle" tag="h3">Demos</CardElement>
                <CardElement>

                    <InputGrid>
                        <InputGroup><Checkbox onCheck={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                        <InputGroup><Checkbox onCheck={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                        <InputGroup><Input disabled={!usesAsync} type="number" onValueChange={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                        <InputGroup><Checkbox onCheck={setTristate} checked={tristate} labelPosition="start">Tri-state checkbox</Checkbox></InputGroup>
                        <InputGroup><Input type="number" onValueChange={setRadioCount} value={radioCount}># of radio buttons</Input></InputGroup>
                        <InputGroup><Checkbox onCheck={setDisabled} checked={disabled} labelPosition="start">Inputs disabled</Checkbox></InputGroup>
                        <RadioGroup<LabelPosition> name="radio-demo-6" selectedValue={labelPosition} onValueChange={setLabelPosition}>
                            <InputGroup><Radio<LabelPosition> index={0} value={"start"} labelPosition="start">Label before</Radio></InputGroup>
                            <InputGroup><Radio<LabelPosition> index={1} value={"end"} labelPosition="start">Label after</Radio></InputGroup>
                            <InputGroup><Radio<LabelPosition> index={2} value={"hidden"} labelPosition="start">Label hidden</Radio></InputGroup>
                            <InputGroup><Radio<LabelPosition> index={3} value={"tooltip"} labelPosition="start">Tooltip label</Radio></InputGroup>
                            <InputGroup><Radio<LabelPosition> index={4} value={"button"} labelPosition="start">Button</Radio></InputGroup>
                        </RadioGroup>
                    </InputGrid>
                </CardElement>
                <GridStatic columns={2}>
                    <CardElement>
                        <Checkbox disabled={disabled} checked={demoChecked} tristate={tristate} labelPosition={labelPosition} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox>
                        <Switch disabled={disabled} checked={demoChecked} labelPosition={labelPosition} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch>
                        <RadioGroup<number> name="radio-demo-1a" selectedValue={demoRadio} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                            {Array.from(function* () {
                                for (let i = 0; i < (radioCount ?? 0); ++i) {
                                    yield <Radio disabled={disabled} labelPosition={labelPosition} index={i} value={i} key={i}>Radio #{i + 1}</Radio>
                                }
                            }())}
                        </RadioGroup>
                    </CardElement>
                    <CardElement>
                        <InputGrid>
                            <InputGroup><Checkbox disabled={disabled} labelPosition={labelPosition} checked={demoChecked} tristate={tristate} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox></InputGroup>
                            <InputGroup><Switch disabled={disabled} labelPosition={labelPosition} checked={demoChecked} onCheck={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch></InputGroup>

                            <RadioGroup<number> name="radio-demo-1b" selectedValue={demoRadio} onValueChange={usesAsync ? asyncRadioInput : setDemoRadio}>
                                {Array.from(function* () {
                                    for (let i = 0; i < (radioCount ?? 0); ++i) {
                                        yield <InputGroup><Radio disabled={disabled} labelPosition={labelPosition} index={i} value={i} key={i}>Radio #{i + 1}</Radio></InputGroup>
                                    }
                                }())}
                            </RadioGroup>
                        </InputGrid>
                    </CardElement>
                    <CardElement>

                    </CardElement>
                </GridStatic>

                <CardElement type="paragraph">
                    <code>{`<Checkbox checked={checked} tristate={tristate} onCheck={setChecked}>Checkbox</Checkbox>
<Switch checked={checked} onCheck={onInput}>Switch</Switch>
<RadioGroup name="radio-demo-1" selectedValue={value} onValueChange={setValue}>
<Radio index={0} value="value1">Radio #1</Radio>
<Radio index={1} value="value2">Radio #2</Radio>
<Radio index={2} value="value3">Radio #3</Radio>
</RadioGroup>`}</code>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

