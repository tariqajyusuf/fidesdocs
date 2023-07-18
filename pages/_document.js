import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { SkipNavLink } from '@reach/skip-nav'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
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
