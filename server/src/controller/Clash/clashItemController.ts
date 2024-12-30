import prismaInstance from "../../config/database.js";
import { imageValidator, uploadFile } from "../../helper/imageValidator.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { FileArray, UploadedFile } from "express-fileupload";

const addClashItems = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const files: FileArray | null = req.files!;
  const imgErrors: Array<string> = [];
  const images = files?.["images[]"] as UploadedFile[];

  if (images?.length >= 2) {
    images.map((img) => {
      const validMsg = imageValidator(img?.size, img?.mimetype);
      if (validMsg) imgErrors.push(validMsg);
    });
    if (imgErrors.length > 0) {
      return res.status(422).json({ errors: imgErrors });
    }
    let uploadedImages: string[] = [];
    images.map((img) => {
      uploadedImages.push(uploadFile(img));
    });
    uploadedImages.map(async (item) => {
      await prismaInstance.clashItem.create({
        data: { image: item, clashId: Number(id) },
      });
    });
    return res.status(200).json({ message: "items updated successfully" });
  }
  return res.status(422).json({ errors: ["Please select at least 2 images"] });
});

export { addClashItems };
