import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";


const config: DocsThemeConfig = {
  head: () => {
    const { frontMatter, title: docTitle, } = useConfig();
    const title = `${frontMatter.title || docTitle}-Solio Protocol`;
    const description = frontMatter.description || "The Consensus-Driven Bonding Curve DeFi Protocol for Fair Token Generation and Innovative Bonding-curve Liquidity Solutions.";
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </>
    );
  },
  logo: <span>Solio Protocol</span>,
  docsRepositoryBase:
    "https://github.com/Solioworld/solio-protocol/tree/main/docs",
  project: {
    link: "https://github.com/Solioworld/solio-protocol",
  },
  footer: {
    content: "Solio Protocol",
  },
  sidebar: {
    autoCollapse: false,
    defaultMenuCollapseLevel: Infinity,
  }
};

export default config;
