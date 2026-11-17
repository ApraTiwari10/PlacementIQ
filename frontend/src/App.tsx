
import { useEffect, useState } from "react";
import {
  BrowserRouter, Routes, Route, NavLink, useLocation
} from "react-router-dom";
import {
  LayoutDashboard, Users, BrainCircuit, FileText,
  BriefcaseBusiness, Target, ChartNoAxesCombined,
  ClipboardCheck, CalendarCheck, FileChartColumn,
  Settings, Menu, X, Moon, Sun, Bell
} from "lucide-react";
import Dashboard from "./DashboardHome";
import PredictionForm from "./PredictionForm";

type Student = {
  id: number;
  name: string;
  email: string;
  cgpa: number;
  skills: string;
};

type Job = {
  id: number;
  company: string;
  role: string;
  skills: string;
  location: string;
};

type Application = {
  id: number;
  student: string;
  company: string;
  role: string;
  status: string;
};

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Student Management", path: "/students", icon: Users },
  { name: "AI Prediction", path: "/prediction", icon: BrainCircuit },
  { name: "Resume Builder", path: "/resume", icon: FileText },
  { name: "Jobs & Companies", path: "/jobs", icon: BriefcaseBusiness },
  { name: "Job Matching", path: "/matching", icon: Target },
  { name: "Skill Gap Analysis", path: "/skills", icon: ChartNoAxesCombined },
  { name: "Interview Preparation", path: "/interviews", icon: ClipboardCheck },
  { name: "Application Tracker", path: "/applications", icon: CalendarCheck },
  { name: "ML Analytics", path: "/analytics", icon: FileChartColumn },
];

const initialJobs: Job[] = [
  { id: 1, company: "TCS", role: "Software Developer", skills: "java, python, sql, dsa", location: "Pan India" },
  { id: 2, company: "Infosys", role: "Systems Engineer", skills: "python, sql, communication", location: "Pune" },
  { id: 3, company: "Accenture", role: "Application Developer", skills: "java, react, sql, dsa", location: "Bangalore" },
  { id: 4, company: "Wipro", role: "Project Engineer", skills: "python, html, css, communication", location: "Hyderabad" },
  { id: 5, company: "Amazon", role: "SDE Intern", skills: "java, python, dsa, react", location: "Bangalore" },
];

function readSaved<T,>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function Field({ label, value, onChange, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-400">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-main)] p-3 text-inherit outline-none focus:border-[#C3A75D]" />
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 	bg-[var(--bg-panel)] p-5">
      <h3 className="mb-4 text-lg font-bold">{title}</h3>
      {children}
    </section>
  );
}

function WebsiteLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(true);
  const location = useLocation();
  useEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    dark ? "dark" : "light"
  );
}, [dark]);

  const [students, setStudents] = useState<Student[]>(() =>
    readSaved("piq_students", [])
  );
  const [jobs] = useState<Job[]>(() =>
    readSaved("piq_jobs", initialJobs)
  );
  const [applications, setApplications] = useState<Application[]>(() =>
    readSaved("piq_applications", [])
  );

  useEffect(() => {
    localStorage.setItem("piq_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("piq_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("piq_applications", JSON.stringify(applications));
  }, [applications]);

  const currentPage =
    navigation.find(item => item.path === location.pathname)?.name ||
    "Settings";

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [cgpa, setCgpa] = useState("7");
  const [skills, setSkills] = useState("Python, SQL, DSA");

  const [resumeName, setResumeName] = useState("");
  const [resumeEmail, setResumeEmail] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  const [resumeProjects, setResumeProjects] = useState("");

  const [jobSearch, setJobSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [appStudent, setAppStudent] = useState("");
  const [appCompany, setAppCompany] = useState("");
  const [appRole, setAppRole] = useState("");
  const [appStatus, setAppStatus] = useState("Applied");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = [
    ["What is OOP?", "Object-oriented programming is a programming approach based on classes and objects."],
    ["What is a data structure?", "A way of organizing and storing data for efficient access and modification."],
    ["Difference between BFS and DFS?", "BFS explores level by level using a queue; DFS explores depth-wise using a stack or recursion."],
    ["What is DBMS?", "Software used to store, manage, retrieve and organize data in databases."],
    ["What is machine learning?", "A field of AI where systems learn patterns from data to make predictions."],
    ["What is an API?", "An interface that allows different software applications to communicate."],
  ];

  const addStudent = () => {
    if (!studentName.trim() || !studentEmail.trim()) {
      alert("Please enter student name and email.");
      return;
    }
    setStudents(old => [...old, {
      id: Date.now(),
      name: studentName,
      email: studentEmail,
      cgpa: Number(cgpa),
      skills
    }]);
    setStudentName("");
    setStudentEmail("");
    alert("Student added successfully!");
  };

  const addApplication = () => {
    if (!appStudent || !appCompany.trim() || !appRole.trim()) {
      alert("Please fill all application details.");
      return;
    }
    setApplications(old => [...old, {
      id: Date.now(),
      student: appStudent,
      company: appCompany,
      role: appRole,
      status: appStatus
    }]);
    setAppCompany("");
    setAppRole("");
    alert("Application added successfully!");
  };

  const matchScore = (student: Student, job: Job) => {
    const studentSkills = student.skills.toLowerCase().split(",").map(s => s.trim());
    const required = job.skills.toLowerCase().split(",").map(s => s.trim());
    return Math.round(required.filter(s => studentSkills.includes(s)).length / required.length * 100);
  };

  const matchingStudent = students.find(s => s.id === Number(selectedStudent));
  const matchingJob = jobs.find(j => j.id === Number(selectedJob));

  const card = "rounded-xl border border-white/10 bg-white/5 p-5";
  const inputClass = "w-full rounded-lg border border-white/15 bg-black/20 p-3 text-inherit";
  const buttonClass = "rounded-lg bg-[#737D4C] px-4 py-2 font-semibold text-white hover:bg-[#89945D]";
  const mutedButton = "rounded-lg border border-white/15 px-4 py-2 hover:bg-[var(--bg-card)]";

  return (
    <div className={dark ? "dark" : ""}>
      <div className={`flex min-h-screen ${dark ? "bg-[var(--bg-main)] text-[var(--text-primary)]" : "bg-[var(--bg-main)] text-[var(--text-primary)]"}`}>
        <aside className={`${collapsed ? "w-20" : "w-64"} shrink-0 border-r border-white/10 bg-[var(--bg-panel)] p-4 transition-all`}>
          <div className="mb-8 flex items-center justify-between">
            {!collapsed && <div>
              <h1 className="text-2xl font-black">PlacementIQ</h1>
              <p className="text-xs text-[var(--text-secondary)]">AI Career Intelligence</p>
            </div>}
            <button onClick={() => setCollapsed(!collapsed)} className="rounded-lg p-2 hover:bg-white/10">
              {collapsed ? <Menu /> : <X />}
            </button>
          </div>
          <nav className="space-y-2">
            {navigation.map(item => {
              const Icon = item.icon;
              return <NavLink key={item.path} to={item.path} end={item.path === "/"}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${isActive ? "bg-[#737D4C]/30 text-[#D8C27F]" : "text-slate-400 hover:bg-white/10"}`
                }>
                <Icon size={20} />
                {!collapsed && item.name}
              </NavLink>;
            })}
          </nav>
          <NavLink to="/settings" className="mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-5 text-sm text-slate-400">
            <Settings size={20} /> {!collapsed && "Settings"}
          </NavLink>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
            <div>
              <p className="text-xs text-slate-400">PLACEMENT INTELLIGENCE PLATFORM</p>
              <h2 className="mt-1 text-xl font-bold">{currentPage}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Bell size={19} />
              <button onClick={() => setDark(!dark)} className={mutedButton}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <span className="hidden rounded-lg bg-white/10 px-4 py-2 text-sm sm:block">Admin</span>
            </div>
          </header>

          <div className="space-y-5 p-5 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prediction" element={<PredictionForm />} />

              <Route path="/students" element={
                <div className="space-y-5">
                  <Panel title="Add New Student">
                    <div className="grid gap-3 md:grid-cols-2">
                      <Field label="Student Name" value={studentName} onChange={setStudentName} />
                      <Field label="Email" value={studentEmail} onChange={setStudentEmail} type="email" />
                      <Field label="CGPA" value={cgpa} onChange={setCgpa} type="number" />
                      <Field label="Skills (comma separated)" value={skills} onChange={setSkills} />
                    </div>
                    <button className={`${buttonClass} mt-4`} onClick={addStudent}>Add Student</button>
                  </Panel>
                  <Panel title={`Student Records (${students.length})`}>
                    {students.length === 0 ? <p className="text-slate-400">No students added yet. Add your first student above.</p> :
                      <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                        <thead><tr className="border-b border-white/10 text-slate-400"><th className="p-3">Name</th><th>Email</th><th>CGPA</th><th>Skills</th><th>Action</th></tr></thead>
                        <tbody>{students.map(s => <tr key={s.id} className="border-b border-white/10">
                          <td className="p-3">{s.name}</td><td>{s.email}</td><td>{s.cgpa}</td><td>{s.skills}</td>
                          <td><button className="text-red-400" onClick={() => setStudents(old => old.filter(x => x.id !== s.id))}>Delete</button></td>
                        </tr>)}</tbody>
                      </table></div>}
                  </Panel>
                </div>
              } />

              <Route path="/resume" element={
                <Panel title="Resume Builder">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Full Name" value={resumeName} onChange={setResumeName} />
                    <Field label="Email" value={resumeEmail} onChange={setResumeEmail} type="email" />
                    <Field label="Skills" value={resumeSkills} onChange={setResumeSkills} />
                    <Field label="Projects" value={resumeProjects} onChange={setResumeProjects} />
                  </div>
                  <button className={`${buttonClass} mt-4`} onClick={() => {
                    if (!resumeName || !resumeEmail) return alert("Enter name and email first.");
                    const w = window.open("", "_blank");
                    if (!w) return alert("Allow pop-ups to print your resume.");
                    w.document.write(`<html><head><title>Resume</title></head><body style="font-family:Arial;padding:40px"><h1>${resumeName}</h1><p>${resumeEmail}</p><h2>Skills</h2><p>${resumeSkills}</p><h2>Projects</h2><p>${resumeProjects}</p></body></html>`);
                    w.document.close();
                    w.print();
                  }}>Generate / Print Resume</button>
                </Panel>
              } />

              <Route path="/jobs" element={
                <div className="space-y-4">
                  <Field label="Search jobs or companies" value={jobSearch} onChange={setJobSearch} />
                  <p className="text-sm text-slate-400">Sample job listings for project demonstration; not live vacancies.</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {jobs.filter(j => `${j.company} ${j.role} ${j.skills} ${j.location}`.toLowerCase().includes(jobSearch.toLowerCase())).map(j =>
                      <div className={card} key={j.id}>
                        <h3 className="text-lg font-bold">{j.role}</h3>
                        <p className="mt-1">{j.company} · {j.location}</p>
                        <p className="mt-3 text-sm text-slate-400">Required skills: {j.skills}</p>
                        <button className={`${buttonClass} mt-4`} onClick={() => {
                          setAppCompany(j.company); setAppRole(j.role);
                          alert("Job selected. Add it in Application Tracker.");
                        }}>Select Job</button>
                      </div>
                    )}
                  </div>
                </div>
              } />

              <Route path="/matching" element={
                <Panel title="Student–Job Matching">
                  {students.length === 0 ? <p className="text-slate-400">Add a student in Student Management first.</p> : <>
                    <label className="mb-3 block text-sm">Select Student
                      <select className={`${inputClass} mt-1`} value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                        <option value="">Choose student</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </label>
                    <label className="mb-3 block text-sm">Select Job
                      <select className={`${inputClass} mt-1`} value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
                        <option value="">Choose job</option>
                        {jobs.map(j => <option key={j.id} value={j.id}>{j.company} - {j.role}</option>)}
                      </select>
                    </label>
                    {matchingStudent && matchingJob && <div className="mt-5 rounded-xl bg-white/10 p-5">
                      <p className="text-slate-400">Skill Match Score</p>
                      <p className="my-2 text-4xl font-bold">{matchScore(matchingStudent, matchingJob)}%</p>
                      <p>Matched skills: {matchingJob.skills.split(",").map(s => s.trim()).filter(s => matchingStudent.skills.toLowerCase().split(",").map(x => x.trim()).includes(s)).join(", ") || "None"}</p>
                    </div>}
                  </>}
                </Panel>
              } />

              <Route path="/skills" element={
                <Panel title="Skill Gap Analysis">
                  {students.length === 0 ? <p className="text-slate-400">Add a student first to analyse skill gaps.</p> : <>
                    <select className={inputClass} value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                      <option value="">Choose student</option>
                      {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    {matchingStudent && jobs.map(j => {
                      const own = matchingStudent.skills.toLowerCase().split(",").map(s => s.trim());
                      const missing = j.skills.split(",").map(s => s.trim()).filter(s => !own.includes(s));
                      return <div key={j.id} className="mt-4 rounded-lg border border-white/10 p-4">
                        <b>{j.company} – {j.role}</b>
                        <p className="mt-2 text-sm">Missing skills: {missing.join(", ") || "No skill gap detected"}</p>
                      </div>;
                    })}
                  </>}
                </Panel>
              } />

              <Route path="/interviews" element={
                <Panel title="Interview Preparation">
                  <p className="mb-3 text-sm text-slate-400">Practice common technical interview questions.</p>
                  <p className="text-lg font-semibold">Question {questionIndex + 1} of {questions.length}</p>
                  <p className="my-5 text-xl">{questions[questionIndex][0]}</p>
                  {showAnswer && <p className="mb-5 rounded-lg bg-white/10 p-4">{questions[questionIndex][1]}</p>}
                  <div className="flex flex-wrap gap-3">
                    <button className={buttonClass} onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide Answer" : "Show Answer"}</button>
                    <button className={mutedButton} onClick={() => { setQuestionIndex((questionIndex + 1) % questions.length); setShowAnswer(false); }}>Next Question</button>
                  </div>
                </Panel>
              } />

              <Route path="/applications" element={
                <div className="space-y-5">
                  <Panel title="Add Job Application">
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-sm">Student
                        <select className={`${inputClass} mt-1`} value={appStudent} onChange={e => setAppStudent(e.target.value)}>
                          <option value="">Select student</option>
                          {students.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                      </label>
                      <Field label="Company" value={appCompany} onChange={setAppCompany} />
                      <Field label="Job Role" value={appRole} onChange={setAppRole} />
                      <label className="text-sm">Status
                        <select className={`${inputClass} mt-1`} value={appStatus} onChange={e => setAppStatus(e.target.value)}>
                          <option>Applied</option><option>Interview</option><option>Selected</option><option>Rejected</option>
                        </select>
                      </label>
                    </div>
                    <button className={`${buttonClass} mt-4`} onClick={addApplication}>Save Application</button>
                  </Panel>
                  <Panel title={`Application Records (${applications.length})`}>
                    {applications.length === 0 ? <p className="text-slate-400">No applications recorded yet.</p> :
                      applications.map(a => <div key={a.id} className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 p-3">
                        <div><b>{a.student}</b><p className="text-sm text-slate-400">{a.company} · {a.role}</p></div>
                        <select className={inputClass} value={a.status} onChange={e => setApplications(old => old.map(x => x.id === a.id ? {...x, status: e.target.value} : x))}>
                          <option>Applied</option><option>Interview</option><option>Selected</option><option>Rejected</option>
                        </select>
                        <button className="text-red-400" onClick={() => setApplications(old => old.filter(x => x.id !== a.id))}>Delete</button>
                      </div>)}
                  </Panel>
                </div>
              } />

              <Route path="/analytics" element={
                <div className="grid gap-4 md:grid-cols-3">
                  <div className={card}><p className="text-slate-400">Total Students</p><p className="mt-2 text-3xl font-bold">{students.length}</p></div>
                  <div className={card}><p className="text-slate-400">Available Sample Jobs</p><p className="mt-2 text-3xl font-bold">{jobs.length}</p></div>
                  <div className={card}><p className="text-slate-400">Applications</p><p className="mt-2 text-3xl font-bold">{applications.length}</p></div>
                  <div className={card}><p className="text-slate-400">Selected</p><p className="mt-2 text-3xl font-bold">{applications.filter(a => a.status === "Selected").length}</p></div>
                  <div className={card}><p className="text-slate-400">Interviews</p><p className="mt-2 text-3xl font-bold">{applications.filter(a => a.status === "Interview").length}</p></div>
                  <div className={card}><p className="text-slate-400">Pending Applications</p><p className="mt-2 text-3xl font-bold">{applications.filter(a => a.status === "Applied").length}</p></div>
                  <Panel title="Readiness Model">
                    <p>Prediction is provided by the connected ML model through the AI Prediction page.</p>
                    <p className="mt-2 text-sm text-slate-400">Student and application statistics are calculated from records entered in this browser.</p>
                  </Panel>
                </div>
              } />

              <Route path="/settings" element={
                <Panel title="Settings">
                  <p className="mb-4 text-slate-400">PlacementIQ workspace preferences</p>
                  <button className={buttonClass} onClick={() => setDark(!dark)}>Switch to {dark ? "Light" : "Dark"} Mode</button>
                  <p className="mt-5 text-sm text-slate-400">Student and application records are saved in this browser's local storage.</p>
                  <button className="mt-4 rounded-lg border border-red-500/40 px-4 py-2 text-red-400" onClick={() => {
                    if (confirm("Delete all students and applications from this browser?")) {
                      setStudents([]);
                      setApplications([]);
                    }
                  }}>Clear Student and Application Data</button>
                </Panel>
              } />

              <Route path="*" element={<Panel title="Page not found"><p>Choose a module from the sidebar.</p></Panel>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><WebsiteLayout /></BrowserRouter>;
}
