
import { cloneElement, Fragment, h, Ref, render, VNode } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Button } from './button/component';
import { ProvideDefaultButtonFill, ProvideDefaultButtonSize } from './button/defaults';
import { DropdownButton, DropdownMenuHeader, DropdownMenuItem } from './dropdown/component';


// @ts-ignore
import { ButtonGroup } from './button-group/component';
import { Popover, Tooltip } from './tooltip/component';
(window as any).process = { env: {} };
import { Page, Pagination } from './pagination/component';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './table';
import { InputNumber, InputRange, InputText } from './forms/form-controls/component';
import { InputGroup, InputGroupText } from './input-group/component';
import { ListGroup, ListGroupItem } from './list-group/component';
import { forwardElementRef, useAsyncEventHandler } from 'preact-async-input';
import { useError, useIsFulfilled, useIsPending, useLatestValue } from 'preact-async-input/src/use-async-event-handler';
import { Label, ProvideLabel } from './forms/label';
import { Checkbox } from './forms/checkbox/component';
import { Fade, SwapContainer } from 'preact-transition/src';
import { TabsUncontrolled, Tab, TabLabel, TabPanel, TabsControlled } from './tabs/component';
import { Transition } from 'preact-transition/src/use-transition';
import { clsx } from './bootstrap-classes';
import { Radio, RadioGroup } from './forms/radio/component';
import { Switch } from './forms/switch/component';
import { CheckboxButton, RadioButton, RadioButtonGroup } from './forms/toggle-button/component';
import { ButtonColor, ButtonVariant } from './button/types';
import { Badge } from './badge/component';
import { Dialog, DialogBody, DialogFooter, DialogHeader, useShowDialog } from './dialog';
import { LinearProgress, Spinner } from './progress';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "./offcanvas";
import { Toast, ToastBody, ToastHeader, ToastManager, usePushToast } from './toast';
import { ErrorToast, ErrorToastProvider } from './toast/error';


//console.log([Dropdown, BSButton, Alert, Carousel, Collapse, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, BSTooltip,]);



const SubAppTooltips = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {


    const [hover, setHover] = useState(true);
    const [focus, setFocus] = useState(true);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const trigger = `${hover ? "hover " : ""}${focus ? "focus " : ""}${click ? "click " : ""}`.trim() || "manual";

    return (
        <div {...props} className={clsx("d-flex", "flex-column", "align-items-start", "gap-3", className)} ref={ref}>

            <h4>Tooltips</h4>
                <div>
                    <InputGroup>
                    <InputGroupText>Open on</InputGroupText>
                        <CheckboxButton checked={hover} onInput={setHover}>Hover</CheckboxButton>
                        <CheckboxButton checked={focus} onInput={setFocus}>Focus</CheckboxButton>
                        <CheckboxButton checked={click} onInput={setClick}>Click</CheckboxButton>
                        <CheckboxButton checked={open} onInput={setOpen}>Manually open</CheckboxButton>
                    </InputGroup>
                </div>
            <div className={clsx("d-flex", "justify-content-center", "w-100", "mt-5", "flex-column", "align-items-center", "gap-3",)}>
                <div>
                    <Tooltip open={open || undefined} tooltip="Tooltip content" placement="bottom top" trigger={trigger as any}>
                        <Button>Tooltip</Button>
                    </Tooltip>
                </div>
                <div>
                    <Popover open={open || undefined} header="Header" body={"Popover body"} placement="end bottom top" trigger={trigger as any}>
                        <Button>Tooltip</Button>
                    </Popover>
                </div>
            </div>
        </div>
    )
});


