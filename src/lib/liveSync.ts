/**
 * Real-time Zero-Reload Cross-Tab Sync Helper
 * Uses modern BroadcastChannel API + localStorage Ping for instant DOM updates
 */

export const LIVE_SYNC_CHANNEL = "mulan_live_sync";
export const LIVE_SYNC_STORAGE_KEY = "mulan_live_sync_ping";

export interface LiveSyncMessage {
  type: "SETTINGS_UPDATED" | "IMAGE_SLOT_UPDATED" | "CONTENT_UPDATED" | "PAGES_UPDATED" | "FAQS_UPDATED" | "TESTIMONIALS_UPDATED";
  settings?: any;
  slotKey?: string;
  imageUrl?: string;
  altText?: string;
  timestamp: number;
}

export function broadcastSiteUpdate(msg: Omit<LiveSyncMessage, "timestamp">) {
  if (typeof window === "undefined") return;

  const payload: LiveSyncMessage = {
    ...msg,
    timestamp: Date.now(),
  };

  // 1. BroadcastChannel for instant same-browser cross-tab delivery (<5ms)
  try {
    if ("BroadcastChannel" in window) {
      const bc = new BroadcastChannel(LIVE_SYNC_CHANNEL);
      bc.postMessage(payload);
      setTimeout(() => bc.close(), 100);
    }
  } catch (err) {
    console.warn("[BROADCAST CHANNEL ERROR]", err);
  }

  // 2. Storage event fallback for older browsers or cross-window setups
  try {
    localStorage.setItem(LIVE_SYNC_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {}
}
