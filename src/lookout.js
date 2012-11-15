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
    if (arguments.length === 0) {
      throw new Error('You must specify an object to watch and a callback.');
    } else if (typeof arguments[0] !== 'object') {
      throw new TypeError('You must specify an object to watch.');
    }
    
    var obj, prop, callback;
    
    if (typeof arguments[0] === 'object' && typeof arguments[1] === 'function') {

      obj = arguments[0];
      callback = arguments[1];
        
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          watch(obj, prop, callback);
        }
      }
    } else if (typeof arguments[0] === 'object' && arguments[1] instanceof Array && typeof arguments[2] === 'function') {
      
      obj = arguments[0];
      callback = arguments[2];
      var props = arguments[1];
      
      for (var i = 0; i < props.length; i++) {
        obj[props[i]] && watch(obj, props[i], callback);
      }
      
    } else if (typeof arguments[0] === 'object' && typeof arguments[1] === 'string' && typeof arguments[2] === 'function') {
      
      obj = arguments[0];
      prop = arguments[1];
      callback = arguments[2];
      
      obj[prop] && watch(obj, prop, callback);
    }
    
    return this;
  };
  
  /**
   * Remove the property change subscriptions that have been set using lookout.
   * @return {Object} The global window object.
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
    
    return this;
  };

}(window);
