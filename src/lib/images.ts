import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { fetchAllImages, saveImageSlot } from "./db";
import { DEFAULT_SITE_IMAGES, SiteImage } from "./defaultImages";

// Cached getter for site images with Next.js Cache Tag
export const getSiteImages = unstable_cache(
  async (): Promise<Record<string, SiteImage>> => {
    return await fetchAllImages();
  },
  ["site-images-cache-key"],
  {
    tags: ["site-images"],
    revalidate: 60, // 60s stale fallback + on-demand revalidateTag
  }
);

export async function getImageBySlot(slotKey: string): Promise<SiteImage> {
  const images = await getSiteImages();
  if (images[slotKey]) {
    return images[slotKey];
  }

  const defaultImg = DEFAULT_SITE_IMAGES.find((d) => d.slot_key === slotKey);
  if (defaultImg) return defaultImg;

  return {
    slot_key: slotKey,
    title: slotKey,
    section: "General",
    image_url: "/images/new-logo.webp",
    alt_text: "Mulan Laundries",
  };
}

export async function updateImageAndTriggerRevalidation(
  slotKey: string,
  imageUrl: string,
  altText?: string
): Promise<SiteImage> {
  const updated = await saveImageSlot(slotKey, imageUrl, altText);

  // Trigger immediate cache purge across all routes where image is placed
  try {
    revalidateTag("site-images", "max");
    revalidateTag("site-settings", "max");
    revalidatePath("/", "layout");
    revalidatePath("/about");
    revalidatePath("/commercial-laundry");
    revalidatePath("/wash-fold");
    revalidatePath("/pickup-request");
    revalidatePath("/contact");
  } catch (err) {
    console.warn("[CACHE REVALIDATION WARN]", err);
  }

  return updated;
}
