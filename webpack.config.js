const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native-web': path.resolve(__dirname, 'node_modules', 'react-native-web'),
    'react-native': path.resolve(__dirname, 'node_modules', 'react-native')
  };

  return config;
};