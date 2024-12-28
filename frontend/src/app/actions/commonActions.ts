"use server";

import { revalidateTag } from "next/cache";

export function clearCache(tag: string) {
  revalidateTag(tag);
}
