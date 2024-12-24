const supportMimes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

const bytesToMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const imageValidator = (size: number, mime: string): string | null => {
  if (bytesToMB(size) > 2) {
    return "Image Size should be less then 2 MB";
  } else if (!supportMimes.includes(mime)) {
    return "Image must be type of jpg, gif, jpeg, webp";
  }
  return null;
};
