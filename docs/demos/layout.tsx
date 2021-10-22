import { h } from "preact";
import { Card, CardElement } from "../../card/card";
import { Checkbox, Input, InputGroup } from "../../input-group";
import { InputGrid } from "../../input-group";
import { GridStatic } from "../../layout";

export function DemoLayout() {
    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Layout</CardElement>
                <CardElement>A number of utility components and CSS classes are provided to make it easier to create quick and dirty layouts.</CardElement>
                <CardElement type="subtitle" tag="h3">Simple grids</CardElement>
                <CardElement>
                    Two different grid components are provided for two separate use cases:
                    <ul>
                        <li>&lt;<code>GridResponsive</code>&gt;, which takes a minimum column size and fits as many columns as possible given that constraint</li>
                        <li>&lt;<code>GridStatic</code>&gt;, which takes a minimum column count and fits that many columns in no matter the resulting size and/or jankiness</li>
                    </ul>
                </CardElement>
                <CardElement type="subtitle" tag="h3"><code>&lt;InputGroup&gt;</code> &amp; <code>&lt;InputGrid&gt;</code></CardElement>
                <CardElement>All input types, from checkboxes to number inputs, can be placed within an <code>&lt;InputGrid&gt;</code> to give an alternate styling to the default "free floating" style.</CardElement>
                <div style={{ display: "contents", "--static-grid-columns": "10em auto" }}>
                    <CardElement>
                        With an <code>&lt;InputGroup&gt;</code>:
                        <GridStatic columns={2}>
                            <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                            <code>{`<InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>`}</code>
                        </GridStatic>
                    </CardElement>
                    <CardElement>
                        Without an <code>&lt;InputGroup&gt;</code>:
                        <GridStatic columns={2}>
                            <Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox>
                            <code>{`<Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox>`}</code>
                        </GridStatic>
                    </CardElement>
                </div>
                <CardElement>
                    In addition, to help with alignment, a set of <code>InputGroup</code>s can also be placed within an <code>InputGrid</code> to manage simple cases.
                    <code>{`<InputGrid>
    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
    {...}
</InputGrid>`}</code>
                </CardElement>
                <CardElement>
                    With an <code>&lt;InputGrid&gt;</code>:
                    <InputGrid>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                        <InputGroup><Input disabled onValueChange={() => { }} type="number" value={0}>Numeric input</Input></InputGroup>
                    </InputGrid>

                </CardElement>
                <CardElement>
                    Without an <code>&lt;InputGrid&gt;</code>:
                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                    <InputGroup><Input disabled onValueChange={() => { }} type="number" value={0}>Numeric input</Input></InputGroup>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

