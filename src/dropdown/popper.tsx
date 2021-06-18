
import { createPopper as defaultCreatePopper, Instance } from "@popperjs/core";
import type { Options as PopperOptions, VirtualElement, State as PopperState, Instance as PopperInstance } from '@popperjs/core';
import { useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import isEqual from 'react-fast-compare';

// Heavily based on https://github.com/popperjs/react-popper/blob/master/src/usePopper.js


interface Options extends Partial<PopperOptions> {
    createPopper?: typeof defaultCreatePopper;
}

interface Styles {
    popper?: Partial<CSSStyleDeclaration>;
    arrow?: Partial<CSSStyleDeclaration>;
};

interface Attributes {
    popper?: { [key: string]: string };
    arrow?: { [key: string]: string };
};

interface State {
    styles: Styles;
    attributes: Attributes;
};

interface UsePopperResult {
    state: PopperState | null;
    styles: Styles;
    attributes: Attributes;
    update: PopperInstance['update'] | null;
    forceUpdate: PopperInstance['forceUpdate'] | null;
}

export function usePopper(referenceElement?: (Element | VirtualElement) | null, popperElement?: HTMLElement | null, options: Options = {}): UsePopperResult {
    const prevOptions = useRef<Partial<PopperOptions>>(null);
    const [i, setI] = useState(0);

    const optionsWithDefaults = {
        onFirstUpdate: options.onFirstUpdate,
        placement: options.placement || 'bottom',
        strategy: options.strategy || 'absolute',
        modifiers: options.modifiers || [],
    };

    const [state, setState] = useState<State>({
        styles: {
            popper: {
                position: optionsWithDefaults.strategy,
                left: '0',
                top: '0',
            },
            arrow: {
                position: 'absolute',
            },
        },
        attributes: {},
    });

    const updateStateModifier = useMemo(
        () => ({
            name: 'updateState',
            enabled: true,
            phase: 'write' as any,
            fn: ({ state }: { state: PopperState }) => {
                const elements = Object.keys(state.elements);

                setI(i => ++i);
                setState({
                    styles: Object.fromEntries(elements.map(element => [element, state.styles[element] || {}])) as any,
                    attributes: Object.fromEntries(elements.map(element => [element, state.attributes[element]]) as any),
                });
            },
            requires: ['computeStyles'],
        }),
        []
    );

    const popperOptions = useMemo(() => {
        const newOptions: PopperOptions = {
            onFirstUpdate: optionsWithDefaults.onFirstUpdate,
            placement: optionsWithDefaults.placement,
            strategy: optionsWithDefaults.strategy,
            modifiers: [
                ...optionsWithDefaults.modifiers,
                updateStateModifier,
                { name: 'applyStyles', enabled: false },
            ],
        };

        if (isEqual(prevOptions.current, newOptions)) {
            return prevOptions.current || newOptions;
        } else {
            prevOptions.current = newOptions;
            return newOptions;
        }
    }, [
        optionsWithDefaults.onFirstUpdate,
        optionsWithDefaults.placement,
        optionsWithDefaults.strategy,
        optionsWithDefaults.modifiers,
        updateStateModifier,
    ]);

    const popperInstanceRef = useRef<Instance | null>(null);

    useLayoutEffect(() => {
        if (popperInstanceRef.current) {
            popperInstanceRef.current.setOptions(popperOptions);
        }
    }, [popperOptions]);

    useLayoutEffect(() => {
        if (referenceElement == null || popperElement == null) {
            return;
        }

        const createPopper = options.createPopper || defaultCreatePopper;
        const popperInstance = createPopper(referenceElement, popperElement, popperOptions);

        popperInstanceRef.current = popperInstance;

        return () => {
            popperInstance.destroy();
            popperInstanceRef.current = null;
        };
    }, [referenceElement, popperElement, options.createPopper]);

    if (popperInstanceRef.current) {
        return {
            state: popperInstanceRef.current.state,
            styles: state.styles,
            attributes: state.attributes,
            update: popperInstanceRef.current.update,
            forceUpdate: popperInstanceRef.current.forceUpdate,
        }
    }


    return {
        state: null,
        forceUpdate: null,
        update: null,
        styles: {},
        attributes: {}
    };

}
