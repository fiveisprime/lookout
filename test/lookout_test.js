/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function() {
  module('Initialization');

  test('initializes and is available', 4, function() {

    ok(window.lookout, 'lookout should be available');
    ok(window.disregard, 'disregard should be available');

    equal(window.lookout instanceof Function, true, 'lookout should be exposed as a function');
    equal(window.disregard instanceof Function, true, 'disregard should be exposed as a function');

  });

  test('does not throw', 4, function() {

    var obj = { name: 'test' };
    ok(window.lookout(obj, function() { }), 'lookout call with just an object and callback should not throw');
    ok(window.lookout(obj, '', function() { }), 'lookout call with object, string, callback should not throw');
    ok(window.lookout(obj, [''], function() { }), 'lookout call with object, array, callback should not throw');
    ok(window.disregard(obj), 'disregard call should not throw');

  });

  module('events', {
    setup: function() {
      this.obj = { name: 'test object' };
    }
  });

  test('setter updates value', 1, function() {

    window.lookout(this.obj, 'name', function() {
      equal(this.name, 'changed', 'should update the value of the property');
    });

    this.obj.name = 'changed';
  });

  test('lookout all properties', 1, function() {

    window.lookout(this.obj, function() {
      ok(this, 'callback should be called for all properties');
    });

    this.obj.name = 'test all properties';
  });

  test('lookout single property', 1, function() {

    window.lookout(this.obj, 'name', function() {
      ok(this, 'callback should be called for a single property');
    });

    this.obj.name = 'test single property';
  });

  test('lookout array of properties', 1, function() {

    window.lookout(this.obj, ['name'], function() {
      ok(this, 'callback should be called for an array of properties');
    });

    this.obj.name = 'test array of properties';
  });

}());
