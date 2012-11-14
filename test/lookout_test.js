/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function() {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('Initialization');

  test('initializes', 2, function() {
    
    ok(window.lookout, 'should initialize');
    equal(window.lookout instanceof Function, true, 'should be exposed as a function');
    
  });
  
  module('events', {
    setup: function() {
      this.obj = {
        name: 'test object'
      };
    }
  });
  
  test('events', 1, function() {
    var self = this;
    
    // change a property and verify that the callback is raised.
    window.lookout(self.obj, function() {
      ok(self.obj, 'callback should be called');
    });
    
    this.obj.name = 'test object gonna test';
  });

}());
