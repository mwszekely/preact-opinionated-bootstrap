import { h } from "preact";
import { useForceUpdate, useInterval } from "preact-prop-helpers";
import { useState } from "preact-prop-helpers/use-state";
import { useCallback, useContext } from "preact/hooks";
import { Card, CardElement } from "../../card/card";
import { Checkbox, Input } from "../../input-group";
import { forwardElementRef } from "../../props";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../table";
import { TableCellChildProps, TableCellProps, useTableRowIndex } from "../../table/table";

var RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");

const formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" })
function RandomRow({ index }: { index: number }) {
    const n = (index + 0) ** 2;
    const d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + n * 7);
    const [checked, setChecked] = useState(false);


    const onInput = useCallback(async (checked: boolean) => {
        await sleep(2000);
        setChecked(checked);
    }, [index])


    return (<TableRow index={index}>
        <TableCell index={0} value={RandomWords[index]} />
        <TableCell index={1} value={n} />
        <TableCell index={2} value={d}>{formatter.format(d)}</TableCell>
        <TableCell index={3} value={checked}>
            <Checkbox checked={checked} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
        </TableCell>
    </TableRow>)
}



export function DemoTable() {
    const [rowCount, setRowCount] = useState(5);

    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Table</CardElement>
                <CardElement>Tables allow for automatic display, navigation, and sorting of data.  All data is provided by the children and you don't need to provide a data structure to the parent <code>Table</code> element, and by default all columns are sortable.</CardElement>

                <CardElement>
                    All <code>TableCell</code>s must be given a <code>value</code> prop that represents its data.  This can be anything from a string to a number to a Date, and it controls how, when that column is sorted, it is compared against its siblings.
                </CardElement>

                <CardElement>
                    A <code>&lt;TableCell&gt;</code> will, by default, just display its <code>value</code>.
                    If you need to show something different, format the value, etc. just pass the value you'd like to show instead as a child.  Children will take priority over <code>value</code> in terms of what to display, but sorting will be entirely unaffected by this, relying solely on the <code>value</code> prop.
                </CardElement>

                <CardElement>
                    However, please note that if you pass a child component to a <code>TableCell</code>, it will be put in charge of that cell's navigation and focus management, <strong>so it needs to be a component that accepts and forwards onwards all incoming props and refs</strong>. (Fragments as an immediate child are an exception and are fine to use)
                    <code>{`// The table cell itself will receive focus:
<TableCell>Text</TableCell>
<TableCell>0</TableCell>
<TableCell><>Text</></TableCell>

// The table cell will delegate focus to its contents instead:
<TableCell><div>Text</div></TableCell>
<TableCell><Input type="..." {...} /></TableCell>

// ❌ The cell will try to focus the child but it'll never receive the message!
<TableCell>{(props) => "text"}</TableCell>

// ✅ The cell can properly delegate all duties to the child DIV.
<TableCell>{forwardRef((p, ref) => <div ref={ref} {...p}>"text"</p>)}</TableCell>`}</code>
                </CardElement>

                <CardElement>
                    <Input type="number" value={rowCount} onInput={setRowCount}>Row count</Input>
                </CardElement>

                <CardElement>
                    <Table>
                        <TableHead>
                            <TableRow index={0}>
                                <TableHeaderCell index={0}>String</TableHeaderCell>
                                <TableHeaderCell index={1}>Number</TableHeaderCell>
                                <TableHeaderCell index={2}>Date</TableHeaderCell>
                                <TableHeaderCell index={3}>Checkbox</TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {Array.from(function* () {
                                for (let i = 0; i < rowCount; ++i) {
                                    yield <RandomRow key={i} index={i} />
                                }
                            }())}
                        </TableBody>
                    </Table>
                </CardElement>
                <CardElement>
                    <code>{`<Table>
    <TableHead>
        <TableRow index={0}>
            <TableHeaderCell index={0}>String</TableHeaderCell>
            <TableHeaderCell index={1}>Number</TableHeaderCell>
            <TableHeaderCell index={2}>Date</TableHeaderCell>
            <TableHeaderCell index={3}>Checkbox</TableHeaderCell>
        </TableRow>
    </TableHead>
    <TableBody>

        <TableRow index={0}>
            <TableCell index={0} value={RandomWords[index]} />
            <TableCell index={1} value={n} />
            <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>
            <TableCell index={3} value={checked}>
                <Checkbox checked={checked} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>
            </TableCell>
        </TableRow>

        <TableRow index={1} />
        <TableRow index={2} />
        <TableRow index={3} />
        <TableRow index={4} />

    </TableBody>
</Table>`}</code>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

