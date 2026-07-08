import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCamera } from "@/hooks/useCamera";
import { api } from "@/lib/axios";

export function Camera() {
  const {
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capture,
  } = useCamera();

  const [preview, setPreview] = useState<string>();

  async function handleRecognition() {
    try {
      const result = await capture();

      if (!result) return;

      setPreview(result.preview);

      const file = new File(
        [result.blob],
        "foto.jpg",
        {
          type: "image/jpeg",
        }
      );

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post(
        "/pessoa/findclosest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      // Depois vamos trocar esse console.log por um setPessoa(data)
    } catch (error) {
      console.error(error);
      alert("Erro ao reconhecer a pessoa.");
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[500px] rounded-lg border"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <div className="flex gap-4">
        <Button onClick={startCamera}>
          Abrir câmera
        </Button>

        <Button onClick={handleRecognition}>
          Reconhecer
        </Button>

        <Button
          variant="destructive"
          onClick={stopCamera}
        >
          Fechar câmera
        </Button>
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-72 rounded-lg border"
        />
      )}
    </div>
  );
}