const grassTypes = {
  low_poly: 1,
  dense: 2,
}

if (!(Config.grass_effect in grassTypes)) {
  throw 'Invalid grass type'
}

await Promise.all([
  Customizer.shaders.setScalar(
    'assets/dokucraft/shaders/include/config.glsl',
    'GRASS_TYPE',
    grassTypes[Config.grass_effect] + ('random_dense_grass' in Config && Config.random_dense_grass ? 1 : 0)
  ),
  Customizer.add('grass_effect/' + Config.grass_effect, 'assets/minecraft')
])

if (Config.grass_effect === 'dense') {
  await Customizer.add(`grass_effect/dense_flavor_specific/grass_block_top_${Pack.name}.png`, 'assets/minecraft/textures/block/grass_block_top.png')
}