const SubAppDialog = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "max">("md");
    const [longContent, setLongContent] = useState(false);

    const controls =
        <>
            <ButtonGroup orientation="vertical">
                <RadioButtonGroup value={size} onInput={setSize as (s: string) => any}>
                    <RadioButton value="sm">Small (300px)</RadioButton>
                    <RadioButton value="md">Medium (500px)</RadioButton>
                    <RadioButton value="lg">Large (800px)</RadioButton>
                    <RadioButton value="xl">Extra Large (1140px)</RadioButton>
                    <RadioButton value="max">Max (vw-based)</RadioButton>
                </RadioButtonGroup>
            </ButtonGroup>
            <InputGroup>
                <Checkbox checked={longContent} onInput={setLongContent}>Long demo content</Checkbox>
            </InputGroup>
        </>;

    const dialogBodyContents = <>
        <div className={clsx("d-flex", "flex-column", "align-items-start", "gap-3")}>
            <p>This is a dialog</p>
            {controls}
            {longContent && Array.from((function* () {
                for (let i = 0; i < 20; ++i) {
                    yield <p key={i}>Paragraph #{i + 1}</p>
                }
            })())}
        </div>
    </>

    const { jsx, showDialog } = useShowDialog((close) => ({
        size,
        children: <>
            <DialogHeader>Dialog title</DialogHeader>
            <DialogBody>{dialogBodyContents}</DialogBody>
            <DialogFooter>
                <Button onClick={() => close("other")}>Close</Button>
            </DialogFooter>
        </>
    }));

    const ref2 = useRef<HTMLButtonElement>(null);


    return (
        <div {...props} className={clsx("d-flex", "flex-column", "align-items-start", "gap-3", className)} ref={ref}>
            {controls}
            <h4>Controlled</h4>
            <div className={clsx("d-flex")}>
                <Checkbox checked={open} onInput={setOpen}>Dialog open</Checkbox>
                <Dialog open={open} size={size} onClose={() => { }}>
                    <DialogHeader>Dialog title</DialogHeader>
                    <DialogBody>{dialogBodyContents}</DialogBody>
                    <DialogFooter>
                        <Checkbox checked={open} onInput={setOpen}>Dialog open</Checkbox>
                    </DialogFooter>
                </Dialog>
            </div>

            <h4>Uncontrolled</h4>
            <div className={clsx("d-flex")}>
                <Button ref={ref2} onClick={() => showDialog().then(() => { })}>Open Dialog</Button>
                {jsx}
            </div>

            <h4>Drawer</h4>
            <div className={clsx("d-flex")}>
                <Button onClick={() => setOpen2(true)}>Open Drawer</Button>
                <Offcanvas position="start" modal open={open2} onClose={() => setOpen2(false)}>
                    <OffcanvasHeader>Header</OffcanvasHeader>
                    <OffcanvasBody>
                        <div>
                            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                        </div>
                        <div>
                            <DropdownButton align="start" variant="secondary" menuContents={<>
                                <DropdownMenuItem index={0}><a className="dropdown-item" href="#">Action</a></DropdownMenuItem>
                                <DropdownMenuItem index={1}><a className="dropdown-item" href="#">Another action</a></DropdownMenuItem>
                                <DropdownMenuItem index={2}><a className="dropdown-item" href="#">Something else here</a></DropdownMenuItem>
                            </>}>
                                Dropdown button
                            </DropdownButton>
                        </div>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <DropdownButton align="start" variant="secondary" menuContents={<>
                            <DropdownMenuItem index={0}><a className="dropdown-item" href="#">Action</a></DropdownMenuItem>
                            <DropdownMenuItem index={1}><a className="dropdown-item" href="#">Another action</a></DropdownMenuItem>
                            <DropdownMenuItem index={2}><a className="dropdown-item" href="#">Something else here</a></DropdownMenuItem>
                        </>}>
                            Dropdown button
                        </DropdownButton>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <p>A</p>
                        <DropdownButton align="start" variant="secondary" menuContents={<>
                            <DropdownMenuItem index={0}><a className="dropdown-item" href="#">Action</a></DropdownMenuItem>
                            <DropdownMenuItem index={1}><a className="dropdown-item" href="#">Another action</a></DropdownMenuItem>
                            <DropdownMenuItem index={2}><a className="dropdown-item" href="#">Something else here</a></DropdownMenuItem>
                        </>}>
                            Dropdown button
                        </DropdownButton>
                    </OffcanvasBody>
                </Offcanvas>
            </div>


        </div>
    )
});


