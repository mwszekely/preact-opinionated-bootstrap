import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { useCallback } from "preact/hooks";
import { Button, ButtonGroup, ButtonGroupChild } from "../../button";
import { Card, CardElement } from "../../card/card";
import { BootstrapIcon } from "../../icon";
import { Checkbox, Input, InputGroup, InputGrid } from "../../input-group";

export function DemoInputs() {
    const [asyncFails, setAsyncFails] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState<number | null>(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    const [text, setText] = useState("");
    const [number, setNumber] = useState<number | null>(0);
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");

    const asyncTextInput = useCallback(async (text: string) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Attempt to change text failed");
        setText(text);
    }, [asyncTimeout, asyncFails]);

    const asyncNumberInput = useCallback(async (value: number | null) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Attempt to change number failed");
        setNumber(value);
    }, [asyncTimeout, asyncFails]);

    const [prefix, setPrefix] = useState<"icon" | "button" | null>(null);
    const [suffix, setSuffix] = useState<"icon" | "button" | null>(null);

    const onTextInput = usesAsync ? asyncTextInput : setText;
    const onNumberInput = usesAsync ? asyncNumberInput : setNumber;

    const p = (prefix == "icon" ? <BootstrapIcon icon="pencil" label="Edit" /> : prefix == "button" ? <Button  colorVariant="subtle"><BootstrapIcon icon="pencil" label="Edit" /></Button> : null)
    const s = (suffix == "icon" ? <BootstrapIcon icon="check" label="Correct" /> : suffix == "button" ? <Button  colorVariant="subtle"><BootstrapIcon icon="check" label="Correct" /></Button> : null)

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Text boxes</CardElement>
                <CardElement><div class="position-relative"><Input type="text" value={text} onValueChange={onTextInput}>I'm a text box</Input></div></CardElement>
                <CardElement>
                    <code>&lt;Input&gt;</code> components allow for inputting text, numbers, etc. and asyncronously saving it somewhere else as it's being typed.
                </CardElement>
                <CardElement type="subtitle" tag="h3">Async inputs</CardElement>
                <CardElement>
                    The <code>onInput</code> event handler for all types of inputs can be sync or async.

                    <InputGrid>
                        <InputGroup><Checkbox onCheck={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                        <InputGroup><Checkbox onCheck={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                        <InputGroup><Input disabled={!usesAsync} type="number" onValueChange={setAsyncTimeout} value={asyncTimeout} prefix={p} suffix={s}>Async timeout</Input></InputGroup>
                    </InputGrid>
                </CardElement>
                <CardElement>
                    <div class="position-relative"><Input type="text" value={text} onValueChange={onTextInput} prefix={p} suffix={s}>Text-based input</Input></div>
                    <div class="position-relative"><Input type="number" value={number} onValueChange={onNumberInput} prefix={p} suffix={s} min={-5}>Number-based input</Input></div>
                    <div class="position-relative"><Input type="textarea" value={text} onValueChange={onTextInput} prefix={p} suffix={s} rows={5}>Textarea</Input></div>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<Input type="text" value={text} onInput={onTextInput}>Text-based input</Input>
<Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input>`}</code>
                </CardElement>

                <CardElement>
                    Icons or other content can be placed at the start or end of the input:
                </CardElement>

                <CardElement>
                    <ButtonGroup>
                        <ButtonGroupChild pressed={prefix == null} onPressToggle={() => setPrefix(null)} index={0}>No prefix</ButtonGroupChild>
                        <ButtonGroupChild pressed={prefix == "icon"} onPressToggle={() => setPrefix("icon")} index={1}>Icon</ButtonGroupChild>
                        <ButtonGroupChild pressed={prefix == "button"} onPressToggle={() => setPrefix("button")} index={2}>Button</ButtonGroupChild>
                    </ButtonGroup>
                    <ButtonGroup>
                        <ButtonGroupChild pressed={suffix == null} onPressToggle={() => setSuffix(null)} index={0}>No prefix</ButtonGroupChild>
                        <ButtonGroupChild pressed={suffix == "icon"} onPressToggle={() => setSuffix("icon")} index={1}>Icon</ButtonGroupChild>
                        <ButtonGroupChild pressed={suffix == "button"} onPressToggle={() => setSuffix("button")} index={2}>Button</ButtonGroupChild>
                    </ButtonGroup>
                </CardElement>

                <CardElement type="paragraph">
                    When placed in an <code>&lt;InputGroup&gt;</code>, the styling will be significantly different:
                </CardElement>
                <CardElement>
                    <ButtonGroup>
                        <ButtonGroupChild index={0} pressed={size == "sm"} onPressToggle={e => setSize("sm")}>Small</ButtonGroupChild>
                        <ButtonGroupChild index={1} pressed={size == "md"} onPressToggle={e => setSize("md")}>Medium</ButtonGroupChild>
                        <ButtonGroupChild index={2} pressed={size == "lg"} onPressToggle={e => setSize("lg")}>Large</ButtonGroupChild>
                    </ButtonGroup>
                </CardElement>
                <CardElement>

                    <InputGrid>
                        <InputGroup size={size}><Input type="text" value={text} onValueChange={onTextInput} prefix={p} suffix={s}>Text-based input</Input></InputGroup>
                        <InputGroup size={size}><Input type="number" value={number} onValueChange={onNumberInput} prefix={p} suffix={s} min={-5}>Number-based input</Input></InputGroup>
                        <InputGroup size={size}><Input type="textarea" value={text} onValueChange={onTextInput} prefix={p} suffix={s} rows={5}>Textarea</Input></InputGroup>
                    </InputGrid>
                </CardElement>
                <CardElement type="paragraph">
                    <code>{`<InputGrid>
    <InputGroup size={size}><Input type="text" value={text} onInput={onTextInput}>Text-based input</Input></InputGroup>
    <InputGroup size={size}><Input type="number" value={number} onInput={onNumberInput} min={-5}>Number-based input</Input></InputGroup>
</InputGrid>`}</code>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

