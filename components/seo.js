import { FunctionComponent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const DEFAULT_DESCRIPTION = 'Ethyca is a data privacy software company committed to restoring user trust on the internet by automating end-to-end privacy rights fulfillment. Book a demo.';

export function SEO({ title, link, description, ogImage, ogImageType }) {
  const router = useRouter();

  const preparedTitle = title ? `${title} | Ethyca` : 'Ethyca';
  const baseUrl = 'https://ethyca.com';
  const canonicalUrl = baseUrl + router.asPath.split(/[?#]/)[0];
  const defaultImage = 'https://ethyca.com/assets/ethyca-featured-image.png';
  return (

        <Head>
      <title>{preparedTitle}</title>
      <meta name='description' content={description} />
      <meta itemProp='name' content={preparedTitle} />
      <meta itemProp='description' content={description} />

      <link rel='canonical' href={canonicalUrl} />

      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={preparedTitle} />
      <meta property='og:description'
            content={description} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:site_name' content='Data Privacy Software &amp; CCPA Compliance Software | Ethyca' />

      <meta name="image"
property='og:image'
content={ogImage ?? defaultImage} />
      <meta property='og:image:type' content={ogImageType ?? 'img/png'} />
      {!ogImage && (
        <>
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
        </>
      )}
      <meta name="twitter:image" content={ogImage ?? defaultImage} />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
    
  );
}

 