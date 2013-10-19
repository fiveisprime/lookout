SRC = src/lookout.js
OUT = src/lookout.min.js

build: $(SRC)
	@node_modules/.bin/jshint $^
	@node_modules/.bin/uglifyjs $^ -o $(OUT) \
	--mangle \
	--stats

test: $(SRC)
	@node_modules/.bin/jshint $^
	@node_modules/.bin/jasmine-node \
	--verbose \
	--captureExceptions \
	spec
