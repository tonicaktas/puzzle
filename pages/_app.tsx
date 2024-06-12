import type { AppProps } from "next/app";
import "@fontsource/open-sans";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
