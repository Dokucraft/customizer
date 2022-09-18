# Dokucraft Customizer
This repo contains scripts and configs used by the Dokucraft customizer to make changes to the packs.

## Scripts
The scripts use a simple custom language designed to make editing resource packs easy. Each line of a script is a command line. The first word of each line is the command name, and the rest of the line is the arguments passed to that command.

For command arguments to contain spaces, double quotes must be put around them, for example:
```
add "file name with spaces.txt" assets/minecraft/texts/splashes.txt
```

## Commands
### `add {source} {destination}`
Copies a file or folder (recursively) from the customizer repo to the resource pack.

### `delete {path}`
Deletes the files and/or folders matching the path from the resource pack. You can use the wildcard characters `*` (any number of arbitrary characters) and `?` (any single character) in the path.

**Note**: While all other commands run in the order you give them, the `delete` command is instead run at the end, after even other scripts have been run. This is due to how the customizer speeds up deleting files from the resource pack by doing it in bulk.

### `disable {file path} {name}`
Adds double slashes at the start of `#define {name}` in the file. Useful for disabling specific shader features.

### `else`
Makes the following commands (up until an `end` command) only run if the previous condition(s) given to the `if` and `elseif` commands evaluated to false.

Errors if used on its own without the `if` command.

### `elseif {condition}`
Makes the following commands (up until an `elseif`, `else`, or `end` command) only run if the previous condition(s) given to the `if` and `elseif` commands evaluated to false and the condition given to it evaluated to true.

The condition should be valid JavaScript and will be evaluated in a separate context with things like the pack name and flavor available as constants. See the Context section below for more information.

Errors if used on its own without the `if` command.

**Note**: The condition does not have to be a single argument, no quotes are required here unless it's for JS. See the `if` command section below for an example.

### `enable {file path} {name}`
Removes the double slashes at the start of `// #define {name}` in the file. Useful for enabling specific shader features.

### `end`
Ends the current block of commands. Currently, only the `if` command creates command blocks, and the `end` command, by ending the block, allows the following commands to run even if the condition given to the `if` command evaluated to false.

### `if {condition}`
Makes the following commands (up until an `elseif`, `else`, or `end` command) only run if the given condition evaluates to true.

The condition should be valid JavaScript and will be evaluated in a separate context with things like the pack name and flavor available as constants. See the Context section below for more information.

**Note**: The condition does not have to be a single argument, no quotes are required here unless it's for JS. Here's an example of the `if` command and the related commands:
```
if flavor === 'Light'
  # This block will only run if the pack's flavor is Light
elseif flavor === 'Dark'
  # Same as above, but for Dark
else
  # Otherwise, this block will run
end
```

### `replace {path} {pattern} {replacement}`
Replaces anything matching the pattern in the file at the path given. The pattern is a regular expression pattern in the format "/pattern/flags", for example `"/dokucraft/gi"` would match all instances of `dokucraft` and be case-insensitive. The quotes are not really *required* around the pattern, but it's good practice because they would be required if the pattern had any spaces in it.

The replacement value can be taken from the script's context by putting a $ in front of the name. For example `$flavor` would be the pack's flavor.

### `set {name} {value}`
Creates a variable with the name given and sets it to the value given. The value will always be a string. Example:
```
set example 1
if example === '1'
  # This block would run, because example is a string of 1
end
```

### `vec2 {path} {name} {value}`
Changes the value of a vec2 with the given name in the file at the given path. Specifically, it replaces the 2 numbers in something like `#define {name} vec2(1, 0)` with the given value, such that it becomes `#define {name} vec2({value})`

The value can be taken from the script's context by putting a $ in front of the name. For example `$pos` would be the "pos" argument given to the script.

### `vec3 {path} {name} {value}`
Changes the value of a vec3 with the given name in the file at the given path. Specifically, it replaces the 3 numbers in something like `#define {name} vec3(1, 0, 1)` with the given value, such that it becomes `#define {name} vec3({value})`

The value can be taken from the script's context by putting a $ in front of the name. For example `$color` would be the "color" argument given to the script.

### `vec4 {path} {name} {value}`
Changes the value of a vec4 with the given name in the file at the given path. Specifically, it replaces the 4 numbers in something like `#define {name} vec4(1, 0, 1, 0)` with the given value, such that it becomes `#define {name} vec4({value})`

The value can be taken from the script's context by putting a $ in front of the name. For example `$color` would be the "color" argument given to the script.

## Comments
Any line that doesn't start with a valid command is simply ignored. That means you can add comments in the scripts by starting any line with anything that isn't a valid command, but for clarity, it's best to start comments with common comment characters like # or //.

## Context
The context used for the script will have some read-only constants:

### `pack`
This is the name of the pack's ZIP file. For example: `1.19-Dokucraft-Light.zip`

### `flavor`
This is the flavor of the pack. For example: `Light`

### `workspace`
This is the folder being used to customize the pack. It's only included because it's used by the customizer, and it has a random name each time.

### `zipFile`
This is the ZIP file that's being customized. It's only included because it's used by the customizer, and it has a random name each time.

The only variables are the ones created using the `set` command and the ones provided by the customizer UI. These are set up in customizer.json. Each setting has a "key" property that sets the name and, in "select" settings, options should have an "arg" property that will be the value of the variable if that option is chosen.