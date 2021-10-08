import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { Button } from "../../button";
import { Card, CardElement } from "../../card/card";
import { GridStatic } from "../../layout";
import { Menu, MenuItem } from "../../menu";
import { Toast, usePushToast } from "../../toast";

export function DemoMenus() {
    const [positionInline, setPositionInline] = useState<"start" | "end">("start");
    const [positionBlock, setPositionBlock] = useState<"start" | "end">("end");

    const [toggleOn, setToggleOn] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);
    const [asyncFails, setAsyncFails] = useState(false);
    const [usesLinkButton, setUsesLinkButton] = useState(true);

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
                    This gives them all the usual list stuff like keyboard navigation (either with the arrow keys or by typing the text content of the <code>&lt;MenuItem&gt;</code>), with the popup logic handled by <a href="https://popper.js.org/">Popper</a>.
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
                    You can manipulate this with the <code>inlinePosition</code> and <code>blockPosition</code> props.
                </CardElement>
                <CardElement type="paragraph">
                    The menu will also automatically flip when reaching the edge of the viewport.
                </CardElement>

                <CardElement>
                    <GridStatic columns={3}>
                        <div />
                        <Button colorVariant="secondary" pressed={positionBlock === "start"} onPressToggle={(pressed) => void (pressed && setPositionBlock("start"))}>Block start</Button>
                        <div />

                        <Button colorVariant="secondary" pressed={positionInline === "start"} onPressToggle={(pressed) => void (pressed && setPositionInline("start"))}>Inline start</Button>
                        <Menu anchor={<Button>Anchored menu</Button>} positionBlock={positionBlock} positionInline={positionInline}>
                            <MenuItem index={0} onPress={onPressAsync}>A: Item 1</MenuItem>
                            <MenuItem index={1} onPress={onPressAsync}>B: Item 2</MenuItem>
                            <MenuItem index={2} onPress={onPressAsync}>C: Item 3</MenuItem>
                            <MenuItem index={3}>I'm static</MenuItem>
                        </Menu>
                        <Button colorVariant="secondary" pressed={positionInline === "end"} onPressToggle={(pressed) => void (pressed && setPositionInline("end"))}>Inline end</Button>

                        <div />
                        <Button colorVariant="secondary" pressed={positionBlock === "end"} onPressToggle={(pressed) => void (pressed && setPositionBlock("end"))}>Block end</Button>
                        <div />

                    </GridStatic>
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

