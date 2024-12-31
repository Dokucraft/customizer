await Promise.all([
	Customizer.add(`modded/blocks.json`, 'assets/minecraft/atlases/blocks.json'),
	Customizer.add(`modded/redstone_lamp_on.json`, 'assets/minecraft/models/block/redstone_lamp_on.json'),
	
	Customizer.add(`modded/block`, 'assets/minecraft/textures/block'),
	Customizer.add(`modded/item`, 'assets/minecraft/textures/item'),
	
	Customizer.delete(
		'assets/minecraft/models/block/froglights',
		'assets/minecraft/models/block/blue_ice.json',
		'assets/minecraft/models/block/diamond_block.json',
		'assets/minecraft/models/block/diamond_ore.json',
		'assets/minecraft/models/block/emerald_block.json',
		'assets/minecraft/models/block/emerald_ore.json',
		'assets/minecraft/models/block/packed_ice.json',
		'assets/minecraft/blockstates/ochre_froglight.json',
		'assets/minecraft/blockstates/pearlescent_froglight.json',
		'assets/minecraft/blockstates/verdant_froglight.json',
  )
])
