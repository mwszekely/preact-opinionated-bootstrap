import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { Button, ButtonGroup, ButtonGroupChild } from "../../button";
import { Card, CardElement } from "../../card/card";
import { Checkbox, InputGrid, InputGroup, InputGroupText, Radio, RadioGroup } from "../../input-group";
import { GridStatic } from "../../layout";
import { Menu, MenuItem } from "../../menu";
import { Toast, usePushToast } from "../../toast";
import { Tooltip } from "../../tooltip";

export function DemoMenus() {
    const [align, setAlign] = useState<"start" | "end">("start");
    const [side, setSide] = useState<"inline-start" | "inline-end" | "block-start" | "block-end">("block-end");

    const [toggleOn, setToggleOn] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);
    const [asyncFails, setAsyncFails] = useState(false);
    const [usesLinkButton, setUsesLinkButton] = useState(true);
    const [forceOpen, setForceOpen] = useState(true);

    const pushToast = usePushToast();
    const onPressSync = () => pushToast(<Toast>Menu item was clicked</Toast>);
    const onPressAsync = async () => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Button operation failed.");
        else
            onPressSync();
    }
    const onPress = usesAsync ? onPressAsync : onPressSync;

    const onToggleInputAsync = async (b: boolean) => {
        await sleep(asyncTimeout);
        if (asyncFails)
            throw new Error("Button operation failed.");
        else
            setToggleOn(b);
    }
    const onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;


    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Menus</CardElement>
                <CardElement>
                    <Menu anchor={<Button>I'm a menu</Button>}>
                        <MenuItem index={0} onPress={onPressAsync}>A: Item 1</MenuItem>
                        <MenuItem index={1} onPress={onPressAsync}>B: Item 2</MenuItem>
                        <MenuItem index={2} onPress={onPressAsync}>C: Item 3</MenuItem>
                        <MenuItem index={3}>I'm static</MenuItem>
                    </Menu>

                </CardElement>

                <CardElement>
                    <code>&lt;Menu&gt;</code>s are effectively popup <code>&lt;List&gt;</code>s.
                    This gives them all the usual list stuff like keyboard navigation (either with the arrow keys or by typing the text content of the <code>&lt;MenuItem&gt;</code>), <Tooltip side="block-end" mouseoverDelay={0} tooltip="Just like this tooltip">with the popup logic handled by <a href="https://popper.js.org/">Popper</a></Tooltip>.
                </CardElement>

                <CardElement><code>{`<Menu anchor={<Button>I'm a menu</Button>}>
    <MenuItem index={0} onPress={onPress}>A: Item 1</MenuItem>
    <MenuItem index={1} onPress={onPress}>B: Item 2</MenuItem>
    <MenuItem index={2} onPress={onPress}>C: Item 3</MenuItem>
    <MenuItem index={3}>I'm static</MenuItem>
</Menu>`}</code></CardElement>
                <hr />
                <CardElement type="subtitle" tag="h3">Structure</CardElement>

                <CardElement>
                    A <code>&lt;Menu&gt;</code> requires both a selection of <code>&lt;MenuItem&gt;</code>s and also an <code>anchor</code>, provided by the prop of the same name.  By default, it's assumed that this will be a component that acceps an <code>onPress</code> event handler, like <code>&lt;Button&gt;</code>s do.  If you need to use a different event handler (such as <code>onClick</code>, if your menu isn't tied to a <code>&lt;Button&gt;</code>), you can pass the name of the prop to use instead to <code>&lt;anchorEventName&gt;</code>
                </CardElement>

                <hr />
                <CardElement type="subtitle" tag="h3">Positioning</CardElement>

                <CardElement type="paragraph">
                    A menu's position is, by default, at the start of the line and the bottom of the block (the bottom left corner for this writing mode).
                    You can manipulate this with the <code>side</code> and <code>align</code> props.
                </CardElement>
                <CardElement type="paragraph">
                    The menu will also automatically flip when reaching the edge of the viewport.
                </CardElement>

                <CardElement>

                    <RadioGroup label="Alignment" labelPosition="start" name="menu-demo-1-align" selectedValue={align} onValueChange={setAlign as any}>
                        <InputGrid>
                            <InputGroup><Radio index={0} value="start">Start</Radio></InputGroup>
                            <InputGroup><Radio index={1} value="end">End</Radio></InputGroup>
                        </InputGrid>
                    </RadioGroup>

                    <InputGroup><Checkbox checked={forceOpen} onCheck={setForceOpen}>Keep menu open</Checkbox></InputGroup>
                </CardElement>

                <CardElement>

                    <GridStatic columns={3}>
                        <div />
                        <Button colorVariant="secondary" pressed={side === "block-start"} onPressToggle={(pressed) => void (pressed && setSide("block-start"))}>Block start</Button>
                        <div />

                        <Button colorVariant="secondary" pressed={side === "inline-start"} onPressToggle={(pressed) => void (pressed && setSide("inline-start"))}>Inline start</Button>
                        <Menu anchor={<Button dropdownVariant="combined">Anchored menu</Button>} side={side} align={align} forceOpen={forceOpen}>
                            <MenuItem index={0} onPress={onPressAsync}>A: Item 1</MenuItem>
                            <MenuItem index={1} onPress={onPressAsync}>B: Item 2</MenuItem>
                            <MenuItem index={2} onPress={onPressAsync}>C: Item 3</MenuItem>
                            <MenuItem index={3}>I'm static</MenuItem>
                        </Menu>
                        <Button colorVariant="secondary" pressed={side === "inline-end"} onPressToggle={(pressed) => void (pressed && setSide("inline-end"))}>Inline end</Button>
                        <div />
                        <Button colorVariant="secondary" pressed={side === "block-end"} onPressToggle={(pressed) => void (pressed && setSide("block-end"))}>Block end</Button>
                        <div />

                    </GridStatic>
                </CardElement>
                <CardElement>
                    <code>{`<Menu anchor={<Button>Menu</Button>} side="${side}" align="${align}">
    {...}
</Menu>`}</code>
                </CardElement>

                <hr />
                <CardElement type="subtitle" tag="h3">Transitions</CardElement>
                <CardElement tag="div">
                    By default, <code>&lt;Menu&gt;</code>s use a <code>&lt;ZoomFade&gt;</code> as their transition. This can be customized by doing the following:
                    <ul>
                        <li>Provide a <code>Transition</code> prop.</li>
                        <li>The <code>&lt;Menu&gt;</code> now accepts the same props as the transition component you passed in, with some key differences:</li>
                        <li>Any props that this <code>Transition</code> takes with both inline and block components, like <code>fooInline</code> and <code>fooBlock</code>, are now replaced with <code>fooDynamic</code>, which is relative to the location of the anchor to the menu.</li>
                        <li>The menu will, based on the position of the anchor and current position of the menu, turn <code>fooDynamic</code> into <code>fooInline</code> or <code>fooBlock</code>, optionally negated (<code>1 - fooDynamic</code>) if the menu is flipped because it's near the edge of the viewport.</li>
                    </ul>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

