import { Layout } from "../components/layout/index";
import { SEO_component } from "../components/seo";
import { TasksCard } from "../components/tasks/TasksCard";

export default function App(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Daily Tasks"
        description="Your tasks for the day"
        openGraph={{
          title: "Daily Tasks"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className="text-4xl flex-1 items-center text-center mt-5">
        <TasksCard />
      </div>
    </Layout>
  );
}
