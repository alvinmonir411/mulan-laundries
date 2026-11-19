"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LIVE_SYNC_CHANNEL, LIVE_SYNC_STORAGE_KEY } from "@/lib/liveSync";

export function LiveSiteListener() {
  const router = useRouter();
  const lastVersionRef = useRef<string | null>(null);
  const isRefreshingRef = useRef(false);

  const triggerRefresh = () => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    try {
      router.refresh();
    } finally {
      setTimeout(() => {
        isRefreshingRef.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    // 1. Instant Same-Browser Sync via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel(LIVE_SYNC_CHANNEL);
        channel.onmessage = (event) => {
          if (event.data?.type) {
            triggerRefresh();
          }
        };
      }
    } catch (e) {
      console.warn("[LIVE SYNC] BroadcastChannel not available", e);
    }

    // 2. Storage event fallback
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LIVE_SYNC_STORAGE_KEY && e.newValue) {
        triggerRefresh();
      }
    };
    window.addEventListener("storage", handleStorage);

    // 3. Cross-device & cross-browser background check via /api/site-sync
    const checkServerVersion = async () => {
      if (typeof document !== "undefined" && document.hidden) return;
      try {
        const res = await fetch("/api/site-sync", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.latestVersion) {
          if (lastVersionRef.current === null) {
            lastVersionRef.current = data.latestVersion;
          } else if (data.latestVersion !== lastVersionRef.current) {
            lastVersionRef.current = data.latestVersion;
            triggerRefresh();
          }
        }
      } catch (err) {
        // Silent network failure
      }
    };

    // Initial check delayed to avoid competing with critical first paint
    const initialTimer = setTimeout(checkServerVersion, 5000);

    // Check periodically in background without hammering mobile CPU (every 30s)
    const interval = setInterval(checkServerVersion, 30000);

    // Check immediately when user refocuses the tab
    const handleVisibility = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        checkServerVersion();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", checkServerVersion);

    return () => {
      clearTimeout(initialTimer);
      if (channel) {
        try {
          channel.close();
        } catch {}
      }
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", checkServerVersion);
    };
  }, [router]);

  return null;
}
