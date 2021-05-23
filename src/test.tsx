
import { cloneElement, Fragment, h, Ref, render, VNode } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Button } from './button/component';
import { ProvideDefaultButtonFill, ProvideDefaultButtonSize } from './button/defaults';
import { DropdownButton, DropdownMenuItem } from './dropdown/component';


// @ts-ignore
import { Dropdown, Button as BSButton, Alert, Carousel, Collapse, Modal, Offcanvas, Popover, ScrollSpy, Toast, Tooltip as BSTooltip, } from "bootstrap";
import { ButtonGroup } from './button-group/component';
import { Tooltip } from './tootip/component';
(window as any).process = { env: {} };
import { Page, Pagination } from './pagination/component';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './table';
import { InputNumber, InputRange, InputText } from './forms/form-controls/component';
import { InputGroup, InputGroupText } from './input-group/component';
import { ListGroup, ListGroupItem } from './list-group/component';
import { forwardElementRef, useAsyncEventHandler } from 'preact-async-input';
import { useError, useIsFulfilled, useIsPending, useLatestValue } from 'preact-async-input/src/use-async-event-handler';
import { NewtonsCradleSpinner } from './progress/spinner';
import { Label, ProvideLabel } from './forms/label';
import { Checkbox } from './forms/checkbox/component';
import { Fade, SwapContainer } from 'preact-transition/src';
import { TabsUncontrolled, Tab, TabLabel, TabPanel, TabsControlled } from './tabs/component';
import { Transition } from 'preact-transition/src/use-transition';
import { clsx } from './bootstrap-classes';
import { Radio, RadioGroup } from './forms/radio/component';
import { Switch } from './forms/switch/component';


console.log([Dropdown, BSButton, Alert, Carousel, Collapse, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, BSTooltip,]);

const SubApp1 = forwardElementRef(({ className, ...props }: { className?: string }, ref: Ref<HTMLDivElement>) => {
    const [a, setA2] = useState(0);
    const setA = useCallback((a: number) => new Promise<void>(resolve => setTimeout(() => { resolve(); setA2(a); }, 1000)), [])
    return (
        <div {...props} class={clsx("d-flex", "flex-column", "gap-3", className)} ref={ref}>
            {a.toString()}
            <div class={clsx("d-flex")}>
                <Checkbox checked={a == 0} onInput={(c) => c ? setA(0) : void (0)} label="0" />
                <Checkbox checked={a == 1} onInput={(c) => c ? setA(1) : void (0)} label="1" />
                <Checkbox checked={a == 2} onInput={(c) => c ? setA(2) : void (0)} label="2" />
            </div>
            <RadioGroup name="test-group" value={a.toString()} onInput={(v) => setA(parseInt(v))}>
                <div class={clsx("d-flex")}>
                    <Radio value="0" label="0" />
                    <Radio value="1" label="1" />
                    <Radio value="2" label="2" />
                </div>
            </RadioGroup>

            <div class={clsx("d-flex")}>
                <Switch checked={a == 0} onInput={(c) => c ? setA(0) : void (0)} label="0" />
                <Switch checked={a == 1} onInput={(c) => c ? setA(1) : void (0)} label="1" />
                <Switch checked={a == 2} onInput={(c) => c ? setA(2) : void (0)} label="2" />
            </div>

            <div class={clsx("d-flex")}>
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
        <div {...props} class={clsx("d-flex", "flex-column", "gap-3", className)} ref={ref}>
            <div>

                <div>
                    <ProvideDefaultButtonFill value="outline">
                        <ButtonGroup>
                            <Tooltip tooltip={"Test " + text?.toString()} placement="bottom"><Button>Button 1</Button></Tooltip>
                            <Button pressed>Button 2</Button>
                            <Button>Button 3</Button>
                        </ButtonGroup>
                    </ProvideDefaultButtonFill>
                </div>
                <div>
                    <ListGroup>
                        <ListGroupItem onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 1</ListGroupItem>
                        <ListGroupItem onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 2</ListGroupItem>
                        <ListGroupItem onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}>Item 3</ListGroupItem>
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
                                                    <Fade open={pending}><NewtonsCradleSpinner /></Fade>
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

const App = () => {

    const [i, setI] = useState(0 as number | null);


    /*useEffect(() => {
        setInterval(() => { setI(i => ++i) }, 5000)
    }, [setI]);*/

    const [text, setText] = useState<string>("");
    const [checked, setChecked] = useState(false);

    const [a, setA] = useState(0);


    return (
        <ProvideDefaultButtonSize value="sm">
            <ProvideDefaultButtonFill value="fill">
                <div class={clsx("d-grid", "gap-3")}>
                    <div>
                        <InputNumber value={i} onInput={setI} childrenPre={<Label>Index</Label>} />
                    </div>
                    <TabsControlled localStorageKey="test" >
                        <Tab id="1">
                            <TabLabel>Tab 1</TabLabel>
                            <TabPanel>
                                <SubApp1 />
                            </TabPanel>
                        </Tab>
                        <Tab id="2">
                            <TabLabel>Tab 2</TabLabel>
                            <TabPanel>
                                <div class={clsx(`d-flex gap-3`)}>
                                    <DropdownButton align="start" direction="up" split size="lg" menuContents={
                                        <ol>
                                            <DropdownMenuItem header style={{ pointerEvents: "none" }}><h6>Subheader</h6></DropdownMenuItem>
                                            <DropdownMenuItem><Button>Item 1 + {i}</Button></DropdownMenuItem>
                                            <DropdownMenuItem><Button>Item 2 + {i}</Button></DropdownMenuItem>
                                            <DropdownMenuItem><a href="#">Item 2 + {i}</a></DropdownMenuItem>
                                        </ol>}>
                                        <Button>Dropdown + {i}</Button>
                                    </DropdownButton>
                                </div>
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
                                    <NewtonsCradleSpinner />
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
    )
}


render(<App />, document.body!);

