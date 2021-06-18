import { ComponentChildren, h } from "preact"


//interface AttributesThatAreEventHandlersOrPreactSpecific<E extends HTMLElement> extends h.JSX.DOMAttributes<E> { }


type VeryCommonProps = "id" | "className" | "class" | "style" | "tabIndex" | "role" | "draggable" | "accessKey"

export type HTMLButtonType = "button" | "submit" | "reset";

/**
 * Allows the display of only those HTML attributes that are relevant.
 * That essentially means only event handlers, the Preact-specific stuff (like children, ref, dangerouslySetInnerHTML)
 * some stuff that's always useful and available (id, className, style, tabIndex, etc)
 * and some number of other properties that you specifically select
 */
export interface SimpleProps<E extends HTMLElement> extends Pick<h.JSX.HTMLAttributes<E>, VeryCommonProps> {
    children?: ComponentChildren;
}

// This is a type, but can be used as a base for an interface
export type SimplePropsWithExtras<E extends HTMLElement, AdditionalProps extends keyof h.JSX.HTMLAttributes<E>> = SimpleProps<E> & Pick<h.JSX.HTMLAttributes<E>, AdditionalProps>


export type SimpleHTMLAnchorAttributes = "href" | "download" | "hrefLang" | "rel" | "target" | "disabled";
export interface SimpleHTMLAnchorProps extends SimplePropsWithExtras<HTMLAnchorElement, SimpleHTMLAnchorAttributes> { }

export interface SimpleHTMLButtonProps extends SimplePropsWithExtras<HTMLButtonElement, never> { type: HTMLButtonType; }

export interface SimpleHTMLDivProps extends SimplePropsWithExtras<HTMLDivElement, never> {  }
export interface SimpleHTMLSpanProps extends SimplePropsWithExtras<HTMLSpanElement, never> {  }

export interface SimpleHTMLDialogProps extends SimplePropsWithExtras<HTMLDialogElement, "open"> {  }

/*export interface SimpleHTMLInputButtonProps extends SimplePropsWithExtras<HTMLInputElement, "value" | "type"> { type: HTMLButtonType; }

export interface SimpleHTMLInputCheckboxProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "checked"> { type: "checkbox"; }
export interface SimpleHTMLInputColorProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "color"; }
export interface SimpleHTMLInputDateProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "date"; }
export interface SimpleHTMLInputDatetimeLocalProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "datetime-local"; }
export interface SimpleHTMLInputEmailProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "email"; }
export interface SimpleHTMLInputMonthProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "month"; }
export interface SimpleHTMLInputNumberProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "number"; }
export interface SimpleHTMLInputSearchProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "search"; }
export interface SimpleHTMLInputTelProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "tel"; }
export interface SimpleHTMLInputTextProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "text"; }
export interface SimpleHTMLInputTimeProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "time"; }
export interface SimpleHTMLInputUrlProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "url"; }
export interface SimpleHTMLInputWeekProps extends SimplePropsWithExtras<HTMLInputElement, "type" | "value"> { type: "week"; }

export type SimpleHTMLInputTextBasedProps = SimpleHTMLInputTextProps | SimpleHTMLInputColorProps | SimpleHTMLInputDateProps | SimpleHTMLInputDatetimeLocalProps | SimpleHTMLInputEmailProps | SimpleHTMLInputMonthProps | SimpleHTMLInputNumberProps | SimpleHTMLInputSearchProps | SimpleHTMLInputTelProps | SimpleHTMLInputTextProps | SimpleHTMLInputTimeProps | SimpleHTMLInputUrlProps | SimpleHTMLInputWeekProps;
*/

export interface SimpleHTMLTableProps extends SimplePropsWithExtras<HTMLTableElement, never> { }
export interface SimpleHTMLTableHeadProps extends SimplePropsWithExtras<HTMLTableSectionElement, never> { }
export interface SimpleHTMLTableBodyProps extends SimplePropsWithExtras<HTMLTableSectionElement, never> { }
export interface SimpleHTMLTableFootProps extends SimplePropsWithExtras<HTMLTableSectionElement, never> { }
export interface SimpleHTMLTableRowProps extends SimplePropsWithExtras<HTMLTableRowElement, never> { }
export interface SimpleHTMLTableCellProps extends SimplePropsWithExtras<HTMLTableHeaderCellElement, "colSpan" | "headers" | "rowSpan"> { }
export interface SimpleHTMLTableHeaderCellProps extends SimplePropsWithExtras<HTMLTableHeaderCellElement, "colSpan" | "headers" | "rowSpan" | "scope"> { }

export interface SimpleHTMLFigureProps extends SimplePropsWithExtras<HTMLElement, never> { }
export interface SimpleHTMLFigureCaptionProps extends SimplePropsWithExtras<HTMLElement, never> { }

export interface SimpleHTMLImageProps extends SimplePropsWithExtras<HTMLImageElement, "src" | "alt" | "crossOrigin" | "decoding" | "height" | "width" | "loading" | "sizes" | "srcset"> { }
