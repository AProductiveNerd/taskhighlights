import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext, useEffect, useState } from "react";

import Avatar from "react-nice-avatar";
import FireUserContext from "../../contexts/FireUserContext";
import { GetServerSideProps } from "next";
import { Layout } from "../../components/layout/index";
import { SEO_component } from "../../components/seo";
import { StoryCard } from "../../components/stories/StoryCard";
import { Todo } from "@prisma/client";
import { User_Story_Todo } from "../../constants/Types";
import { make_json_string } from "../../utils/generalHelpers";
import { prisma_getUserByUsername } from "../../utils/prismaHelpers";

export default function UserProfile({
  user: profileUser,
}: {
  user: User_Story_Todo;
}): JSX.Element {
  const type_Story_and_Todos = profileUser.User_Story;
  const fireId = useContext(FireUserContext);
  const [loggedInSame, setLoggedInSame] = useState(false);
  const main: Todo[] = [];

  type_Story_and_Todos.map((story_with_todo) => {
    story_with_todo.Story_Todo.map((todo) => main.push(todo));
  });

  useEffect(() => {
    if (fireId === profileUser.user_id) {
      setLoggedInSame(true);
    }
  }, [fireId, profileUser.user_id]);

  return (
    <Layout>
      <SEO_component
        title={`${profileUser.user_username} | Task Highlights`}
        description={profileUser.user_bio}
        openGraph={{
          title: `${profileUser.user_username} | Task Highlights`,
          profile: {
            firstName: profileUser.user_fullname
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: profileUser.user_fullname.split(" ").slice(-1).join(" "),
            username: profileUser.user_username,
          },
        }}
        twitter={{
          cardType: "summary",
          handle: profileUser.user_twitter_handle,
        }}
      />

      <div className="flex flex-1 flex-col">
        <SkeletonTheme baseColor="#0F172A" highlightColor="#1E293B">
          <div className="mt-5 flex flex-1 justify-center pb-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-28 w-28">
                {profileUser ? (
                  <Avatar className="h-28 w-28" {...profileUser.user_avatar} />
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
                      <p>Streak {profileUser.user_streak} </p>
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
      </div>
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
        props: { user: JSON.parse(make_json_string(fetchedUser)) },
      };
    } else {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
};
