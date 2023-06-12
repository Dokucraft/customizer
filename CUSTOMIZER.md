# customizer.json
`customizer.json` defines all of the options presented to the user on the website. The configuration passed to the customizer scripts is based on these options and what the user chooses for each of them.

___
## Customizers
A file for a pack on the website may set a customizer to use. If a file doesn't have a customizer set, it won't have a button to customize it at all.

The `customizers` object in `customizer.json` defines what each customizer is. Each customizer is an array of options available to that customizer. The order of the options in these arrays is important, because it affects the order they are displayed in on the website. The order on the website also changes based on what category each option is in and what dependencies (other options; requirements and/or incompatibilities) each option has.

Each option in a customizer array can either be a string or an object. If the option is a string, it will always be a part of the customizer. If the option is an object, it may be hidden from the customizer based on the properties of the object, the version of the customizer, and pack that is being customized.

Here is an example customizer: (This is standard JSON, so comments would not be valid, they're there only to clarify the example)
```json
{
  ...
  "customizers": {
    "example_customizer": [
      "example_option_1", // Unconditional option, akways there
      "example_option_2",
      { // Conditional option, only there if version is between 3 and 5, inclusive
        "option": "example_option_3", // Option name
        "minVersion": 3, // Customizer version must be >= 3
        "maxVersion": 5  // Customizer version must be <= 5
        // You may leave either of the version properties out if you only want
        // an upper or lower limit and not both
      },
      {
        "option": "example_option_4",
        "packs": [ // List of packs that this option is visible for
          "light",
          "dark"
        ]
        // minVersion and/or maxVersion may be used here as well, they are
        // not mutually exclusive with packs
      }
    ]
  },
  ...
}
```

___
## Categories
The `categories` property in `customizer.json` is used to create categories for options. A category is simply a group of options, usually of a specific theme or relating to a specific feature.

There are two special categories: `default` and `game_config`.

The `default` category is the category that all options without a category set will end up in. It will always be the last category on the website, it is sorted below all others.

The `game_config` category is for options that don't necessarily modify the pack in any way, but are used to mark other options that are incompatible with the user's game as incompatible. They may change the pack in some way as well, but it is not the primary function of them. They are supposed to give the customizer all of the information it needs about the user's game to make sure the pack works. This category is always at the top of the customizer, before all other categories.

A category object require a `name` property for the title text and may optionally have a `desc` property for the description. Here is an example:
```json
{
  ...
  "categories": {
    ...
    "my_category": {
      "name": "Example Category",
      "desc": "This is an example category to show how categories are defined."
    },
    ...
  },
  ...
}
```

___
## Stats
The `stats` property in `customizer.json` controls how the customizer stats page on the website should look. It is currently work in progress and shouldn't be messed with.

___
## Options
The `options` property in `customizer.json` contains all of the customizer options. Each option is intended to give the customizer some information about what the user want, or what they need or don't need.

For example, you can have an option for what mods or graphics settings they use and the customizer can use that information to modify the pack so that the pack works correctly with those mods/settings. Or, you can have an option to toggle or modify a feature in the pack, like turning on/off texture variants for a certain block.

## Common properties
There are multiple types of options, but all of them have some common properties.

Required properties are marked with [**\***](## "Required").

### - `name`[**\***](## "Required")
This is the title displayed on the option in the customizer on the website.

### - `type`[**\***](## "Required")
This controls what type of option it is. The available option types are:
- `bool` lets the user enable or disable something. It is displayed as a checkbox on the website, and its value in the customizer config is either `true` or `false`.
- `select` lets the user pick one of several sub-options, similar to a [drop-down menu](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), or a [radio group](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio). The value in the customizer config will be the `value` property of the selected sub-option.
- `vec3_color` lets the user pick a color. The value in the customizer config will be an array of three numbers representing the color picked similar to how colors are represented as vec3 objects in GLSL. This is useful for options that control a color defined in a shader.

### - `sidebar`
This is the title displayed on the button for the option in the sidebar. If this property is left out, the sidebar title will fall back to the `name` value of the option.

### - `desc`
This is the description for the option. Where it is displayed may change depending on the option type, but it's usually the smaller text under the title.

### - `key`
This sets the key for this option's value in the customizer config and in the [feature string](#condition).

Multiple options may have the same key. If two or more options in the customizer have the same key, the config and feature string will have the value of the last option with the key in the customizer's sorted options list. The list is sorted based on the order of the options in the [customizer array](#customizers) and the dependencies of the options (other options; requirements and/or incompatibilities).

Using [conditional options](#customizers) with the same key can make it easier to process for the customizer scripts. For example, let's say you want to limit certain values to certain packs or customizer versions. One of the options can can have an extra value available and be enabled only for a set of packs and the other option can be enabled only for the rest. On the website, it'd seem like the same option, but one more value is available for some packs, and the customizer scripts could process it all the same way since it's using the same key in the config.

The key defaults to the ID of the option.

### - `default`
This sets the default value of the option, the value of the option if the user has not interacted with it yet. If the value of the option is the same as the default value when the user downloads the pack, the option will not be a part of the customizer config.

This value should be in the form matching the type of the option, for example a boolean for `bool` options, or an array of three numbers for `vec3_color` options.

If different packs should have different default values, this can be set to an object with a default value for each pack.

If this property is left out, the value it defaults to depends on what type of option it is:
- `bool` options default to `false`.
- `select` options default to the value of the first sub-option.
- `vec3_color` options default to `[0,0,0]`.

### - `category`
This sets the category that the option should be in on the website. If left out, this defaults to the `default` category.

### - `condition`
This is a condition that will mark the option as incompatible if not met. A condition is a string with Booleans, feature identifiers, logical operators and groups.

Boolean values (`true` and `false`) may be used in conditions, but they serve almost no purpose as any condition using them can be simplified to an equivalent condition without them. One case where it might be useful is if you want to disable an option without removing the data for it from the customizer entirely. In that case, setting the condition to "`false`" or "`!true`" and not having the `incompatText` property would do the trick.

A feature identifier has the form `<option key>:<value>` and evaluates to true only if the option has the right value and is compatible. If the option has a different value or is incompatible, it will instead evaluate to false. Note that this does not use the ID of the option, but the option's [`key` value](#key). For example, "`example:thing`" will be true if the `example` option has a value of `thing` and it is compatible.

`bool` options don't use the value part of the feature identifiers. If you have a `bool` option named `example` and it is enabled and compatible, the feature identifier will be just `example`, not `example:true`.

`vec3_color` options use the standard form of the identifiers, but since they have floating point numbers in their values, they have very limited use in conditions. For example, how often would a condition like this be true: "`my_color:[0.923,0.172,0.6]`"? It will practically be the same as just using "`false`".

The logical operators available are `|` (OR), `&` (AND), and `!` (NOT). They work just like the `||`, `&&` and `!` operators in programming languages like JavaScript, Python, C, Java, and many others. For example, the condition "`example & !thing:green`" will be true if `example` is a `bool` option that's enabled and compatible and the `thing` option does *not* have a value of `green`. The spaces in the example are optional. You can put spaces anywhere around the logical operators. The following conditions would be the same as the previous example:
- "`example&!thing:green`"
- "`example& !  thing:green`"
- "`example &! thing:green`"

One exception to the operators working like in most programming languages is that you can not use multiple `!` in a row, like "`!!example`". In all cases were you could do that, you could also do it with fewer operators, so this limitation doesn't really affect anything. For example, "`!!example`" would be equivalent to just "`example`", and "`!!!example`" would be equivalent to "`!example`".

Groups can be created using brackets and are used to change the order of the evaluation of the condition. For example, the condition "`example & !(thing:green | thing:red)`" will be true if `example` is a `bool` option that's enabled and compatible and the `thing` option does not have a value of `green` *or* `red`. Without the brackets, the condition changes entirely: "`example & !thing:green | thing:red`" would be true either if `example` is a `bool` option that's enabled and compatible and the `thing` option does not have a value of `green`, *or* the `thing` option has a value of `red`. Without the brackets, `example` is only required if `thing` does not have a value of `red`, and `thing` having a value of `red` is suddenly a positive thing for the condition instead of negative.

Groups may also be nested, to any depth. For example, "`!(example & !(thing:green | thing:red))`" would work as you'd expect.

### - `incompatText`
When this is set, the option will not be hidden entirely when it is marked as incompatible. It will instead stay visible and this property's value will be displayed on top of it. It's best to set it to a string explaining what is required for the option to be compatible.

It's recommended to use this property for options that control big features in the pack that the user might have heard of or seen before, so that they know how to enable it.

Don't use this property for options that only make sense if their condition is met. For example, if one option changes the model of a block, and another option controls the color of a part of the model and requires the first option to be enabled, the color option wouldn't make any sense to the user if they hadn't selected the other option, so the color option should be hidden entirely instead of just saying that it needs the other option.

___
## Option type-specific properties
Different option types may need extra information unique to that type. Below is a list of all properties that are only valid for some option types.

## `bool` properties
### - `preview`
This can be set to add a preview image or video to the option. The image/video must be added to the website to be used here.

### - `warn`
This will add a warning to the option. It can be useful for warning the user that enabling the option may impact performance or cause other potential issues. The value can either be a string with any text or a number to use a preset warning text. Below is a list of all presets:
| Preset | Text                                  |
|--------|---------------------------------------|
| 1      | May reduce performance slightly.      |
| 2      | May reduce performance significantly. |

## `select` properties
### - `options`[**\***](## "Required")
This is an array of sub-options that the user can choose from. These sub-options are objects with their own set of properties documented [here](#select-sub-options).

### - `display`
This controls the layout of the sub-options. There are two possible values:
- `list` displays the sub-options in a vertical list. Each sub-option will have plenty of space for detailed descriptions.
- `grid` displays the sub-options in a grid. Each sub-option only gets a small square in the grid, only enough for a preview and a title.

If the options require descriptions or warnings, it's best to use the `list` layout. However, the `grid` layout is a lot more compact, so if there are a lot of sub-options and they don't need descriptions, `grid` would be better for that.

If this property is left out, it will default to `list`.

___
## `select` sub-options
### - `value`[**\***](## "Required")
This is the string value that the `select` option will have if the sub-option is selected.

### - `name`
This is the title displayed on the sub-option in the customizer on the website.

### - `desc`
This is description of what the sub-option means or does. It can be short and simple, but detailed descriptions are also fine for things that need it. This is only used if the `select` option has `display` set to `list`. The description will be displayed under the sub-option's title.

### - `thumbnail`
This is a small image used as an icon or thumbnail for the sub-option. The image must be added to the website to be used here.

### - `preview`
This is a larger image or video preview of the sub-option that is displayed above the sub-option list/grid when the sub-option is selected. The image/video must be added to the website to be used here.

### - `warn`
This will add a warning to the option. This is identical to the `warn` property of `bool` options, so [go there](#warn) for more details. The warning will only be visible if the `select` option has `display` set to `list`.

### - `tnPixels`
When set to `true`, this will make the thumbnail image for the option use nearest neighbor interpolation for scaling, meaning the pixels won't get blurred if the image is displayed at a size larger than the original image. This is good for pixel art thumbnails, for example if you want to use one of the small 32x32 textures from the pack as the thumbnail.

### - `condition`
Sub-options can have conditions just like the other options, and they work the same way, so for more details about this property check out the [`condition` option property](#condition).

### - `incompatText`
Similar to the [`incompatText` option property](#incompattext), this sets the text displayed on the sub-option when it is marked as incompatible. The sub-option will be visible even if this property is left out, as it defaults to just "Incompatible".
