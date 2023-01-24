
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

module.exports = withNextra({
  redirects: () => {
    return [
        {
        source: "/",
        destination: "/fides/overview",
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


