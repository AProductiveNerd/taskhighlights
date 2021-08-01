import { FormEvent, useState } from "react";

import Head from "next/head";
import { Layout } from "../components/layout";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { fireAuth } from "../libs/Firebase";
import { useRouter } from "next/router";

export default function SignIn(): JSX.Element {
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await fireAuth.signInWithEmailAndPassword(emailAddress, password);
      router.push("/app");
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Sign In | Task Highlights</title>
          <meta name="description" content="Sign in to Task Highlights" />
          <meta property="og:title" content="Sign in | Task Highlights" />
          <link rel="icon" href="./favicon.ico" />
        </Head>

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl leading-tight font-extrabold text-theme-primary-500">
              Task Highlights
            </h1>

            <h2 className="mt-6 text-center text-xl sm:text-3xl font-semibold text-theme-blueGray-400">
              Sign in to your account
            </h2>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500 text-center font-semibold">
              {error}
            </p>
          )}

          <form className="mt-8 space-y-6" method="POST" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
              </div>
            </div>

            {!isInvalid && (
              <div>
                <button
                  type="submit"
                  aria-label="Sign in"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-theme-primary-500 hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5
										text-theme-coolGray-400
										group-hover:text-theme-coolGray-900"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            )}
          </form>

          <div className="text-base text-center text-theme-blueGray-400">
            {`Don't have an account? `}

            <span className="font-medium hover:text-theme-primary-500 w-max relative cursor-pointer group">
              <Link href="/sign-up">
                <a>
                  Sign Up
                  <div className="-right-1 bottom-0 absolute w-16 h-2 bg-theme-primary-500/40 group-hover:bg-transparent"></div>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
