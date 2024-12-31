await Promise.all([
  Customizer.shaders.enable('assets/dokucraft/shaders/include/config.glsl', 'ENABLE_SPEED_EFFECT'),
  Customizer.add('mob_effects/speed.png', 'assets/minecraft/textures/mob_effect/speed.png'),
  Customizer.add('mob_effects/speed.png.mcmeta', 'assets/minecraft/textures/mob_effect/speed.png.mcmeta'),
])
