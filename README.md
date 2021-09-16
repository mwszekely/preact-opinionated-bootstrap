# Preact Onionated Bootstrap
\*Opoinionated

Preact widgets like buttons, menus, form fields, etc. that are ARIA-compliant with friendly keyboard navigation and that automatically accept asynchronous event handlers, styled by default with modified Boostrap styling, though not using any of its jQuery plugins.


* Accordion
* Button
* Card
* Dialog
* Drawer (Offcanvas)
* Inputs 
    * Text
    * Number
    * Checkbox
    * Checkbox group
    * Radio group
    * Switch
* Single-select Listbox
* Menu (dropdown)
* Spinner (as an internal component used by Inputs during long async handlers)
* Tabs
* Toast (snackbar)
* Tooltip

The following components are currently style-only and do not provide additional interaction or ARIA labelling:
* Badge
* Card
* Figure
* Table

```tsx
const sleep = () => new Promise(resolve => setTimeout(resolve, 5000));
<Button onClick={sleep}>Click me</Button>

const [checked, setChecked] = useState(false);
const onInput = async (checked, e) => { await sleep(); setChecked(checked); }
<Checkbox onInput={onInput}>Async checkbox</Checkbox>
```


No documentation, lots of TODOs!

