import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Useful_Todo, User_Story_Todo } from "../../constants/Types";
import { useContext, useEffect, useState } from "react";

import Avatar from "react-nice-avatar";
import FireUserContext from "../../contexts/FireUserContext";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Layout } from "../../components/layout/index";
import { SEO_component } from "../../components/seo";
import { StoryCard } from "../../components/stories/StoryCard";
import { prisma_getUserByUsername } from "../../utils/prismaHelpers";

export default function UserProfile({
  user: profileUser
}: {
  user: User_Story_Todo;
}): JSX.Element {
  const story_and_todos = profileUser.User_Story;
  const fireId = useContext(FireUserContext);
  const [loggedInSame, setLoggedInSame] = useState(false);
  const main: Useful_Todo[] = [];

  story_and_todos.map((story_with_todo) => {
    story_with_todo.Story_Todo.map((todo) => main.push(todo));
  });

  useEffect(() => {
    if (fireId === profileUser.user_id) {
      setLoggedInSame(true);
    }
  }, [fireId, profileUser.user_id]);

  return (
    <Layout>
      <Head>
        <SEO_component
          description={profileUser.user_bio}
          openGraph={{
            profile: {
              firstName: profileUser.user_fullname
                .split(" ")
                .slice(0, -1)
                .join(" "),
              lastName: profileUser.user_fullname
                .split(" ")
                .slice(-1)
                .join(" "),
              username: profileUser.user_username
            }
          }}
          title={profileUser.user_username}
          twitter={{
            cardType: "app",
            handle: profileUser.user_twitter_handle
          }}
        />
      </Head>

      <SkeletonTheme color="#0F172A" highlightColor="#1E293B">
        <div className="flex-1 flex justify-center mt-5 pb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-28 h-28">
              {profileUser ? (
                <Avatar className="w-28 h-28" {...profileUser.user_avatar} />
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

      <StoryCard todos={main} loggedInSame={loggedInSame} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqUsername = context.query.user_username?.toString();

  if (reqUsername !== undefined) {
    const today: string = new Date(
      new Date().setDate(new Date().getDate())
    ).toLocaleDateString("en-GB");

    const fetchedUser: User_Story_Todo = await prisma_getUserByUsername(
      reqUsername,
      today
    );

    if (fetchedUser) {
      return {
        props: { user: JSON.parse(JSON.stringify(fetchedUser)) }
      };
    } else {
      return {
        redirect: {
          destination: "/404",
          permanent: false
        }
      };
    }
  }
};
