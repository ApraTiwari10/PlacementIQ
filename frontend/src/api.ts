const API_URL = "http://127.0.0.1:8000";

export interface StudentData {
  cgpa: number;
  coding_score: number;
  aptitude_score: number;
  communication_score: number;
  projects_count: number;
  internships_count: number;
  certifications_count: number;
  attendance_percentage: number;
}

export interface PredictionResult {
  readiness_level: string;
  confidence: number;
}

export async function predictReadiness(
  student: StudentData
): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Prediction failed. Please try again.");
  }

  return response.json();
}