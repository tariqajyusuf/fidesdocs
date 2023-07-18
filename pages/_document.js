import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { SkipNavLink } from '@reach/skip-nav'
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head> 
            <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PZ6FM4T6');
      `}
      </Script>
        </Head> 
        <body>
               <noscript
          dangerouslySetInnerHTML={{
            __html: '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZ6FM4T6"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>'
          }}
      />
          <SkipNavLink />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
