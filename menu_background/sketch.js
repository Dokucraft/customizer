await Customizer.shaders.enable('assets/minecraft/shaders/program/blur.fsh', 'RADIUS_OVERRIDE')
await Customizer.shaders.setScalar('assets/minecraft/shaders/program/menu-bg.fsh', 'MENU_BACKGROUND', 2)

if ('menu_background_sketch_paper_color' in Config) {
  await Customizer.shaders.setVec3('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_PAPER_COLOR', Config.menu_background_sketch_paper_color)
}

if ('menu_background_sketch_ink_color' in Config) {
  await Customizer.shaders.setVec3('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_INK_COLOR', Config.menu_background_sketch_ink_color)
}

if (!Config.menu_background_sketch_paper_texture) {
  await Customizer.shaders.disable('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_PAPER_TEXTURE')
}

if (!Config.menu_background_sketch_stains) {
  await Customizer.shaders.disable('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_STAINS')
}

switch (Config.menu_background_sketch_grid) {
  case 'dots':
    await Customizer.shaders.enable('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_GRID_DOTS')
    break
  case 'lines':
    await Customizer.shaders.enable('assets/minecraft/shaders/program/menu-bg.fsh', 'SKETCH_GRID_LINES')
    break
}
