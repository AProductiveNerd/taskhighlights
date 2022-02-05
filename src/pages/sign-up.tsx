import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";
import { FormEvent, useContext, useEffect, useState } from "react";

import FireUserContext from "../contexts/FireUserContext";
import { Layout } from "../components/layout";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { SEO_component } from "../components/seo";
import { auth } from "../libs/Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { fetch_createUser } from "../utils/fetchHelpers";
import { make_json_string } from "../utils/generalHelpers";
import { useRouter } from "next/router";

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const fireId = useContext(FireUserContext);

  const config = genConfig();

  const [user_username, setUsername] = useState("");
  const [user_fullname, setfullname] = useState("");
  const [user_email, setemailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [user_avatar, setAvatar] = useState<Required<AvatarFullConfig>>(config);
  const [error, setError] = useState("");

  const isInvalid =
    password === "" ||
    user_email === "" ||
    user_fullname === "" ||
    user_username === "";

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    if (make_json_string(user_avatar) !== "") {
      try {
        const fireAuthUser = await createUserWithEmailAndPassword(
          auth,
          user_email,
          password
        );

        await fetch_createUser({
          user_avatar,
          user_email,
          user_fullname,
          user_username,
          user_id: fireAuthUser?.user?.uid,
        });

        router.push("/app");
      } catch (e: any) {
        setfullname("");
        setemailaddress("");
        setPassword("");
        setError(e.message);
      }
    } else {
      setUsername("");
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
          title="Sign Up | Task Highlights"
          description="Create an account"
          openGraph={{
            title: "Sign Up | Task Highlights",
          }}
          twitter={{
            cardType: "summary",
          }}
        />
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold leading-tight text-theme-primary-500 sm:text-7xl">
              Task Highlights
            </h1>

            <h2 className="mt-6 text-center text-xl font-semibold text-theme-blueGray-400 sm:text-3xl">
              Sign up
            </h2>
          </div>

          {error && (
            <p className="mb-4 text-center text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSignUp}
          >
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full Name
                </label>

                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-theme-primary-500 focus:outline-none focus:ring-theme-primary-500 sm:text-sm"
                  placeholder="Full Name"
                  onChange={({ target }) => setfullname(target.value)}
                  value={user_fullname}
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-theme-primary-500 focus:outline-none focus:ring-theme-primary-500 sm:text-sm"
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                  value={user_username}
                />
              </div>

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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-theme-primary-500 focus:outline-none focus:ring-theme-primary-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={({ target }) =>
                    setemailaddress(target.value.toLowerCase())
                  }
                  value={user_email}
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

            <div className="flex flex-col items-center justify-between space-y-3 text-center text-sm">
              <button
                type="button"
                name="Generate avatar"
                onClick={() => setAvatar(genConfig())}
                className="h-11 w-full rounded border bg-white font-bold text-theme-primary-600 hover:text-theme-primary-700"
              >
                Generate avatar
              </button>

              <div>
                <Avatar className="h-32 w-32" {...user_avatar} />
              </div>
            </div>

            {!isInvalid && make_json_string(user_avatar) !== "" && (
              <div>
                <button
                  aria-label="Sign up"
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-theme-primary-500 py-2 px-4 text-base font-medium text-white hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="text-theme-coolGray-400 group-hover:text-theme-coolGray-900 h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  Sign up
                </button>
              </div>
            )}

            <div className="text-center text-base text-theme-blueGray-400">
              {`Already have an account? `}

              <span className="relative w-max cursor-pointer border-theme-primary-500 font-medium hover:border-b-2">
                <Link href="/log-in">
                  <a>Log In</a>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
