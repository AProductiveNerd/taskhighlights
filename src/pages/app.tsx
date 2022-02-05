import { Layout } from "../components/layout/index";
import { SEO_component } from "../components/seo";
import { TasksCard } from "../components/tasks/TasksCard";

export default function App(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Daily Tasks | Task Highlights"
        description="Your tasks for the day"
        openGraph={{
          title: "Daily Tasks | Task Highlights",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="mt-5 flex-1 text-center">
        <TasksCard />
      </div>
    </Layout>
  );
}
