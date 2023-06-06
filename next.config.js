
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_flexsearch: false,
  unstable_staticImage: true,
  defaultShowCopyCode: true,
});

module.exports = withNextra();


