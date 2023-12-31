import { NewTask } from "@/modules/user/components/tasks/table/add-task";
import prisma from "@/prisma";
import { ParamsType } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const data: NewTask = await request.json();

    await prisma.task.create({ data });
    await prisma.user.update({
      where: { id: data.userId },
      data: { totalTasks: { increment: 1 } },
    });

    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();

  // await prisma.task.deleteMany({
  //   where: {
  //     id: {
  //       in: data.ids,
  //     },
  //   },
  // });

  console.log(data);
};
