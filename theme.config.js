import { useRouter } from "next/router";
import Script from "next/script";
import HubspotForm from 'react-hubspot-form';


const Logo = ({ height }) => (
  <svg version="1.1" width="70px"
	 viewBox="0 0 1087 345" >
<g id="Page-1">
	<g id="Combined-Shape" transform="translate(0.000000, -103.000000)">
		<path class="st0" d="M594.51,182l27.08,85.15c1.26,3.91,2.51,8.09,3.72,12.29l0.36,1.26c2.63,9.24,4.99,18.41,6.55,24.65
			l0.21,0.83c1.08,4.34,1.72,7.06,1.72,7.06h0.79L673.02,182H737l-69.48,202.72C651.43,431.59,632.2,448,591.77,448h-55.49
			l13.89-49.61h21.98c18.84,0,26.3-7.42,26.3-21.09c0-8.59-3.93-20.31-12.17-41.4L527,182H594.51z M276.38,117v65.91H313v40.58
			h-36.62v95.49c0,15.91,8.66,19.89,22.44,19.89c1.31,0,2.66-0.02,3.99-0.06l0.88-0.02c3.96-0.12,7.63-0.32,9.3-0.32v47.35
			c-5.51,1.59-17.72,3.18-35.04,3.18c-37.41,0-64.18-12.33-64.18-56.1V223.49H187v-40.58h26.77V117H276.38z M833.2,175
			c25.77,0,47.78,6.9,63.8,19.22l-29.73,44.01c0,0-0.41-0.35-1.18-0.94l-0.29-0.22c-4.09-3.05-16.41-11.09-32.67-11.37
			c-27.47-0.47-43.67,19.58-43.67,56.3s16.2,56.77,43.67,56.3c16.26-0.28,28.57-8.33,32.67-11.37l0.29-0.22
			c0.77-0.59,1.18-0.94,1.18-0.94L897,369.78C880.98,382.1,858.97,389,833.2,389C769.61,389,728,342.8,728,282S769.61,175,833.2,175
			z M996,175c30.2,0,50.59,5.56,65.1,16.68c17.25,12.7,25.91,32.56,25.91,57.97v134.2h-61.6v-22.63h-1.16
			c-11.77,17.07-29.41,27.79-59.61,27.79c-40,0-68.63-21.84-68.63-61.94c0-44.86,35.29-58.36,76.86-63.92
			c37.65-4.76,50.98-8.73,50.98-22.63c0-13.1-9.91-19.5-27.45-19.61c-21.67-0.13-50.98,21.94-50.98,21.94l-27.23-39.93
			C918.19,202.91,946.61,175,996,175z M96.94,175c14.8,0,27.73,2.59,38.78,7.76c11.04,5.18,20.2,12.25,27.47,21.24
			c7.27,8.98,12.72,19.47,16.36,31.45c3.63,11.98,5.45,24.78,5.45,38.39c0,6.27-0.34,12.12-1.01,17.56
			c-0.68,5.45-1.28,9.39-1.82,11.84H67.05c3.23,12.25,9.02,20.77,17.37,25.53c8.35,4.77,18.18,7.15,29.49,7.15
			c7,0,13.8-1.02,20.4-3.06c6.59-2.04,13.53-5.1,20.8-9.19l25.53,39.19c-11.05,7.9-26.14,16.29-39.47,20.23
			c-13.33,3.94-25.65,5.92-36.96,5.92c-14.81,0-28.55-2.39-41.2-7.15c-12.66-4.76-23.63-11.7-32.92-20.83
			c-9.29-9.12-16.63-20.35-22.01-33.69C2.69,314,0,298.89,0,282c0-16.6,2.76-31.51,8.28-44.72c5.52-13.2,12.79-24.43,21.81-33.69
			c9.02-9.25,19.32-16.34,30.9-21.24C72.57,177.45,84.55,175,96.94,175z M394.75,103v103.26h1.17c14.47-19.29,31.68-30.7,59.45-30.7
			c43.81,0,69.62,31.49,69.62,76.36V383h-63.75V264.91c0-21.26-10.56-35.82-31.29-35.82c-21.12,0-35.2,17.71-35.2,42.51V383H331V103
			H394.75z M1025.41,286.96c-8.23,4.37-20,7.54-32.94,10.72c-24.71,5.56-34.9,11.91-34.9,27.4c0,16.28,11.76,22.63,27.45,22.63
			c23.92,0,40.39-14.69,40.39-36.53V286.96z M98.56,228.09c-7.81,0-14.61,2.32-20.4,6.94c-5.79,4.63-9.76,12.12-11.92,22.46h59.78
			c0-7.89-1.96-14.77-5.85-20.62C116.26,231.02,109.06,228.09,98.56,228.09z"/>
	</g>
</g>
</svg>
);


export default {
  primaryHue: 259,
  docsRepositoryBase: "https://github.com/ethyca/fidesdocs/tree/main/",

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Ethyca'
    }
  },
  toc: {
    float: true,
    extraContent: <a className="text-xs" href="https://fid.es/join-slack">Ask a question in our Slack Commnunity</a>,
  },
  editLink: {
    text: null,
    component(){return null}
  },
  feedback: {
    content: 'Open an issue in Github',
    useLink(){ return 'https://github.com/ethyca/fidesdocs/issues/new/choose'}
  },
  gitTimestamp: null,
  darkMode: false,
  nextThemes: {
    defaultTheme: 'light'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: ({ title, type }) => {
      if (type === 'separator') {
        return (
          <div>{title}</div>
        );
      }
      return <> {title}</>;
    },
  },
  logo: () => {
    return (
      <>
        <Logo height={12} />

      </>
    );
  },
  head: ({ title, meta }) => {

    const ogImage =
      `https://ethyca.com/docs/assets/featured.png`;

    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/docs/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/docs/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/docs/favicon/safari-pinned-tab.svg" />
        <link rel="manifest" href="/docs/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Documentation hub for Ethyca and the Fides Privacy Engineering Platform. Developers and end users can get the info they need on Ethyca’s product range here."
        />
        <meta
          name="og:description"
          content="Documentation hub for Ethyca and the Fides Privacy Engineering Platform. Developers and end users can get the info they need on Ethyca’s product range here."
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
      </>
    );
  },
  navigation: {
    prev: true,
    next: true
  },
  footer: {
    text:
      <div>
        <div className="footerwrap">
         <div className="logos">
          <a
            href="https://ethyca.com"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <img src ="/docs/assets/ethyca_logo.svg" alt="Ethyca Logo"/>
          </a>
          </div>
          <div className="socials">
            <div className="icons"> 

                <a href="https://www.fid.es/join-slack" rel="noopener"> <img src ="/docs/assets/slack.svg" alt="slack icon" /> </a>
                <a href="https://www.linkedin.com/company/ethyca/" rel="noopener"> <img src ="/docs/assets/linkedin.svg" alt="Linkedin icon" /> </a>
                <a href="https://twitter.com/ethyca" rel="noopener">  <img src ="/docs/assets/twitter.svg" alt="Twitter icon"  /> </a>
                <a href="https://github.com/ethyca/fides" rel="noopener">  <img src ="/docs/assets/github.svg" alt="Github icon" /> </a>
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
          </div>,
  }

};
