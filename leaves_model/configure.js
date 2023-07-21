switch (Config.leaves_model) {
  case 'vanilla': {
    if (Customizer.version <= 2) {
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
    } else {
      await Promise.all([
        Customizer.add('leaves_model/vanilla/blockstates', 'assets/minecraft/blockstates'),
        Customizer.add(`leaves_model/vanilla/models/light_dwarven`, 'assets/minecraft/models/block/leaves/vanilla')
      ])
    }
    break
  }
  case 'bushy': {
    await Customizer.add('leaves_model/bushy_leaves', 'assets/minecraft')
		Customizer.delete('assets/minecraft/optifine/colormap/custom/birch.properties')
    break
  }
}
