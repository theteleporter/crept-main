import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
  height: "device-height",
  viewportFit: "cover",
};

const nunito = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "Crept Studio",
    template: "%s | Crept",
  },
  keywords: [
    "Tv shows",
    "Movies",
    "Crept",
    "Crept Studio",
    "Offline movies",
    "stream tv",
    "download movies",
    "Crept Official Site",
    "Binge watch",
    "Browse crept",
    "crept inc",
    "crept incorporated",
    "watch crept",
  ],
  description: "Unlimited entertainment, your way.",
  generator: "The Teleporter",
  applicationName: "Crept",
  appleWebApp: {
    capable: true,
    title: "Crept Studio",
    statusBarStyle: "default",
    startupImage: "/site-icons/apple-touch-icon.png",
  },
  referrer: "origin-when-cross-origin",
  authors: [
    {
      name: "The Teleporter",
      url: "https://www.theteleporter.me",
    },
  ],
  category: "Entertainment",
  classification: "Tv",
  creator: "The Teleporter",
  publisher: "The Teleporter",
  appLinks: {
    // ios: { app_store_id: "123456789", app_name: "Crept", url: "https://www.crept.studio" },
    // android: { package: "com.example", url: "https://www.crept.studio" },
    web: { url: "https://www.crept.studio", should_fallback: true },
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.crept.studio"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/",
      fr: "/",
      de: "/",
      uk: "/",
      aa: "/",
      ab: "/",
      da: "/",
      ne: "/",
      sa: "/",
      am: "/",
      br: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Crept Studio",
    description: "Unlimited entertainment, your way.",
    siteId: "1781660523953541120",
    creator: "@creptstudio",
    creatorId: "1781660523953541120",
    images: {
      url: "/assets/images/site-icons/crept-logo.png",
      alt: "Crept Studio",
    },
    site: "Crept Studio",
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    me: "The Teleporter",
  },
  openGraph: {
    title: {
      default: "Crept Studio",
      template: "%s | Crept",
      //absolute: '',
    },
    description: "Unlimited entertainment, your way.",
    url: "https://www.crept.studio",
    siteName: "Crept Studio",
    images: [
      {
        url: "/assets/images/site-icons/crept-icon.png",
        width: 3271,
        height: 3271,
      },
      {
        url: "/assets/images/site-icons/crept-logo.png",
        width: 8001,
        height: 4501,
        alt: "Crept Studio",
      },
    ],
    locale: "en",
    type: "website",
  },

  icons: [
    {
      url: "/site-icons/apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },
    {
      rel: "mask-icon",
      url: "/site-icons/safari-pinned-tab.svg",
      color: "#797979",
    },
    {
      url: "/site-icons/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/site-icons/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "194x194",
      url: "/site-icons/favicon-194x194.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/site-icons/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/site-icons/favicon-16x16.png",
    },
    {
      rel: "shortcut icon",
      url: "/site-icons/favicon.ico",
    },
  ],
  manifest: "/manifest.webmanifest",
};

const siteData = {
  "@context": "http://schema.org",
  "@type": "Website",
  name: "Crept Studio",
  url: "https://www.crept.studio",
  description:
    "Join Crept, today, the home of unlimited entertainment. Discover thrilling Tv Shows and Movies on any device anywhere, anytime. Download Tv Shows and Movies to watch offline all for free, no subscription or account needed."
};

const browsePageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.crept.studio/browse",
  "name": "Browse Crept"
};

const categoriesPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.crept.studio/browse/category/action",
  "name": "Browse Categories"
};

const supportPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.support.crept.studio",
  "name": "Support Us"
};

const contactPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.contact.crept.studio",
  "name": "Contact Us"
};

const requestFilmPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.contact.crept.studio/request/film",
  "name": "Request a Film"
};

const feedbackPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.contact.crept.studio/feedback",
  "name": "Share Feedback"
};

const reportBrokenLinkPageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.contact.crept.studio/report/broken-links",
  "name": "Report a Broken Link"
};

const requestFeaturePageData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  "url": "https://www.contact.crept.studio/request/feature",
  "name": "Request a Feature"
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      <html lang="en" className="dark">
      <head>
      <Script
        id={"application/ld+json"}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteData) }}
      />

  <Script
        id="application/ld+json-browse"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(browsePageData) }}
      />
      <Script
        id="application/ld+json-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesPageData) }}
      />
      <Script
        id="application/ld+json-support"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(supportPageData) }}
      />
      <Script
        id="application/ld+json-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageData) }}
      />
      <Script
        id="application/ld+json-request-film"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(requestFilmPageData) }}
      />
      <Script
        id="application/ld+json-feedback"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(feedbackPageData) }}
      />
      <Script
        id="application/ld+json-report-broken-link"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportBrokenLinkPageData) }}
      />
     <Script
        id="application/ld+json-request-feature"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(requestFeaturePageData) }}
      />
      </head>
        <body
          className={cn(
            "min-h-screen bg-background antialiased font-nunito selection:bg-accent selection:text-white"
          )}
        >
 {/* <Script
          id="dicouksa-script" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('dicouksa.com',7639267,document.createElement('script'))
            `
          }}
        /> */}
        {/*Multi-tag*/}
          {/* <Script
          id="monetag-script"
          src="https://alwingulla.com/88/tag.min.js"
          data-zone="77009"
          async
          strategy="afterInteractive"
        /> */}
     {/*    <Script
        src="https://alwingulla.com/88/tag.min.js"
        data-zone="81055"
        async
        data-cfasync="false"
        strategy="afterInteractive"
      />*/}
        {/*These ones*/}
     
      {/* <Script 
          id="zovidree-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})
              (document.createElement('script'),'https://zovidree.com/tag.min.js',7639263,document.body||document.documentElement)
            `,
          }}
        />
        <Script
               type="text/javascript"
               id="monetag-script1"
               src="/ads/script.js"
               strategy="afterInteractive"
               data-cfasync="false"
             /> */}
      {/*  <Script
               type="text/javascript"
               id="monetag-script2"
               src="/ads/script-2.js"
               strategy="afterInteractive"
               data-cfasync="false"
             />*/}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className={nunito.className}>
                <Providers>{children}</Providers>
              <Toaster />
              <Analytics />
              <SpeedInsights />
              <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
