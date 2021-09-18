import clsx from "clsx";
import { ComponentChild, h, Ref } from "preact";
import { useAriaButton, UseAriaButtonParameters } from "preact-aria-widgets/use-button";
import { useAsyncHandler, UseAsyncHandlerParameters, useStableCallback, useStableGetter } from "preact-prop-helpers";
import { useMergedProps } from "preact-prop-helpers/use-merged-props";
import { useCallback } from "preact/hooks";
import { forwardElementRef, GlobalAttributes } from "../props";
import { useButtonColorVariant, useButtonDisabled, useButtonSize, useButtonStyles } from "./defaults";
import { ButtonColorVariant, ButtonPropsBase, ButtonSize } from "./types";

