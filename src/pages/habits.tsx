import { HabitCard } from "../components/habits/HabitCard";
import { Layout } from "../components/layout";
import { SEO_component } from "../components/seo";

export default function Routines(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Habits | Task Highlights"
        description="Your habits"
        openGraph={{
          title: "Habits | Task Highlights",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <HabitCard />
      </div>
    </Layout>
  );
}
