import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const hasCloudinary = Boolean(cloudName && apiKey && apiSecret);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

/**
 * Upload a file (base64 string or Buffer) to Cloudinary or local fallback directory
 */
export async function uploadImage(fileData: string | Buffer, folder = "nss_dypcoe"): Promise<string> {
  // If Cloudinary is configured, upload to Cloudinary
  if (hasCloudinary) {
    try {
      const dataUri = Buffer.isBuffer(fileData)
        ? `data:image/jpeg;base64,${fileData.toString("base64")}`
        : fileData;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: "image",
      });
      return result.secure_url;
    } catch (error) {
      console.error("[CLOUDINARY] Upload error:", error);
      // Fallback to local storage if Cloudinary upload fails
    }
  }

  // Local filesystem fallback
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
    const filePath = path.join(uploadDir, filename);

    if (Buffer.isBuffer(fileData)) {
      fs.writeFileSync(filePath, fileData);
    } else if (fileData.startsWith("data:")) {
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
    } else {
      // If it's already an external URL or path, just return it
      return fileData;
    }

    return `/uploads/${filename}`;
  } catch (err) {
    console.error("[UPLOAD] Local upload fallback error:", err);
    // If all else fails, return a reliable placeholder
    return "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80";
  }
}
