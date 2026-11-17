from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routers.prediction import router as prediction_router

app = FastAPI(
    title="PlacementIQ API",
    description="Student Readiness Prediction Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router, prefix="/api", tags=["Prediction"])


@app.get("/")
def home():
    return {
        "message": "Welcome to PlacementIQ",
        "status": "Running Successfully"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}