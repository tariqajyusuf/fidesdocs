import { useRouter } from "next/router";
import HubspotForm from 'react-hubspot-form'


const Logo = ({ height }) => (
    <svg width="70px" height="25px" viewBox="0 0 577 177" version="1.1">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Fides-logo" transform="translate(-224.000000, -296.000000)">
            <g id="Group-14" transform="translate(224.000000, 296.000000)">
                <polygon id="Fill-1" fill="#111439" points="0 176.953 176.953 176.953 176.953 0 0 0"></polygon>
                <g id="Group-13">
                    <path d="M286.8497,48.4501 C289.6187,48.4501 292.7267,49.1291 295.5507,50.2691 L300.0297,31.9171 C296.3107,30.5051 290.2977,28.9311 283.2797,28.9311 C260.6117,28.9311 252.3997,43.4961 252.3997,61.2091 L252.3997,65.5671 L235.0957,65.5671 L235.0957,85.0861 L252.3997,85.0861 L252.3997,149.5341 L277.2667,149.5341 L277.2667,85.0861 L295.0657,85.0861 L295.0657,65.5671 L277.2667,65.5671 L277.2667,60.4901 C277.2667,51.7891 280.7817,48.4501 286.8497,48.4501" id="Fill-2" fill="#111439"></path>
                    <path d="M393.9931,123.6898 L393.9931,89.2118 C389.5951,85.2618 384.6541,83.8918 380.0931,83.8918 C372.0311,83.8918 364.9721,91.3298 364.9721,107.3058 C364.9721,123.7848 370.6601,131.2098 380.2971,131.2098 C385.5911,131.2098 389.8671,129.2008 393.9931,123.6898 M393.9931,30.9668 L418.8601,30.9668 L418.8601,149.5348 L393.9931,149.5348 L393.9931,141.2138 C388.0481,147.1458 381.9261,151.5708 373.8221,151.5708 C352.9461,151.5708 339.4671,134.9968 339.4671,107.5778 C339.4671,80.1178 356.6111,63.5308 374.2971,63.5308 C383.5551,63.5308 388.3191,66.9788 393.9931,72.2988" id="Fill-4" fill="#111439"></path>
                    <g id="Group-8" transform="translate(509.602200, 63.530700)">
                        <mask id="mask-2" fill="white">
        <polygon id="path-1" points="0 0 66.7288 0 66.7288 88.04 0 88.04"></polygon>
                        </mask>
                        <g id="Clip-7"></g>
                        <path d="M0,76.312 L11.185,60.811 C18.8,66.566 25.817,69.634 32.849,69.634 C40.26,69.634 43.463,66.81 43.463,62.412 C43.463,56.874 35.129,54.363 26.496,50.983 C16.207,46.993 4.276,40.165 4.276,26.292 C4.276,10.655 16.981,0 36.351,0 C49.219,0 58.802,5.199 65.955,10.642 L54.811,25.573 C48.839,21.243 42.948,18.406 37.138,18.406 C30.704,18.406 27.541,20.931 27.541,25.111 C27.541,30.473 35.401,32.523 44.101,35.686 C54.743,39.622 66.729,45.594 66.729,60.946 C66.729,76.149 54.73,88.04 32.238,88.04 C21.162,88.04 8.497,83.235 0,76.312" id="Fill-6" fill="#111439" mask="url(#mask-2)"></path>
                    </g>
                    <mask id="mask-4" fill="white">
                       
        <polygon id="path-3" points="0 176.953 576.331 176.953 576.331 0 0 0"></polygon>
                    </mask>
                    <g id="Clip-10"></g>
                    <polygon id="Fill-9" fill="#111439" mask="url(#mask-4)" points="305.136 149.535 330.017 149.535 330.017 65.567 305.136 65.567"></polygon>
                    <path d="M330.1508,42.056 C330.1508,48.967 324.5488,54.569 317.6378,54.569 C310.7268,54.569 305.1248,48.967 305.1248,42.056 C305.1248,35.145 310.7268,29.543 317.6378,29.543 C324.5488,29.543 330.1508,35.145 330.1508,42.056" id="Fill-11" fill="#111439" mask="url(#mask-4)"></path>
                    <path d="M455.2868,97.7515 L479.9428,97.7515 C479.9428,94.4975 479.1358,91.6645 477.5268,89.2495 C475.9158,86.8365 472.9458,85.6295 468.6148,85.6295 C465.3918,85.6295 462.5888,86.5845 460.2008,88.4915 C457.8118,90.4015 456.1748,93.4875 455.2868,97.7515 M470.9468,151.9645 C464.8378,151.9645 459.1728,150.9805 453.9538,149.0175 C448.7318,147.0555 444.2078,144.1935 440.3768,140.4315 C436.5448,136.6725 433.5178,132.0425 431.2968,126.5415 C429.0738,121.0435 427.9648,114.8145 427.9648,107.8535 C427.9648,101.0085 429.1028,94.8625 431.3808,89.4175 C433.6558,83.9745 436.6538,79.3445 440.3768,75.5275 C444.0968,71.7135 448.3448,68.7935 453.1208,66.7725 C457.8948,64.7525 462.8378,63.7425 467.9478,63.7425 C474.0548,63.7425 479.3858,64.8105 483.9408,66.9415 C488.4938,69.0745 492.2708,71.9915 495.2688,75.6965 C498.2678,79.3995 500.5168,83.7225 502.0158,88.6595 C503.5158,93.6005 504.2658,98.8745 504.2658,104.4855 C504.2658,107.0695 504.1248,109.4815 503.8488,111.7255 C503.5698,113.9725 503.3208,115.5985 503.0988,116.6085 L455.6198,116.6085 C456.9528,121.6595 459.3398,125.1685 462.7828,127.1315 C466.2248,129.0955 470.2798,130.0775 474.9448,130.0775 C477.8318,130.0775 480.6348,129.6565 483.3578,128.8145 C486.0778,127.9725 488.9388,126.7095 491.9378,125.0265 L502.4678,141.1825 C497.9118,144.4405 491.6878,147.8975 486.1898,149.5225 C480.6928,151.1485 475.6108,151.9645 470.9468,151.9645" id="Fill-12" fill="#111439" mask="url(#mask-4)"></path>
                </g>
            </g>
        </g>
    </g>
</svg>
);


