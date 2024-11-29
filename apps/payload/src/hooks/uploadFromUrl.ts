import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface UploadFromUrlArgs {
  value: string; // The URL value from the field
  siblingData: Record<string, any>; // Other sibling fields
  req: any; // The Payload `req` object
  caption?: string; // Optional caption to add to the media
}

interface UploadedFile {
  id: string; // File ID
  alt?: string; // Alt text for the image
  url?: string; // URL of the uploaded image
}

export const uploadFromUrl = async ({
  value,
  siblingData,
  req,
  caption,
}: UploadFromUrlArgs): Promise<UploadedFile | undefined> => {
  if (value && typeof value === "string") {
    try {
      // Use the OS temporary directory for saving files
      const tmpDir = os.tmpdir();

      // Generate a unique file name
      const filename = `${uuidv4()}${path.extname(value)}`;
      const filepath = path.join(tmpDir, filename);

      // Download the image
      const response = await axios({
        method: "GET",
        url: value,
        responseType: "stream",
      });

      // Save the file locally
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // Upload the file to the media collection
      const uploadedFile: UploadedFile = await req.payload.create({
        collection: "media",
        filePath: filepath,
        data: {
          alt: caption || "Uploaded via URL",
        },
      });

      // Clean up the temporary file
      fs.unlinkSync(filepath);

      // Return the uploaded file
      return uploadedFile;
    } catch (error) {
      console.error("Error downloading or uploading image:", error);
    }
  }
};
