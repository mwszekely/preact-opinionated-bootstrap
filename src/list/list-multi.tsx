import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaListboxSingle } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets/props";
import { UseListboxSingleItem, UseListboxSingleItemInfo, UseListboxSingleParameters } from "preact-aria-widgets/use-listbox-single";
import { UseListboxMultiParameters } from "preact-aria-widgets/use-listbox-multi";
import { useAsyncHandler, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { UseLinearNavigationChildInfo, UseLinearNavigationParameters } from "preact-prop-helpers/use-keyboard-navigation";
import { useContext, useLayoutEffect } from "preact/hooks";
import { GlobalAttributes, usePseudoActive } from "../props";

interface ListMultiProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseListboxMultiParameters, "onSelect">, GlobalAttributes<E> {
    select: "multi";
    tag: "ul" | "ol";
    children: ComponentChildren;
}
