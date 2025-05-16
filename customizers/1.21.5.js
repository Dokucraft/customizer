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

if (Config.sodium) {
  // Remove terrain and "include" shaders when Sodium is used to get rid of the error notification
  Customizer.delete(
    'assets/minecraft/shaders/core/rendertype_cutout.json',
    'assets/minecraft/shaders/core/rendertype_cutout_mipped.json',
    'assets/minecraft/shaders/core/rendertype_solid.json',
    'assets/minecraft/shaders/core/rendertype_translucent.json',
    'assets/minecraft/shaders/core/rendertype_clouds.fsh',
    'assets/minecraft/shaders/core/rendertype_clouds.vsh',
    'assets/minecraft/shaders/include/fog.glsl',
    'assets/minecraft/shaders/include/light.glsl',
  )
}

// If Shaderpacks are used, replace the Semi-Transparent Textures to Fix some Issues
if (Config.shaderpack) {
  await Promise.all([
    Customizer.add(`shaderpack/block`, 'assets/minecraft/textures/block'),
    Customizer.add(`shaderpack/optifine`, 'assets/minecraft/optifine/ctm')
  ])
}

// If Mods are used, replace the Blocks Atlas and Add Affected Textures
if (Config.modded) await import('modded/modded')

// End Sky
if (Config.end_sky_no_iviewrotmat) await import('end_sky/configure_1.21.2')

// Water
if (Config.fresnel === false) await import('misc/disable_fresnel_1.21.2')
if (Config.water_tint_correction === false) await import('misc/disable_water_tint_correction_1.21.2')
if (Config.underwater_fog_correction === false) await import('misc/disable_underwater_fog_correction')

// Miscellaneous
if ('grass_effect' in Config && Config.grass_effect !== 'none') await import('grass_effect/grass_effect_1.21.2')
if (Config.glass_panes === 'clear') await import('misc/clear_glass_panes')
if (Config.flip_shovels === 'right') await import('misc/flip_shovels')
if (Config.leaves_model ?? Config.leaves_model_v2) await import('leaves_model/configure')
if (Config.inset_doors === false) await import('inset_doors/disable')
if (Config.campfire_color) await import('campfire/campfire')
if (Config.soul_campfire_color) await import('campfire/soul_campfire')
