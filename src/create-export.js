import adapt from './adapt'
import Yoga from "../build/yoga"

function patch(prototype, name, fn) {
  var original = prototype[name];

  prototype[name] = function() {
    const originalArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this, [original].concat(originalArgs));
  };
}

export default (YogaWasm) => new Promise(resolve => {
  Yoga({
    locateFile(path) {
      if(path.endsWith('.wasm')) {
        return YogaWasm
      }
    }
  }).then((Module) => {
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
        UNIT_POINT: Module.YGNode.prototype[fnName],
        UNIT_PERCENT: Module.YGNode.prototype[`${fnName}Percent`],
        UNIT_AUTO: Module.YGNode.prototype[`${fnName}Auto`],
      };
  
      patch(Module.YGNode.prototype, fnName, function(original, ...args) {
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
            `Failed to execute "${fnName}": Unsupported unit '${value}'`,
          );
  
        if (asNumber !== undefined) {
          return methods[unit].call(this, ...args, asNumber);
        } else {
          return methods[unit].call(this, ...args);
        }
      });
    }

    patch(Module.YGNode.prototype, "free", function() {
      this.delete();
    });

    patch(Module.YGNode.prototype, "freeRecursive", function() {
      for (var t = 0, T = this.getChildCount(); t < T; ++t)
        this.getChild(0).freeRecursive();
      this.free();
    });

    function wrapMeasureFunction(measureFunction) {
      return Module.MeasureCallback.implement({ measure: measureFunction });
    }

    patch(Module.YGNode.prototype, "setMeasureFunc", function(
      original,
      measureFunc
    ) {
      original.call(this, wrapMeasureFunction(measureFunc));
    });

    function wrapDirtiedFunction(fn) {
      return Module.DirtiedCallback.implement({ dirtied: fn });
    }

    patch(Module.YGNode.prototype, "setDirtiedFunc", function(
      original,
      fn
    ) {
      original.call(this, wrapDirtiedFunction(fn));
    });

    patch(Module.YGNode.prototype, "calculateLayout", function(
      original,
      width = Module.YGUndefined,
      height = Module.YGUndefined,
      direction = Module.YGDirection.ltr
    ) {
      return original.call(this, width, height, direction);
    });

    const Constants = {}
    for(const [k,v] of Object.entries(Module)) {
      if(k.toUpperCase() === k && !k.startsWith('HEAP')) Constants[k] = v
    }

    resolve(adapt({
      ...Constants,
      Node: Module.YGNode,
      Config: Module.YGConfig,
    }))
  })
})
