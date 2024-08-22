/**
 * Create aliases for the paths
 */
const aliases = (prefix = `src`) => ({
  '@fuse': `${prefix}/@fuse`,
  '@history': `${prefix}/@history`,
  '@lodash': `${prefix}/@lodash`,
  '@mock-api': `${prefix}/@mock-api`,
  '@schema': `${prefix}/@schema`,
  'app/store': `${prefix}/app/store`,
  'src/shared-components': `${prefix}/src/shared-components`,
  'app/configs': `${prefix}/app/configs`,
  'app/theme-layouts': `${prefix}/app/theme-layouts`,
  'app/AppContext': `${prefix}/app/AppContext`,
});

module.exports = aliases;
