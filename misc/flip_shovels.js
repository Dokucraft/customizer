async function flipX(filePath) {
  const img = await loadImage(filePath)
  const canvas = new Canvas(img.width, img.height)
  const ctx = canvas.getContext('2d')
  ctx.scale(-1, 1)
  ctx.drawImage(img, -img.width, 0)
  await canvas.saveAs(filePath)
}

if (Pack.name !== 'dwarven') {
  for (const file of await Customizer.listFiles('assets/minecraft/textures/item/damaged_tools/shovel')) {
    if (!file.endsWith('.png')) continue;
    await flipX(file)
  }
}

const shovelTextures = [
  'assets/minecraft/textures/item/wooden_shovel.png',
  'assets/minecraft/textures/item/stone_shovel.png',
  'assets/minecraft/textures/item/netherite_shovel.png',
  'assets/minecraft/textures/item/iron_shovel.png',
  'assets/minecraft/textures/item/golden_shovel.png',
  'assets/minecraft/textures/item/diamond_shovel.png',
]

if (Config.optifine) {
  if (Customizer.version >= 9) {
    shovelTextures.push(
      'assets/minecraft/textures/item/cit/renamable_alts/tools/xmas_iron_shovel.png',
      'assets/minecraft/textures/item/cit/renamable_alts/tools/xmas_golden_shovel.png',
      'assets/minecraft/textures/item/cit/renamable_alts/tools/xmas_diamond_shovel.png',
      'assets/minecraft/textures/item/cit/renamable_alts/tools/bone_shovel.png',
    )
  } else {
    shovelTextures.push(
      'assets/minecraft/optifine/cit/renamable_alts/tools/xmas_iron_shovel.png',
      'assets/minecraft/optifine/cit/renamable_alts/tools/xmas_golden_shovel.png',
      'assets/minecraft/optifine/cit/renamable_alts/tools/xmas_diamond_shovel.png',
      'assets/minecraft/optifine/cit/renamable_alts/tools/bone_shovel.png',
    )
  }
}

for (const file of shovelTextures) {
  await flipX(file)
}
