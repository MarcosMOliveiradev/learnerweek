from fastapi import FastAPI, UploadFile, File, HTTPException
from insightface.app import FaceAnalysis
import numpy as np
import cv2

app = FastAPI()

face_app = FaceAnalysis(name="buffalo_l")
face_app.prepare(
    ctx_id=0,
    det_size=(640, 640)
)

@app.post("/embedding")
async def generate_embedding(file: UploadFile = File(...)):
    image_bytes = await file.read()

    np_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    if image is None:
        raise HTTPException(status_code=400, detail="Imagem inválida.")

    faces = face_app.get(image)

    if len(faces) == 0:
        raise HTTPException(status_code=400, detail="Nenhum rosto encontrado.")

    embedding = faces[0].embedding.tolist()

    return {
        "dimensions": len(embedding),
        "embedding": embedding
    }