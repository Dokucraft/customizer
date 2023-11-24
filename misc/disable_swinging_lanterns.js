if (Customizer.version >= 5) {
  // Version 5 (1.20.3) renamed this shader option from "sway" to "swing"
  await Customizer.shaders.disable('assets/minecraft/shaders/config.txt', 'ENABLE_LANTERN_SWING')
} else {
  await Customizer.shaders.disable('assets/minecraft/shaders/config.txt', 'ENABLE_LANTERN_SWAY')
}
