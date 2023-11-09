import BackButton from "@/components/back-button";
import ComponentLoader from "@/components/component-loader";
import NotFound from "@/components/not-found";
import TopicsList from "@/modules/topics/components/topics-list";
import ProfileCard from "@/modules/user/components/profile-card";
import { ParamsType } from "@/shared/types";
import { getUser, getUsers } from "@/utils/user-utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const user = await getUser(id);

  if (!user) {
    return {
      title: "Unknown user",
      description: `Unknown profile page.`,
    };
  }

  return {
    title: `${user?.name} | TopicHub`,
    description: `${user?.name} profile page.`,
  };
};

export const generateStaticParams = async () => {
  const users = await getUsers();

  if (!users) {
    return [];
  }

  return users.map((user) => ({ id: user.id }));
};

export const revalidate = 0;

const Profile = async ({ params: { id } }: ParamsType) => {
  const user = await getUser(id);

  if (!user) {
    return <NotFound message="Couldn't get user's data." />;
  }

  return (
    <section className="flex flex-col">
      <BackButton />
      <ProfileCard user={user} />
      <div className="mt-20 flex flex-col gap-12">
        <h1 className="w-fit text-2xl font-bold  tracking-wider">Topics</h1>
        <Suspense fallback={<ComponentLoader />}>
          <TopicsList type="user" userId={id} />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
