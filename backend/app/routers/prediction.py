
import joblib
import pandas as pd
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

ROOT_DIR = Path(__file__).resolve().parents[3]
MODEL_PATH = ROOT_DIR / "ml" / "models" / "readiness_model.pkl"

try:
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None


class StudentData(BaseModel):
    cgpa: float = Field(ge=0, le=10)
    coding_score: float = Field(ge=0, le=100)
    aptitude_score: float = Field(ge=0, le=100)
    communication_score: float = Field(ge=0, le=100)
    projects_count: int = Field(ge=0)
    internships_count: int = Field(ge=0)
    certifications_count: int = Field(ge=0)
    attendance_percentage: float = Field(ge=0, le=100)


@router.post("/predict")
def predict_readiness(student: StudentData):

    if model is None:
        raise HTTPException(
            status_code=503,
            detail="ML model not found. Check ml/models/readiness_model.pkl"
        )

    student_data = student.model_dump()

    student_df = pd.DataFrame([student_data])

    try:
        prediction = model.predict(student_df)[0]
        probabilities = model.predict_proba(student_df)[0]
        confidence = round(float(max(probabilities)) * 100, 2)

        return {
            "readiness_level": str(prediction),
            "confidence": confidence
        }

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
