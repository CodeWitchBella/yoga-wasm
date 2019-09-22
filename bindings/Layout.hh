/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

#pragma once

#include <emscripten/bind.h>

struct Layout {
  double left;
  double right;

  double top;
  double bottom;

  double width;
  double height;
};


EMSCRIPTEN_BINDINGS(Layout) {
  emscripten::value_object<Layout>("Layout")
    .field("left", &Layout::left)
    .field("right", &Layout::right)
    .field("top", &Layout::top)
    .field("bottom", &Layout::bottom)
    .field("width", &Layout::width)
    .field("height", &Layout::height)
    ;
}
