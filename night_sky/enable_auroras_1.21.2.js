const configPath = 'assets/dokucraft/shaders/include/config.glsl'
await Customizer.shaders.enable(configPath, 'ENABLE_AURORAS')
if (Config.aurora_color) {
  await Customizer.shaders.setVec3(configPath, 'AURORA_COLOR', Config.aurora_color)
}
