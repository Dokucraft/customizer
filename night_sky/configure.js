switch (Config.night_sky) {
  case 'procedural': {
    if (Customizer.version === 1) {
      // In the 1.19.2 packs, the night sky option had a different name
      await Customizer.shaders.enable('assets/minecraft/shaders/program/skybox.fsh', 'ENABLE_EXPERIMENTAL_PROCEDURAL_NIGHT_SKY')
    } else {
      await Customizer.shaders.setScalar('assets/minecraft/shaders/program/skybox.fsh', 'NIGHT_SKY', 1)
    }
    break
  }
  case 'moonlit_fog': {
    const postShader = 'assets/minecraft/shaders/program/skybox.fsh'
    await Promise.all([
      // Add the moon texture
      Customizer.add('night_sky/moon.png', 'assets/minecraft/textures/effect/moon.png'),

      // Enable the effect
      Customizer.shaders.enable('assets/minecraft/shaders/config.txt', 'ENABLE_POST_MOON_PHASES'),
      Customizer.shaders.enable(postShader, 'ENABLE_POST_MOON')
        .then(() => Customizer.shaders.setScalar(postShader, 'NIGHT_SKY', 2))
        .then(() => {
          if (Customizer.version >= 4) {
            return Customizer.shaders.enable(postShader, 'ENABLE_NIGHT_FOG')
          }
        }),

      // Fix for the OF end sky breaking
      Customizer.readFile('assets/minecraft/shaders/core/position_tex.vsh').then(vsh => Customizer.writeFile(
        'assets/minecraft/shaders/core/position_tex.vsh',
        vsh.replace('} else { // Moon', '} else if (tsize.x == tsize.y * 2) { // Moon')
      )),

      // Add information about the extra moon texture for the shader
      Customizer.readJSON('assets/minecraft/shaders/program/skybox.json').then(shader => {
        shader.samplers.push({ name: 'MoonSampler' })
        return Customizer.writeJSON('assets/minecraft/shaders/program/skybox.json', shader)
      }),
      Customizer.readJSON('assets/minecraft/shaders/post/transparency.json').then(layer => {
        layer.passes.find(e => e.name === 'skybox').auxtargets.push({
          name: 'MoonSampler',
          id: 'moon',
          width: 1,
          height: 1,
          bilinear: false
        })
        return Customizer.writeJSON('assets/minecraft/shaders/post/transparency.json', layer)
      })
    ])
    break
  }
}
