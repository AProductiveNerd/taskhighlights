import Head from "next/head";
import { IncompleteCard } from "../components/tasks/IncompleteCard";
import { Layout } from "./../components/layout/index";

export default function Incomplete(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Incomplete Tasks | Task Highlights</title>

        <meta
          name="description"
          content="TaskHighlights is a minimalistic Todo app that uses accountability to supercharge your productivity"
        />
        <meta
          property="og:title"
          content="Incomplete Tasks | Task Highlights"
        />

        <link rel="icon" href="./favicon.ico" />
      </Head>

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <IncompleteCard />
      </div>
    </Layout>
  );
}
