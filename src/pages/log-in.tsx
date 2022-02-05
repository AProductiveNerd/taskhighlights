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

        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold leading-tight text-theme-primary-500 sm:text-7xl">
              Task Highlights
            </h1>

            <h2 className="mt-6 text-center text-xl font-semibold text-theme-blueGray-400 sm:text-3xl">
              Log In to your account
            </h2>
          </div>

          {error && (
            <p className="mb-4 text-center text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <form className="mt-8 space-y-6" method="POST" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
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
                  className="relative block w-full appearance-none rounded-none rounded-t border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-theme-primary-500 focus:outline-none focus:ring-theme-primary-500 sm:text-sm"
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
                  className="relative block w-full appearance-none rounded-none rounded-b border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-theme-primary-500 focus:outline-none focus:ring-theme-primary-500 sm:text-sm"
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
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-theme-primary-500 py-2 px-4 text-base font-medium text-white hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="text-theme-coolGray-400 group-hover:text-theme-coolGray-900 h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  Log In
                </button>
              </div>
            )}
          </form>

          <div className="text-center text-base text-theme-blueGray-400">
            {`Don't have an account? `}

            <span className="relative w-max cursor-pointer border-theme-primary-500 font-medium hover:border-b-2">
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
