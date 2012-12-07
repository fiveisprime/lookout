/*
 * lookout
 * https://github.com/fiveisprime/lookout
 *
 * Copyright (c) 2012 Matt Hernandez
 * Licensed under the MIT, GPL licenses.
 */

!function(window) {

  "use strict";

  /**
   * Watch the specified property of the specified object for changes
   *   and call the specified callback when changed.
   * This function creates a property with get and set functions which
   *   fire the specified callback function when the set function is called
   *   making it possible to alert the caller that some property of the
   *   object has changed.
   * @private
   * @param {Object} obj The object to watch.
   * @param {String} prop The name of the property to watch.
   * @param {Function} callback The callback to raise when the property changes.
   * @return {Object} The global window object.
   */

  var watch = function(obj, prop, callback) {
    var oldValue = obj[prop]
      , currentValue = oldValue
      , getter = function() { return currentValue; }
      , setter = function(value) {
          if (value !== currentValue) {
            oldValue = currentValue;
            currentValue = value;
            callback.call(obj, prop, oldValue, currentValue);
          }
        };

    // Attempt to delete the property. If this fails, the configurable
    // flag is set to false which means that any changes to the property
    // will throw a TypeError.
    if (delete obj[prop]) {
      if (Object.defineProperty) {
        // ECMAScript 5 standard.
        Object.defineProperty(obj, prop, {
          get: getter,
          set: setter
        });
      } else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
        // Older browsers.
        Object.prototype.__defineGetter__(obj, prop, getter);
        Object.prototype.__defineSetter__(obj, prop, setter);
      }
    }

    return this;
  };

  /**
   * Removes the getter and setter functions of the specified property
   *   from the specified object and rewites the value to the object.
   * @private
   * @param {Object} obj The object to remove the getter and setter functions from.
   * @param {String} prop The name of the property that will have the getter and
   * setter functions removed.
   * @return {Object} The global window object.
   */

  var unwatch = function(obj, prop) {
    var value = obj[prop];

    // Delete the property that has the get/set functions specified
    // then add the property back using the original value.
    delete obj[prop];
    obj[prop] = value;

    return this;
  };

  /**
   * Watch for changes in an object and fire a callback when a property changes.
   * Pass an object and callback function to watch all properties of an
   *   object or an object, property name, and callback function to watch
   *   only a single property or an object, an array of property names,
   *   and a callback function to watch several specific properties for
   *   changes.
   * @return {Object} The global window object.
   */

  window.lookout = function() {
    var obj
      , prop
      , props
      , callback
      , args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
      throw new Error('You must specify an object to watch and a callback.');
    } else if (typeof args[0] !== 'object') {
      throw new TypeError('You must specify an object to watch.');
    }

    if (typeof args[0] === 'object' && typeof args[1] === 'function') {

      obj      = args.shift();
      callback = args.shift();

      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          watch(obj, prop, callback);
        }
      }
    } else if (typeof args[0] === 'object' && args[1] instanceof Array && typeof args[2] === 'function') {

      obj       = args.shift();
      props     = args.shift();
      callback  = args.shift();

      for (var i = 0; prop = props[i]; i++) {
        // Only watch for changes on the properties that exist.
        obj[prop] && watch(obj, prop, callback);
      }

    } else if (typeof args[0] === 'object' && typeof args[1] === 'string' && typeof args[2] === 'function') {

      obj      = args.shift();
      prop     = args.shift();
      callback = args.shift();

      obj[prop] && watch(obj, prop, callback);
    }

    return this;
  };

  /**
   * Remove the property change subscriptions that have been set using lookout.
   * @return {Object} The global window object.
   */

  window.disregard = function() {
    var args = Array.prototype.slice.call(arguments)
      , obj = args.shift();

    if (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          unwatch(obj, prop);
        }
      }
    }
    else {
      throw new Error('You must specify an object to disregard.');
    }

    return this;
  };

}(window);
