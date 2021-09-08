import Head from "next/head";
import { IncompleteCard } from "../components/incomplete/IncompleteCard";
import { Layout } from "./../components/layout/index";
import { SEO_component } from "../components/seo";

export default function Incomplete(): JSX.Element {
  return (
    <Layout>
      <Head>
        <SEO_component
          title="Incomplete Tasks"
          description="Your incomplete tasks"
          twitter={{
            cardType: "app"
          }}
        />
      </Head>

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <IncompleteCard />
      </div>
    </Layout>
  );
}
