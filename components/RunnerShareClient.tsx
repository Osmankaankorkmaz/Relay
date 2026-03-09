"use client";

import ShareKit from "@/components/ShareKit";

async function postJSON(url: string, data: any) {
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
  }).catch(() => null);
}

export default function RunnerShareClient({ url, slug }: { url: string; slug?: string }) {
  return (
    <ShareKit
      url={url}
      onShare={async () => {
        if (!slug) return;
        await postJSON("/api/analytics", { type: "share", slug });
      }}
    />
  );
}
