/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require("metro-config");

 module.exports = (async () => {
  const { resolver: { sourceExts } } = await getDefaultConfig();

  return {
    transformer: {
      // Allows SCSS imports in JS files
      babelTransformerPath: require.resolve("react-native-sass-transformer"),
      experimentalImportSupport: false,
      inlineRequires: true
    },

    resolver: {
      sourceExts: [...sourceExts, "scss", "sass"]
    }
  };
})();