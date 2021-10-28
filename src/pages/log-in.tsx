import { FormEvent, useContext, useEffect, useState } from "react";

import FireUserContext from "../contexts/FireUserContext";
import { Layout } from "../components/layout";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { SEO_component } from "../components/seo";
import { auth } from "../libs/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function LogIn(): JSX.Element {
  const fireId = useContext(FireUserContext);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      router.push("/app");
    } catch (e: any) {
      setEmailAddress("");
      setPassword("");
      setError(e.message);
    }
  };

  useEffect(() => {
    if (fireId) {
      router.push("/app");
    }
  }, [fireId, router]);

  return (
    <Layout>
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SEO_component
          title="Log In | Task Highlights"
          description="Log In to Task Highlights"
          twitter={{
            cardType: "summary",
          }}
          openGraph={{
            title: "Log In | Task Highlights",
          }}
        />

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl leading-tight font-extrabold text-theme-primary-500">
              Task Highlights
            </h1>

            <h2 className="mt-6 text-center text-xl sm:text-3xl font-semibold text-theme-blueGray-400">
              Log In to your account
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
                  aria-label="Log In"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-theme-primary-500 hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-theme-coolGray-400 group-hover:text-theme-coolGray-900"
                      aria-hidden="true"
                    />
                  </span>
                  Log In
                </button>
              </div>
            )}
          </form>

          <div className="text-base text-center text-theme-blueGray-400">
            {`Don't have an account? `}

            <span className="font-medium hover:border-b-2 border-theme-primary-500 w-max relative cursor-pointer">
              <Link href="/sign-up">
                <a>Sign Up</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
