import { NextSeo } from "next-seo";
import { SEO_interface } from "../constants/Types";

export const SEO_component = (seo_props: SEO_interface): JSX.Element => {
  return <NextSeo {...seo_props} />;
};
