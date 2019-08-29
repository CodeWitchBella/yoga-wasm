import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";

const base = {
  input: "src/index.js",
  context: "window",
  plugins: [commonjs(), builtins()],
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
