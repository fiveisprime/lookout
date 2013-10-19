# Lookout [![Build Status](https://secure.travis-ci.org/fiveisprime/lookout.png?branch=master)](https://travis-ci.org/fiveisprime/lookout)

Create subscriptions for object property changes.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/fiveisprime/lookout/master/src/lookout.min.js
[max]: https://raw.github.com/fiveisprime/lookout/master/src/lookout.js

In your web page:

```js
var something = { name: 'something' };

// Watch the object's properties using lookout.
lookout(something, function() {
  console.log('Something just changed');
});

// Unwatch the object's properties using disregard.
disregard(something);
```

## Examples
Lookout allows you to subscribe to change notifications on an object for things
like validation and ensures that `this` is the object that changed:

```js
var myObject = { id: 100, name: 'my object' };

lookout(myObject, 'name', function() {
  // this is the object that just changed.
  if (this.name.length === 0) {
    alert('Invalid name value!');
  }
});
```

The notification callback also passes the name of the property that changed,
the old value, and the new value:

```js
var myObject = { id: 100, name: 'my object' };

lookout(myObject, function(prop, oldValue, newValue) {
  console.log(prop + ' just changed from [' + oldValue + '] to [' + newValue + ']');
});
```

## Release History
* 2013/10/18 - v0.1.2 - Major rework of the build system and corrected `disregard` functionality.
* 2012/11/27 - v0.1.1 - Bug fixes.
* 2012/11/15 - v0.1.0 - Initial release.

## License
Copyright (c) 2013 Matt Hernandez

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
