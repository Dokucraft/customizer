const grassTypes = {
  low_poly: 1,
  dense: 2
}

await Promise.all([
  Customizer.shaders.setScalar('assets/minecraft/shaders/config.txt', 'GRASS_TYPE', grassTypes[Config.grass_effect]),
  Customizer.add('grass_effect/' + Config.grass_effect, 'assets/minecraft'),
  Config.grass_effect === 'dense' ?
    Customizer.add(`grass_effect/dense_flavor_specific/grass_block_top_${Pack.name}.png`, 'assets/minecraft/textures/block/grass_block_top.png')
  : 0
])
