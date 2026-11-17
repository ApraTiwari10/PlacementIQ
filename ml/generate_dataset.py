
import pandas as pd
import numpy as np

np.random.seed(42)

n = 1000

data = {
    "cgpa": np.random.uniform(4.0, 10.0, n),
    "coding_score": np.random.uniform(0, 100, n),
    "aptitude_score": np.random.uniform(0, 100, n),
    "communication_score": np.random.uniform(0, 100, n),
    "projects_count": np.random.randint(0, 8, n),
    "internships_count": np.random.randint(0, 4, n),
    "certifications_count": np.random.randint(0, 10, n),
    "attendance_percentage": np.random.uniform(50, 100, n)
}

df = pd.DataFrame(data)

readiness_score = (
    df["cgpa"] * 5 +
    df["coding_score"] * 0.25 +
    df["aptitude_score"] * 0.15 +
    df["communication_score"] * 0.10 +
    df["projects_count"] * 1.5 +
    df["internships_count"] * 3 +
    df["certifications_count"] * 0.5 +
    df["attendance_percentage"] * 0.05
)

df["readiness_level"] = np.where(
    readiness_score >= 85, "High",
    np.where(readiness_score >= 60, "Medium", "Low")
)

df.insert(
    0,
    "student_id",
    [f"STU{i:04d}" for i in range(1, n + 1)]
)

df.to_csv("ml/dataset/student_readiness.csv", index=False)

print("Dataset generated successfully!")
print("Total students:", len(df))
print("\nReadiness distribution:")
print(df["readiness_level"].value_counts())
print("\nDataset preview:")
print(df.head())
