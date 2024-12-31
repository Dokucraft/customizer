const grassTypes = {
  low_poly: 1,
  dense: 2
}

if (!(Config.grass_effect in grassTypes)) {
  throw (`Invalid grass type: ${Config.grass_effect} (${Customizer.id})`)
}

await Promise.all([
  Customizer.shaders.setScalar('assets/minecraft/shaders/config.txt', 'GRASS_TYPE', grassTypes[Config.grass_effect]),
  Customizer.add('grass_effect/' + Config.grass_effect, 'assets/minecraft')
])

if (Config.grass_effect === 'dense') {
  await Customizer.add(`grass_effect/dense_flavor_specific/grass_block_top_${Pack.name}.png`, 'assets/minecraft/textures/block/grass_block_top.png')
}
