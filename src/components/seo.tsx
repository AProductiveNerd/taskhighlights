import Head from "next/head";
import { NextSeo } from "next-seo";
import { SEO_interface } from "../constants/Types";

export const SEO_component = (seo_props: SEO_interface): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="twitter:text:title" content={seo_props.title} />
        <meta name="twitter:title" content={seo_props.title} />
        <meta name="twitter:description" content={seo_props.description} />
        <meta name="twitter:site" content="@taskhighlights" />
        {seo_props.twitter.handle && (
          <meta name="twitter:author" content={seo_props.twitter.handle} />
        )}
        <meta name="twitter:image" content="/images/icon.jpg" />
        <meta name="twitter:image:alt" content="Task Highlights" />
      </Head>
      <NextSeo {...seo_props} />
    </>
  );
};
