export function getDefaultAppDomain(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  try {
    return new URL(url).host;
  } catch {
    return "localhost:3000";
  }
}

export function buildPublicShopUrl(domain: string, suffix: string): string {
  const host = domain.includes("://") ? domain : `https://${domain}`;
  const base = host.endsWith("/") ? host.slice(0, -1) : host;
  return `${base}/t/${suffix}`;
}