export default {
  projectLink: "https://github.com/ethyca/fidesdocs",
  docsRepositoryBase: "https://github.com/ethyca/fidesdocs/tree/",
  titleSuffix: " – Ethyca",
  search: true,
  unstable_flexsearch: false,
  floatTOC: true,
  gitTimestamp: null,
  font:  false,
  defaultMenuCollapsed: true,
  darkMode: false, 
  feedbackLink: () => {
    return (
      'Open an issue in Github'
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
      `https://docs.ethyca.com/assets/featured.png`;

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
            "Documentation hub for Ethyca and the Fides Privacy Engineering Platform. Developers and end users can get the info they need on Ethyca’s product range here."
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            "Documentation hub for Ethyca and the Fides Privacy Engineering Platform. Developers and end users can get the info they need on Ethyca’s product range here."
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ethyca" />
        <meta name="twitter:image" content={ogImage} />
        <meta
          name="og:title"
          content={
            title ? title + " – Ethyca" : "Fides Documentation"
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
        return (<a href="https://fid.es/join-slack" class="text-xs font-medium no-underline">Ask a question in our Slack Community</a>);
  },
  footerText: ({  }) => {
  return (
      <div>
        <div className="footerwrap">
         <div className="logos">
          <a
            href="https://ethyca.com"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <img src ="/assets/ethyca_logo.svg" />
          </a>
          </div>
          <div className="socials">
            <div className="icons"> 

                <a href="https://fid.es/join-slack" rel="noopener"> <img src ="/assets/slack.svg" /> </a>
                <a href="https://www.linkedin.com/company/ethyca/" rel="noopener"> <img src ="/assets/linkedin.svg" /> </a>
                <a href="https://twitter.com/ethyca" rel="noopener">  <img src ="/assets/twitter.svg" /> </a>
                <a href="https://github.com/ethyca/fides" rel="noopener">  <img src ="/assets/github.svg" /> </a>
            </div>
              <HubspotForm
                   portalId='7252764'
                   formId='0d22c925-3a81-4f10-bfdc-69a5d67e93bc'
                   onSubmit={() => console.log('Submit!')}
                   onReady={(form) => console.log('Form ready!')}
                   loading={<div>Loading...</div>}
                   />
          </div>
          </div>
          <div className="privacyPolicy"> 
              <a href="https://privacy.ethyca.com/">  Do not sell my information </a>

              <a href="https://privacy.ethyca.com/">  Privacy policy </a>
          </div> 
          </div>

        );
  }
};
