import { IncompleteCard } from "../components/incomplete/IncompleteCard";
import { Layout } from "./../components/layout/index";
import { SEO_component } from "../components/seo";

export default function Incomplete(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Incomplete Tasks | Task Highlights"
        description="Your incomplete tasks"
        openGraph={{
          title: "Incomplete Tasks | Task Highlights",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="mt-5 flex-1 items-center text-center text-4xl">
        <IncompleteCard />
      </div>
    </Layout>
  );
}
