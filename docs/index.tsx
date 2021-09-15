import "preact/debug";
import "preact/devtools";
import { createContext, Fragment, h, render } from "preact";
import { useAriaCheckbox } from "preact-aria-widgets/use-checkbox";
import { useAriaListboxSingle, UseListboxSingleItem, UseListboxSingleItemInfo } from "preact-aria-widgets/use-listbox-single";
import { useAriaMenu, UseMenuItem } from "preact-aria-widgets/use-menu";
import { useAriaTooltip } from "preact-aria-widgets/use-tooltip";
import { useAnimationFrame, useDraggable, useDroppable, useElementSize, useFocusTrap, useHasFocus, useMergedProps, useState } from "preact-prop-helpers";
import { ClipFade, Collapse, CollapseFade, Slide, SlideFade, ZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useContext, useRef } from "preact/hooks";
import { Accordion, AccordionSection } from "../accordion";
import { Button, ButtonGroup, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../button";
import { ButtonGroupChild } from "../button/button-group";
import { Dialog } from "../dialog";
import { ListItemSingle, ListSingle } from "../list";
import { Tab, TabPanel, Tabs } from "../tabs";
import { DemoUseInterval } from "./demos/use-interval";
import { DemoUseRovingTabIndex } from "./demos/use-roving-tab-index";
import { DemoUseTimeout } from "./demos/use-timeout";
import { Menu, MenuItem } from "../menu";
import { Drawer } from "../drawer"
import { Checkbox } from "../input-group/input-check"
import { RadioGroup, Radio } from "../input-group/input-radio";
import { Tooltip } from "../tooltip";
import { ToastsProvider, Toast, usePushToast } from "../toast";



const RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");

type E = (EventTarget & HTMLInputElement);
type E2 = E["className"]


const DemoUseDroppable = () => {
    const { droppedFiles, droppedStrings, filesForConsideration, stringsForConsideration, useDroppableProps, dropError } = useDroppable<HTMLDivElement>({ effect: "copy" });

    const { ref } = useMergedProps<HTMLInputElement>()({}, { ref: useRef<HTMLInputElement>(null!) })

    const p = useDroppableProps({ className: "demo droppable" });

    const r = p.ref;

    return (
        <div {...p}>

            {droppedStrings != null && <div>Data dropped: <ul>{(Object.entries(droppedStrings) as [keyof typeof stringsForConsideration, string][]).map(([type, value]) => <li>{type}: {value}</li>)}</ul></div>}
            {droppedFiles != null && <div>Files dropped: <table>
                <thead><tr><th>Name</th><th>Size</th><th>Type</th><th>Last modified</th></tr></thead>
                <tbody>{droppedFiles.map(f => <tr><td>{f.name}</td>{f.data.byteLength}<td>{f.type}</td><td>{new Date(f.lastModified ?? 0)}</td></tr>)}</tbody>
            </table></div>}
            <hr />

            {stringsForConsideration != null && <div>Data being considered: <ul>{Array.from(stringsForConsideration).map(type => <li>{type}</li>)}</ul></div>}
            {filesForConsideration != null && <div>Files being considered: <ul>{filesForConsideration.map(f => <li>{JSON.stringify(f)}</li>)}</ul></div>}

            <hr />
            {dropError && <div>{dropError instanceof Error ? dropError.message : JSON.stringify(dropError)}</div>}
        </div>
    )
}

const DemoUseDraggable = () => {
    const { dragging, useDraggableProps, lastDropEffect, getLastDropEffect, getDragging } = useDraggable<HTMLDivElement>({ data: { "text/plain": "This is custom draggable content of type text/plain." } });


    return (
        <div {...useDraggableProps({ className: "demo" })}>
            Draggable content
        </div>)
}

const DemoUseElementSizeAnimation = () => {
    const [height, setHeight] = useState(0);
    const [angle, setAngle] = useState(0);
    useAnimationFrame({
        callback: (ms) => {
            setAngle(a => a + 0.01)
            setHeight((Math.sin(angle) + 1) / 0.5);
        }
    });

    const { element, elementSize, useElementSizeProps } = useElementSize<HTMLDivElement>();

    return (
        <div {...useElementSizeProps({ ref: undefined, className: "demo", style: { height: `${(height * 100) + 100}px` } })}>
            <pre>{JSON.stringify(elementSize, null, 2)}</pre>
        </div>
    );
}


const DemoUseFocusTrap = memo(({ depth }: { depth?: number }) => {

    const [active, setActive] = useState(false);

    const { useFocusTrapProps } = useFocusTrap<HTMLDivElement>({ trapActive: active });
    //const { useRovingTabIndexChild, useRovingTabIndexProps } = useRovingTabIndex<HTMLUListElement, RovingTabIndexChildInfo>({ tabbableIndex, focusOnChange: false });

    const divProps = useFocusTrapProps({ ref: undefined, className: "focus-trap-demo" });
    if (depth == 2)
        return <div />;

    return (
        <div className="demo">
            <label>Active: <input type="checkbox" checked={active} onInput={e => { e.preventDefault(); setActive(e.currentTarget.checked); }} /></label>
            <div {...divProps} >
                <DemoUseFocusTrapChild active={active} setActive={setActive} depth={depth ?? 0} />
            </div>
        </div>
    );
});


const DemoUseFocusTrapChild = memo(({ setActive, active, depth }: { active: boolean, setActive: (active: boolean) => void, depth: number }) => {


    return (
        <>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
            <label>Active: <input type="checkbox" checked={active} onInput={e => { e.preventDefault(); setActive(e.currentTarget.checked); }} /></label>

        </>
    );
});

const DemoDialog = memo(() => {
    const onClose = (() => setOpen(false));
    const [open, setOpen] = useState(false);

    return (
        <div class="demo">
            <Tooltip tooltip="Open dialog" position="block-start" Transition={ZoomFade} zoomOriginDynamic={0} zoomMin={0.85} >
                <InputGroup>
                    <Checkbox checked={open} onInput={setOpen} label="Open dialog" />
                </InputGroup>
            </Tooltip>
            <Dialog Transition={ClipFade} clipOriginBlock={0} open={open} onClose={onClose} descriptive={false} title="Dialog Title" footer={<button onClick={onClose}>Close</button>}>
                <p tabIndex={-1}>Dialog body content</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
            </Dialog>

        </div>
    )
});

const DemoDrawer = memo(() => {
    const onClose = (() => setOpen(false));
    let [open, setOpen] = useState(false);
    //open = true;
    return (
        <div class="demo">
            <Checkbox checked={open} onInput={setOpen} label="Open drawer" />
            {/*<label><input type="checkbox" checked={open} onInput={e => { e.preventDefault(); setOpen(e.currentTarget.checked) }} /></label>*/}
            <Drawer Transition={Slide} slideTargetInline={-1} open={open} onClose={onClose} descriptive={false} title="Dialog Title" >
                <p tabIndex={-1}>Dialog body content</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
                <p>{RandomWords.join(" ")}</p>
            </Drawer>

        </div>
    )
});

const DemoMenu = memo(() => {

    return (
        <div class="demo">
            <Menu Transition={ZoomFade} zoomOriginDynamic={0} zoomMin={0.85} tag="ul" anchor={<Button >Open menu</Button>} >
                <MenuItem index={0}>AItem #1</MenuItem>
                <MenuItem index={1}>BItem #2</MenuItem>
                <MenuItem index={2}>CItem #3</MenuItem>
                <MenuItem index={3}>DItem #4</MenuItem>
            </Menu>
        </div>
    )
});


const DemoFocus = memo(() => {
    const { focused, focusedInner, useHasFocusProps } = useHasFocus<HTMLDivElement>();
    return (
        <div class="demo">
            <h2>useHasFocus</h2>
            <div {...useHasFocusProps({ style: { border: "1px solid black" }, tabIndex: 0 })} >Outer <div tabIndex={0} style={{ border: "1px solid black" }}>Inner element</div></div>
            <div>
                <ul>
                    <li>Strictly focused: {focused.toString()}</li>
                    <li>Inner focused: {focusedInner.toString()}</li>
                </ul>
            </div>
        </div>
    )
})
const DemoTabs = memo(() => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectionMode, setSelectionMode] = useState<"focus" | "activate">("activate");


    return (
        <div class="demo">
            <div>
                <Tabs orientation="block" onSelect={setSelectedIndex} selectedIndex={selectedIndex} selectionMode={selectionMode} tag="ol">
                    <ol>
                        <Tab index={0}>Tab #1</Tab>
                        <Tab index={1}>Tab #2</Tab>
                        <Tab index={2}>Tab #3</Tab>
                    </ol>
                    <TabPanel index={0} Transition={ZoomFade} zoomMin={0.8} zoomOriginBlock={0}><div>{RandomWords.slice(0, Math.floor((1 / 3) * RandomWords.length)).join(" ")}</div></TabPanel>
                    <TabPanel index={1} Transition={ZoomFade} zoomMin={0.8} zoomOriginBlock={0}><div>{RandomWords.slice(0, Math.floor((2 / 3) * RandomWords.length)).join(" ")}</div></TabPanel>
                    <TabPanel index={2} Transition={ZoomFade} zoomMin={0.8} zoomOriginBlock={0}><div>{RandomWords.slice(0, Math.floor((3 / 3) * RandomWords.length)).join(" ")}</div></TabPanel>
                </Tabs>
            </div>
        </div>
    )
});

