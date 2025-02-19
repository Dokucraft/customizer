await Promise.all([
	Customizer.add(`modded/blocks.json`, 'assets/minecraft/atlases/blocks.json'),
	Customizer.add(`modded/models/redstone_lamp_on.json`, 'assets/minecraft/models/block/redstone_lamp_on.json'),
	
	Customizer.add(`modded/block`, 'assets/minecraft/textures/block'),
	Customizer.add(`modded/item`, 'assets/minecraft/textures/item'),
	Customizer.add(`modded/models/froglights`, 'assets/minecraft/models/block/froglights'),
	
	Customizer.delete(
		'assets/minecraft/textures/effect',
		'assets/minecraft/models/block/blue_ice.json',
		'assets/minecraft/models/block/diamond_block.json',
		'assets/minecraft/models/block/diamond_ore.json',
		'assets/minecraft/models/block/emerald_block.json',
		'assets/minecraft/models/block/emerald_ore.json',
		'assets/minecraft/models/block/packed_ice.json',
		'assets/minecraft/textures/block/blue_ice_particle.png',
		'assets/minecraft/textures/block/diamond_block_particle.png',
		'assets/minecraft/textures/block/diamond_ore_particle.png',
		'assets/minecraft/textures/block/emerald_block_particle.png',
		'assets/minecraft/textures/block/emerald_ore_particle.png',
		'assets/minecraft/textures/block/ochre_froglight_particle.png',
		'assets/minecraft/textures/block/packed_ice_particle.png',
		'assets/minecraft/textures/block/pearlescent_froglight_particle.png',
		'assets/minecraft/textures/block/verdant_froglight_particle.png',
  )
])