const SubApp1 = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {
    const [a, setA2] = useState(0);
    const [throwError, setThrowError] = useState(false);

    const setA = useCallback((a: number) => new Promise<void>((resolve, reject) => setTimeout(() => {
        if (throwError) {
            reject(new Error(Math.random() < 0.5 ? "Didn't successfully succeed" : "Didn't succeed successfully"));
            return;
        }
        else {
            resolve();
            setA2(a);
        };
    }, 1000)), [throwError]);
    const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("fill");
    const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");

    const showToast = usePushToast();

    const showButtonToast = useCallback(() => {
        showToast(<Toast timeout={3000}><ToastHeader>Button toast</ToastHeader><ToastBody>You clicked a button</ToastBody></Toast>)
    }, [showToast])


    return (
        <div {...props} className={clsx("d-flex", "flex-column", "gap-3", className)} ref={ref}>
            <InputGroup><Checkbox checked={throwError} onInput={setThrowError}>Each element's onInput throws</Checkbox></InputGroup>
            <h4>Checkboxes</h4>
            <div className={clsx("d-flex")}>
                <Checkbox checked={a == 0} onInput={(c) => c ? setA(0) : void (0)} >Label 0</Checkbox>
                <Checkbox checked={a == 1} onInput={(c) => c ? setA(1) : void (0)} >Label 1</Checkbox>
                <Checkbox checked={a == 2} onInput={(c) => c ? setA(2) : void (0)} >Label 2</Checkbox>
            </div>

            <h4>Radios</h4>
            <div className={clsx("d-flex")}>
                <RadioGroup name="test-group" value={a.toString()} onInput={(v) => setA(parseInt(v))}>
                    <Radio value="0">Label 0</Radio>
                    <Radio value="1">Label 1</Radio>
                    <Radio value="2">Label 2</Radio>
                </RadioGroup>
            </div>

            <h4>Switches</h4>
            <div className={clsx("d-flex")}>
                <Switch checked={a == 0} onInput={(c) => c ? setA(0) : void (0)} >Label 0</Switch>
                <Switch checked={a == 1} onInput={(c) => c ? setA(1) : void (0)} >Label 1</Switch>
                <Switch checked={a == 2} onInput={(c) => c ? setA(2) : void (0)} >Label 2</Switch>
            </div>


            <h4>Buttons</h4>
            <InputGroup className={clsx("align-self-start")}>
                <ProvideLabel label="Fill style" position="before">
                    <RadioButtonGroup value={buttonsFill} onInput={setButtonsFill as (e: string) => any}>
                        <RadioButton value={"fill"}>Filled</RadioButton>
                        <RadioButton value={"outline"}>Outlined</RadioButton>
                    </RadioButtonGroup>
                </ProvideLabel>
            </InputGroup>
            <InputGroup className={clsx("align-self-start")}>
                <ProvideLabel label="Size" position="before">
                    <RadioButtonGroup value={buttonsSize} onInput={setButtonsSize as (e: string) => any}>
                        <RadioButton value={"sm"}>Small</RadioButton>
                        <RadioButton value={"md"}>Medium</RadioButton>
                        <RadioButton value={"lg"}>Large</RadioButton>
                    </RadioButtonGroup>
                </ProvideLabel>
            </InputGroup>
            <hr />
            <div className={clsx("d-flex")}>
                <ProvideDefaultButtonFill value={buttonsFill}>
                    <ProvideDefaultButtonSize value={buttonsSize}>
                        <Button onClick={showButtonToast} variant="primary">Primary</Button>
                        <Button onClick={showButtonToast} variant="secondary">Secondary</Button>
                        <Button onClick={showButtonToast} variant="success">Success</Button>
                        <Button onClick={showButtonToast} variant="warning">Warning</Button>
                        <Button onClick={showButtonToast} variant="danger">Danger</Button>
                        <Button onClick={showButtonToast} variant="info">Info</Button>
                        <Button onClick={showButtonToast} variant="light">Light</Button>
                        <Button onClick={showButtonToast} variant="dark">Dark</Button>
                        <Button onClick={showButtonToast} variant="link">Link</Button>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </div>

            <div className={clsx("d-flex")}>
                <ProvideDefaultButtonFill value={buttonsFill}>
                    <ProvideDefaultButtonSize value={buttonsSize}>
                        <ButtonGroup>
                            <Button onClick={showButtonToast} variant="primary">Primary</Button>
                            <Button onClick={showButtonToast} variant="secondary">Secondary</Button>
                            <Button onClick={showButtonToast} variant="success">Success</Button>
                            <Button onClick={showButtonToast} variant="warning">Warning</Button>
                            <Button onClick={showButtonToast} variant="danger">Danger</Button>
                            <Button onClick={showButtonToast} variant="info">Info</Button>
                            <Button onClick={showButtonToast} variant="light">Light</Button>
                            <Button onClick={showButtonToast} variant="dark">Dark</Button>
                            <Button onClick={showButtonToast} variant="link">Link</Button>
                        </ButtonGroup>
                    </ProvideDefaultButtonSize>
                </ProvideDefaultButtonFill>
            </div>

            <h4>Checkbox Buttons</h4>
            <div className={clsx("d-flex")}>
                <ButtonGroup>
                    <CheckboxButton checked={a == 0} onInput={(c) => c ? setA(0) : void (0)} >0</CheckboxButton>
                    <CheckboxButton checked={a == 1} onInput={(c) => c ? setA(1) : void (0)} >1</CheckboxButton>
                    <CheckboxButton checked={a == 2} onInput={(c) => c ? setA(2) : void (0)} >2</CheckboxButton>
                </ButtonGroup>
            </div>

            <h4>Radio Buttons</h4>
            <div className={clsx("d-flex")}>
                <ButtonGroup>
                    <RadioGroup name="test-group2" value={a.toString()} onInput={(v) => setA(parseInt(v))}>
                        <RadioButton value="0">0</RadioButton>
                        <RadioButton value="1">1</RadioButton>
                        <RadioButton value="2">2</RadioButton>
                    </RadioGroup>
                </ButtonGroup>
            </div>
            <div className={clsx("d-flex")}>
            </div>

            <div className={clsx("d-flex")}>
                <InputRange min={0} max={2} value={a} onInput={setA} label="test range" />
            </div>


        </div>
    )
});

