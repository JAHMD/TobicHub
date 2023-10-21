import ComponentLoader from "@/components/component-loader";
import TopicsList from "@/components/topics/topics-list";
import { ProfileCard } from "@/components/user/profile-card";
import { ParamsType } from "@/types";
import { getUser, getUsers } from "@/utils/user-utils";
import { Metadata } from "next";
import React, { Suspense } from "react";

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
		title: `TopicHub | ${user?.name}`,
		description: `${user?.name} profile page.`,
	};
};

export const generateStaticParams = async () => {
	const users = await getUsers();

	if (!users) {
		return [];
	}

	return users.map((user) => ({ id: user._id }));
};

const Profile = async ({ params: { id } }: ParamsType) => {
	const user = await getUser(id);

	return (
		<section className="flex flex-col gap-20">
			<ProfileCard user={user} />
			<div className="flex flex-col gap-12">
				<h1 className="text-2xl tracking-wider font-bold  w-fit">Topics</h1>
				<Suspense fallback={<ComponentLoader />}>
					<TopicsList userId={id} />
				</Suspense>
			</div>
		</section>
	);
};

export default Profile;
