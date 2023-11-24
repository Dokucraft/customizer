# Scripts
The customizer is a JavaScript program that is run with a different configuration every time someone downloads a customized pack. The Dokucraft API will run the customizer's `main.js` file with the configuration from the user using NodeJS.

All of the scripts in the customizer are [ECMAScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). That means they can use things like the `import` statement and top level `await`. CommonJS is not supported, so don't use `require()` or `module.exports`.

Scripts may import other modules in the customizer using either `import` statements or dynamic `import()` statements. While it does run in NodeJS, built-in modules like `fs` and `path` can not be imported. The customizer provides an API for manipulating the files in the resource pack in a more secure and easy way.

## Asynchronicity
The Customizer API has a lot of asynchronous functions, so this is very important: **Every script must await all async function calls in some way.** If you have only one async function call, just await it:
```js
await Customizer.add('examples/pack.png', 'pack.png')
```
If you have multiple async function calls and it doesn't matter what order they happen in or that some happen simultaneously, use `Promise.all` and await that:
```js
await Promise.all([
  Customizer.add('examples/pack.png', 'pack.png'),
  Customizer.add('examples/blockstate.json', 'assets/minecraft/blockstates/example.json'),
  Customizer.add('examples/model.json', 'assets/minecraft/models/block/example.json')
])
```
Some functions are synchronous and do not need to be awaited, though it doesn't error if it is done:
```js
// Customizer.delete is synchronous, meaning await isn't needed
Customizer.delete('pack.png')

// This will also work, even though it shouldn't be done
await Customizer.delete('pack.png')
```
Not awaiting some async function calls can in some cases cause it to partially or completely fail. For example, not awaiting the `Customizer.add` function may cause the customizer to either only create the folders for the file and not add the file itself, or to not do anything at all.

Dynamic imports must also be awaited:
```js
await import('better_lava/enable')
```

## Imports
Imports work slightly differently compared to regular scripts run with NodeJS. You can not import built-in modules like `fs`, so these will all fail:
```js
import 'fs'
import fs from 'node:fs'
const fs = await import('fs')
```
You can only import modules in this repo. If the repo has a file (`examples/test.js`) that you want to import, do it like this:
```js
import 'examples/test'

// Import function exported by the module
import myFunction from 'examples/test'

// Dynamic versions of the above examples
await import('examples/test')
const { default: myFunction } = await import('examples/test')
```
Rules to follow for the import file paths:
- The file extension should not be used. It will always assume the file extension is `.js`.
- Use forward slashes, not backslashes.
- The path must not start with a forward slash.
- The path must not contain `..` or `~`.

If any of these rules are broken, the import will fail.

## Global Context
In the global context the scripts are run in, there are some useful things from the Dokucraft API:
- `Pack` - This contains information about the pack that is being customized.
  - `Pack.name` - The name of the pack being customized, for example "light", "dark", etc.
  - `Pack.file` - The name of the file being customized, for example "1.19.4-Dokucraft-Light.zip"
