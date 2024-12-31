Customizer.delete('assets/minecraft/textures/block/lava_still.png.mcmeta')
await Promise.all([
  Customizer.shaders.enable('assets/dokucraft/shaders/include/config.glsl', 'ENABLE_BETTER_LAVA'),
  Customizer.add('better_lava/lava_still.png', 'assets/minecraft/textures/block/lava_still.png')
])
