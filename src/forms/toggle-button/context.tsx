
import { createContext } from "preact"
import { ButtonColor } from "../../button/types";

export const InToggleButton = createContext(false);
export const DefaultRadioButtonVariant = createContext<ButtonColor>("primary");
