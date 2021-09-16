import { ComponentChildren, h, VNode } from "preact";
import { useState } from "preact-prop-helpers/use-state";
import { Button, ButtonGroup, ProvideDefaultButtonColor, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../../button";
import { Toast, usePushToast } from "../../toast";
import { Card, CardElement } from "../../card/card";
import { ButtonGroupChild } from "../../button/button-group";
import { Checkbox, Input, InputGroup } from "../../input-group";
import { ButtonColorVariant } from "../../button/types";
import { GlobalAttributes, TagSensitiveProps } from "../../props";

export function DemoButtons() {
    const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("outline");
    const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");
    const [buttonsColor, setButtonsColor] = useState<ButtonColorVariant>("primary");

    const pushToast = usePushToast();
    async function onClick() {
        if (usesAsync)
            await sleep(asyncTimeout);
        pushToast(<Toast>Button was clicked</Toast>)
    }

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);

    return (
        <ProvideDefaultButtonFill value={buttonsFill}>
            <ProvideDefaultButtonSize value={buttonsSize}>
                <ProvideDefaultButtonColor value={buttonsColor}>
                    <div class="demo">
                        <Card>
                            <CardElement type="title" tag="h2" >Plain ol' Buttons</CardElement>
                            <CardElement>
                                The <code>onClick</code> event handler for buttons can be sync or async.

                                <InputGroup><Checkbox onInput={setUsesAsync} checked={usesAsync} labelPosition="start">Async event handler</Checkbox></InputGroup>
                                <InputGroup><Input disabled={!usesAsync} type="number" onInput={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                            </CardElement>
                            <CardElement >
                                <Button onClick={onClick}>Click me</Button>
                            </CardElement>
                            <CardElement type="paragraph"><code>{`const onClick = () => { ${usesAsync ? `await sleep(${asyncTimeout}); ` : ""}pushToast(<Toast ... />); }
<Button onClick={onClick}>Click me</Button>`}</code></CardElement>


                            <CardElement type="paragraph">
                                Buttons can be styled in different colors and fill styles. You can provide a global default with <code>Context</code> objects, like <code>ProvideDefaultButtonFill</code>.
                            </CardElement>
                            <CardElement>
                                <ButtonGroup>
                                    <ButtonGroupChild index={0} onClick={() => setButtonsFill("fill")} pressed={buttonsFill === "fill"} colorVariant="primary">Fill</ButtonGroupChild>
                                    <ButtonGroupChild index={1} onClick={() => setButtonsFill("outline")} pressed={buttonsFill === "outline"} colorVariant="primary">Outline</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>
                            <CardElement>
                                <ButtonGroup>
                                    <ButtonGroupChild index={0} colorVariant="primary" pressed={buttonsColor == "primary"} onClick={() => setButtonsColor("primary")}>Primary</ButtonGroupChild>
                                    <ButtonGroupChild index={1} colorVariant="secondary" pressed={buttonsColor == "secondary"} onClick={() => setButtonsColor("secondary")}>Secondary</ButtonGroupChild>
                                    <ButtonGroupChild index={2} colorVariant="success" pressed={buttonsColor == "success"} onClick={() => setButtonsColor("success")}>Success</ButtonGroupChild>
                                    <ButtonGroupChild index={3} colorVariant="warning" pressed={buttonsColor == "warning"} onClick={() => setButtonsColor("warning")}>Warning</ButtonGroupChild>
                                    <ButtonGroupChild index={4} colorVariant="danger" pressed={buttonsColor == "danger"} onClick={() => setButtonsColor("danger")}>Danger</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>
                            <CardElement>
                                <Button>Variant button</Button>
                            </CardElement>
                            <CardElement><code>{`<Button fillVariant="${buttonsFill}" colorVariant="${buttonsColor}">Variant button</Button>`}</code></CardElement>


                        </Card>
                    </div>
                </ProvideDefaultButtonColor>
            </ProvideDefaultButtonSize>
        </ProvideDefaultButtonFill>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

