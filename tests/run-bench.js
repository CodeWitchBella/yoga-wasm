/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

require(`./tools`);

let fs = require(`fs`);
let vm = require(`vm`);

let WARMUP_ITERATIONS = 3;
let BENCHMARK_ITERATIONS = 10;

let testFiles = process.argv.slice(2).map(file => {
  return fs.readFileSync(file).toString();
});

let testResults = new Map();

require(`../dist/Yoga.cjs.js`)
  .then(function(Yoga) {
    for (let type of [`browser`]) {
      for (let file of testFiles) {
        vm.runInNewContext(
          file,
          Object.assign(Object.create(global), {
            Yoga: Yoga,

            YGBENCHMARK: function(name, fn) {
              let testEntry = testResults.get(name);

              if (testEntry === undefined)
                testResults.set(name, (testEntry = new Map()));

              for (let t = 0; t < WARMUP_ITERATIONS; ++t) fn();

              let start = Date.now();

              for (let t = 0; t < BENCHMARK_ITERATIONS; ++t) fn();

              let end = Date.now();

              testEntry.set(type, (end - start) / BENCHMARK_ITERATIONS);
            },
          })
        );
      }
    }

    console.log(
      `Note: those tests are independants; there is no time relation to be expected between them`
    );

    for (let [name, results] of testResults) {
      console.log();

      let min = Math.min(Infinity, ...results.values());

      console.log(name);

      for (let [type, result] of results) {
        console.log(
          `  - ${type}: ${result}ms (${Math.round(result / min * 10000) /
            100}%)`
        );
      }
    }
  })
  .catch(function(err) {
    console.error(err);
  });
