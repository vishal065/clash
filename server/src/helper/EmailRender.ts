import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

export const renderEmail = async (
  fileName: string,
  payload: any
): Promise<string> => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const distPath = path.dirname(__dirname);

    const html: string = await ejs.renderFile(
      distPath + `/views/emails/${fileName}.ejs`,
      payload
    );

    return html;
  } catch (error) {
    console.error("render email Error ", error);
    return String(error);
  }
};
