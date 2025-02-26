/* eslint-env node */
import "./globals.css";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { Banner, Head } from "nextra/components";

export const metadata = {
  metadataBase: new URL("https://sdk.solio.world"),
  title: {
    template: "%s - Solio Protocol",
  },
  description:
    "The Consensus-Driven Bonding Curve DeFi Protocol for Fair Token Generation and Innovative Bonding-curve Liquidity Solutions.",
  applicationName: "Solio Protocol",
  generator: "Next.js",
  appleWebApp: {
    title: "Solio Protocol",
  },
};

const navbar = (
  <Navbar
    logo={<span>Solio Protocol</span>}
    projectLink="https://github.com/Solioworld/solio-protocol"
  />
);

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          banner={<Banner storageKey="@solio/core">@solio/core 2 development</Banner>}
          navbar={navbar}
          footer={<Footer>{new Date().getFullYear()} © Solio Protocol.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/Solioworld/solio-protocol/tree/main/docs"
          sidebar={{ autoCollapse: false, defaultMenuCollapseLevel: 2 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
