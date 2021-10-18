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
          cardType: "app",
        }}
      />

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <ArchivedCard />
      </div>
    </Layout>
  );
}
