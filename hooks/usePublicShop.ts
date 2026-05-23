"use client";

import { useCallback, useEffect, useState } from "react";
import { resolvePublicShop } from "@/services/publicShopApi";
import type { PublicShopPayload, ShopStyle } from "@/lib/shop/types";

const STYLE_STORAGE_KEY = "minishop_public_style";

export function getStoredStyle(suffix: string): ShopStyle | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`${STYLE_STORAGE_KEY}:${suffix}`);
  return raw === "style1" || raw === "style2" ? raw : null;
}

export function setStoredStyle(suffix: string, style: ShopStyle) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STYLE_STORAGE_KEY}:${suffix}`, style);
}

export function resolveActiveStyle(
  queryStyle: string | null | undefined,
  suffix: string,
  defaultStyle: ShopStyle
): ShopStyle {
  if (queryStyle === "style1" || queryStyle === "style2") return queryStyle;
  const stored = getStoredStyle(suffix);
  if (stored) return stored;
  return defaultStyle === "style2" ? "style2" : "style1";
}

export function usePublicShop(suffix: string) {
  const [data, setData] = useState<PublicShopPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    setErrorCode(null);
    try {
      const host = typeof window !== "undefined" ? window.location.host : undefined;
      const result = await resolvePublicShop(suffix, host);
      if (!result.success) {
        setError(result.error.message);
        setErrorCode(result.error.code ?? "ERROR");
        setData(null);
      } else {
        setData(result.data);
      }
    } catch {
      setError("Network error. Please try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [suffix]);

  useEffect(() => {
    let cancelled = false;

    async function fetchShop() {
      setLoading(true);
      setError(null);
      setErrorCode(null);
      try {
        const host = typeof window !== "undefined" ? window.location.host : undefined;
        const result = await resolvePublicShop(suffix, host);
        if (cancelled) return;
        if (!result.success) {
          setError(result.error.message);
          setErrorCode(result.error.code ?? "ERROR");
          setData(null);
        } else {
          setData(result.data);
        }
      } catch {
        if (cancelled) return;
        setError("Network error. Please try again.");
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchShop();
    return () => {
      cancelled = true;
    };
  }, [suffix]);

  return { data, loading, error, errorCode, reload };
}
