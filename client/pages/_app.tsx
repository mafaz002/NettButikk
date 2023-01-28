import Head from "next/head";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
   margin: 0; 
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      <title>Verdige Smil</title>
    </Head>
    <GlobalStyle />
    <Header />
    <Component {...pageProps} />
    <Footer />
  </>
);

export default MyApp;
