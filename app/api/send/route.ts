import EmailTemplate from "@/emails/EmailTemplate";
import { EmailRequestBodyType } from "@/emails/types";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { sender, receiver, subject, message }: EmailRequestBodyType =
    await request.json();

  try {
    const { data } = await resend.emails.send({
      from: "TopicHub <onboarding@resend.dev>",
      to: receiver,
      reply_to: sender,
      subject,
      text: message,
      react: React.createElement(EmailTemplate, { subject, sender, message }),
    });

    if (data?.id) {
      return NextResponse.json(
        { message: "Message sent successfully.", ...data },
        { status: 200, statusText: "success" }
      );
    } else {
      return NextResponse.json({ ...data }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
