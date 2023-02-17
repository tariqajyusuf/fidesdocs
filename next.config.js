
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

module.exports = withNextra({
  basePath: '/fides',
  redirects: () => {
    return [
        {
        source: "/fides",
        destination: "/fides",
        statusCode: 301,
      },
      {
        source: '/fides/dsr_support/:slug*',
        destination: '/fides/dsr_quickstart/dsr_support/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      }
    ];
  },

});


