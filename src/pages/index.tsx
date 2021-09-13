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
          title: "Task Highlights"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className="flex-1 flex flex-col mx-auto sm:max-w-3xl mt-5 px-7 text-center space-y-10">
        <h1 className="text-theme-blueGray-300 mt-20 break-words text-4xl tracking-tight sm:text-7xl font-extrabold leading-tight">
          Supercharge productivity
        </h1>

        <div className="space-y-10">
          <div className="h-72 relative justify-center mx-auto z-0">
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
              px-3.5 py-3.5
              text-theme-primary-500
              rounded-md
              bg-black bg-opacity-20 filter backdrop-blur-3xl
              hover:bg-opacity-30 focus:outline-none focus-visible:ring-2
              focus-visible:ring-white focus-visible:ring-opacity-75
              font-bold
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
