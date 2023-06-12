Customizer.delete('assets/minecraft/textures/block/lava_still.png.mcmeta')
await Promise.all([
  Customizer.shaders.enable('assets/minecraft/shaders/config.txt', 'ENABLE_BETTER_LAVA'),
  Customizer.add('better_lava/lava_still.png', 'assets/minecraft/textures/block/lava_still.png')
])
