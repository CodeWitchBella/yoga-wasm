/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

#pragma once

#include <emscripten/bind.h>

struct Size
{
  double width;
  double height;

  Size(void) : width(0.0), height(0.0) {}

  Size(double width, double height) : width(width), height(height) {}
};

EMSCRIPTEN_BINDINGS(Size) {
  emscripten::value_object<Size>("Size")
    .field("width", &Size::width)
    .field("height", &Size::height)
    ;
}