const DemoTooltip = memo(() => {
    const { useTooltip, useTooltipTrigger, isOpen } = useAriaTooltip({});
    const { useTooltipProps } = useTooltip<HTMLSpanElement>();
    const { useTooltipTriggerProps } = useTooltipTrigger<HTMLSpanElement>();
    return (
        <div class="demo">
            <p>This is a paragraph with a <span {...useTooltipTriggerProps({})}>tooltip right here.</span><span {...useTooltipProps({ hidden: !isOpen })}>This is the tooltip content.</span></p>
        </div>
    )
});

async function sleep(ms: number) {
    await new Promise<void>(resolve => setTimeout(resolve, ms));
}

const DemoButtons = memo(() => {
    const [buttonsFill, setButtonsFill] = useState<"fill" | "outline">("outline");
    const [buttonsSize, setButtonsSize] = useState<"sm" | "md" | "lg">("md");

    const pushToast = usePushToast();
    function onClick(str: string) {
        return async function onClick() {
            await sleep(5000);
            pushToast(<Toast>Button was clicked ({str})</Toast>)
        }
    }

    return (
        <div class="demo">

            <ButtonGroup>
                <ButtonGroupChild index={0} onClick={() => setButtonsFill("fill")} pressed={buttonsFill === "fill"} colorVariant="primary">Fill</ButtonGroupChild>
                <ButtonGroupChild index={1} onClick={() => setButtonsFill("outline")} pressed={buttonsFill === "outline"} colorVariant="primary">Outline</ButtonGroupChild>
            </ButtonGroup>

            <ProvideDefaultButtonFill value={buttonsFill}>
                <ProvideDefaultButtonSize value={buttonsSize}>
                    <ButtonGroup>
                        <ButtonGroupChild onClick={onClick("primary")} index={0} tag="button" colorVariant="primary">Primary</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("secondary")} index={1} tag="button" colorVariant="secondary">Secondary</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("success")} index={2} tag="button" colorVariant="success">Success</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("warning")} index={3} tag="button" colorVariant="warning">Warning</ButtonGroupChild>
                    </ButtonGroup>
                    <ButtonGroup>
                        <ButtonGroupChild onClick={onClick("danger")} index={0} tag="button" colorVariant="danger">Danger</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("info")} index={1} tag="button" colorVariant="info">Info</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("light")} index={2} tag="button" colorVariant="light">Light</ButtonGroupChild>
                        <ButtonGroupChild onClick={onClick("dark")} index={3} tag="button" colorVariant="dark">Dark</ButtonGroupChild>
                        <ButtonGroupChild tag="a" index={4} href="#" colorVariant="link">Link</ButtonGroupChild>
                    </ButtonGroup>
                </ProvideDefaultButtonSize>
            </ProvideDefaultButtonFill>
        </div>
    )
});

