# Yoga WASM

Custom bindings of Yoga Layout compiled to WebAssembly.

## Install

`npm install @codewitchbella/yoga-wasm`

## Usage with webpack

Add following to `module.rules` section of your configuration

```
{
  test: /yoga\.wasm$/,
  loader: require.resolve('file-loader'),
  type: 'javascript/auto',
},
```

This makes webpack provide us with path to `yoga.wasm` file.

## Goals

- WASM bindings on yoga-layout compatible with official build
- Be able to use it as drop-in replacement for yoga-layout-prebuilt except that
  it exports promise.

## Status

It is code-complete and most of the code is copied over from yoga-layout, which
means that it should be compatible with most code using yoga. But it needs
more testing to determine if it is actually true.

## Currently non-goals

- Fallback to JS (but I might accept pull request)
