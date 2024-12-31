await Promise.all([
  Customizer.shaders.enable('assets/dokucraft/shaders/include/config.glsl', 'ENABLE_WITHER_EFFECT'),
  Customizer.add('mob_effects/wither.png', 'assets/minecraft/textures/mob_effect/wither.png'),
  Customizer.add('mob_effects/wither.png.mcmeta', 'assets/minecraft/textures/mob_effect/wither.png.mcmeta'),
])
