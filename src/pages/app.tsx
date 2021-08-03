import Head from "next/head";
import { Layout } from "../components/layout/index";
import { TasksCard } from "../components/tasks/TasksCard";

export default function App(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Daily Tasks | Task Highlights</title>

        <meta name="description" content="Daily Page" />
        <meta property="og:title" content="Daily Tasks | Task Highlights" />

        <link rel="icon" href="./favicon.ico" />
      </Head>

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <TasksCard />
      </div>
    </Layout>
  );
}
