import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { Badge } from "../../badge";
import { Card, CardElement } from "../../card/card";
import { BootstrapIcon } from "../../icon";
import { Input, InputGroup } from "../../input-group";
import { List, ListItemMulti, ListItemSingle, ListItemStatic } from "../../list";
import { ListItemActionable } from "../../list/list-actionable";
import { Toast, usePushToast } from "../../toast";
import { Range, RangeThumb } from "../../range";
import { useCallback } from "preact/hooks";

export function DemoLists() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
    const [listsFill, setListsFill] = useState<"fill" | "outline">("outline");
    const [listsSize, setListsSize] = useState<"sm" | "md" | "lg">("md");
    const [toggleOn, setToggleOn] = useState(false);

    const [lines, setLines] = useState(1);

    const [selectedMulti, setSelectedMulti] = useState<Set<number>>(new Set());

    const [asyncTimeout, setAsyncTimeout] = useState<number | null>(3000);
    const [usesAsync, setUsesAsync] = useState(true);
    const [asyncFails, setAsyncFails] = useState(false);
    const [usesLinkList, setUsesLinkList] = useState(true);

    const pushToast = usePushToast();
    const onPressSync = () => void (pushToast(<Toast>List item was clicked</Toast>));
    const onPressAsync = async () => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("List operation failed.");
        else
            onPressSync();
    }
    const onPress = usesAsync ? onPressAsync : onPressSync;

    const onToggleInputAsync = async (b: boolean) => {
        await sleep(asyncTimeout ?? 0);
        if (asyncFails)
            throw new Error("List operation failed.");
        else
            setToggleOn(b);
    }
    const onToggleInput = usesAsync ? onToggleInputAsync : setToggleOn;

    function makeListItemLines(index: number) {
        if (lines === 1)
            return <span>List Item #{index + 1}</span>;
        return <>{Array.from((function* () {
            for (let i = 0; i < lines; ++i) {
                if (i == 0)
                    yield <span class="h4">List Item #{index + 1}</span>;
                else
                    yield <span>This is line #{i + 1}</span>;
            }
        })())}</>
    }

    function makeListItems(maker: (index: number) => h.JSX.Element) {
        return <>{Array.from((function* () {
            for (let i = 0; i < 5; ++i) {
                yield maker(i);
            }
        })())}</>
    }

    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(10);

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Lists</CardElement>
                <CardElement>
                    <Range orientation="block" label="Test range" step={1} snap="continuous" min={0} max={10} getValueText={useCallback((n: number) => { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.round(n)]; }, [])} value={value} onValueChange={setValue} />
                </CardElement>
                <CardElement><List label="Demo list" selectedIndex={selectedIndex} onSelect={setSelectedIndex}>{makeListItems(index => <ListItemSingle index={index} disabled={index == 3}>{makeListItemLines(index)}</ListItemSingle>)}</List></CardElement>

                <CardElement>
                    A list is a way to provide a large number of selectable options in a way that's distinct from, say, a list of checkboxes or radio buttons. Lists can be <strong>single-select</strong>, <strong>multi-select</strong>, or <strong>static</strong> (no selection, display only).
                </CardElement>

                <CardElement>
                    All list types can have as many lines as needed; each e.g. <code>&lt;span&gt;</code> will create a new line. Format them however you like (i.e. making some larger or smaller, tinted different colors, etc.)
                    <InputGroup><Input type="number" value={lines} onValueChange={setLines}># of lines</Input></InputGroup>
                </CardElement>

                <CardElement type="subtitle" tag="h3">Single select</CardElement>
                <CardElement>
                    For single-select lists, you provide the parent <code>&lt;List&gt;</code> with <code>selectedIndex</code> and <code>onSelect</code> props that control which <code>&lt;ListItemSingle&gt;</code> is the selected one.
                </CardElement>
                <CardElement>As with most components, the <code>onSelect</code> prop can be an async function.</CardElement>
                <CardElement><List label="Single-select list demo" selectedIndex={selectedIndex} onSelect={async (i) => { await sleep(2000); setSelectedIndex(i) }}>{makeListItems(index => <ListItemSingle index={index}  disabled={index == 3}>{makeListItemLines(index)}</ListItemSingle>)}</List></CardElement>


                <CardElement type="subtitle" tag="h3">Multi select</CardElement>
                <CardElement>
                    Multi-select lists have a <code>selected</code> prop on each individual <code>&lt;ListItemMulti&gt;</code>.
                </CardElement>
                <CardElement>As with most components, the <code>onSelect</code> prop can be an async function.</CardElement>
                <CardElement><List label="Multi-select list demo" select="multi">{makeListItems(index => <ListItemMulti index={index} selected={selectedMulti.has(index)}  disabled={index == 3} onSelect={async (selected) => {
                    await sleep(2000); setSelectedMulti(prev => {
                        let ret = new Set(Array.from(prev));
                        if (selected)
                            ret.add(index)
                        else
                            ret.delete(index);
                        return ret;

                    })
                }}>{makeListItemLines(index)}</ListItemMulti>)}</List></CardElement>


                <CardElement type="subtitle" tag="h3">Static lists</CardElement>
                <CardElement>All lists share the same basic styling of a static list, so all of these options can also be used on single- and multi-select lists.</CardElement>
                <CardElement>You can add an icon at the righthand side with <code>iconEnd</code>:</CardElement>
                <CardElement><List label="List with icons at the end">{makeListItems(index => <ListItemActionable index={index} onPress={onPressAsync} disabled={index == 3} iconEnd={<BootstrapIcon icon="star" label={null} />}>{makeListItemLines(index)}</ListItemActionable>)}</List></CardElement>
                <CardElement>Or an icon on the left with <code>iconStart</code>, or a badge at the top-right with <code>badge</code>:</CardElement>
                <CardElement><List label="List with icons at the start and badges">{makeListItems(index => <ListItemActionable index={index} onPress={onPressSync} disabled={index == 3} badge={<Badge label={`Example value`}>{Math.floor(Math.abs(Math.sin((index + 7) * 7) * 20))}</Badge>} iconStart={<BootstrapIcon icon="star" label={null} />}>{makeListItemLines(index)}</ListItemActionable>)}</List></CardElement>
                <CardElement>All these will properly align themselves no matter how many lines the list item has. Keep in mind that a list's contents are always read out as one long string to screen readers, so not only should they <em>not</em> contain interactive content (beyond itself being selectable), any additional content, should be kept as terse as possible to avoid repeated content when reading each item one at a time.</CardElement>
            </Card>
        </div>
    );
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

