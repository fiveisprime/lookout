//
//     Lookout.js
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

!function(window) {

  'use strict';

  //
  // Watch the specified property of the specified object for changes
  //    and call the specified callback when changed.
  // This function creates a property with get and set functions which
  //    fire the callback function when the set function is called
  //    making it possible to alert the caller that some property of the
  //    object has changed.
  //
  // Called from `window.lookout`.
  //
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

    //
    // Attempt to delete the property. If this fails, the configurable
    //    flag is set to false which means that any changes to the property
    //    will throw a TypeError.
    //
    // Note that this means that older versions of Internet Explorer (IE6 and
    //    IE7) will not work.
    //
    if (delete obj[prop]) {
      if (Object.defineProperty) {
        // ECMAScript 5 standard.
        Object.defineProperty(obj, prop, {
          get: getter
        , set: setter
        , configurable: true
        , enumerable: true
        });
      } else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
        // Older browsers.
        Object.prototype.__defineGetter__(obj, prop, getter);
        Object.prototype.__defineSetter__(obj, prop, setter);
      }
    }

    return this;
  };

  //
  // Removes the getter and setter functions of the specified property
  //    from the specified object and rewrites the value to the object.
  //
  // Publicly accessible through `window.disregard`.
  //
  var unwatch = function(obj, prop) {
    var value = obj[prop];

    //
    // Delete the defined property then add the property back using the
    //    original value.
    //
    delete obj[prop];
    obj[prop] = value;

    return this;
  };

  //
  // Watch for changes in an object and fire a callback when a property changes.
  // Pass an object and callback function to watch all properties of an
  //    object or an object, property name, and callback function to watch
  //    only a single property or an object, an array of property names,
  //    and a callback function to watch several specific properties for
  //    changes.
  //
  // Accepts an object with a callback; an object, string property name to watch
  //    and a callback; or object, array of property names to watch and a
  //    callback.
  //
  // ### Usage
  //
  //     window.lookout(obj, [properties,] callback);
  //
  //     var obj = { name: 'name' };
  //     lookout(obj, function() {
  //       console.log('object updated');
  //     });
  //
  //     lookout(obj, 'name', function() {
  //       console.log('object name changed to', this.name);
  //     });
  //
  window.lookout = function(obj, props, fn) {
    if (!obj) throw new Error('You must specify an object to watch.');
    if (!props) throw new Error('You must specify an object to watch and a callback.');

    var prop = null, i;

    if (typeof props === 'function') {
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          watch(obj, prop, props);
        }
      }
    } else {
      if (typeof props === 'string') props = [props];

      for (i = 0; (prop = props[i]); i++) {
        obj[prop] && watch(obj, prop, fn);
      }
    }

    return this;
  };

  //
  // Remove the property change subscriptions that have been set using lookout.
  //
  // ### Usage
  //
  //     var obj = { name: 'foo' };
  //
  //     window.lookout(obj, function() {
  //       // This callback will not be called in this example.
  //     });
  //
  //     // Stop watching the object for changes.
  //     window.disregard(obj);
  //
  //     obj.name = 'bar';
  //
  window.disregard = function(obj) {
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

}(typeof window !== 'undefined' ? window : module.exports);
