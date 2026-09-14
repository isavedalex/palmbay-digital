"use client";

import { useEffect } from "react";

/** One-time letter-scan beacon per tab, mirroring the coldsite preview's ScanBeacon. */
export function NewCoBeacon({ companyNumber, business }: { companyNumber: string; business: string }) {
  useEffect(() => {
    if (!companyNumber) return;
    const key = `newco-scan-sent:${companyNumber}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch("/api/newco-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyNumber, business }),
      keepalive: true,
    }).catch(() => {});
  }, [companyNumber, business]);
  return null;
}
