await Customizer.shaders.enable('assets/minecraft/shaders/program/skybox.fsh', 'ENABLE_AURORAS')
if (Config.aurora_color) {
  await Customizer.shaders.setVec3('assets/minecraft/shaders/program/skybox.fsh', 'AURORA_COLOR', Config.aurora_color)
}
