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

export function DemoInputs() {
    const [asyncFails, setAsyncFails] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    const [text, setText] = useState("");
    const [number, setNumber] = useState(0);

    const asyncTextInput = useCallback(async (text: string) => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Attempt to change text failed");
        setText(text);
    }, [asyncTimeout, asyncFails]);

    const asyncNumberInput = useCallback(async (value: number) => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Attempt to change number failed");
        setNumber(value);
    }, [asyncTimeout, asyncFails]);

    const onTextInput = usesAsync ? asyncTextInput : setText;
    const onNumberInput = usesAsync ? asyncNumberInput : setNumber;

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Text boxes</CardElement>
                <CardElement><div class="position-relative"><Input type="text" value={text} onInput={onTextInput}>I'm a text box</Input></div></CardElement>

                <CardElement>
                    The <code>onInput</code> event handler for all types of inputs can be sync or async.

                    <InputGroup><Checkbox onInput={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                    <InputGroup><Checkbox onInput={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                    <InputGroup><Input disabled={!usesAsync} type="number" onInput={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                </CardElement>
                <CardElement>
                    <div class="position-relative"><Input type="text" value={text} onInput={onTextInput}>Text-based input</Input></div>
                    <div class="position-relative"><Input type="number" value={number} onInput={onNumberInput} min={0}>Number-based input</Input></div>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<Input type="text" value={text} onInput={onTextInput}>Text-based input</Input>
<Input type="number" value={number} onInput={onNumberInput} min={0}>Number-based input</Input>`}</code>
                </CardElement>


                <CardElement type="paragraph">
                    When placed in an <code>&lt;InputGroup&gt;</code>, the styling will be significantly different:
                </CardElement>
                <CardElement>
                    <InputGroup><Input type="text" value={text} onInput={onTextInput}>Text-based input</Input></InputGroup>
                    <InputGroup><Input type="number" value={number} onInput={onNumberInput} min={0}>Number-based input</Input></InputGroup>
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

