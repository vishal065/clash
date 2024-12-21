"use server";

export async function registerAction(formdata: FormData) {
  try {
    console.log("formdata", formdata);
  } catch (error) {
    console.error(error);
  }
}
