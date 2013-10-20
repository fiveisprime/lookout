var window = window || require('../src/lookout');

describe('lookout', function() {

  describe('availability', function() {

    it('should be available in global scope', function() {
      expect(window.lookout).toBeDefined();
      expect(window.disregard).toBeDefined();

      expect(typeof window.lookout).toEqual('function');
      expect(typeof window.disregard).toEqual('function');
    });

  });

  describe('watching', function() {

    it('should watch an object', function() {
      var obj = { name: 'foo', fn: function() {} };
      spyOn(obj, 'fn');

      window.lookout(obj, obj.fn);
      obj.name = 'bar';

      expect(obj.fn).wasCalledWith('name', 'foo', 'bar');
    });

    it('should watch specific properties of an object', function() {
      var obj = { name: 'foo', fn: function() {} };
      spyOn(obj, 'fn');

      window.lookout(obj, 'name', obj.fn);
      obj.name = 'bar';

      expect(obj.fn).wasCalledWith('name', 'foo', 'bar');
    });

    it('should watch specific properties of an object using an array', function() {
      var obj = { name: 'foo', fn: function() {} };
      spyOn(obj, 'fn');

      window.lookout(obj, ['name'], obj.fn);
      obj.name = 'bar';

      expect(obj.fn).wasCalledWith('name', 'foo', 'bar');
    });

    it('should disregard all watched properties', function() {
      var obj = { name: 'foo', fn: function() {} };
      spyOn(obj, 'fn');

      window.lookout(obj, 'name', obj.fn);
      window.disregard(obj);

      obj.name = 'bar';

      expect(obj.fn).wasNotCalled();
    });

    it('should correctly scope `this` on callback', function() {
      var obj = { name: 'foo' }
        , testScope = null;

      window.lookout(obj, 'name', function() {
        testScope = this;
      });

      obj.name = 'test';

      expect(testScope).toEqual(obj);
    });

  });

});