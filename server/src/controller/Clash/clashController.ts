import "dotenv/config.js";
import { Request, Response } from "express";
import { ZodError } from "zod";
import prismaInstance from "../../config/database.js";
import { zodFormatError } from "../../helper/zodFormatError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { clashValidationSchema } from "../../validation/ClashValidation.js";
import { UploadedFile } from "express-fileupload";
import {
  DeleteImage,
  imageValidator,
  uploadFile,
} from "../../helper/imageValidator.js";

const create = asyncHandler(async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashValidationSchema.parse(body);
    if (req.files?.image) {
      const image = req.files?.image as UploadedFile;
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        return res.status(422).json({ errors: { image: validMsg } });
      }
      payload.image = await uploadFile(image);
    } else {
      return res.status(422).json({ errors: { image: "Image is required" } });
    }

    await prismaInstance.clash.create({
      data: {
        ...payload,
        image: payload.image,
        user_id: req.user?.id!,
        expire_At: new Date(payload.expire_At),
      },
    });

    return res.status(200).json({ message: "clash created successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const clash = await prismaInstance.clash.findMany({
      where: {
        user_id: req.user?.id,
      },
    });
    return res
      .status(200)
      .json({ data: clash, message: "Data fetch successfully" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const getById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const clash = await prismaInstance.clash.findUnique({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
      },
      where: { id: Number(id) },
    });
    return res
      .status(200)
      .json({ message: "Data fetch successfuly", date: clash });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const payload = clashValidationSchema.parse(body);
    if (req.files?.image) {
      const image = req.files.image as UploadedFile;
      const validMsg = imageValidator(image.size, image.mimetype);
      if (validMsg) {
        return res.status(422).json({ errors: { image: validMsg } });
      }

      const clash = await prismaInstance.clash.findUnique({
        select: {
          image: true,
        },
        where: { id: Number(id) },
      });
      if (clash) DeleteImage(clash?.image);

      payload.image = await uploadFile(image);
    }

    await prismaInstance.clash.update({
      where: { id: Number(id) },
      data: { ...payload, expire_At: new Date(payload.expire_At) },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});
const deleteByID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await prismaInstance.clash.delete({
      where: { id: Number(id) },
    });

    return res.status(2999).json({});
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = zodFormatError(error);
      console.log("here ", errors);

      return res.status(422).json({ message: "invalid data", errors });
    }
    return res.status(500).json({ message: "something went wrong", error }); //server error
  }
});

export { create, getAll, getById ,update,deleteByID};
