import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import copy from 'rollup-plugin-copy'

const base = (plugins = []) => ({
  context: "window",
  external(id, parent, resolved) {
    return id.endsWith('.wasm')
  },
  plugins: [commonjs(), builtins(), ...plugins],
})

export default [{
  input: "src/index.es.js",
  ...base([
    copy({ targets: [{ src: 'build/yoga.wasm', dest: 'dist/' }] }),
    {
      resolveImportMeta(property, {moduleId}) {
        if (property === 'url') {
          return `undefined`;
        }
        return null;
      },
    }
  ]),
  output: {
    format: "es",
    file: "dist/Yoga.es.js",
  },
}, {
  input: "src/index.cjs.js",
  ...base([
    
  ]),
  output: {
    format: "cjs",
    file: "dist/Yoga.cjs.js",
  }
}];
