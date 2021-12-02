import "preact/debug";
import "preact/devtools";
import { Fragment, h, render } from "preact";
import { useAriaTooltip } from "preact-aria-widgets";
import { useAnimationFrame, useDraggable, useDroppable, useElementSize, useFocusTrap, useHasFocus, useMergedProps, useState } from "preact-prop-helpers";
import { ClipFade, Slide, ZoomFade } from "preact-transition";
import { memo } from "preact/compat";
import { useCallback, useMemo, useRef } from "preact/hooks";
import { Accordion, AccordionSection } from "../accordion";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Drawer } from "../drawer";
import { Input, InputGroup } from "../input-group";
import { Checkbox } from "../input-group";
import { Radio, RadioGroup } from "../input-group";
import { GridResponsive } from "../layout";
import { ListItemSingle, ListSingle } from "../list";
import { Menu, MenuItem } from "../menu";
import { Tab, TabPanel, Tabs } from "../tabs";
import { ToastsProvider } from "../toast";
import { Tooltip } from "../tooltip";
import { DemoButtons } from "./demos/buttons";
import { DemoChecks } from "./demos/checks";
import { DemoInputs } from "./demos/inputs";
import { DemoLayout } from "./demos/layout";
import { DemoTable } from "./demos/tables";
import { useLogRender, DebugUtilContext, DebugUtil, LogRenderType } from "../props";
import { DemoMenus } from "./demos/menus";



const RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");

type E = (EventTarget & HTMLInputElement);
type E2 = E["className"]




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
            <Tooltip tooltip="Open dialog" Transition={ZoomFade} zoomOriginDynamic={0} zoomMin={0.85} >
                <InputGroup>
                    <Checkbox checked={open} onCheck={setOpen}>Open dialog</Checkbox>
                </InputGroup>
            </Tooltip>
            <Dialog open={open} onClose={onClose} descriptive={false} title="Dialog Title" footer={<button onClick={onClose}>Close</button>}>
                <p tabIndex={-1}>Dialog body content</p>
                <DemoMenus />
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
            <Checkbox checked={open} onCheck={setOpen}>Open Drawer</Checkbox>
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
            <Menu Transition={ZoomFade} zoomOriginDynamic={0} zoomMin={0.85} tag="ul" anchor={<Button dropdownVariant="combined">Open menu</Button>}>
                <MenuItem index={0}>AItem #1</MenuItem>
                <MenuItem index={1}>BItem #2</MenuItem>
                <MenuItem index={2}>CItem #3</MenuItem>
                <MenuItem index={3}>DItem #4</MenuItem>
            </Menu>
        </div>
    )
});

const DemoTabs = memo(() => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectionMode, setSelectionMode] = useState<"focus" | "activate">("activate");


    return (
        <div class="demo">
            <div>
                <Tabs orientation="block" onSelect={setSelectedIndex} selectedIndex={selectedIndex} selectionMode={selectionMode}>
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
/*
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
});*/

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
                <Input type="text" onValueChange={onInput1} value={text} width="100%">Test input</Input>
            </InputGroup>
            <RadioGroup selectedValue={radioValue} name="demo-radio" onValueChange={onInput2}>
                <InputGroup><Radio index={0} value="ARadio" /></InputGroup>
                <InputGroup><Radio index={1} value="BRadio" /></InputGroup>
                <InputGroup><Radio index={2} value="CRadio" /></InputGroup>
            </RadioGroup>
        </div>
    )
});



const Component = () => {
    const [theme, setTheme] = useState("theme-dark");

    return <>
        <Button colorVariant={theme == "theme-dark"? "light" : "dark"} style={{ position: "fixed", insetBlockStart: "0.5em", insetInlineEnd: "0.5em", zIndex: 9999999 }} spinnerTimeout={999999999} onPress={async () => {
            let prev = theme;
            let next = prev === "theme-dark" ? "theme-light" : "theme-dark";
            setTheme(next);
            await new Promise<void>(resolve => setTimeout(resolve, 100));
            (document.getElementById(next) as HTMLLinkElement).media = "all";
            (document.getElementById(prev) as HTMLLinkElement).media = "screen and (max-width: 1px)";
            document.documentElement.classList.add("switching-theme");
            /*document.documentElement.classList.add(next);
            document.documentElement.classList.remove(prev);*/
            await new Promise<void>(resolve => setTimeout(resolve, 2000));
            document.documentElement.classList.remove("switching-theme");
        }}>Switch theme to <strong>{theme === "theme-dark" ? "light" : "dark"}</strong></Button>
        <GridResponsive minWidth="35em">
            <DebugUtilContext.Provider value={useMemo(() => ({ logRender: new Set<LogRenderType>(["Table", "TableHead", "TableBody", "TableRow", "TableCell"]) }), [])}>
                <ToastsProvider>

                    <DemoTable />
                    <DemoMenus />
                    <DemoButtons />
                    <DemoChecks />
                    <DemoInputs />
                    <DemoLayout />
                    <DemoAccordion />
                    <DemoDialog />
                    <DemoDrawer />
                    <DemoInput />
                    <DemoList />
                    <DemoTabs />
                    <DemoMenu />
                    {/*<DemoFocus />
            <DemoUseTimeout />
            <DemoUseInterval />
            <DemoUseFocusTrap />
            <DemoUseFocusTrap />
            <input />*/}
                </ToastsProvider>
            </DebugUtilContext.Provider>
        </GridResponsive>
    </>
}

requestAnimationFrame(() => {
    render(<Component />, document.getElementById("root")!);
})
