import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { Button, ButtonColorVariant, ButtonGroup, ButtonGroupChild, ProvideDefaultButtonColor, ProvideDefaultButtonDisabled, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../../button";
import { Card, CardElement } from "../../card/card";
import { InputGrid, Checkbox, Input, InputGroup } from "../../input-group";
import { Toast, usePushToast } from "../../toast";

export function DemoButtons() {
    const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("outline");
    const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");
    const [buttonsColor, setButtonsColor] = useState<ButtonColorVariant>("primary");
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [toggleOn, setToggleOn] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState<number | null>(3000);
    const [usesAsync, setUsesAsync] = useState(true);
    const [asyncFails, setAsyncFails] = useState(false);
    const [usesLinkButton, setUsesLinkButton] = useState(true);

    const pushToast = usePushToast();
    const onPressSync = () => void (pushToast(<Toast>Button was clicked</Toast>));
    const onPressAsync = async () => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Button operation failed.");
        else
            onPressSync();
    }
    const onPress = usesAsync ? onPressAsync : onPressSync;

    const onToggleInputAsync = async (b: boolean) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("Button operation failed.");
        else
            setToggleOn(b);
    }
    const onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;

    return (
        <ProvideDefaultButtonFill value={buttonsFill}>
            <ProvideDefaultButtonSize value={buttonsSize}>
                <ProvideDefaultButtonColor value={buttonsColor}>
                    <div class="demo">
                        <Card>
                            <CardElement type="title" tag="h2">Buttons</CardElement>
                            <CardElement><Button onPress={onPress}>I'm a button</Button></CardElement>

                            <CardElement>
                                A <code>Button</code> is a <code>Button</code> is a <code>Button</code> &ndash; you can click, tap, or Space-key it to activate it and do something.  If the given action is asynchronous, then the button will disable itself and display a spinner during the operation.
                            </CardElement>

                            <CardElement type="subtitle" tag="h3">Async inputs</CardElement>

                            <CardElement>
                                The <code>onPress</code> event handler for buttons can be sync or async, and they will react appropriately if the operation takes long enough.
                                <InputGrid>
                                    <InputGroup><Checkbox onCheck={setUsesAsync} checked={usesAsync} labelPosition="start">Use async handler</Checkbox></InputGroup>
                                    <InputGroup><Checkbox onCheck={setAsyncFails} checked={asyncFails} labelPosition="start" disabled={!usesAsync}>Async handler rejects</Checkbox></InputGroup>
                                    <InputGroup><Input width="8ch" disabled={!usesAsync} type="number" onValueChange={setAsyncTimeout} value={asyncTimeout}>Async timeout</Input></InputGroup>
                                </InputGrid>
                            </CardElement>
                            <CardElement >
                                <Button onPress={onPress}>Click me</Button>
                            </CardElement>

                            <CardElement type="paragraph"><code>{`const onPress = ${usesAsync ? `async ` : ""}() => { ${usesAsync ? `await sleep(${asyncTimeout}); ` : ""}pushToast(<Toast ... />); }
<Button onPress={onPress}>Click me</Button>`}</code></CardElement>

                            <hr />

                            <CardElement type="subtitle" tag="h3">Color, fill, &amp; size</CardElement>

                            <CardElement type="paragraph">
                                Buttons can be styled in different sizes, colors, and fill styles. You can provide a global default with <code>Context</code> objects, like <code>&lt;ProvideDefaultButtonFill&gt;</code>.
                            </CardElement>
                            <CardElement>
                                All the normal Bootstrap colors are provided, albeit with adjustments to outlined buttons to ensure correct contrast ratios on the theme's body BG color.  Additionally, besides the `light` and `dark` colors, `subtle` and `contrast` are available as colors to use that simply map onto `light` or `dark` depending on the body BG color.
                            </CardElement>
                            <CardElement>
                                <ButtonGroup>
                                    <ButtonGroupChild index={0} onPressToggle={() => setButtonsSize("sm")} pressed={buttonsSize === "sm"}>Small</ButtonGroupChild>
                                    <ButtonGroupChild index={1} onPressToggle={() => setButtonsSize("md")} pressed={buttonsSize === "md"}>Medium</ButtonGroupChild>
                                    <ButtonGroupChild index={2} onPressToggle={() => setButtonsSize("lg")} pressed={buttonsSize === "lg"}>Large</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>
                            <CardElement>
                                <ButtonGroup>
                                    <ButtonGroupChild index={0} onPressToggle={() => setButtonsFill("fill")} pressed={buttonsFill === "fill"}>Fill</ButtonGroupChild>
                                    <ButtonGroupChild index={1} onPressToggle={() => setButtonsFill("outline")} pressed={buttonsFill === "outline"}>Outline</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>
                            <CardElement>
                                <Checkbox checked={!!buttonsDisabled} onCheck={setButtonsDisabled}>Disabled</Checkbox>
                            </CardElement>
                            <CardElement>
                                <ButtonGroup wrap>
                                    <ButtonGroupChild index={0} colorVariant="primary" pressed={buttonsColor == "primary"} onPressToggle={() => setButtonsColor("primary")}>Primary</ButtonGroupChild>
                                    <ButtonGroupChild index={1} colorVariant="secondary" pressed={buttonsColor == "secondary"} onPressToggle={() => setButtonsColor("secondary")}>Secondary</ButtonGroupChild>
                                    <ButtonGroupChild index={2} colorVariant="success" pressed={buttonsColor == "success"} onPressToggle={() => setButtonsColor("success")}>Success</ButtonGroupChild>
                                    <ButtonGroupChild index={3} colorVariant="warning" pressed={buttonsColor == "warning"} onPressToggle={() => setButtonsColor("warning")}>Warning</ButtonGroupChild>
                                    <ButtonGroupChild index={4} colorVariant="danger" pressed={buttonsColor == "danger"} onPressToggle={() => setButtonsColor("danger")}>Danger</ButtonGroupChild>
                                    <ButtonGroupChild index={5} colorVariant="info" pressed={buttonsColor == "info"} onPressToggle={() => setButtonsColor("info")}>Info</ButtonGroupChild>
                                    <ButtonGroupChild index={6} colorVariant="light" pressed={buttonsColor == "light"} onPressToggle={() => setButtonsColor("light")}>Light</ButtonGroupChild>
                                    <ButtonGroupChild index={7} colorVariant="dark" pressed={buttonsColor == "dark"} onPressToggle={() => setButtonsColor("dark")}>Dark</ButtonGroupChild>
                                    <ButtonGroupChild index={8} colorVariant="contrast" pressed={buttonsColor == "contrast"} onPressToggle={() => setButtonsColor("contrast")}>Contrast</ButtonGroupChild>
                                    <ButtonGroupChild index={9} colorVariant="subtle" pressed={buttonsColor == "subtle"} onPressToggle={() => setButtonsColor("subtle")}>Subtle</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>
                            <CardElement>
                                <Button onPress={onPress} disabled={buttonsDisabled}>{buttonsFill === "fill" ? "Filled" : "Outlined"} {buttonsColor} button</Button>
                            </CardElement>
                            <CardElement><code>{`<Button fillVariant="${buttonsFill}" colorVariant="${buttonsColor}">Variant button</Button>`}</code></CardElement>

                            <hr />

                            <CardElement type="subtitle" tag="h3">Link buttons</CardElement>

                            <CardElement>
                                A link can be styled as a button while retaining native link functionality (middle clicks, etc.).
                                These buttons have no <code>onPress</code> handler, instead taking <code>href</code> and the other <code>&lt;a&gt;</code> props.
                            </CardElement>
                            <CardElement>
                                A <code>&lt;Button&gt;</code> will use an anchor link internally if you provide it with an <code>href</code> prop, or optionally setting the <code>tag</code> prop to <code>a</code>.
                                <InputGroup><Checkbox onCheck={setUsesLinkButton} checked={usesLinkButton} labelPosition="start">Use link button</Checkbox></InputGroup>
                            </CardElement>
                            <CardElement>
                                {usesLinkButton ? <Button  disabled={buttonsDisabled} target="_blank" href="https://www.example.com" fillVariant={buttonsFill}>example.com <i class="bi bi-box-arrow-up-right"></i></Button> : <Button onPress={onPress}  disabled={buttonsDisabled} fillVariant={buttonsFill}>Regular button</Button>}
                            </CardElement>

                            <CardElement type="paragraph"><code>{usesLinkButton ? `<Button href="https://www.example.com">Link button</Button>` : `<Button onPress={onPress}>Regular button</Button>`}</code></CardElement>
                            <CardElement>Keep in mind that styling a link as a button can cause confusion even while being completely compliant ("🧑‍💻 click on the link" "😖 what link??"), so be sure to use with a decent amount of caution.</CardElement>
                            


                            <hr />

                            <CardElement type="subtitle" tag="h3">Toggle buttons</CardElement>

                            <CardElement>
                                If given a <code>pressed</code> prop, a button will become a toggle button, with an off/on state.  It will style itself as outlined when unpressed, and filled when pressed, so they are best used in groups.
                            </CardElement>
                            <CardElement>
                                <Button pressed={toggleOn} onPressToggle={onToggleInput} disabled={buttonsDisabled}>Toggle button</Button>
                            </CardElement>

                            <CardElement type="paragraph"><code>{`<Button pressed={pressed} onPressToggle={onInput}>Toggle button</Button>`}</code></CardElement>

                            <hr />

                            <CardElement type="subtitle" tag="h3">Button Groups</CardElement>

                            <CardElement>
                                A <code>&lt;ButtonGroup&gt;</code> can be used to group a set of <code>&lt;ButtonGroupChild&gt;</code> (which is the exact same as a <code>&lt;Button&gt;</code>, but with an <code>index</code> prop). This gives them keyboard navigation abilities.
                            </CardElement>
                            <CardElement >
                                <ButtonGroup wrap>
                                    <ButtonGroupChild index={0} disabled={buttonsDisabled} fillVariant={buttonsFill} colorVariant={buttonsColor} onPress={onPress}>First button</ButtonGroupChild>
                                    <ButtonGroupChild index={1} disabled={buttonsDisabled} fillVariant={buttonsFill} colorVariant={buttonsColor} onPress={onPress}>Second button</ButtonGroupChild>
                                    <ButtonGroupChild index={2} disabled={buttonsDisabled} fillVariant={buttonsFill} colorVariant={buttonsColor} onPress={onPress}>Third button</ButtonGroupChild>
                                    <ButtonGroupChild index={3} disabled={buttonsDisabled} fillVariant={buttonsFill} colorVariant={buttonsColor} onPress={onPress}>Fourth button</ButtonGroupChild>
                                </ButtonGroup>
                            </CardElement>

                            <CardElement type="paragraph"><code>{`<ButtonGroup wrap>
    <ButtonGroupChild index={0}>First button</ButtonGroupChild>
    <ButtonGroupChild index={1}>Second button</ButtonGroupChild>
    <ButtonGroupChild index={2}>Third button</ButtonGroupChild>
    <ButtonGroupChild index={3}>Fourth button</ButtonGroupChild>
    <ButtonGroupChild index={4}>Fifth button</ButtonGroupChild>
    <ButtonGroupChild index={5}>Sixth button</ButtonGroupChild>
    <ButtonGroupChild index={6}>Seventh button</ButtonGroupChild>
    <ButtonGroupChild index={7}>Eighth button</ButtonGroupChild>
</ButtonGroup>`}</code></CardElement>


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

