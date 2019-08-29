# Yoga DOM

Custom bindings of Yoga Layout compiled to WebAssembly.

## Goals

- WASM bindings on yoga-layout compatible with official build
- Be able to use it as drop-in replacement for yoga-layout-prebuilt except that
  it exports promise.

## TODO

- [x] make basic functionality work (be able to render simple pdf using react-pdf)
- [ ] make [official tests](https://github.com/facebook/yoga/tree/master/javascript/tests) work
- [ ] remove most of custom adapters in JS and instead export methods directly from source
- [ ] use standard tools like prettier and eslint
- [ ] update tooling

## Currently non-goals

- Fallback to JS (but I might accept pull request)