const SubApp2 = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {
    const [text, setA2] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const setText = useCallback((a: string) => new Promise<void>(resolve => setTimeout(() => { resolve(); setA2(a); }, 1000)), [])
    return (
        <div {...props} className={clsx("d-flex", "flex-column", "gap-3", className)} ref={ref}>
            <div>

                <div>
                    <ProvideDefaultButtonFill value="outline">
                        <ButtonGroup>
                            <Tooltip tooltip={"Test " + text?.toString()} placement="bottom top"><Button>Button 1</Button></Tooltip>
                            <Button pressed>Button 2</Button>
                            <Button>Button 3</Button>
                        </ButtonGroup>
                    </ProvideDefaultButtonFill>
                </div>
                <div>
                    <ListGroup>
                        <ListGroupItem index={0} onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 1</ListGroupItem>
                        <ListGroupItem index={1} onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 2</ListGroupItem>
                        <ListGroupItem index={2} onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 3</ListGroupItem>
                    </ListGroup>
                </div>
                <div>
                    <Pagination aria-label="Current page list">
                        <Page href="#">1</Page>
                        <Page href="#" disabled>2</Page>
                        <Page href="#">3</Page>
                        <Page href="#" active>4</Page>
                        <Page href="#">5</Page>
                    </Pagination>
                </div>
                <div>
                    <ProvideLabel position="before" label={<>Test label</>}>
                        <InputGroup>
                            <InputGroupText>Text: {text}</InputGroupText>
                            <InputText value={text} onInput={setText} type="text" placeholder="A" childrenPost={
                                h(() => {
                                    const pending = useIsPending();
                                    const fulfilled = useIsFulfilled();
                                    const isError = (useError() != undefined)
                                    return (
                                        <InputGroupText>
                                            <SwapContainer>
                                                <div>
                                                    <Fade open={pending}><Spinner /></Fade>
                                                    <Fade open={!pending && fulfilled}><div>✔️</div></Fade>
                                                    <Fade open={!pending && isError}><div>❌</div></Fade>
                                                </div>
                                            </SwapContainer>
                                        </InputGroupText>
                                    )
                                }, {})
                            } />
                        </InputGroup>
                    </ProvideLabel>
                </div>
                <div>
                    <InputGroup>
                        <ProvideLabel position="after" label={<>Test label</>}>
                            <Checkbox checked={checked} onInput={setChecked} />
                        </ProvideLabel>
                    </InputGroup>
                </div>
                <div>
                    <Table>
                        <TableHead variant="dark">
                            <TableRow>
                                <TableHeaderCell>H1</TableHeaderCell>
                                <TableHeaderCell>H2</TableHeaderCell>
                                <TableHeaderCell>H3</TableHeaderCell>
                                <TableHeaderCell>H4</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableHeaderCell>HA</TableHeaderCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                            </TableRow>
                            <TableRow variant="success">
                                <TableHeaderCell>HB</TableHeaderCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableHeaderCell>HC</TableHeaderCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
});

