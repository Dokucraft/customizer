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
  Customizer.shaders.setScalar('assets/dokucraft/shaders/include/config.glsl', 'ATMOSPHERE', 1),
  Customizer.add('atmosphere/clouds_opacity.png', 'assets/minecraft/textures/effect/clouds_opacity.png'),
  Customizer.add(`atmosphere/sky_colors_${Pack.name}.png`, 'assets/minecraft/textures/effect/sky_colors.png'),

  // Add information about the extra textures for the shader
  Customizer.readJSON('assets/minecraft/shaders/dokucraft/sky_post.json').then(shader => {
    // Remove the regular skybox textures
    shader.samplers = shader.samplers.filter(e => !['SkyBoxDaySampler','SkyBoxNightSampler'].includes(e.name))

    // Add the new textures
    shader.samplers.push(
      { name: 'CloudsSampler' },
      { name: 'SkyColorSampler' },
    )

    return Customizer.writeJSON('assets/minecraft/shaders/dokucraft/sky_post.json', shader)
  }),
  Customizer.readJSON('assets/minecraft/post_effect/transparency.json').then(layer => {
    const pass = layer.passes.find(e => e.program === 'minecraft:dokucraft/sky_post')

    // Remove the regular skybox textures
    pass.inputs = pass.inputs.filter(e => !['SkyBoxDaySampler','SkyBoxNightSampler'].includes(e.sampler_name))

    // Add the new textures
    pass.inputs.push(
      {
        sampler_name: 'CloudsSampler',
        location: 'minecraft:clouds_opacity',
        width: 1,
        height: 1,
        bilinear: true
      },
      {
        sampler_name: 'SkyColorSampler',
        location: 'minecraft:sky_colors',
        width: 1,
        height: 1,
        bilinear: false
      }
    )
    return Customizer.writeJSON('assets/minecraft/post_effect/transparency.json', layer)
  })

])
