if (!Config.optifine) {
  /*
    If Optifine isn't used, there's no point in keeping the optifine folder.
    For Light, deleting this folder makes the pack around half as big as it
    would be with the folder, so this saves a lot of bandwidth.
  */
  Customizer.delete('assets/minecraft/optifine')
} else if (!Config.of_custom_sky_overworld) {
  // Unless they've chosen the Optifine sky for the overworld, just delete it
  Customizer.delete('assets/minecraft/optifine/sky/world0')
}

// If Shaderpacks are used, replace the Semi-Transparent Textures to Fix some Issues
if (Config.shaderpack) {
  await Promise.all([
    Customizer.add(`shaderpack/block`, 'assets/minecraft/textures/block'),
    ...Config.optifine ? [Customizer.add(`shaderpack/optifine`, 'assets/minecraft/optifine/ctm')] : []
  ])
}

// If Mods are used, replace the Blocks Atlas and Add Affected Textures
if (Config.modded) await import('modded/modded')

// End Sky
if (Config.end_sky_no_iviewrotmat) await import('end_sky/configure_1.21.2')

// Miscellaneous
if (Config.glass_panes === 'clear') await import('misc/clear_glass_panes')
if (Config.flip_shovels === 'right') await import('misc/flip_shovels')
if (Config.leaves_model ?? Config.leaves_model_v2) await import('leaves_model/configure')
if (Config.inset_doors === false) await import('inset_doors/disable')
if (Config.campfire_color) await import('campfire/campfire')
if (Config.soul_campfire_color) await import('campfire/soul_campfire')
