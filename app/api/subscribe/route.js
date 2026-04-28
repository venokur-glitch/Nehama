import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, groupId, fields } = await req.json();

    if (!email || !groupId) {
      return NextResponse.json(
        { error: { message: "Missing email or groupId" } },
        { status: 400 }
      );
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        ...(fields ? { fields } : {}),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: { message: data.message || "MailerLite request failed" } },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true, subscriber: data });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
