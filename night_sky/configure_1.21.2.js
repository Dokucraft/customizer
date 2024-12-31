const configPath = 'assets/dokucraft/shaders/include/config.glsl'
switch (Config.night_sky) {
  case 'procedural': {
    await Customizer.shaders.setScalar(configPath, 'NIGHT_SKY', 1)
    break
  }
  case 'moonlit_fog': {
    await Promise.all([
      // Add the moon texture
      Customizer.add('night_sky/moon.png', 'assets/minecraft/textures/effect/moon.png'),

      // Enable the effect
      Customizer.shaders.enable(configPath, 'ENABLE_POST_MOON')
        .then(() => Customizer.shaders.setScalar(configPath, 'NIGHT_SKY', 2))
        .then(() => Customizer.shaders.enable(configPath, 'ENABLE_NIGHT_FOG'))
        .then(() => Customizer.shaders.enable(configPath, 'ENABLE_POST_MOON_PHASES')),

      // Add information about the extra moon texture for the shader
      Customizer.readJSON('assets/minecraft/shaders/dokucraft/sky_post.json').then(shader => {
        shader.samplers.push({ name: 'MoonSampler' })
        return Customizer.writeJSON('assets/minecraft/shaders/dokucraft/sky_post.json', shader)
      }),
      Customizer.readJSON('assets/minecraft/post_effect/transparency.json').then(layer => {
        layer.passes.find(e => e.program === 'minecraft:dokucraft/sky_post').inputs.push({
          sampler_name: 'Moon',
          location: 'moon',
          width: 1,
          height: 1,
          bilinear: false
        })
        return Customizer.writeJSON('assets/minecraft/post_effect/transparency.json', layer)
      })
    ])
    break
  }
}
