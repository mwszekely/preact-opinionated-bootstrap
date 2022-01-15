# Preact Onionated Bootstrap
\*Opionionated

Preact widgets like buttons, menus, form fields, etc. Priorities on ARIA compliance (including user-friendly keyboard & assistive technology navigation), looking pleasant, and having an simple (one might say opinionated) API that removes the most common boilerplate (e.g. allowing inputs such as checkboxes to take an async `onInput` handler and adapt accordingly).

[See a demo of various components together on a page here.](https://mwszekely.github.io/preact-opinionated-bootstrap/)

* Accordion
* Button
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
* Table
* Toast (snackbar)
* Tooltip

The following components are currently style-only and do not provide additional interaction or ARIA labelling:
* Badge
* Card
* Figure

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


## Theming

By default, light and dark themes are provided.  To make your own theme, do the following:

1. Create `index-${theme}.scss` with the following contents
2. You can either start by basing off the default themes, or start from scratch. Add one of the following to the file:
*  * Start from, e.g., a base of the light theme:
```scss
@use "~preact-opinionated-bootstrap/src/bootstrap-light.scss" with (REPLACEMENTS HERE);
@use "~preact-opinionated-bootstrap/src/index-helper.scss" as *;
```
*
  * Or start from scratch:
```scss
// You could also copy/paste from the default themes and modify them like this:
@use "~preact-opinionated-bootstrap/src/bootstrap/bootstrap" with (REPLACEMENTS HERE);
@use "~preact-opinionated-bootstrap/src/index-helper.scss" as *;
```
3. If you want the default font too, include this:
```scss
@use "~preact-opinionated-bootstrap/src/fonts.scss" as *;
```
