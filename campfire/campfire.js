if (Config.campfire_color !== 'default') {
  await Promise.all([
    Customizer.add(
      `campfire/textures/${Config.campfire_color}/fire.png`,
      'assets/minecraft/textures/block/campfire_fire.png'
    ),
    Customizer.add(
      `campfire/textures/${Config.campfire_color}/log.png`,
      'assets/minecraft/textures/block/campfire_log_lit.png'
    )
  ])
}
