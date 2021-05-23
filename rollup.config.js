import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import alias from '@rollup/plugin-alias';
import url from '@rollup/plugin-url';

const aliasToPreact = () => alias({
    entries: [
        { find: 'react', replacement: 'preact/compat/src' },
        { find: 'react-dom', replacement: 'preact/compat/src' }
    ]
});

const aliasMixui = () => alias({
    entries: [
        { find: "mixui", replacement: "../node_modules/mixui" }
    ]
})

const anyUrl = () => url({
    include: ['**/*.svg', '**/dist/assets/index.css', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp'],
    limit: Number.MAX_SAFE_INTEGER
})

export default {
    input: "src/index.js",
    output: {
        file: "dist/assets/bundle.js",
        format: "iife",
        name: "bundle",
        /*globals: {
            'preact': 'preact',
            'preact/compat': 'preact',
            'react': 'preact',
            'react-dom': 'preact',
        }*/
    },
    plugins: [aliasToPreact(), aliasMixui(), commonjs(), anyUrl(), resolve()],
    //external: ['preact', 'preact/compat', 'react', 'react-dom']
}
