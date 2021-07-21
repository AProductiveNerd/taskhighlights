import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout/index";
import { User } from "@prisma/client";
import { user_username } from "../../constants/Types";

export default function UserProfile({
  user: profileUser
}: {
  user: User;
}): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>
          {`${profileUser?.user_fullname} (${profileUser?.user_username})`}
        </title>
        <meta property="og:image" content={`${profileUser?.user_avatar}`} />
      </Head>
      <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
        <div className="flex-1 flex justify-center mt-5">
          <div className="flex items-center space-x-3">
            <div className="relative w-28 h-28">
              {profileUser ? (
                <Image
                  src={profileUser.user_avatar}
                  alt="user-avatar"
                  layout="fill"
                />
              ) : (
                <Skeleton circle={true} height={44} width={44} />
              )}
            </div>
            <div>
              {profileUser ? (
                <>
                  <h1 className="text-4xl">{profileUser.user_username}</h1>
                  <section className="flex justify-center space-x-3">
                    <p>{profileUser.user_followers.length} Followers</p>
                    <p>{profileUser.user_following.length} Following</p>
                  </section>
                  <p>{profileUser.user_fullname}</p>
                  <p>{profileUser.user_bio}</p>
                </>
              ) : (
                <Skeleton count={10} height={20} />
              )}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqUsername = context.query.user_username?.toString();
  if (reqUsername !== undefined) {
    const getUserByUsername = async (
      user_username: user_username
    ): Promise<globalThis.Response> => {
      const data = await fetch(
        // process.env.NODE_ENV === "development"
        // ? `http://localhost:3000/api/v1/user?user_username=${user_username}`
        `${
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        }/api/v1/user?user_username=${user_username}`
      );

      return data;
    };

    const fetchedUser: globalThis.Response = await getUserByUsername(
      reqUsername
    );

    if (fetchedUser.status !== 501) {
      const user: User = await fetchedUser.json();
      return { props: { user } };
      // } else {
      // return {
      // redirect: {
      // destination: "/404",
      // permanent: false
      // }
      // };
    }
  }
};
