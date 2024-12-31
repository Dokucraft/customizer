// Delete the Optifine skybox for the End if the user didn't select the
// OF skybox. This saves about 4 MB.
if (Config.end_sky_no_iviewrotmat !== 'optifine') {
  Customizer.delete('assets/minecraft/optifine/sky/world1')
}
