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
  // If Sodium is used, get rid of the Fabulous skybox, it's not compatible
  Customizer.delete(
    'assets/minecraft/shaders/post',
    'assets/minecraft/shaders/program',
  )
}

// Overworld Sky
if (Config.post_sun) await import('misc/enable_post_sun')
if (Config.night_sky) await import('night_sky/configure')
if (Config.auroras) await import('night_sky/enable_auroras')

// End Sky
if (Config.end_sky) await import('end_sky/configure')

// Miscellaneous
if (Config.fresnel === false) await import('misc/disable_fresnel')
if (Config.better_lava) await import('better_lava/enable')
if (Config.glass_panes === 'clear') await import('misc/clear_glass_panes')
if (Config.flip_shovels === 'right') await import('misc/flip_shovels')
if (Config.waving_plants === false) await import('misc/disable_waving_plants')
if (Config.swinging_lanterns === false) await import('misc/disable_swinging_lanterns')
if (Config.leaves_model) await import('leaves_model/configure')
if (Config.inset_doors === false) await import('inset_doors/disable')
if (Config.campfire_color) await import('campfire/campfire')
if (Config.soul_campfire_color) await import('campfire/soul_campfire')
