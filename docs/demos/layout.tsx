import { ComponentChildren, h, VNode } from "preact";
import { useState } from "preact-prop-helpers";
import { Button, ButtonGroup, ProvideDefaultButtonColor, ProvideDefaultButtonFill, ProvideDefaultButtonSize } from "../../button";
import { Toast, usePushToast } from "../../toast";
import { Card, CardElement } from "../../card/card";
import { ButtonGroupChild } from "../../button/button-group";
import { Checkbox, Input, InputGroup, Radio, RadioGroup, Switch } from "../../input-group";
import { ButtonColorVariant } from "../../button/types";
import { GlobalAttributes, TagSensitiveProps } from "../../props";
import { useCallback } from "preact/hooks";
import { InputGrid } from "../../input-group/input-group";

export function DemoLayout() {
    return (
        <div class="demo">
            <Card>
                <CardElement type="title" tag="h2">Layout</CardElement>
                <CardElement>Inputs offer various ways that they can b</CardElement>
                <CardElement type="subtitle" tag="h3"><code>&lt;InputGroup&gt;</code></CardElement>
                <CardElement>All input types, from checkboxes to number inputs, can be placed within an <code>&lt;InputGrid&gt;</code> to give an alternate styling to the default "free floating" style.</CardElement>
                <CardElement>
                    In addition, to help with alignment, a set of <code>InputGroup</code>s can also be placed within an <code>InputGrid</code> to manage simple cases.
                </CardElement>
                <CardElement>
                    With an <code>&lt;InputGrid&gt;</code>:
                    <InputGrid>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                        <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                        <InputGroup><Input disabled onInput={() => { }} type="number" value={0}>Numeric input</Input></InputGroup>
                    </InputGrid>

                </CardElement>
                <CardElement>
                    Without an <code>&lt;InputGrid&gt;</code>:
                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Checkbox</Checkbox></InputGroup>
                    <InputGroup><Checkbox disabled checked={true} labelPosition="start">Another checkbox</Checkbox></InputGroup>
                    <InputGroup><Input disabled onInput={() => { }} type="number" value={0}>Numeric input</Input></InputGroup>
                </CardElement>
                <CardElement type="subtitle" tag="h3">Simple grids</CardElement>
                <CardElement>
                    Two different grid components are provided for two separate use cases:
                    <ul>
                        <li>&lt;<code>GridResponsive</code>&gt;, which takes a minimum column size and fits as many columns as possible given that constraint</li>
                        <li>&lt;<code>GridStatic</code>&gt;, which takes a minimum column count and fits that many columns in no matter the resulting size and/or jankiness</li>
                    </ul>
                </CardElement>

            </Card>
        </div>
    )
}
async function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0));
}

