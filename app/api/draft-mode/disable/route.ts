import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo/site-url";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(
    new URL("/", SITE_URL),
  );
}
