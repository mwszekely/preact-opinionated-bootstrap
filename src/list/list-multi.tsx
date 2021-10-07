import clsx from "clsx";
import { ComponentChildren, createContext, h, Ref } from "preact";
import { useAriaListboxSingle } from "preact-aria-widgets";
import { EventDetail } from "preact-aria-widgets";
import { UseListboxMultiParameters } from "preact-aria-widgets";
import { useAsyncHandler, useMergedProps, useRefElement, useState } from "preact-prop-helpers";
import { useContext, useLayoutEffect } from "preact/hooks";
import { GlobalAttributes, usePseudoActive } from "../props";

interface ListMultiProps<E extends HTMLUListElement | HTMLOListElement> extends Omit<UseListboxMultiParameters, "onSelect">, GlobalAttributes<E> {
    select: "multi";
    tag: "ul" | "ol";
    children: ComponentChildren;
}