const DemoAccordion = memo(() => {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    return (
        <div class="demo">
            <div>
                <Accordion expandedIndex={expandedIndex} setExpandedIndex={setExpandedIndex}>
                    <AccordionSection index={0} header="Accordion Item #1"><div><strong>This is the 1st item's accordion body.</strong> It is visible by default, You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>AccordionSection</code>.</div></AccordionSection>
                    <AccordionSection index={1} header="Accordion Item #2"><div><strong>This is the 2nd item's accordion body.</strong> It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>AccordionSection</code>.</div></AccordionSection>
                    <AccordionSection index={2} header="Accordion Item #3"><div><strong>This is the 3rd item's accordion body.</strong> It is hidden by default,  You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>AccordionSection</code>.</div></AccordionSection>

                </Accordion>
            </div>
        </div>
    )
})


const DemoList = memo(() => {
    const [index, setIndex] = useState(0);

    return (
        <div class="demo">

            Selected: {index}

            <ListSingle select="single" onSelect={setIndex} selectedIndex={index} selectionMode="activate" tag="ul">
                <ListItemSingle index={0}>Primary</ListItemSingle>
                <ListItemSingle index={1}>Secondary</ListItemSingle>
                <ListItemSingle index={2}>Success</ListItemSingle>
                <ListItemSingle index={3}>Warning</ListItemSingle>
                <ListItemSingle index={4}>Danger</ListItemSingle>
                <ListItemSingle index={5}>Info</ListItemSingle>
                <ListItemSingle index={6}>Light</ListItemSingle>
                <ListItemSingle index={7}>Dark</ListItemSingle>
                <ListItemSingle index={8}>Link</ListItemSingle>
            </ListSingle>
        </div>
    )
});

