import Image from "next/image";
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
          title: "Task Highlights",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="mx-auto mt-5 flex flex-1 flex-col space-y-10 px-7 text-center sm:max-w-3xl">
        <h1 className="mt-20 break-words text-5xl font-extrabold leading-none tracking-tight text-theme-blueGray-300 sm:text-7xl">
          Supercharge productivity
        </h1>

        <div className="space-y-10">
          <div className="relative z-0 mx-auto h-72 justify-center">
            <Image
              src="/images/tasks-card_app-page.png"
              alt="desktop_app-page"
              className="object-contain"
              layout="fill"
            />
          </div>

          <Link href="/sign-up">
            <a
              title="Get Started"
              aria-label="Get Started"
              className="
              inline-flex justify-center
              rounded-md bg-theme-primary-500
              px-3.5
              py-3.5
              font-bold
              text-theme-blueGray-900 hover:bg-opacity-90 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white
              focus-visible:ring-opacity-75
              "
            >
              Get Started
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