const SubAppBadge = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {



    return (
        <div {...props} className={clsx("d-flex", "flex-column", "gap-3", className)} ref={ref}>
            <h1>Example heading <Badge>New</Badge></h1>
            <h2>Example heading <Badge>New</Badge></h2>
            <h3>Example heading <Badge>New</Badge></h3>
            <h4>Example heading <Badge>New</Badge></h4>
            <h5>Example heading <Badge>New</Badge></h5>
            <h6>Example heading <Badge>New</Badge></h6>

            <Button>Profile <Badge>4</Badge><span className="visually-hidden">unread messages</span></Button>

        </div>
    )

});

const noop = () => { }

const SubAppList = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {

    const [index, setIndex] = useState(0);

    const colorVariant = "danger";

    return (
        <div {...props} ref={ref}>
            <div className={clsx("d-grid", "gap-3", "grid-columns-1", "grid-columns-sm-2", "grid-columns-lg-3", className)}>
                <div>
                    <h4>List</h4>
                    <ListGroup colorVariant={colorVariant}>
                        {Array.from((function* () { for (let i = 0; i < 4; ++i) yield <ListGroupItem index={i}>Item {i + 1}</ListGroupItem> })())}
                    </ListGroup>
                </div>
                <div>
                    <h4>Actionable List</h4>
                    <ListGroup colorVariant={colorVariant}>
                        {Array.from((function* () { for (let i = 0; i < 4; ++i) yield <ListGroupItem index={i} onClick={noop}>Item {i + 1}</ListGroupItem> })())}
                    </ListGroup>
                </div>
                <div>
                    <h4>Selectable List</h4>
                    <ListGroup colorVariant={colorVariant}>
                        {Array.from((function* () { for (let i = 0; i < 4; ++i) yield <ListGroupItem index={i} active={i == index} onClick={() => setIndex(i)}>Item {i + 1}</ListGroupItem> })())}
                    </ListGroup>
                </div>
            </div>
        </div>
    )

});

const SubAppDropdown = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {
    const [i, setI] = useState<number | null>(0);

    const [variant, setVariant] = useState<ButtonVariant>("primary");
    const [autoClose, setAutoClose] = useState<"inner" | "outer" | "true" | "false">("true");

    const menuContents = (
        <>
            <DropdownMenuHeader style={{ pointerEvents: "none" }}><h6>Subheader{i && (` ${i}`) || ""}</h6></DropdownMenuHeader>
            <DropdownMenuItem index={0}><Button>Item 1{i && (` + ${i}`) || ""}</Button></DropdownMenuItem>
            <DropdownMenuItem index={1}><Button>Item 2{i && (` + ${i}`) || ""}</Button></DropdownMenuItem>
            <DropdownMenuItem index={2}><a href="#">Item 2{i && (` + ${i}`) || ""}</a></DropdownMenuItem>
        </>
    )
    return (

        <div {...props} className={clsx("vh-100 vw-100", "d-flex", "justify-content-center", "align-items-center d-flex gap-3", "flex-column", className)} ref={ref}>
            <div>
                <ButtonGroup>
                    <RadioButtonGroup value={variant} onInput={setVariant as (e: string) => any}>
                        <RadioButton variant="primary" value="primary">Filled</RadioButton>
                        <RadioButton variant="primary" value="outline-primary">Outlined</RadioButton>
                    </RadioButtonGroup>
                </ButtonGroup>
            </div>
            <div>
                <InputGroup>
                    <InputGroupText>Clicking closes when</InputGroupText>
                    <RadioButtonGroup value={autoClose} onInput={setAutoClose as (e: string) => any}>
                        <RadioButton variant="primary" value="false">Never</RadioButton>
                        <RadioButton variant="primary" value="outer">Outside only</RadioButton>
                        <RadioButton variant="primary" value="inner">Inside only</RadioButton>
                        <RadioButton variant="primary" value="true">Both</RadioButton>
                    </RadioButtonGroup>
                </InputGroup>
            </div>
            <div className={clsx(`d-flex gap-3`)}>
                <div>
                    <DropdownButton autoClose={autoClose == "true" ? "both" : autoClose == "false" ? "none" : autoClose} variant={variant} align="start" direction="down" size="lg" menuContents={menuContents}>Dropdown{(i && ` ${i}`) || ""}</DropdownButton>
                    <DropdownButton autoClose={autoClose == "true" ? "both" : autoClose == "false" ? "none" : autoClose} variant={variant} align="end" direction="up" split size="lg" menuContents={menuContents}>Split Dropup{(i && ` ${i}`) || ""}</DropdownButton>
                </div>
            </div>
            <div>
                <InputGroup>
                    <ProvideLabel position="before" label="Test index">
                        <InputNumber value={i} onInput={setI} />
                    </ProvideLabel>
                </InputGroup>
            </div>
        </div>
    )
})

