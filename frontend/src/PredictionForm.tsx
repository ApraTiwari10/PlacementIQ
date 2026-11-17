import { useState } from "react";
import { predictReadiness, type StudentData, type PredictionResult } from "./api";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";

function PredictionForm() {
  const [form, setForm] = useState<StudentData>({
    cgpa: 8,
    coding_score: 75,
    aptitude_score: 70,
    communication_score: 75,
    projects_count: 3,
    internships_count: 1,
    certifications_count: 3,
    attendance_percentage: 85,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: Number(value),
    }));

    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prediction = await predictReadiness(form);
      setResult(prediction);
    } catch {
      setError("Prediction failed. Please check whether the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "cgpa", label: "CGPA", min: 0, max: 10, step: 0.1 },
    { name: "coding_score", label: "Coding Score", min: 0, max: 100, step: 1 },
    { name: "aptitude_score", label: "Aptitude Score", min: 0, max: 100, step: 1 },
    { name: "communication_score", label: "Communication Score", min: 0, max: 100, step: 1 },
    { name: "projects_count", label: "Projects Count", min: 0, max: 100, step: 1 },
    { name: "internships_count", label: "Internships Count", min: 0, max: 100, step: 1 },
    { name: "certifications_count", label: "Certifications Count", min: 0, max: 100, step: 1 },
    { name: "attendance_percentage", label: "Attendance Percentage", min: 0, max: 100, step: 1 },
  ] as const;

  return (
    <section className="rounded-2xl border border-violet-500/20 bg-[#111522] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Student Readiness Prediction</h2>
          <p className="text-sm text-slate-400">
            Enter student details to predict placement readiness.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm text-slate-400">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                min={field.min}
                max={field.max}
                step={field.step}
                required
                value={form[field.name]}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#090B14] px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-7 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={19} />
          ) : (
            <Sparkles size={19} />
          )}
          {loading ? "Predicting..." : "Predict Readiness"}
        </button>
      </form>

      {error && (
        <p className="mt-5 text-sm text-red-400">{error}</p>
      )}

      {result && (
        <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/10 p-5">
          <p className="text-sm text-slate-400">Prediction Result</p>
          <h3 className="mt-2 text-3xl font-bold text-violet-400">
            {result.readiness_level}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Model confidence: {result.confidence}%
          </p>
        </div>
      )}
    </section>
  );
}

export default PredictionForm;