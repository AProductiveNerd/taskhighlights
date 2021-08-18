import { Layout } from "../components/layout";
import { RoutineCard } from "../components/routines/RoutineCard";

export default function Routine(): JSX.Element {
  return (
    <Layout>
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <RoutineCard />
      </div>
    </Layout>
  );
}
