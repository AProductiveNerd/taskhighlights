import { HabitCard } from "../components/habits/HabitCard";
import Head from "next/head";
import { Layout } from "../components/layout";
import { SEO_component } from "../components/seo";

export default function Routines(): JSX.Element {
  return (
    <Layout>
      <Head>
        <SEO_component
          title="Habits"
          description="Your habits"
          twitter={{
            cardType: "app"
          }}
        />
      </Head>
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <HabitCard />
      </div>
    </Layout>
  );
}
