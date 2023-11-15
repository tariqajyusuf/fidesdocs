
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  flexsearch: false,
  unstable_staticImage: true,
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  async rewrites() {
    return {
        beforeFiles: [
			    {
			      "source": "https://testdocs.ethyca.com/docs/:path*",
			      "destination": "https://ethyca.com/docs/:path*"
			    }
        ]
    }
  },
});
