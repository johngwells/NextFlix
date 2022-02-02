const withTM = require("next-transpile-modules")([
  "magic-sdk",
  "@magic-sdk/provider",
  "@magic-sdk/types",
  "@magic-sdk/commons",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com']
  }
});
