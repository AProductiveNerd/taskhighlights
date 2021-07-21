import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout/index";
import { Response } from "node-fetch";
import { User } from "@prisma/client";
import { fetch_getUserByUsername } from "../../utils/fetchHelpers";
import { useRouter } from "next/router";

export default function UserProfile(): JSX.Element {
  const [profileUser, setProfileUser] = useState<User>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const reqUsername = router.query.user_username?.toString();
      if (reqUsername !== undefined) {
        const fetchedUser: Response = await fetch_getUserByUsername(
          reqUsername
        );

        if (fetchedUser.status !== 501) {
          const data: User = await fetchedUser.json();

          if (JSON.stringify(profileUser) !== JSON.stringify(data)) {
            setProfileUser(data);
          }
        } else {
          router.push("/404");
        }
      }
    })();
  }, [profileUser, router, router.query.user_username]);

  return (
    <Layout>
      <Head>
        <title>
          {`${profileUser?.user_fullname} (${profileUser?.user_username})`}
        </title>
        <meta property="og:image" content={profileUser?.user_avatar} />
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
