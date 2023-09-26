// Override these options and let them be handled by their own scripts
Config.post_sun = true
Config.night_sky = 'moonlit_fog'

// Remove the other skybox textures
Customizer.delete(
  'assets/minecraft/textures/effect/skybox_day.png',
  'assets/minecraft/textures/effect/skybox_night.png',
)

await Promise.all([

  // Set the shader option and add the custom textures
  Customizer.shaders.setScalar('assets/minecraft/shaders/program/skybox.fsh', 'ATMOSPHERE', 1),
  Customizer.add('atmosphere/clouds_opacity.png', 'assets/minecraft/textures/effect/clouds_opacity.png'),
  Customizer.add(`atmosphere/sky_colors_${Pack.name}.png`, 'assets/minecraft/textures/effect/sky_colors.png'),

  // Add information about the extra textures for the shader
  Customizer.readJSON('assets/minecraft/shaders/program/skybox.json').then(shader => {
    // Remove the regular skybox textures
    shader.samplers = shader.samplers.filter(e => !['SkyBoxDaySampler','SkyBoxNightSampler'].includes(e.name))

    // Add the new textures
    shader.samplers.push(
      { name: 'CloudsSampler' },
      { name: 'SkyColorSampler' },
    )

    return Customizer.writeJSON('assets/minecraft/shaders/program/skybox.json', shader)
  }),
  Customizer.readJSON('assets/minecraft/shaders/post/transparency.json').then(layer => {
    const pass = layer.passes.find(e => e.name === 'skybox')

    // Remove the regular skybox textures
    pass.auxtargets = pass.auxtargets.filter(e => !['SkyBoxDaySampler','SkyBoxNightSampler'].includes(e.name))

    // Add the new textures
    pass.auxtargets.push(
      {
        name: 'CloudsSampler',
        id: 'clouds_opacity',
        width: 1,
        height: 1,
        bilinear: true
      },
      {
        name: 'SkyColorSampler',
        id: 'sky_colors',
        width: 1,
        height: 1,
        bilinear: false
      }
    )
    return Customizer.writeJSON('assets/minecraft/shaders/post/transparency.json', layer)
  })

])
