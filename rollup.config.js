import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import copy from 'rollup-plugin-copy'

const base = {
  input: "src/index.js",
  context: "window",
  external(id, parent, resolved) {
    return id.endsWith('.wasm')
  },
  plugins: [commonjs(), builtins(), copy({
    targets: [
      { src: 'build/yoga.wasm', dest: 'dist/' }
    ]
  })],
}

export default [{
  ...base,
  output: {
    format: "es",
    file: "dist/Yoga.es.js",
  },
}, {
  ...base,
  output: {
    format: "cjs",
    file: "dist/Yoga.cjs.js",
  }
}];
