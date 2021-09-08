import { Layout } from "../components/layout";
import Link from "next/link";
import { SEO_component } from "../components/seo";

export default function Home(): JSX.Element {
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
      <div className="space-y-7 text-center">
        <h1 className="text-8xl w-full h-full flex items-center justify-center">
          Hi! <span className="font-mono">👋🏼</span>
        </h1>
        <p className="text-3xl leading-normal">
          🚧This page is under contruction🚧 <br />
          Please click{" "}
          <Link href="/app">
            <a className="underline hover:text-theme-primary-500">here</a>
          </Link>{" "}
          to go the the main app
        </p>
      </div>
    </Layout>
  );
}
