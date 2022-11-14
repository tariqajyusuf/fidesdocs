import { useRouter } from "next/router";

const Logo = ({ height }) => (
  <div>
  </div>
);


export default {
  projectLink: "https://github.com/ethyca/fides",
  docsRepositoryBase: "https://github.com/ethyca/fides",
  titleSuffix: " – Ethyca",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  gitTimestamp: null,
  font:  false,
  darkMode: false, 
  feedbackLink: () => {
    return (
      null
    );
  },
  feedbackLabels: "feedback",
  logo: () => {
    return (
      <>
        <Logo height={12} />
      </>
    );
  },
  head: ({ title, meta }) => {

    const ogImage =
      `https://fides.vercel.app`;

    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            "Fill in later"
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            "Fill in later"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:image" content={ogImage} />
        <meta
          name="og:title"
          content={
            title ? title + " – Ethyca" : "Fill in later"
          }
        />
        <meta name="og:image" content={ogImage} />
        <meta name="apple-mobile-web-app-title" content="Ethyca" />
        <script
            lang="javascript"
            dangerouslySetInnerHTML={{
              __html: `if (!window.localStorage.getItem("theme_default")) {
                window.localStorage.setItem("theme", "light");
                window.localStorage.setItem("theme_default", "light");
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
              }`,
            }}
          />;
      </>
    );
  },
  footerEditLink: ({}) => {
        return null;
  },
  footerText: ({  }) => {
  return (
          <a
            href="https://ethyca.com"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            Return to ethyca.com
            <span>
            </span>
          </a>
        );
  }
};
