var window = window || require('../src/lookout');

describe('lookout', function() {

  it('should should be available', function() {
    expect(window.lookout).toBeDefined();
    expect(window.disregard).toBeDefined();

    expect(typeof window.lookout).toEqual('function');
    expect(typeof window.disregard).toEqual('function');
  });

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

  it('should disregard a watched property', function() {
    var obj = { name: 'foo', fn: function() {} };
    spyOn(obj, 'fn');

    window.lookout(obj, 'name', obj.fn);
    window.disregard(obj);

    obj.name = 'bar';

    expect(obj.fn).wasNotCalled();
  });

});