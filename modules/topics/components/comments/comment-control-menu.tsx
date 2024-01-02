"use client";

import { deleteComment } from "@/actions/topics/comment-actions";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Comment, Topic } from "../../types";
import UpdateComment from "./update-comment";

type CommentControlMenuProps = {
  userSession: UserSessionType;
  topic: Topic;
  comment: Comment;
  className?: string;
};

export default function CommentControlMenu({
  userSession,
  topic,
  comment,
  className,
}: CommentControlMenuProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasControl =
    userSession &&
    (userSession?.id === topic.author.id ||
      userSession.id === comment.userId ||
      userSession?.admin);

  const handleCommentDelete = async () => {
    setIsLoading(true);

    await deleteComment({
      commentId: comment.id,
      topicId: topic.id,
    });

    toast({
      title: "Comment has been deleted.",
    });

    setIsDropdownOpen(false);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <>
      {hasControl && (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setIsDropdownOpen(true)}
              className={cn("h-fit w-fit px-2", className)}
              variant="ghost"
              aria-label="options"
            >
              <MoreHorizontal size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[170px]"
            onInteractOutside={(e) => {
              if (isLoading) {
                e.preventDefault();
              }
            }}
          >
            <Dialog>
              <DialogTrigger asChild className="w-full">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-10">
                <DialogHeader className="space-y-1">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={comment.user.image || "/images/avatar.png"}
                        alt="user image"
                        width={400}
                        height={400}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">{comment.user.name}</span>
                      <span className="text-xs">
                        {comment.createdAt.toDateString()}
                      </span>
                    </div>
                  </div>
                </DialogHeader>
                <UpdateComment comment={comment} />
              </DialogContent>
            </Dialog>
            <CustomAlertDialog
              action={handleCommentDelete}
              title="Delete"
              variant="ghost"
              description="This action cannot be undone. Are you sure that you want to delete this topic?"
              className="text-red-600 hover:bg-red-600 hover:text-white"
              disabled={isLoading}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}