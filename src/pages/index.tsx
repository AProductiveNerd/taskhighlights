import { Layout } from "../components/layout";
import Link from "next/link";
import { SEO_component } from "../components/seo";

const Home = (): JSX.Element => {
  return (
    <Layout>
      <SEO_component
        title="Task Highlights"
        description="A to-do app that uses accountability to supercharge your productivity"
        openGraph={{
          title: "Task Highlights"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <Link href="/app">
        <a className="group space-y-10 mx-auto px-7 sm:max-w-3xl tracking-tight text-center">
          <h1 className="text-theme-primary-500 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-normal group-hover:underline">
            Supercharge your productivity
          </h1>
        </a>
      </Link>
    </Layout>
  );
};

export default Home;
