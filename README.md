# Preact Onionated Bootstrap
\*Opoinionated

Preact widgets like buttons, menus, form fields, etc. Priorities on ARIA compliance (including friendly keyboard navigation), looking pleasant, and having an simple API that removes the most common boilerplate (e.g. allowing inputs such as checkboxes to take an async `onInput` handler and adapt accordingly).

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

// Function to wait 5 seconds. Most components wait 1 second to show a spinner.
const sleep = () => new Promise(resolve => setTimeout(resolve, 5000));

// Button will start showing a spinner after 1 second of waiting
<Button onClick={sleep}>Click me</Button>


// When the checkbox changes, wait 5 seconds, and then actually change it.
// Simulate e.g. storing a value in a database, where the value
// is confirmed on the return trip and then stored.
const [checked, setChecked] = useState(false);
const onInput = async (checked, e) => { await sleep(); setChecked(checked); }

// Checkbox will assume a change operation succeeded until the 
// handler ends one way or another, and will show the user
// that change as-is until 1 second has passed, at which point 
// a spinner will appear until it's resolved.
<Checkbox onInput={onInput}>Async checkbox</Checkbox>
// (If it resolves successfully then the spinner just disappears -- 
// if it rejects, then since `checked` will never have changed, 
// the `Checkbox` will revert to that again.)
```


No documentation, lots of TODOs!

