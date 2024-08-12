import Script from "next/script";
import Head from "next/head";
import { useEffect } from "react";
import { registerServiceWorker } from "../utils/serviceWorker";

export default function MyApp({ Component, pageProps }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    registerServiceWorker();
  }, []);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/register-sw.js")
          .then((registration) => {
            console.log("Service Workers registered:", registration);
          })
          .catch((registrationError) => {
            console.error(
              "Service Worker registration failed:",
              registrationError
            );
          });
      });
    }
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Crept Studio" />
        <meta name="application-name" content="Crept Studio" />
        <meta name="msapplication-TileColor" content="#797979" />
        <meta
          name="msapplication-TileImage"
          content="/site-icons/mstile-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/site-icons/browserconfig.xml"
        />
        <link rel="alternate" type="application/rss+xml" href="https://www.crept.studio/rss.xml" />
      </Head>
      <Component {...pageProps} />
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  );
}
