await Promise.all([
  Customizer.shaders.enable('assets/minecraft/shaders/config.txt', 'ENABLE_DARKNESS_EFFECT'),
  Customizer.add('mob_effects/darkness.png', 'assets/minecraft/textures/mob_effect/darkness.png'),
  Customizer.add('mob_effects/darkness.png.mcmeta', 'assets/minecraft/textures/mob_effect/darkness.png.mcmeta'),
])
