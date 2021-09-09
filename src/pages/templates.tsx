import { Layout } from "../components/layout";
import { SEO_component } from "../components/seo";
import { TemplateCard } from "../components/templates/TemplateCard";

export default function Routine(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Templates"
        openGraph={{
          title: "Templates"
        }}
        description="Your templates"
        twitter={{
          cardType: "app"
        }}
      />
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <TemplateCard />
      </div>
    </Layout>
  );
}
