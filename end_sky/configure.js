const end_sky = Config.end_sky ?? Config.end_sky_no_iviewrotmat

// Delete the Optifine skybox for the End if the user didn't select the
// OF skybox. This saves about 4 MB.
if (end_sky !== 'optifine') {
  Customizer.delete('assets/minecraft/optifine/sky/world1')
}

const { setScalar, setVec3 } = Customizer.shaders

if (Config.end_sky === 'rift') {
  await setScalar('assets/minecraft/shaders/config.txt', 'CUSTOM_END_SKY', 1)
  const map = {
    end_sky_rift_color: 'END_SKY_RIFT_COLOR',
    end_sky_rift_os_color: 'END_SKY_STARS_OUTSIDE_BASE_COLOR',
    end_sky_rift_on_color: 'END_SKY_NEBULAE_OUTSIDE_COLOR',
    end_sky_rift_is_color: 'END_SKY_STARS_INSIDE_BASE_COLOR',
    end_sky_rift_in_color: 'END_SKY_NEBULAE_INSIDE_COLOR',
  }
  for (const [k, v] of Object.entries(map)) if (k in Config) {
    await setVec3('assets/minecraft/shaders/flavor.glsl', v, Config[k])
  }

} else if (Config.end_sky === 'cloudy') {
  await setScalar('assets/minecraft/shaders/config.txt', 'CUSTOM_END_SKY', 2)
  const map = {
    end_sky_cloudy_base_color: 'END_SKY_2_BASE_COLOR',
    end_sky_cloudy_primary_color: 'END_SKY_2_STRONG_CLOUDS_PRIMARY_COLOR',
    end_sky_cloudy_primary_fade_color_1: 'END_SKY_2_STRONG_CLOUDS_COLOR_1',
    end_sky_cloudy_primary_fade_color_2: 'END_SKY_2_STRONG_CLOUDS_COLOR_1',
    end_sky_cloudy_secondary_color: 'END_SKY_2_WEAK_CLOUDS_COLOR',
    end_sky_cloudy_star_color: 'END_SKY_2_STARS_BASE_COLOR',
  }
  for (const [k, v] of Object.entries(map)) if (k in Config) {
    await setVec3('assets/minecraft/shaders/flavor.glsl', v, Config[k])
  }
}
