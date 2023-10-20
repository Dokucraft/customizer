await Promise.all([
	Customizer.add(`modded/blocks.json`, 'assets/minecraft/atlases/blocks.json'),
	Customizer.add(`modded/block`, 'assets/minecraft/textures/block'),
	Customizer.add(`modded/item`, 'assets/minecraft/textures/item')
])
