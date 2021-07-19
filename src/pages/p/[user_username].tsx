import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Layout } from "../../components/layout/index";
import UserContext from "../../contexts/UserContext";
import { fetch_getUserByUsername } from "../../utils/fetchHelpers";

export default function UserProfile(): JSX.Element {
  const currentUser: User = useContext(UserContext);
  const [profileUser, setProfileUser] = useState<User>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const reqUsername = router.query.user_username.toString();

      const fetchedUser: User = await fetch_getUserByUsername(reqUsername);

      if (JSON.stringify(profileUser) !== JSON.stringify(fetchedUser)) {
        setProfileUser(fetchedUser);
      }
    })();
  }, [profileUser, router.query.user_username]);

  return (
    <Layout>
      <div className="text-4xl flex-1 items-center text-center mt-5">
        <h1>{profileUser?.user_username}</h1>
      </div>
    </Layout>
  );
}
