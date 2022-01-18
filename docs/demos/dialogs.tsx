import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { ZoomFade } from "preact-transition";
import { Button, ButtonGroup, ButtonGroupChild } from "../../button";
import { Card, CardElement } from "../../card/card";
import { BootstrapIcon } from "../../icon";
import { Checkbox, InputGrid, InputGroup, InputGroupText, Radio, RadioGroup } from "../../input-group";
import { GridStatic } from "../../layout";
import { Dialog, usePushDialog } from "../../dialog";
import { Toast, usePushToast } from "../../toast";
import { Tooltip } from "../../tooltip";
import { StateUpdater } from "preact/hooks";

export function DemoDialogs() {
    const [show, setShow] = useState<(() => Promise<void>) | null>(null);
    const [align, setAlign] = useState<"start" | "end">("start");
    const [side, setSide] = useState<"inline-start" | "inline-end" | "block-start" | "block-end">("block-end");

    const [toggleOn, setToggleOn] = useState(false);

    const [asyncTimeout, setAsyncTimeout] = useState(3000);
    const [usesAsync, setUsesAsync] = useState(true);
    const [asyncFails, setAsyncFails] = useState(false);
    const [usesLinkButton, setUsesLinkButton] = useState(true);
    const [forceOpen, setForceOpen] = useState(true);

    const pushDialog = usePushDialog();
    const onPressAsync = () => pushDialog(<Dialog descriptive={false}>Dialog item was clicked</Dialog>);


    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Dialogs</CardElement>
                <CardElement>
                    <Button onPress={() => pushDialog(<Dialog descriptive={false}>This is a dialog!</Dialog>)}>Open a dialog</Button>
                </CardElement>

                <CardElement>
                    <code>&lt;Dialog&gt;</code>s are a way to show the user (read: force the user to at least skim) some amount of information or other content.
                    They can either be controlled or uncontrolled; controlled <code>&lt;Dialog&gt;</code>s take <code>open</code> and <code>onClose</code> props, while uncontrolled <code>&lt;Dialog&gt;</code>s give you a <code>async show()</code> function to call, or can be used from <code>useShowDialog</code>.
                </CardElement>
                <CardElement>
                    <Button onPress={onPressAsync}><code>usePushDialog</code></Button>
                </CardElement>
                <CardElement>
                    <Button onPress={show ?? undefined}><code>&lt;Dialog provideShow={"{provideShow}"} /&gt;</code></Button>
                    <Dialog descriptive={false} provideShow={setShow as StateUpdater<() => Promise<void>>}>This is a dialog</Dialog>
                </CardElement>
                <CardElement>

                    The easiest way to use them is via the <code>useShowDialog</code> hook.
                    Pass the returned <code>showDialog</code> function a <code>&lt;Dialog&gt;</code> and it will be shown on the screen, with the function returning a promise that resolves when <code>onClose</code> would be called (if you pass your own <code>onClose</code> you will override this behavior which can be used if you need to prevent the dialog from closing when clicking the backdrop; use a <code>&lt;CloseDialogButton&gt;</code> or within your own component pass <code>useCloseDialog</code>'s returned function to close the dialog during your own <code>onClose</code>).
                </CardElement>
                <CardElement>
                    All components that use Portals to position themselves on the body will reposition themselves with the dialog as their parent instead, ensuring they still work as expected.
                </CardElement>
                <CardElement>
                    <Button onPress={() => pushDialog(<Dialog descriptive={false}>This is a dialog!</Dialog>)}>Open a dialog</Button>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

