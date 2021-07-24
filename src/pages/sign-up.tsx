import { FormEvent, useState } from "react";

import { AvatarGenerator } from "random-avatar-generator";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/layout";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { fetch_createUser } from "../utils/fetchHelpers";
import { fireAuth } from "../libs/Firebase";
import { useRouter } from "next/router";

export default function SignUp(): JSX.Element {
  const generator = new AvatarGenerator();
  const router = useRouter();

  const [user_username, setUsername] = useState("");
  const [user_fullname, setfullname] = useState("");
  const [user_email, setemailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [user_avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    password === "" ||
    user_email === "" ||
    user_fullname === "" ||
    user_username === "";

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    if (user_avatar !== "") {
      try {
        const fireAuthUser = await fireAuth.createUserWithEmailAndPassword(
          user_email,
          password
        );

        await fireAuthUser.user.updateProfile({
          displayName: user_username
        });
    
        await fetch_createUser({
          user_avatar,
          user_email,
          user_fullname,
          user_username,
          user_id: fireAuthUser?.user?.uid
        });

        router.push("/");
      } catch (error) {
        setfullname("");
        setemailaddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      user_avatar === "" && setError("Please choose an avatar");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Sign up | Task Highlights</title>
          <meta name="description" content="Sign up for Task Highlights" />
          <meta property="og:title" content="Sign up | Task Highlights" />
          <link rel="icon" href="./favicon.ico" />
        </Head>

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl leading-tight font-extrabold text-theme-primary-500">
              Task Highlights
            </h1>

            <h2 className="mt-6 text-center text-xl sm:text-3xl font-semibold text-theme-blueGray-400">
              Sign up
            </h2>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500 text-center font-semibold">
              {error}
            </p>
          )}

          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSignUp}
          >
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none rounded-t relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={({ target }) =>
                    setUsername(target.value.toLowerCase())
                  }
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none rounded-b relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
              </div>
            </div>

            <div className="text-sm text-center flex justify-between flex-col items-center space-y-3">
              <button
                type="button"
                name="Generate avatar"
                onClick={() => setAvatar(generator.generateRandomAvatar())}
                className="bg-white text-theme-primary-600 hover:text-theme-primary-700 w-full rounded h-11 font-bold border"
              >
                Generate avatar
              </button>

              <div>
                {user_avatar !== "" ? (
                  <Image
                    alt="avatar"
                    width={250}
                    height={250}
                    src={user_avatar}
                  />
                ) : null}
              </div>
            </div>

            {!isInvalid && user_avatar !== "" && (
              <div>
                <button
                  aria-label="Sign up"
                  type="submit"
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
                  Sign up
                </button>
              </div>
            )}

            <div className="text-base text-center text-theme-blueGray-400">
              {`Already have an account? `}

              <span className="font-medium hover:text-theme-primary-500 w-max relative cursor-pointer group">
                <Link href="/sign-in">
                  <a>
                    Sign In
                    <div className="-right-1 bottom-0 absolute w-14 h-2 bg-theme-primary-500/40 group-hover:bg-transparent"></div>
                  </a>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
