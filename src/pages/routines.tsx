import { Layout } from "../components/layout";
import { RoutineCard } from "../components/routines/RoutineCard";
import { SEO_component } from "../components/seo";

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
        <RoutineCard />
      </div>
    </Layout>
  );
}
