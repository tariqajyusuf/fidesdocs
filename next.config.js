// NOTE: This is set to ETHYCA_SITE_URL="https://ethyca.com" when hosting on Vercel here: 
// https://vercel.com/ethyca/fidesdocs/settings/environment-variables
const ETHYCA_SITE_URL = process.env["ETHYCA_SITE_URL"] || "";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  flexsearch: false,
  unstable_staticImage: true,
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  basePath: "/docs",
  trailingSlash: false,
  async redirects() {
    return [
      {
        // Use a regex match to redirect all URLs to the /docs sub-directory, *except* URLs
        // that already start with "docs". This prevents an infinite redirect loop of
        // redirecting from /docs -> /docs/docs -> /docs/docs/doc...
        //
        // ((?!docs).*) <=== full regex
        //  ^^^^^^^^    <=== negative match for "docs"
        //          ^^  <=== match any character
        source: '/:path((?!docs).*)',
        destination: `${ETHYCA_SITE_URL}/docs/:path`,
        permanent: true,
        basePath: false,
      },
    ]
  }
});

