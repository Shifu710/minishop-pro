export const RESERVED_SUFFIXES = new Set([
  "admin",
  "api",
  "login",
  "dashboard",
  "static",
  "assets",
  "public",
  "user",
  "users",
  "system",
  "settings",
]);

const SUFFIX_REGEX = /^[a-zA-Z0-9_-]{3,50}$/;

export function validateSuffix(suffix: string): { valid: boolean; error?: string } {
  const normalized = suffix.trim();
  if (!normalized) {
    return { valid: false, error: "Suffix is required." };
  }
  if (!SUFFIX_REGEX.test(normalized)) {
    return {
      valid: false,
      error: "Suffix must be 3-50 characters and contain only letters, numbers, hyphens, or underscores.",
    };
  }
  if (RESERVED_SUFFIXES.has(normalized.toLowerCase())) {
    return { valid: false, error: "This suffix is reserved." };
  }
  return { valid: true };
}

export function validateDomain(domain: string): { valid: boolean; error?: string } {
  const normalized = domain.trim().toLowerCase();
  if (!normalized) {
    return { valid: false, error: "Domain is required." };
  }
  const domainRegex =
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$|^localhost(?::\d+)?$/;
  if (!domainRegex.test(normalized)) {
    return { valid: false, error: "Invalid domain format." };
  }
  return { valid: true };
}

export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  return host.split(":")[0].toLowerCase();
}
