const colors = [
  false,
  'black',
  'blue',
  'brown',
  'cyan',
  'gray',
  'green',
  'light_blue',
  'light_gray',
  'lime',
  'magenta',
  'orange',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
]
const files = [
  'glass_pane_noside',
  'glass_pane_noside_alt',
  'glass_pane_post',
  'glass_pane_side_east',
  'glass_pane_side_north',
  'glass_pane_side_south',
  'glass_pane_side_west',
]

const promises = []
for (const file of files) {
  for (const color of colors) {
    // Update block model
    const blockModelPath = `assets/minecraft/models/block/glass_pane/${color ? `${color}/${color}_stained_` : ''}${file}.json`
    promises.push(
      Customizer.readJSON(blockModelPath).then(model => {
        model.textures.pane = model.textures.pane.replace('glass_pane', 'glass')
        return Customizer.writeJSON(blockModelPath, model)
      })
    )
    // Update item model
    const itemModelPath = `assets/minecraft/models/item/${color ? `${color}_stained_` : ''}glass_pane.json`
    promises.push(
      Customizer.writeJSON(itemModelPath, {
        parent: 'item/generated',
        textures: {
          layer0: `block/${color ? `${color}_stained_` : ''}glass`
        }
      })
    )
    // Update CTM
    if (Config.optifine) {
      const propFile = `assets/minecraft/optifine/ctm/glass_block/${color ? `${color}/${color}_stained` : 'clear/clear'}_glass_pane.properties`
      promises.push(
        Customizer.writeFile(propFile, [
          `matchBlocks=${color ? `${color}_stained_` : ''}glass_pane`,
          'method=ctm_compact',
          'faces=sides',
          'tiles=0 26 2 24 46',
        ].join('\n'))
      )
      Customizer.delete(`assets/minecraft/optifine/ctm/glass_pane/${color ? color : 'clear'}`)
    }
    // Delete the (now unused) texture
    Customizer.delete(`assets/minecraft/textures/block/${color ? `${color}_stained_` : ''}glass_pane.png`)
  }
}
await Promise.all(promises)
