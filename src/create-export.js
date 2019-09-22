/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import Yoga from "../build/yoga"

function patch(prototype, name, fn) {
  var original = prototype[name];

  prototype[name] = function() {
    const originalArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this, [original].concat(originalArgs));
  };
}


class Size {
  static fromJS({width, height}) {
    return new Size(width, height);
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  fromJS(expose) {
    expose(this.width, this.height);
  }

  toString() {
    return `<Size#${this.width}x${this.height}>`;
  }
}

export default (YogaWasm) => new Promise(resolve => {
  Yoga({
    locateFile(path) {
      if(path.endsWith('.wasm')) {
        return YogaWasm
      }
    }
  }).then((lib) => {
    for (let fnName of [
      'setPosition',
      'setMargin',
      'setFlexBasis',
      'setWidth',
      'setHeight',
      'setMinWidth',
      'setMinHeight',
      'setMaxWidth',
      'setMaxHeight',
      'setPadding',
    ]) {
      let methods = {
        UNIT_POINT: lib.Node.prototype[fnName],
        UNIT_PERCENT: lib.Node.prototype[`${fnName}Percent`],
        UNIT_AUTO: lib.Node.prototype[`${fnName}Auto`],
      };
  
      patch(lib.Node.prototype, fnName, function(original, ...args) {
        // We patch all these functions to add support for the following calls:
        // .setWidth(100) / .setWidth("100%") / .setWidth(.getWidth()) / .setWidth("auto")
  
        let value = args.pop();
        let unit, asNumber;

        if (value === 'auto') {
          unit = 'UNIT_AUTO';
          asNumber = undefined;
        //} else if (value instanceof Value) {
        //  unit = value.unit;
        //  asNumber = value.valueOf();
        } else {
          unit =
            typeof value === 'string' && value.endsWith('%')
              ? 'UNIT_PERCENT'
              : 'UNIT_POINT';
          asNumber = parseFloat(value);
          if (!Number.isNaN(value) && Number.isNaN(asNumber)) {
            throw new Error(`Invalid value ${value} for ${fnName}`);
          }
        }

        if (!methods[unit])
          throw new Error(
            `Failed to execute "${fnName}": Unsupported unit '${value}' (${unit})`,
          );
  
        if (asNumber !== undefined) {
          return methods[unit].call(this, ...args, asNumber);
        } else {
          return methods[unit].call(this, ...args);
        }
      });
    }
    patch(lib.Config.prototype, 'free', function() {
      // Since we handle the memory allocation ourselves (via lib.Config.create),
      // we also need to handle the deallocation
      lib.Config.destroy(this);
    });
  
    patch(lib.Node, 'create', function(_, config) {
      // We decide the constructor we want to call depending on the parameters
      return config
        ? lib.Node.createWithConfig(config)
        : lib.Node.createDefault();
    });
  
    patch(lib.Node.prototype, 'free', function() {
      // Since we handle the memory allocation ourselves (via lib.Node.create),
      // we also need to handle the deallocation
      lib.Node.destroy(this);
    });
  
    patch(lib.Node.prototype, 'freeRecursive', function() {
      for (let t = 0, T = this.getChildCount(); t < T; ++t) {
        this.getChild(0).freeRecursive();
      }
      this.free();
    });

    // our addition - we need to wrap the callback
    function wrapDirtiedFunction(fn) {
      return lib.DirtiedCallback.implement({ dirtied: fn });
    }
    patch(lib.Node.prototype, 'setDirtiedFunc', function(original, fn) {
      return original.call(this, wrapDirtiedFunction(fn));
    });
    
    // Here we have modification to wrap the callback
    function wrapMeasureFunction(measureFunction) {
      return lib.MeasureCallback.implement({ measure: measureFunction });
    }
    patch(lib.Node.prototype, 'setMeasureFunc', function(original, measureFunc) {
      // This patch is just a convenience patch, since it helps write more
      // idiomatic source code (such as .setMeasureFunc(null))
      // We also automatically convert the return value of the measureFunc
      // to a Size object, so that we can return anything that has .width and
      // .height properties
      if (measureFunc) {
        return original.call(this, wrapMeasureFunction((...args) =>
          Size.fromJS(measureFunc(...args))),
        );
      } else {
        return this.unsetMeasureFunc();
      }
    });
    
    patch(lib.Node.prototype, 'calculateLayout', function(
      original,
      width = NaN,
      height = NaN,
      direction = CONSTANTS.DIRECTION_LTR,
    ) {
      // Just a small patch to add support for the function default parameters
      return original.call(this, width, height, direction);
    });  

    // TODO: maybe use the values like upstream does?
    const Constants = {}
    for (const [k,v] of Object.entries(lib)) {
      if (
        k.toUpperCase() === k
        && !k.startsWith('HEAP')
        && typeof v !== 'function'
      ) {
        Constants[k] = v.value
      }
    }

    resolve({
      ...Constants,
      Node: lib.Node,
      Config: lib.Config,
    })
  })
})
