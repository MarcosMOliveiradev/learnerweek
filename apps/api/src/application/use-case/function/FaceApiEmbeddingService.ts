import { FaceEmbeddingService } from "@/application/entities/FaceEmbeddingService";
import axios from "axios";
import FormData from "form-data";

export class InsightFaceEmbeddingService
  implements FaceEmbeddingService {

  async generate(image: Buffer): Promise<number[]> {

    const form = new FormData();

    form.append(
      "file",
      image,
      {
        filename: "foto.jpg",
        contentType: "image/jpeg",
      }
    );

    const { data } = await axios.post(
      `${process.env.FACE_API_URL}/embedding`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    return data.embedding;
  }
}