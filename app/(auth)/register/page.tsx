import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserType } from "@/components/nav-bar/user-buttons";
import { RegisterForm } from "@/components/register-form";
import { User } from "@/models/User";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Register",
	description: "TopicHub register page.",
};

export default async function RegisterPage() {
	const session = await getServerSession(authOptions);

	if (session && session.user) {
		const user = session.user as UserType;
		const userId = user.id as string;

		redirect(`/profile/${userId}`);
	}

	return (
		<section className="flex items-center justify-center">
			<RegisterForm />
		</section>
	);
}
