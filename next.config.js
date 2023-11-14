
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
            // if the host is `app.acme.com`,
            // this rewrite will be applied
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'https://fidesdocs-subdir.vercel.app/',
                    },
                ],
                destination: 'https://ethyca.com/:path*',
            },
        ]
    }
  },
});
