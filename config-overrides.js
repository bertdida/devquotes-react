const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function override(config) {
  config.plugins = config.plugins.map(plugin => {
    if (plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      });
    }
    return plugin;
  });
  return config;
};
