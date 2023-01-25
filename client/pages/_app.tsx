import Head from "next/head";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>Verdige Smil</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
