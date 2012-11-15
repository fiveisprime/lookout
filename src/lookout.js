/*
 * lookout
 * https://github.com/fiveisprime/lookout
 *
 * Copyright (c) 2012 Matt Hernandez
 * Licensed under the MIT, GPL licenses.
 */

!function(window) {
  
  /**
   * Watch the specified property of the specified object for changes
   *   and call the specified callback when changed.
   * @private
   * @param {Object} obj The object to watch.
   * @param {String} prop The name of the property to watch.
   * @param {Function} callback The callback to raise when the property changes.
   */
  
  var watch = function(obj, prop, callback) {
    var oldValue = obj[prop]
      , newValue = oldValue
      , getter = function() { return newValue; }
      , setter = function(value) {
        oldValue = newValue;
        callback.call(obj, prop, oldValue, newValue, value);
      };
      
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
  };
  
  /**
   * Removes the getter and setter functions of the specified property from
   *   the specified object.
   * @private
   * @param {Object} obj The object to remove the getter and setter functions from.
   * @param {String} prop The name of the property that will have the getter and
   *   setter functions removed.
   */
  
  var unwatch = function(obj, prop) {
    var value = obj[prop];
    
    delete obj[prop];
    obj[prop] = value;
  };

  /**
   * Watch for changes in an object - watch all properties of an object or
   *   only watch specific properties of the object.
   */

  window.lookout = function() {
    if (arguments.length === 0) {
      throw new Error('You must specify an object to watch and a callback.');
    } else if (typeof arguments[0] !== 'object') {
      throw new TypeError('You must specify an object to watch.');
    }
    
    if (typeof arguments[0] === 'object' && typeof arguments[1] === 'function') {
      // Watch all properties.
      var obj = arguments[0]
        , callback = arguments[1];
        
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          watch(obj, prop, callback);
        }
      }
    } else if (typeof arguments[1] === 'array' || typeof arguments[1] === 'string') {
      // Watch specific properties.
    }
  };
  
  /**
   * Remove the property change subscriptions that have been set using
   *   lookout.
   */
  
  window.disregard = function() {
    if (arguments.length === 0) {
      throw new Error('You must specify an object to disregard.');
    }
    
    var obj = arguments[0];
    
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        unwatch(obj, prop);
      }
    }
  };

}(window);
