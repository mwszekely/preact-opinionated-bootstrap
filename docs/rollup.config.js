import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import { babel } from "@rollup/plugin-babel";
import path from "path";

export default {
    input: "index.tsx",
    output: {
        file: "bundle.js",
        format: "iife",
        name: "bundle",
        sourcemap: false
    },

    plugins: [
        typescript({ sourceMap: false }),
        commonjs(),
        resolve({ dedupe: ['preact', "preact/compat", "preact/hooks", "preact/debug", "preact/devtools", "preact-opinionated-bootstrap", "preact-aria-widgets", "preact-prop-helpers"] }),
        babel({
            configFile: path.resolve(__dirname, ".babelrc"),
            babelHelpers: "bundled",
            sourceMaps: true
        }),
    ]
}
