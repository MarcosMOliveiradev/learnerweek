import { useRef, useState } from "react";

export interface CaptureResult {
  blob: Blob;
  file: File;
  preview: string;
}

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  async function startCamera() {
    if (stream) return;

    const media = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = media;
    }

    setStream(media);
    setIsOpen(true);
  }

  async function capture(): Promise<CaptureResult | null> {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return null;

    context.drawImage(video, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.95);
    });

    if (!blob) return null;

    const file = new File(
      [blob],
      `capture-${Date.now()}.jpg`,
      {
        type: "image/jpeg",
      }
    );

    return {
      blob,
      file,
      preview: URL.createObjectURL(blob),
    };
  }

  function stopCamera() {
    stream?.getTracks().forEach((track) => track.stop());

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
    setIsOpen(false);
  }

  return {
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capture,
    isOpen,
  };
}