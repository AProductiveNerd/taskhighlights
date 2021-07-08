import Head from "next/head";
import { TasksCard } from "../components/tasks/TasksCard";
import { Layout } from "./../components/layout/index";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Daily Tasks | Task Highlights</title>
      </Head>
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <TasksCard />
      </div>
    </Layout>
  );
}
