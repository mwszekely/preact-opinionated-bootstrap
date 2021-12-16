import { h } from "preact";
import { useState } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { useCallback } from "preact/hooks";
import { Card, CardElement } from "../../card/card";
import { Checkbox, Input } from "../../input-group";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../table";

var RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");

const formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" })
const RandomRow = memo(function RandomRow({ index, unsortedRowIndex, filterEvens }: { index: number, unsortedRowIndex?: number, filterEvens: boolean }) {
    console.log(`RandomRow ${index}, ${unsortedRowIndex}`)
    const i = index;
    const w = RandomWords[i];
    const [n, setN] = useState((i + 0) ** 2);
    const d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + n * 7);
    const [checked, setChecked] = useState(false);


    const onInput = useCallback(async (checked: boolean) => {
        await sleep(2000);
        setChecked(checked);
    }, [])


    return (
        <TableRow hidden={filterEvens && ((n & 1) == 0)} index={index}>
            <TableCell index={0} value={n} colSpan={!w ? 2 : undefined}><Input type="number" width="4ch" value={n} onValueChange={setN} labelPosition="hidden" min={0}>Numeric input</Input></TableCell>
            {w && <TableCell index={1} value={w} />}
            <TableCell index={2} value={d}>{formatter.format(d)}</TableCell>
            <TableCell index={3} value={checked}>
                <Checkbox checked={checked} onCheck={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
            </TableCell>
        </TableRow>)
})



export function DemoTable() {
    const [rowCount, setRowCount] = useState(5);
    const [filterEvens, setFilterEvens] = useState(false);


    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Table</CardElement>
                <CardElement>
                    Tables allow for automatic display, navigation, sorting, and filtering of data.  
                    All data is provided by the children and you <strong>don't need to provide a data structure</strong> to the parent <code>Table</code> element, and by default all columns are user-sortable.
                </CardElement>

                <CardElement>
                    Sorting and filtering are done by examining each <code>TableCell</code>'s child (or <code>value</code> prop, with <code>value</code> taking precidence). 
                    If the child of the <code>TableCell</code> is a simple number or string (and no <code>value</code> prop is provided), then that value will be used for sorting. 
                    If it's not a string (and again, if no <code>value</code> prop is provided), then it will be sorted as if its contents were just an empty string, so it's almost always beneficial to provide the <code>value</code> prop just in case.
                </CardElement>

                <CardElement>
                    A <code>TableCell</code> contain any content, including arbitrary HTML and other components. 
                    In terms of focus management (i.e. how using the arrow keys works within a table), a <code>TableCell</code> that just contains a simple string or number will focus itself when tabbed to, 
                    but a <code>TableCell</code> that contains other components <strong>will delegate focus to its children instead</strong>:
                    <code>{`// The table cell itself will receive focus:
<TableCell>Text</TableCell>
<TableCell>0</TableCell>
<TableCell><>Text</></TableCell> // Fragments are treated as text for these purposes

// When tabbing to the TableCell, the <p> or <Input> will receive focus:
<TableCell><p>Text</p></TableCell>
<TableCell><Input type="..." {...} /></TableCell>

// ❌ The cell will try to focus the child but it'll never receive the message!
<TableCell>{(props) => <p>text</p>}</TableCell>

// ✅ The cell can properly delegate all duties to the child DIV.
<TableCell>{forwardRef((props, ref) => <p ref={ref} {...props}>text</p>)}</TableCell>`}</code>


                </CardElement>

                <CardElement>
                    Finally, your rows <em>must</em> be <em>direct descendants</em> of <code>TableBody</code> (and <code>TableHead</code> and <code>TableFoot</code>) so that it can properly call <code>createElement</code> with the expected results when sorting. 
                    It's okay if each row you provide is a wrapper component around a single <code>TableRow</code>&mdash;the "direct descendant" doesn't need to be specifically a <code>TableRow</code> component&mdash;it's just that the <code>TableBody</code> (etc.) needs <em>specifically</em> an array of children whose individual <code>key</code> props can be manipulated.
                </CardElement>

                <CardElement>
                    <Input type="number" value={rowCount} min={0} max={999} onValueChange={setRowCount}>Row count</Input>
                    <Checkbox checked={filterEvens} onCheck={setFilterEvens}>Filter out even numbers</Checkbox>
                </CardElement>
                <CardElement>
                    <Table>
                        <TableHead>
                            <TableRow hidden={false} index={0}>
                                <TableHeaderCell index={0}>Number</TableHeaderCell>
                                <TableHeaderCell index={1}>String</TableHeaderCell>
                                <TableHeaderCell index={2}>Date</TableHeaderCell>
                                <TableHeaderCell index={3}>Checkbox</TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody {...{"data-test": filterEvens}}>
                            {Array.from(function* () {
                                for (let i = 0; i < rowCount; ++i) {
                                    
                                    yield <RandomRow key={i} index={i} filterEvens={filterEvens} />
                                    /*<TableRow index={1 + i}>
                                    <TableCell index={0} value={i} />
                                    <TableCell index={1} value={RandomWords[i]} />
                                    <TableCell index={2} value={new Date()} />
                                </TableRow>*/
                                    
                                    //
                                }
                            }())}
                        </TableBody>
                    </Table>
                </CardElement>
                <CardElement>
                    <code>{`<Table>
    <TableHead>
        <TableRow index={0}>
            <TableHeaderCell index={0}>Number</TableHeaderCell>
            <TableHeaderCell index={1}>String</TableHeaderCell>
            <TableHeaderCell index={2}>Date</TableHeaderCell>
            <TableHeaderCell index={3}>Checkbox</TableHeaderCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow index={1}>
            <TableCell index={0} value={n} />
            <TableCell index={1} value={RandomWords[index]} />
            <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>
            <TableCell index={3} value={checked}>
                <Checkbox checked={checked} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
            </TableCell>
        </TableRow>

        <TableRow index={2} />
        <TableRow index={3} hidden />
        <TableRow index={4} />
        <TableRow index={5} />

    </TableBody>
    <TableFoot>
        <ACustomTableRow index={6} />
    </TableFoot>
</Table>`}</code>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

