switch (Config.leaves_model ?? Config.leaves_model_v2) {
  case 'vanilla': {
    if (Customizer.version <= 8) { // Version 9+ (1.21.4) uses vanilla leaves as default
      if (Customizer.version <= 2) { // Dark and High had a different structure in older versions
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
    }
    break
  }
  case 'bushy': {
    await Customizer.add('leaves_model/bushy_leaves', 'assets/minecraft')
		Customizer.delete('assets/minecraft/optifine/colormap/custom/birch.properties')
    break
  }
}
