import { ComponentChildren, h, VNode } from "preact";
import { useState } from "preact-prop-helpers/use-state";
import { Button, ButtonGroup, ProvideDefaultButtonColor, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../../button";
import { Toast, usePushToast } from "../../toast";
import { Card, CardElement } from "../../card/card";
import { ButtonGroupChild } from "../../button/button-group";
import { Checkbox, Input, InputGroup, Radio, RadioGroup, Switch } from "../../input-group";
import { ButtonColorVariant } from "../../button/types";
import { GlobalAttributes, TagSensitiveProps } from "../../props";
import { useCallback } from "preact/hooks";

export function DemoChecks() {
    const [asyncFails, setAsyncFails] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    const [demoChecked, setDemoChecked] = useState(false);
    const [demoRadio, setDemoRadio] = useState(0);

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
                <CardElement><Checkbox checked={demoChecked} onInput={usesAsync ? asyncCheckboxInput : setDemoChecked}>I'm a checkbox</Checkbox></CardElement>

                <CardElement>
                    The <code>onInput</code> event handler for all types of inputs can be sync or async.

                    <InputGroup><Checkbox onInput={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                    <InputGroup><Checkbox onInput={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                    <InputGroup><Input disabled={!usesAsync} type="number" onInput={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                </CardElement>
                <CardElement>
                    <Checkbox checked={demoChecked} onInput={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox (linked to switch)</Checkbox>
                    <Switch checked={demoChecked} onInput={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch (linked to checkbox)</Switch>
                </CardElement>
                <CardElement >
                    <RadioGroup<number> name="radio-demo-1" selectedValue={demoRadio} onInput={usesAsync ? asyncRadioInput : setDemoRadio}>
                        <Radio index={0} value={0}>Radio #1</Radio>
                        <Radio index={1} value={1}>Radio #2</Radio>
                        <Radio index={2} value={2}>Radio #3</Radio>
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


                <CardElement type="paragraph">
                    When placed in an <code>&lt;InputGroup&gt;</code>, the styling will be significantly different:
                </CardElement>
                <CardElement>
                    <InputGroup>
                        <Checkbox checked={demoChecked} onInput={usesAsync ? asyncCheckboxInput : setDemoChecked}>Checkbox</Checkbox>
                    </InputGroup>
                    <InputGroup>
                        <Switch checked={demoChecked} onInput={usesAsync ? asyncCheckboxInput : setDemoChecked}>Switch</Switch>
                    </InputGroup>
                    <RadioGroup<number> name="radio-demo-2" selectedValue={demoRadio} onInput={usesAsync ? asyncRadioInput : setDemoRadio}>
                        <InputGroup>
                            <Radio index={0} value={0} labelPosition="start">Radio #1</Radio>
                            <Radio index={1} value={1} labelPosition="hidden">Radio #2</Radio>
                            <Radio index={2} value={2} labelPosition="end">Radio #3</Radio>
                        </InputGroup>
                    </RadioGroup>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<InputGroup>
    <Checkbox checked={checked} onInput={setChecked}>Checkbox</Checkbox>
</InputGroup>
<InputGroup>
    <Switch checked={checked} onInput={onInput}>Switch</Switch>
</InputGroup>
<RadioGroup name="radio-demo-2" selectedValue={value} onInput={setValue}>
    <InputGroup>
        <Radio index={0} value="value1" labelPosition="start">Radio #1</Radio>
        <Radio index={1} value="value2" labelPosition="hidden">Radio #2</Radio>
        <Radio index={2} value="value3" labelPosition="end">Radio #3</Radio>
    </InputGroup>
</RadioGroup>`}</code>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

