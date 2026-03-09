"use client";

import { useEffect } from "react";

export default function TemplateViewPing({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "view", slug })
    }).catch(() => null);
  }, [slug]);

  return null;
}