function errorToToastHelper(error: unknown) {
    if ("message" in (error as Error)) {
        return <div>{(error as Error).message}</div>;
    }
    return <div>{JSON.stringify(error)}</div>
}


function errorToToast(error: unknown) {
    return <ErrorToast timeout={4000}>{errorToToastHelper(error)}</ErrorToast>
}

const App = () => {

    const [i, setI] = useState(0 as number | null);


    /*useEffect(() => {
        setInterval(() => { setI(i => ++i) }, 5000)
    }, [setI]);*/

    const [text, setText] = useState<string>("");
    const [checked, setChecked] = useState(false);

    const [a, setA] = useState(0);


    return (
        <ToastManager max={3}>
            <ErrorToastProvider errorToToast={errorToToast}>
                <ProvideDefaultButtonSize value="sm">
                    <ProvideDefaultButtonFill value="fill">
                        <div className={clsx("d-grid", "gap-3", "w-100", "h-100")}>
                            <div>
                                <ProvideLabel label="Index" position="before">
                                    <InputNumber value={i} onInput={setI} />
                                </ProvideLabel>
                            </div>
                            <TabsControlled localStorageKey="test" variant="tabs" orientation="horizontal">
                                <Tab id="1">
                                    <TabLabel>Buttons &amp; Checks</TabLabel>
                                    <TabPanel>
                                        <SubApp1 />
                                    </TabPanel>
                                </Tab>
                                <Tab id="1D">
                                    <TabLabel>Dialogs</TabLabel>
                                    <TabPanel>
                                        <SubAppDialog />
                                    </TabPanel>
                                </Tab>
                                <Tab id="B">
                                    <TabLabel>Badges</TabLabel>
                                    <TabPanel>
                                        <SubAppBadge />
                                    </TabPanel>
                                </Tab>
                                <Tab id="D">
                                    <TabLabel>Dropdowns</TabLabel>
                                    <TabPanel>
                                        <SubAppDropdown />
                                    </TabPanel>
                                </Tab>
                                <Tab id="Tooltips">
                                    <TabLabel>Tooltips</TabLabel>
                                    <TabPanel>
                                        <SubAppTooltips />
                                    </TabPanel>
                                </Tab>
                                <Tab id="L">
                                    <TabLabel>Lists</TabLabel>
                                    <TabPanel>
                                        <SubAppList />
                                    </TabPanel>
                                </Tab>
                                <Tab id="3">

                                    <TabLabel>Tab 3</TabLabel>
                                    <TabPanel>

                                        <div>
                                            <Button onClick={async () => new Promise(resolve => setTimeout(() => { alert("Resolved"); resolve(); }, 1000))}>Async</Button>
                                        </div>
                                    </TabPanel>
                                </Tab>
                                <Tab id="4">

                                    <TabLabel>Tab 4</TabLabel>
                                    <TabPanel>

                                        <div>
                                            <Spinner />
                                            <ProgressBarTest />
                                        </div>
                                    </TabPanel>
                                </Tab>
                                <Tab id="5">

                                    <TabLabel>Tab 5</TabLabel>
                                    <TabPanel>
                                        <SubApp2 />
                                    </TabPanel>
                                </Tab>

                            </TabsControlled>
                        </div>

                    </ProvideDefaultButtonFill>
                </ProvideDefaultButtonSize>
            </ErrorToastProvider>
        </ToastManager>
    )
}

function ProgressBarTest() {

    const [i, setI] = useState(0);

    useEffect(() => {
        const f = () => {
            handle = requestAnimationFrame(f);
            setI(i => ++i);
        };
        let handle = requestAnimationFrame(f);

        return () => cancelAnimationFrame(handle);
    }, [])

    const p = 0.5 + Math.sin(i / 100) / 2

    return (

        <LinearProgress color="success" value={p} variant="animated">Current value: {(p * 100).toFixed(2)}%</LinearProgress>
    )
}


render(<App />, document.body!);

