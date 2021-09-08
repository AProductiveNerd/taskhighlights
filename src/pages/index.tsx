import { Layout } from "../components/layout";
import { SEO_component } from "../components/seo";

const Home = (): JSX.Element => {
  return (
    <Layout>
      <SEO_component
        title="Task Highlights"
        description="A minimalist to-do app that uses accountability to supercharge your productivity"
        openGraph={{
          title: "Task Highlights"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className=" space-y-10 mx-auto px-7 sm:max-w-3xl tracking-tight">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
          Task Highlights
        </h2>

        <h1 className="text-theme-primary-500 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-normal">
          Supercharge your productivity fgds
        </h1>
      </div>
    </Layout>
  );
};

export default Home;
