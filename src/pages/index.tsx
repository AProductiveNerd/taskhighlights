import Head from "next/head";
import { Layout } from "./../components/layout/index";

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Daily Tasks | Task Highlights</title>
			</Head>
			<div className="flex-1 text-4xl flex justify-center items-center text-center">
				<h1>Main tasks display</h1>
			</div>
		</Layout>
	);
}
