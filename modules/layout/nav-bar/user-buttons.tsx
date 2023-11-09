"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type UserButtonsProps = {
  onClose?: () => void;
  userSession: UserSessionType;
};

const UserButtons = ({ userSession, onClose }: UserButtonsProps) => {
  const { toast } = useToast();

  return (
    <>
      {userSession ? (
        <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
          <CustomAlertDialog
            action={async () => {
              onClose?.();
              await signOut({ callbackUrl: process.env.NEXTAUTH_URL! });
              toast({ title: "Signed out successfully." });
            }}
            variant="outline"
            title="Sign out"
            description="Are you sure that you want to sign out?"
            className="w-full"
          />
          <Link
            href={`/profile/${userSession?.id}`}
            onClick={onClose}
            className="inline-block"
            title={userSession?.name}
          >
            <Avatar>
              <Image
                priority
                src={
                  userSession?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                }
                alt="user"
                width={40}
                height={40}
                className="h-auto w-auto rounded-full border-2 bg-muted"
              />

              <AvatarFallback>{userSession?.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <Link
          onClick={onClose}
          href="/register"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full"
          )}
        >
          Sign in
        </Link>
      )}
    </>
  );
};

export default UserButtons;