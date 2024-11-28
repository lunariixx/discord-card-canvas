import { Image, loadImage } from 'canvas';

const imageCache = new Map<string, Promise<Image>>();

async function loadCachedImage(url: string): Promise<Image> {
  if (!imageCache.has(url)) {
    imageCache.set(url, loadImage(url));
  }
  return imageCache.get(url)!;
}

function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export async function loadImageSafe(url: string): Promise<Image | null> {
  if (!isURL(url)) {
    console.error(`Invalid URL provided: ${url}`);
    return null;
  }

  try {
    const img = await loadCachedImage(url);
    return img;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to load image from ${url}: ${error.message}`);
    } else {
      console.error(`Failed to load image from ${url}: ${String(error)}`);
    }
    return null;
  }
}
