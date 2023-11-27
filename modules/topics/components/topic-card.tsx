"use client";

import CardBadge from "@/components/card-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { TopicType } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ControlMenu from "./control-menu";

type TopicCardProps = {
  topic: TopicType;
  session: Session | null;
};

export default function TopicCard({ topic, session }: TopicCardProps) {
  const userSession = session?.user as UserSessionType;

  const [isApproved, setIsApproved] = useState(topic.approved);

  const updatedAtDate = new Date(topic.updated_at);
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    updatedAtDate
  );

  return (
    <Card
      key={topic.id}
      className="default-shadow mx-auto max-w-full animate-show-card space-y-5"
    >
      <CardHeader className="relative flex flex-row items-center justify-between">
        <div className="flex w-fit flex-wrap items-center gap-4">
          <Link
            href={`/profile/${topic.User.id}`}
            className="flex items-center gap-4"
          >
            <Image
              src={topic.User.image || "/images/avatar.jpg"}
              alt="user image"
              width={500}
              height={500}
              loading="lazy"
              className="h-10 w-10 rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-medium">
                {topic.User.display_name || topic.User.name}
              </h2>
              {!!date && (
                <span className="inline-block text-xs text-muted-foreground">
                  {date}
                </span>
              )}
            </div>
          </Link>
          <CardBadge
            isValid={isApproved}
            inValidLabel="Un Approved"
            validLabel="Approved"
          />
        </div>
        <ControlMenu
          userSession={userSession}
          topic={topic}
          toggleApproved={() => setIsApproved(!isApproved)}
          className="absolute right-6 top-5"
        />
      </CardHeader>
      <CardContent>
        <Link
          href={`/topics/${topic.id}`}
          className="line-clamp-1 w-fit text-xl font-semibold capitalize"
        >
          {topic.title}
        </Link>
        <CardDescription className="mt-2 line-clamp-5 leading-6">
          {topic.description}
        </CardDescription>
        {topic.link && (
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <h3>Recourses:</h3>
            <Link
              href={topic.link}
              className="block w-fit max-w-full truncate text-sky-600"
              target="_blank"
            >
              {topic.link}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
