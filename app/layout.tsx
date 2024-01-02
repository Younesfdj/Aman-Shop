import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { SiteBlob } from "@/components/site-blob";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { AppProvider } from "@/utils/context"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/logo-96x96.png" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
          )}
        >
          <Providers>
            <AppProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                {/* <SiteBlob /> */}
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
            </AppProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
