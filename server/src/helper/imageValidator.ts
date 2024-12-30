import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fs from "fs";

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
  if (bytesToMB(size) > 4) {
    return "Image Size should be less then 4 MB";
  } else if (!supportMimes.includes(mime)) {
    return "Image must be type of jpg, gif, jpeg, webp";
  }
  return null;
};

export const uploadFile = (image: UploadedFile) => {
  const imgExt = image?.name.split(".");
  const ImageName = uuid() + "." + imgExt[1];
  const uploadPath = process.cwd() + "/public/images" + ImageName;
  image.mv(uploadPath, (error) => {
    if (error) console.error;
  });
  return ImageName;
};

export const DeleteImage = (image: string) => {
  const path = process.cwd() + `/public/images` + image;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};