- `Config` - This is the configuration that the user provided. For example, `Config.example` will be `true` if the customizer had a boolean option called `example` that the user enabled.
- `Customizer` - This is the [Customizer API](#customizer-api). It contains information about the customizer and functions for manipulating files in the resource pack.
- `Canvas` - From [skia-canvas](https://github.com/samizdatco/skia-canvas). This may be used to create new images or manipulate images in the pack.
- `Path2D` - From [skia-canvas](https://github.com/samizdatco/skia-canvas).
- `loadImage` - Similar to the utility function of the same name in [skia-canvas](https://github.com/samizdatco/skia-canvas), the only difference is that this one only accepts file paths and they must be in the resource pack.

## Customizer API
### `Customizer.id`
This is the ID of the customizer, the key of the list of options for the customizer in customizer.json. All customizers will always just run the main.js file, so this can be used there to make the different customizers do different things.

Example usage:
```js
if (Customizer.id === '1.19') {
  await import('customizers/1.19')
} else {
  await import('customizers/default')
}
```

### `Customizer.version`
This is the version number of the customizer. This can be useful if some features work slightly differently in different packs that all use the same customizer ID.

Example usage:
```js
// Only delete this file if the version is 2 or greater
if (Customizer.version >= 2) {
  Customizer.delete('assets/minecraft/example_file.json')
}
```

### `Customizer.add(source, dest)`
This will add the `source` file to the pack at `dest`. `source` is a file path relative to the customizer repo, and `dest` is a file path relative to the resource pack's root directory.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
await Customizer.add('examples/thing.png', 'assets/minecraft/textures/blocks/example.png')
```

### `Customizer.delete(...paths)`
This will add all paths in `paths` to the delete list. Note that files/folders are deleted not when this function is called, but after everything else is done. To speed things up, the customizer only acts on the ZIP when needed. After the customizer scripts are run it will update the pack with the folder it created with all of the changes to the pack, and then at the end it will delete the paths in the delete list from the ZIP.

Example usage:
```js
Customizer.delete('assets/minecraft/optifine')

// Multiple files example
Customizer.delete(
  'examples/file1.png',
  'examples/file2.png',
  'examples/file3.png'
)

// This is run after the delete function, but the file will still be deleted
// because the deletion process always happens last.
// Watch out so you don't do this
await Customizer.add('this_is_pointless.txt', 'assets/minecraft/optifine/example.txt')
```

### `Customizer.readFile(path)`
This will read the content of the file at `path` as a UTF-8 string. This is useful if you need to read a file to check something, or if you need to modify a file when used together with `Customizer.writeFile`.

It is async, so it returns a promise that is fulfilled with the file content when it is done.

Example usage:
```js
const content = await Customizer.readFile('assets/minecraft/example.txt')

if (content.includes('Example_01')) {
  // Do something if content contains "Example_01"
}
```

### `Customizer.writeFile(path, content)`
This will write the `content` to the file at `path`. This can be used to, for example, write small text files with credits, or it can be used together with `Customizer.readFile` to modify existing files in the pack.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
// Using Customizer.readFile to get the content of the old file
let content = await Customizer.readFile('assets/minecraft/example.txt')

// Modifying content
content = content.replaceAll('old text', 'new text')

// Writing modified content to the file
await Customizer.writeFile('assets/minecraft/example.txt', content)
```

### `Customizer.readJSON(path)`
This reads the file at `path` and parses it as JSON. This can be used to extract information from any JSON files in the pack, for example pack.mcmeta.

It is async, so it returns a promise that is fulfilled with the file content parsed as JSON when it is done.

Example usage:
```js
const mcmeta = await Customizer.readJSON('pack.mcmeta')

if (mcmeta.pack.format === 13) {
  // This pack must be for MC 1.19.4
}
```

### `Customizer.writeJSON(path, content)`
This is a shortcut for putting `content` through `JSON.stringify` before passing it to `Customizer.writeFile`. It will basically just write `content` as a JSON string to the file at `path`.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
const myObject = {
  example: true,
  desc: 'This is an example'
}

await Customizer.writeJSON('example.json', myObject)

// Same as this, with Customizer.writeFile instead
await Customizer.writeFile('example.json', JSON.stringify(myObject))
```

### `Customizer.listFiles(dir[, recursive])`
This lists the files in the directory `dir`. By default, it will recursively list files in subdirectories. To disable recursion, pass `false` as the second arument.

It is async, so it returns a promise that is fulfilled with an array of file paths when it is done.

Example usage:
```js
for (const filePath of await Customizer.listFiles('assets/minecraft/textures/gui')) {
  // filePath would be e.g. 'assets/minecraft/textures/gui/accessibility.png'
}
```

### `Customizer.exists(path)`
This checks if the file or folder with the given path exists in the pack.

It is async, so it returns a promise that is fulfilled with a boolean when it is done.

Example usage:
```js
if (await Customizer.exists('pack.mcmeta')) {
  // pack.mcmeta exists, so this will run
}
```

### `Customizer.shaders`
This is an object with functions that can be used to manipulate shader files easily.

### `Customizer.shaders.enable(path, name)`
This removes the two slashes at the start of `// #define <name>` in the file at `path`. This can be used to easily enable certain shader features.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
const configFile = 'assets/minecraft/shaders/config.txt'
await Customizer.shaders.enable(configFile, 'EXAMPLE_FEATURE')
await Customizer.shaders.enable(configFile, 'BETTER_LAVA')
```

### `Customizer.shaders.disable(path, name)`
This is pretty much just the opposite of `Customizer.shaders.enable`. It will add two slashes in front of `#define <name>`.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
// Turn off waving plants
await Customizer.shaders.disable('assets/minecraft/shaders/config.txt', 'ENABLE_WAVING')
```

### `Customizer.shaders.setScalar(path, name, value)`
Sets the value of a scalar in a shader file. More specifically, it will replace the number at the end of `#define <name> <number>` with `value` in the file at `path`.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
await Customizer.shaders.setScalar('assets/minecraft/shaders/core/position.fsh', 'MY_SCALAR', 5)
```

### `Customizer.shaders.setVec2(path, name, value)`
Sets the value of a 2D vector in a shader file. More specifically, it will replace `params` in `#define <name> vec2(<params>)` with `value.join(',')` in the file at `path`. `value` should be an array of two numbers.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
await Customizer.shaders.setVec2('assets/minecraft/shaders/core/position.fsh', 'EXAMPLE_VEC2', [2.3, -0.8])
```

### `Customizer.shaders.setVec3(path, name, value)`
Sets the value of a 3D vector in a shader file. More specifically, it will replace `params` in `#define <name> vec3(<params>)` with `value.join(',')` in the file at `path`. `value` should be an array of three numbers.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
// Config.example_color is from a color picker in the customizer and has a
// value of something like [0.33, 0.53, 1]
await Customizer.shaders.setVec3('assets/minecraft/shaders/core/position.fsh', 'EXAMPLE_COLOR', Config.example_color)
```

### `Customizer.shaders.setVec4(path, name, value)`
Sets the value of a 4D vector in a shader file. More specifically, it will replace `params` in `#define <name> vec4(<params>)` with `value.join(',')` in the file at `path`. `value` should be an array of four numbers.

It is async, so it returns a promise that is fulfilled when it is done.

Example usage:
```js
await Customizer.shaders.setVec4('assets/minecraft/shaders/core/position.fsh', 'EXAMPLE_VEC4', [1, 0, 0.5, 1])
```