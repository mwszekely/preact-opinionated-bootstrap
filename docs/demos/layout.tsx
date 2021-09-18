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
import { InputGrid } from "../../input-group/input-group";

export function DemoLayout() {
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
                    Inputs can be placed within an <code>InputGroup</code>, but those <code>InputGroup</code>s can also be placed within an <code>InputGrid</code> that offers alignment for simple cases

                </CardElement>
                <CardElement>
                    <InputGrid>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                        <InputGroup><Input onInput={() => { }} type="number" value={0} disabled>Numeric input</Input></InputGroup>
                    </InputGrid>

                </CardElement>
                <CardElement>

                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                    <InputGroup><Input onInput={() => { }} type="number" value={0} disabled>Numeric input</Input></InputGroup>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

