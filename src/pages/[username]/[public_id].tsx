import { Layout } from "../../components/layout";
import { PublicCard } from "../../components/public/PublicCard";
import { SEO_component } from "../../components/seo";
import { useState } from "react";

export default function PublicPage(): JSX.Element {
  const [par_title, setParTitle] = useState(null);

  return (
    <Layout>
      <SEO_component
        title={`${par_title ? par_title : "Public Page"} | Task Highlights`}
        description={
          par_title ? `Tasks in ${par_title}` : "Your tasks for the day"
        }
        openGraph={{
          title: `${par_title ? par_title : "Public Page"} | Task Highlights`,
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <div className="z-0 mt-5 flex-1 text-center">
        <PublicCard setParTitle={setParTitle} />
      </div>
    </Layout>
  );
}
