import { NextSeoProps } from "next-seo";

export const default_seo = (pathname: string): NextSeoProps => {
  const config: NextSeoProps = {
    defaultTitle: "Task Highlights",
    titleTemplate: `${pathname === "/" ? "" : "%s | Task Highlights"}`,
    description:
      "A to-do app that uses accountability to supercharge your productivity",
    openGraph: {
      type: "website",
      locale: "en",
      description:
        "A to-do app that uses accountability to supercharge your productivity",
      images: [
        {
          url: "/icon.png",
          alt: "Task Highlights"
        }
      ],
      url: "https://www.taskhighlights.com/",
      site_name: "Task Highlights"
    },
    twitter: {
      site: "@taskhighlights"
    }
  };
  return config;
};
