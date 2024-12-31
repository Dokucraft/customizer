await Promise.all([
  Customizer.shaders.enable('assets/dokucraft/shaders/include/config.glsl', 'ENABLE_DARKNESS_EFFECT'),
  Customizer.add('mob_effects/darkness.png', 'assets/minecraft/textures/mob_effect/darkness.png'),
  Customizer.add('mob_effects/darkness.png.mcmeta', 'assets/minecraft/textures/mob_effect/darkness.png.mcmeta'),
])
