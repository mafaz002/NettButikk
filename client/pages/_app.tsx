import Head from "next/head";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>Verdige Smil</title>
    </Head>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
);

export default MyApp;
