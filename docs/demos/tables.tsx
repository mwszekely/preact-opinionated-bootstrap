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
                    However, please note that if you pass a child component to a <code>TableCell</code>, it will be put in charge of that cell's navigation and focus management, <strong>so it needs to be a component that accepts and forwards onwards all incoming props and refs</strong>. 
                    <code>{`// The table cell itself will receive focus:
<TableCell>Text</TableCell>
<TableCell>0</TableCell>
<TableCell><>Text</></TableCell> // (Fragments are handled specially and are okay as an immediate child.)

// The table cell will delegate focus to its contents instead:
<TableCell><div>Text</div></TableCell>
<TableCell><Input /></TableCell>

// BAD! The cell will try to focus the child but it'll never receive the message!
<TableCell>{() => "text"}</TableCell>

// Fine, the cell can properly delegate all duties to the child DIV.
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


                <CardElement>
                    To display contents that are more complicated than a data literal, like the recursively-complicated structure built by JSX, you'll need a wrapper component. Please note that
                    the details of this component are very specific, so feel free to copy and paste the example below. If you run into issues:

                    <ul>
                        <li>The child component must pass its ref and all unused props to <strong>its</strong> child component.</li>
                        <li>The child component must be a ref-forwarding component.  Use <code>forwardElementRef</code> (or just the built-in <code>forwardRef</code>) to do this.</li>
                        <li>The child component must be stable (as in, it's not an anonymous function defined on each render).  If the child component is just a plain ol' global function like most, this isn't an issue.  If it's defined inside a component, make sure it's wrapped in <code>useCallback</code> to keep it stable.</li>
                        <li>If the child component uses both <code>forwardRef</code> and <code>useCallback</code> (from the previous rule), then <code>useCallback</code> must be on the outside. This isn't specific to table cells or anything, but it's easy to miss.</li>
                        <li>Beyond that, interactions that affect the source row will propogate to the "entangled" row that's actually showing the source row's data.</li>
                    </ul>


                </CardElement>


                <CardElement>
                    <code>{`function CheckboxTableCell({ index }: { index: number }) {
    const forceUpdate = useForceUpdate();

    // This represents our "true" row, which might not be
    // what we're currently showing, if the table is sorted.
    const rowIndexLiteral = useTableRowIndex("literal");

    // This value is "refreshed" by calling forceUpdate() 
    // instead of via props or state for demonstration.
    const checked = checkedRows.has(rowIndexLiteral);

    return <TableCell index={index} value={checked} {...{ forceUpdate } as never}>{

        // This is a component, we're just not calling it immediately.
        // We're passing it to the TableCell for it to create.
        // You could have it separately as function CheckboxTableCellChild() {}
        // but it's only going to be used here anyway.
        //
        // useCallback because the identity of a function is used 
        // to determine if two components are the same when diffed together.
        useCallback(

            // forwardRef because the table needs to give the ref that the
            // TableCell normally would use for focus management and give
            // it to this component instead.
            forwardElementRef(({ overriddenValue, overriddenRowIndex, forceUpdate, ...props }: TableCellChildProps<HTMLButtonElement> & { forceUpdate?(): void; }, ref: any) => {

                // The checkbox sets a global variable and then
                // calls forceUpdate.
                const onInput = (c: boolean) => {

                    // Basically, use forceUpdate to pretend this is a setState call
                    // that would actually cause this component to update and re-render.
                    // (Just for the sake of demonstration for where the data's stored)
                    // Causing it to re-render will cause it to let its "partner" sibling
                    // know of any changes to what it should be displaying.
                    if (c)
                        checkedRows.add(overriddenRowIndex)
                    else
                        checkedRows.delete(overriddenRowIndex)
                    forceUpdate!();
                }

                // Pass along the ref, all unused props, and then any normal props.
                // Note that while not explicitly documented to, most components
                // will forward on unused props to the most reasonable target,
                // which for form-like components is going to be the input element.
                return <Checkbox ref={ref} {...props} checked={!!overriddenValue} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>;
            }), [])
    }</TableCell>
}

// Presumably you'll have better state management than a global variable.
// A context would work nicely.
let checkedRows = new Set<number>();`}</code>
                </CardElement>
            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

