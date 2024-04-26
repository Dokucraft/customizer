Customizer.delete('assets/minecraft/textures/block/lava_still.png.mcmeta')
await Promise.all([
  Customizer.shaders.enable('assets/minecraft/shaders/config.txt', 'ENABLE_BETTER_LAVA'),
  Customizer.add('better_lava/lava_still.png', 'assets/minecraft/textures/block/lava_still.png'),
  Customizer.readFile('assets/minecraft/shaders/core/rendertype_solid.json').then(async content => {
    const json = JSON.parse(content)
    if (!json.uniforms.some(e => e.name === 'GameTime')) {
      json.uniforms.push({
        name: 'GameTime',
        type: 'float',
        count: 1,
        values: [ 0.0 ]
      })
      await Customizer.writeFile('assets/minecraft/shaders/core/rendertype_solid.json', JSON.stringify(json))
    }
  })
])
