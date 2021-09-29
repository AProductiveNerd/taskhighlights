import { useEffect, useState } from "react";

import { Layout } from "../../components/layout/index";
import { PageCard } from "../../components/page/PageCard";
import { SEO_component } from "../../components/seo";
import { useRouter } from "next/router";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [par_title, setParTitle] = useState("");

  useEffect(() => {
    setParTitle(router.query.title?.toString());
  }, [router]);

  return (
    <Layout>
      <SEO_component
        title={`${par_title ? par_title : "Daily Tasks"} | Task Highlights`}
        description={
          par_title ? `Tasks in ${par_title}` : "Your tasks for the day"
        }
        openGraph={{
          title: `${par_title ? par_title : "Daily Tasks"} | Task Highlights`
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className="flex-1 text-center mt-5 z-0">
        <PageCard title={par_title} />
      </div>
    </Layout>
  );
}
