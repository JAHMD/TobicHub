import BackButton from "@/components/back-button";
import TopicsSection from "@/modules/topics/components/topics-section";
import React from "react";

type Props = {
  searchParams: { q: string };
};

export const revalidate = 0;

export default function SearchPage({ searchParams: { q } }: Props) {
  return (
    <section className="flex flex-col gap-8">
      <BackButton />
      <TopicsSection title={`Results for ${q}`} query={q} type="search" />
    </section>
  );
}
