const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure Metro resolves a single copy of react-native-web (avoid duplicates)
config.resolver.extraNodeModules = Object.assign({}, config.resolver.extraNodeModules, {
  'react-native-web': path.resolve(projectRoot, 'node_modules', 'react-native-web')
});

module.exports = config;
