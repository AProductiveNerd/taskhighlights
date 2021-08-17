import { HabitCard } from "../components/habits/HabitCard";
import { Layout } from "../components/layout";

export default function Routines(): JSX.Element {
  return (
    <Layout>
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <HabitCard />
      </div>
    </Layout>
  );
}
