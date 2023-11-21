import RefreshButton from "@/components/refresh-button";
import { Separator } from "@/components/ui/separator";
import DashboardSideNav from "@/modules/dashboard/components/dashboard-side-nav";
import { UserSessionType } from "@/modules/user/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/options";

export const metadata: Metadata = {
  title: "Dashboard | TopicHub",
  description: "The website dashboard.",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionType;

  if (!user?.admin || !user?.owner) {
    redirect("/");
  }

  return (
    <section className="w-full space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Users and topics management dashboard.
        </p>
      </div>
      <Separator className="my-8" />
      <section className="relative flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <RefreshButton className="absolute right-0 top-8 lg:top-0" />
        <DashboardSideNav />

        {children}
      </section>
    </section>
  );
}
