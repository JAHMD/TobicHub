import { authOptions } from "@/app/api/auth/options";
import AddTopic from "@/app/dashboard/components/add-topic";
import PageHeading from "@/components/page-heading";
import TopicsSkeleton from "@/components/topics-skeleton";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsSection from "@/modules/topics/components/topics-section";
import { getUser } from "@/modules/user/services/profile-services";
import { UserSessionType } from "@/modules/user/types";
import { ParamsType } from "@/shared/types";
import { getTopics } from "@/utils/topic-utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
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

export default async function UserTopicsPage({ params }: ParamsType) {
  const topicsPromise = getTopics({
    where: { authorId: params.id, isApproved: true },
  });

  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType | undefined;

  return (
    <section className="relative flex w-[800px] max-w-full flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <SearchTopic userId={params.id} />
          <AddTopic userId={params.id} userSession={userSession} />
        </div>
        <Suspense fallback={<TopicsSkeleton />}>
          <TopicsSection
            topicsPromise={topicsPromise}
            params={{ where: { authorId: params.id, isApproved: true } }}
          />
        </Suspense>
      </div>
    </section>
  );
}

UserTopicsPage;
