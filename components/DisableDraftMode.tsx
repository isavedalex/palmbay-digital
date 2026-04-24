"use client";

import Link from "next/link";

export function DisableDraftMode() {
  return (
    <Link
      href="/api/draft-mode/disable"
      prefetch={false}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg"
    >
      Exit preview
    </Link>
  );
}
