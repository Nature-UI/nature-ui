import React from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import siteConfig from 'configs/site-config';

import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://static.cloudflareinsights.com' />
        <meta name='theme-color' content='#319795' />
      </Head>
      <DefaultSeo {...siteConfig.seo} />
      <Component {...pageProps} />
    </>
  );
}
