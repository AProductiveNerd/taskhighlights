import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import { getUserByUsername } from "./../utils/index";
import { fireAuth } from "../libs/Firebase";
import { users } from "@prisma/client";
import axios from "axios";

export default function SignUp() {
	const generator = new AvatarGenerator();
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [fullname, setfullname] = useState("");
	const [emailaddress, setemailaddress] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");
	const [error, setError] = useState("");
	const isInvalid =
		password === "" ||
		emailaddress === "" ||
		fullname === "" ||
		username === "";

	const handleSignUp = async (event) => {
		event.preventDefault();

		if (avatar !== "") {
			try {
				const createdUser =
					await fireAuth.createUserWithEmailAndPassword(
						emailaddress,
						password
					);

				await createdUser.user.updateProfile({
					displayName: username,
				});

				const datecreated = new Date().toISOString();

				const pgUser: users = await axios.post("/api/users", {
					avatar,
					datecreated,
					emailaddress: createdUser.user.email,
					fullname,
					lastseen: datecreated,
					userid: createdUser.user.uid,
					username,
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
			avatar === "" && setError("Please choose an avatar");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-theme-blueGray-900 py-12 px-4 sm:px-6 lg:px-8">
			<Head>
				<title>Sign up | Task Highlights</title>
			</Head>
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-7xl leading-tight font-extrabold text-theme-primary-500">
						Task Highlights
					</h1>
					<h2 className="mt-6 text-center text-3xl font-semibold text-theme-blueGray-400">
						Sign up to your account
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
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="fullname"
								name="fullname"
								type="text"
								autoComplete="name"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
								placeholder="Full Name"
								onChange={({ target }) =>
									setfullname(target.value)
								}
								value={fullname}
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								onChange={({ target }) =>
									setUsername(target.value.toLowerCase())
								}
								value={username}
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								onChange={({ target }) =>
									setemailaddress(target.value.toLowerCase())
								}
								value={emailaddress}
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-theme-primary-500 focus:border-theme-primary-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								onChange={({ target }) =>
									setPassword(target.value)
								}
								value={password}
							/>
						</div>
					</div>

					<div className="text-sm text-center flex justify-between flex-col items-center space-y-3">
						<button
							type="button"
							onClick={() =>
								setAvatar(generator.generateRandomAvatar())
							}
							className="bg-white text-theme-primary-600 hover:text-theme-primary-700 w-full rounded h-11 font-bold border"
						>
							Generate avatar
						</button>
						<div>
							{avatar !== "" ? (
								<Image
									alt="avatar"
									width={250}
									height={250}
									src={avatar}
								/>
							) : null}
						</div>
					</div>

					{!isInvalid && avatar !== "" && (
						<div>
							<button
								type="submit"
								// onClick={() => handleSignUp}
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
						<p>
							{`Already have an account? `}
							<span className="font-medium hover:text-theme-primary-500 w-max relative cursor-pointer group">
								<Link href="/sign-in">Sign In</Link>
								<div className="-right-1 bottom-0 absolute w-14 h-2 bg-theme-primary-700/40 group-hover:bg-transparent"></div>
							</span>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
