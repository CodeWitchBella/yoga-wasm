# Yoga WASM

Custom bindings of Yoga Layout 1.18.0 compiled to WebAssembly.

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

## Building

You have to have docker working and running to do this.

```
git clone git@github.com:CodeWitchBella/yoga-wasm.git --recursive # clone with submodule
cd yoga-wasm
npm ci # also runs build
```

## Updating upstream yoga

```
git clone git@github.com:facebook/yoga.git fbyoga -b 1.18.0 # replace with your desired version
cd fbyoga
git subtree split -P yoga -b fbyoga
git remote add wasm git@github.com:CodeWitchBella/yoga-wasm.git
git push wasm fbyoga
cd ..
rm -rf fbyoga
git pull --recurse-submodules
cd yoga
git pull origin fbyoga
```

Now commit and push result, also edit README.md

## Updating emscripten

Change docker image tag in `package.json#/scripts/build:wasm`
