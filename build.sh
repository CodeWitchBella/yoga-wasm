#!/usr/bin/env bash
set -e

export OPTIMIZE="-Os"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CXXFLAGS="${OPTIMIZE}"

mkdir -p build

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="

# Compile C/C++ code
emcc \
  ${OPTIMIZE} \
  --bind --memory-init-file 0 --closure 1 -s WASM_OBJECT_FILES=0 --llvm-lto 1 \
  -fno-exceptions \
  -s STRICT=1 \
  -s DISABLE_EXCEPTION_CATCHING=1 \
  -s NO_EXIT_RUNTIME=1 \
  -s FILESYSTEM=0 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s MALLOC=emmalloc \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s ASSERTIONS=0 \
  -o ./build/yoga.js \
  -I . \
  yoga/*.cpp bindings/*.cc

echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="

ls -lh build/yoga.js build/yoga.wasm
