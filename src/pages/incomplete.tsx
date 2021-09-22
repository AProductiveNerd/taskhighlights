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
          title: "Incomplete Tasks | Task Highlights"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <IncompleteCard />
      </div>
    </Layout>
  );
}
