import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Script from 'next/script'
import { Providers } from "./providers";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4e881a43-5d66-410e-b7ed-dffac037dcbc"
        />
      </head>
      <body>
        <Providers>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <main>{children}</main>
          <footer className="bg-accent-1 border-accent-2 border-t">
            <div className="container mx-auto px-5">
                <div className="flex flex-col items-center py-20 lg:flex-row">
                  <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl underline decoration-[#64b5f6] decoration-[0.3rem]">
                    Connect with me at
                  </h3>
                  <div className="flex items-center justify-center gap-10 lg:w-1/2 lg:pl-4">
                    <a
                      href="https://github.com/vigneshwar221B"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                    >
                      <FaGithub className="h-10 w-10" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/vigneshwar221b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0077b5] transition-colors"
                    >
                      <FaLinkedin className="h-10 w-10" />
                    </a>
                    <a
                      href="mailto:vigneshwar221b@gmail.com"
                      className="hover:text-red-600 transition-colors"
                    >
                      <FaEnvelope className="h-10 w-10" />
                    </a>
                  </div>
                </div>
              
            </div>
          </footer>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </Providers>
      </body>
    </html>
  );
}
