/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

/* globals window: true */

/**
 * Sets up global variables typical in most JavaScript environments.
 *
 *   1. Global timers (via `setTimeout` etc).
 *   2. Global console object.
 *   3. Hooks for printing stack traces with source maps.
 *
 * Leaves enough room in the environment for implementing your own:
 *
 *   1. Require system.
 *   2. Bridged modules.
 *
 */
'use strict';

const start = Date.now();

require('./setUpGlobals');
require('./polyfillES6Collections');
require('./setUpSystrace');
require('./setUpErrorHandling');
require('./polyfillPromise');
require('./setUpRegeneratorRuntime');
require('./setUpTimers');
require('./setUpXHR');
require('./setUpAlert');
require('./setUpNavigator');
require('./setUpBatchedBridge');
require('./setUpSegmentFetcher');
if (__DEV__) {
  require('./checkNativeVersion');
  require('./setUpDeveloperTools');

  // This is used by the require.js polyfill for hot reloading.
  // TODO(t9759686) Scan polyfills for dependencies, too
  const reload = require('../NativeModules/specs/NativeDevSettings').default
    .reload;
  if (typeof reload !== 'function') {
    throw new Error('Could not find the reload() implementation.');
  }
  (require: any).reload = reload;
}

const GlobalPerformanceLogger = require('../Utilities/GlobalPerformanceLogger');
// We could just call GlobalPerformanceLogger.markPoint at the top of the file,
// but then we'd be excluding the time it took to require the logger.
// Instead, we just use Date.now and backdate the timestamp.
GlobalPerformanceLogger.markPoint(
  'initializeCore_start',
  GlobalPerformanceLogger.currentTimestamp() - (Date.now() - start),
);
GlobalPerformanceLogger.markPoint('initializeCore_end');