import { Input, LabelledInput, InputGroup } from "../input-group"

const DemoInput = memo(() => {
    const [text, setText] = useState("");
    const [radioValue, setRadioValue] = useState<string>("");

    const onInput1 = useCallback(async (value: string) => {
        await sleep(5000);
        setText(value);
    }, [setRadioValue])

    const onInput2 = useCallback(async (value: string) => {
        await sleep(5000);
        setRadioValue(value);
    }, [setRadioValue])

    return (
        <div class="demo">

            <InputGroup>
                <LabelledInput type="text" label="Test input" onInput={onInput1} value={text} />
            </InputGroup>
            <RadioGroup selectedValue={radioValue} name="demo-radio" onInput={onInput2}>
                <InputGroup><Radio index={0} value="ARadio" /></InputGroup>
                <InputGroup><Radio index={1} value="BRadio" /></InputGroup>
                <InputGroup><Radio index={2} value="CRadio" /></InputGroup>
            </RadioGroup>
        </div>
    )
});


const Component = () => {
    return <div class="flex" style={{ flexWrap: "wrap" }}>
        <ToastsProvider>
            <DemoAccordion />
            <DemoDialog />
            <DemoDrawer />
            <DemoInput />
            <DemoButtons />
            <DemoList />
            <DemoTabs />
            <DemoMenu />
            <DemoFocus />
            <DemoUseTimeout />
            <DemoUseInterval />
            {/*<DemoUseFocusTrap />
            <DemoUseFocusTrap />*/}
            <input />
        </ToastsProvider>
    </div>
}

requestAnimationFrame(() => {
    render(<Component />, document.getElementById("root")!);
})
