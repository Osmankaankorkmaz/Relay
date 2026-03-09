export function buildShareUrl(basePath: string, opts?: { ref?: string; utm?: string }) {
  const params = new URLSearchParams();
  if (opts?.ref) params.set("ref", opts.ref);
  if (opts?.utm) params.set("utm", opts.utm);

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
