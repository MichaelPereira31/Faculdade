import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

interface ImageUploadResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function uploadImage(
  base64Data: string,
): Promise<ImageUploadResponse> {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      return {
        success: false,
        error: "Formato base64 inválido",
      };
    }

    const mimeType = matches[1];
    const base64String = matches[2];

    if (!mimeType.startsWith("image/")) {
      return {
        success: false,
        error: "Arquivo deve ser uma imagem",
      };
    }

    const buffer = Buffer.from(base64String, "base64");

    const maxSize = 10 * 1024 * 1024;
    if (buffer.length > maxSize) {
      return {
        success: false,
        error: "Imagem deve ter no máximo 10MB",
      };
    }

    const extension = mimeType.split("/")[1];
    const validExtensions = ["png", "jpg", "jpeg", "gif", "webp"];

    if (!validExtensions.includes(extension)) {
      return {
        success: false,
        error: "Formato de imagem não suportado",
      };
    }

    const uniqueName = `${uuidv4()}.${extension}`;
    const uploadDir = join(process.cwd(), "public/uploads/courses");
    const filePath = join(uploadDir, uniqueName);

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/courses/${uniqueName}`;

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    console.error("Erro no upload de imagem base64:", error);
    return {
      success: false,
      error: "Erro ao fazer upload da imagem",
    };
  }
}
