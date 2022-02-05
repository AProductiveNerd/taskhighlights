import { ArchivedCard } from "../components/archived/ArchivedCard";
import { Layout } from "./../components/layout/index";
import { SEO_component } from "../components/seo";

export default function Archived(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Archived Tasks | Task Highlights"
        description="Your incomplete tasks"
        openGraph={{
          title: "Archived Tasks | Task Highlights",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="mt-5 flex-1 items-center text-center text-4xl">
        <ArchivedCard />
      </div>
    </Layout>
  );
}
