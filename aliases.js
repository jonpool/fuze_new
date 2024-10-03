/**
 * Create aliases for the paths
 */
const aliases = (prefix = `src`) => ({
  '@auth': `${prefix}/@auth`,
  '@i18n': `${prefix}/@i18n`,
  '@fuse': `${prefix}/@fuse`,
  '@history': `${prefix}/@history`,
  '@mock-api': `${prefix}/@mock-api`,
  '@schema': `${prefix}/@schema`,
  'app/store': `${prefix}/app/store`,
  'src/shared-components': `${prefix}/src/shared-components`,
  'app/configs': `${prefix}/app/configs`,
  'app/theme-layouts': `${prefix}/app/theme-layouts`,
  'app/AppContext': `${prefix}/app/AppContext`,
  '@': `${prefix}`
});

export default aliases;
