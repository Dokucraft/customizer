switch (Config.leaves_model) {
  case 'vanilla':
    const folderMap = {
      light: 'light_dwarven',
      dwarven: 'light_dwarven',
      high: 'high_dark',
      dark: 'high_dark',
    }
    await Promise.all([
      Customizer.add('leaves_model/vanilla/blockstates', 'assets/minecraft/blockstates'),
      Customizer.add(`leaves_model/vanilla/models/${folderMap[Pack.name]}`, 'assets/minecraft/models/block/leaves/vanilla')
    ])
    break
  case 'bushy':
    await Customizer.add('leaves_model/bushy_leaves', 'assets/minecraft')
    break
}
