if (Config.soul_campfire_color !== 'default') {
  await Promise.all([
    Customizer.add(
      `campfire/textures/${Config.soul_campfire_color}/fire.png`,
      'assets/minecraft/textures/block/soul_campfire_fire.png'
    ),
    Customizer.add(
      `campfire/textures/${Config.soul_campfire_color}/log.png`,
      'assets/minecraft/textures/block/soul_campfire_log_lit.png'
    )
  ])
}
