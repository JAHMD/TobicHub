import PageHeading from "@/components/page-heading";
import TopicsSkeleton from "@/components/topics-skeleton";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsSection from "@/modules/topics/components/topics-section";
import { getTopics } from "@/utils/topic-utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Topics | TopicHub",
  description:
    "Topics page that contains general information about popular topics.",
};

export const revalidate = 0;

export default async function TopicsPage() {
  const topicsPromise = getTopics({ where: { isApproved: true } });

  return (
    <section className="flex w-[800px] max-w-full flex-col gap-10 py-20">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading>all topics</PageHeading>
        <SearchTopic />
      </div>
      <Suspense fallback={<TopicsSkeleton />}>
        <TopicsSection
          topicsPromise={topicsPromise}
          params={{ where: { isApproved: true } }}
        />
      </Suspense>
    </section>
  );
}
