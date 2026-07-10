import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCamera } from "@/hooks/useCamera";
import { api } from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AppErrors } from "@/lib/appErrors";
import type { FindClosestResponse } from "@/dtos/FindClosestResponseDTO";

export function Camera() {
  const {
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capture,
  } = useCamera();

  const [pessoa, setPessoa] = useState<FindClosestResponse["pessoa"] | null>(null);
  const [open, setOpen] = useState(false);

  async function handleRecognition() {
    try {
      const result = await capture();

      if (!result) return;

      const file = new File(
        [result.blob],
        "foto.jpg",
        {
          type: "image/jpeg",
        }
      );

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post<FindClosestResponse>(
        "/pessoa/findclosest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPessoa(data.pessoa);
      stopCamera();
      setOpen(false);
    } catch (error) {
      const isAppError = error instanceof AppErrors
      const title = isAppError ? error.message : "Desculpe! Não conseguimos indentifica-lo em nosso cadastro"
      toast.error(title)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">

      <div className="flex gap-4">
        <Button
          className="cursor-pointer rounded-[0.5rem] w-[17.5rem] text-[1rem]"
          onClick={async () => {
            setOpen(true);
            await startCamera();
          }}
        >
          Abrir câmera
      </Button>


      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            stopCamera();
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Reconhecimento Facial
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-xl border"
            />

            <canvas
              ref={canvasRef}
              className="hidden"
            />

            <div className="flex gap-4">
              <Button 
                className="cursor-pointer w-[8rem] rounded-[0.5rem] text-[0.8rem] text-muted"
                onClick={handleRecognition}>
                Reconhecer
              </Button>

              <Button
                className="cursor-pointer w-[8rem] rounded-[0.5rem] text-[0.8rem] text-muted bg-red-950"
                onClick={() => {
                  stopCamera();
                  setOpen(false);
                }}
              >
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      {pessoa && (
        <div className="mt-8 w-[420px] rounded-xl border bg-card p-6 shadow-lg">

          <img
            src={`data:image/jpeg;base64,${pessoa.foto}`}
            alt={pessoa.nome}
            className="mx-auto h-44 w-44 rounded-full object-cover border-4"
          />

          <div className="mt-6 text-center">

            <h2 className="text-2xl font-bold">
              {pessoa.nome}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {pessoa.areaAtuacao}
            </p>

            {pessoa.descricao && (
              <p className="mt-6 text-sm leading-relaxed">
                {pessoa.descricao}
              </p>
            )}

          </div>

        </div>
      )}
    </div>
  );
}