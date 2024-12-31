if (Config.water_surface === 'procedural') {
  Customizer.delete('assets/minecraft/textures/block/water_still.png.mcmeta')
  await Promise.all([
    Customizer.shaders.enable('assets/dokucraft/shaders/include/config.glsl', 'ENABLE_PROCEDURAL_WATER_SURFACE'),
    Customizer.add('water_surface/water_still.png', 'assets/minecraft/textures/block/water_still.png'),
    Customizer.readFile('assets/minecraft/shaders/core/rendertype_translucent.json').then(async content => {
      const json = JSON.parse(content)
      if (!json.uniforms.some(e => e.name === 'GameTime')) {
        json.uniforms.push({
          name: 'GameTime',
          type: 'float',
          count: 1,
          values: [ 0.0 ]
        })
        await Customizer.writeFile('assets/minecraft/shaders/core/rendertype_translucent.json', JSON.stringify(json))
      }
    })
  ])
}
