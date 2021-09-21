import { h } from "preact";
import { useForceUpdate } from "preact-prop-helpers";
import { useState } from "preact-prop-helpers/use-state";
import { useCallback } from "preact/hooks";
import { Card, CardElement } from "../../card/card";
import { Checkbox, Input } from "../../input-group";
import { forwardElementRef } from "../../props";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../../table";
import { TableCellChildProps, TableCellProps } from "../../table/table";

var RandomWords = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");


function RandomRow({ index }: { index: number }) {
    const d = new Date(new Date().getFullYear(), 0, index);

    return (<TableRow index={index}>
        <TableCell index={0} value={RandomWords[index]} />
        <TableCell index={1} value={index ** 2} />
        <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>
        <CheckboxTableCell index={3} />
    </TableRow>)
}

let checkedRows = new Set<number>();
function CheckboxTableCell({ index }: { index: number }) {
    const forceUpdate = useForceUpdate();

    const TableCellChild = useCallback(
        forwardElementRef(({ overriddenValue, overriddenRowIndex, ...props }: TableCellChildProps<HTMLButtonElement>, ref: any) => {
            const onInput = (c: boolean) => {
                if (c)
                    checkedRows.add(overriddenRowIndex)
                else
                    checkedRows.delete(overriddenRowIndex)

                // Just poking at a Set that's not hooked up to any lifecycle functions
                // won't update the visuals at all.
                // Forcibly update ourselves, which will, upon re-rendering, notify out
                // "partner" row (the one that's actually showing our data) of
                // the change.
                forceUpdate();
            }
            return <Checkbox ref={ref} {...props} checked={checkedRows.has(overriddenRowIndex)} onInput={onInput} labelPosition="hidden">Demo table checkbox</Checkbox>;
        }), []);

    return <TableCell index={index} value={checkedRows.has(index)}>{TableCellChild}</TableCell>
};

export function DemoTable() {
    const [rowCount, setRowCount] = useState(5);
    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Table</CardElement>
                <CardElement>Tables allow for automatic display, navigation, and sorting of data.  All data is provided by the children and you don't need to provide a data structure to the parent <code>Table</code> element.</CardElement>

                <CardElement>
                    By default, all table columns are sortable based on the <code>value</code> prop you provide each cell. If you would like to explicitly mark a column as unsortable, give that column's header cell the <code>unsortable</code> prop.
                </CardElement>

                <CardElement>
                    A <code>&lt;TableCell&gt;</code> will, by default, just display its <code>value</code>.  This will work fine for strings, booleans, and a lot of numbers, but if you need
                    to format your value, you can pass the string you'd like to actually display in the cell as the cell's child.
                </CardElement>
                <CardElement>
                    Cells can display more than just strings or string representations of things, such as buttons, formatted text, or any other JSX. How to do so is explained below the example.
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
                                    yield <RandomRow index={i} />
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
            <TableCell index={1} value={index ** 2} />
            <TableCell index={2} value={d}>{d.toLocaleString()}</TableCell>
            <CheckboxTableCell index={3} /> {/* Custom component -- see below */}
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
                    the details of this component are very specific, and all of the following must be met:

                    <ul>
                        <li>The child component is a ref-forwarding component.  Use <code>forwardElementRef</code> (or just the built-in <code>forwardRef</code>) to do this.</li>
                        <li>The child component passes its ref (probably the one from <code>forwardRef</code>) to its child component. It's fine to merge it with other refs, but it needs to get there eventually.</li>
                        <li>The child component additionally passes all unused props it receives onto its child component. Most components provided by this library do this, even if they're not explicitly typed to indicate this.</li>
                        <li>The child component is stable (as in, it's not an anonymous function defined on each render).  If the child component is just a plain ol' global function like most, this isn't an issue.  If it's defined inside a component, make sure it's wrapped in <code>useCallback</code> to keep it stable.</li>
                        <li>If the child component uses both <code>forwardRef</code> and <code>useCallback</code> (from the previous rule), then <code>useCallback</code> must be on the outside. This isn't specific to table cells or anything, but it's easy to miss.</li>
                    </ul>


                </CardElement>


                <CardElement>
                    <code>{`// The TableCell's child must forward its ref and all props to the child component
// so that it can handle everything the TableCell would normally handle, like focus management
function CheckboxTableCell({ index }: { index: number }) {
    const forceUpdate = useForceUpdate();

    const TableCellChild = useCallback(
        forwardElementRef(({ overriddenValue, overriddenRowIndex, ...props }: TableCellChildProps<HTMLButtonElement>, ref: any) => {
            const onInput = (c: boolean) => {
                if (c)
                    checkedRows.add(overriddenRowIndex)
                else
                    checkedRows.delete(overriddenRowIndex)

                // Just poking at a Set that's not hooked up to any lifecycle functions
                // won't update the visuals at all.
                // Forcibly update ourselves, which will, upon re-rendering, notify out
                // "partner" row (the one that's actually showing our data) of
                // the change.
                forceUpdate();
            }
            return <Checkbox 
                ref={ref}   // Don't forget to pass in the ref that was forwarded!!
                {...props}  // If you get type errors, force it with {...props as never} 
                checked={checkedRows.has(overriddenRowIndex)} 
                onInput={onInput} 
                labelPosition="hidden">Demo table checkbox</Checkbox>;
        }), []);

    return <TableCell index={index} value={checkedRows.has(index)}>{TableCellChild}</TableCell>
};


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

