
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import {
  Users, BriefcaseBusiness, TrendingUp, BrainCircuit,
  ArrowUpRight, Download, Activity, GraduationCap,
  Search, Sparkles, Target, Clock3, ChevronRight,
  FileText, Zap, CircleCheck,
} from "lucide-react";

const trendData = [
  { month: "Jan", students: 120, placed: 35 },
  { month: "Feb", students: 180, placed: 52 },
  { month: "Mar", students: 210, placed: 78 },
  { month: "Apr", students: 260, placed: 105 },
  { month: "May", students: 310, placed: 145 },
  { month: "Jun", students: 380, placed: 190 },
];

const readinessData = [
  { name: "High", value: 45, color: "#737D4C" },
  { name: "Medium", value: 35, color: "#C3A75D" },
  { name: "Low", value: 20, color: "#B98D79" },
];

const skillData = [
  { skill: "Python", score: 85 },
  { skill: "DSA", score: 72 },
  { skill: "SQL", score: 90 },
  { skill: "Aptitude", score: 68 },
  { skill: "Communication", score: 78 },
];

const students = [
  { name: "Aarav Sharma", branch: "CSE", cgpa: "8.9", status: "High" },
  { name: "Priya Verma", branch: "IT", cgpa: "8.2", status: "High" },
  { name: "Rahul Singh", branch: "CSE", cgpa: "7.1", status: "Medium" },
  { name: "Sneha Gupta", branch: "ECE", cgpa: "6.4", status: "Low" },
];

const stats = [
  { title: "Total Students", value: "1,240", change: "+12.8%", icon: Users, color: "olive", detail: "Registered profiles" },
  { title: "Placement Rate", value: "78.5%", change: "+8.2%", icon: BriefcaseBusiness, color: "gold", detail: "Illustrative metric" },
  { title: "AI Predictions", value: "856", change: "+18.4%", icon: BrainCircuit, color: "sage", detail: "Prediction activity" },
  { title: "Average CGPA", value: "7.82", change: "+4.6%", icon: GraduationCap, color: "sand", detail: "Sample student data" },
];

function exportReport(rows: typeof students) {
  const data = [
    ["Student", "Branch", "CGPA", "Readiness"],
    ...rows.map((s) => [s.name, s.branch, s.cgpa, s.status]),
  ];
  const csv = data.map((row) => row.join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "placementiq-student-report.csv";
  link.click();
  URL.revokeObjectURL(url);
}

const cardColors: Record<string, string> = {
  olive: "bg-[#737D4C]/20 text-[#C3D09A] border-[#737D4C]/40",
  gold: "bg-[#C3A75D]/15 text-[#D8C27F] border-[#C3A75D]/35",
  sage: "bg-[#91A77A]/15 text-[#B9CBA7] border-[#91A77A]/35",
  sand: "bg-[#B98D79]/15 text-[#D6B5A2] border-[#B98D79]/35",
};

const panelClass =
  "rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-lg shadow-black/10";

const chartTooltip = {
  background: "#292F25",
  border: "1px solid #C3A75D",
  borderRadius: 12,
  color: "#F1EBDD",
};

const axisColor = "#A9AD97";
const gridColor = "rgba(195,167,93,0.15)";

export default function DashboardHome() {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.branch.toLowerCase().includes(search.toLowerCase());
      const matchesBranch =
        selectedBranch === "All" || student.branch === selectedBranch;
      return matchesSearch && matchesBranch;
    });
  }, [search, selectedBranch]);

  return (
    <div className="space-y-6 pb-8 text-[var(--text-primary)]">

      {/* WELCOME PANEL */}
      <section className="relative overflow-hidden rounded-3xl border border-[#C3A75D]/25 bg-gradient-to-br from-[#1C2018] via-[#343A2B] to-[#41452E] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.25)] md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#C3A75D]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#91A77A]/10 blur-[90px]" />

        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C3A75D]/30 bg-[#C3A75D]/10 px-3 py-1.5 text-xs font-bold tracking-widest text-[#D8C27F]">
              <Sparkles size={14} /> AI POWERED PLACEMENT INTELLIGENCE
            </div>

            <h1 className="text-3xl font-black leading-tight text-[#F1EBDD] md:text-4xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#C3A75D] via-[#E2D09A] to-[#A6B58A] bg-clip-text text-transparent">
                PlacementIQ
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#D0CEBF] md:text-base">
              Transform student potential into career success with intelligent
              readiness predictions, skill insights and placement analytics.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D8C27F]/40 bg-gradient-to-r from-[#737D4C] to-[#89945D] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:brightness-110"
              >
                <BrainCircuit size={18} /> Run AI Prediction <ArrowUpRight size={17} />
              </Link>

              <Link
                to="/students"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D8C27F]/30 bg-[#F1EBDD]/10 px-5 py-3 text-sm font-semibold text-[#F1EBDD] transition hover:bg-[#C3A75D]/15"
              >
                <Users size={17} /> Explore Students
              </Link>
            </div>
          </div>

          <div className="hidden min-w-48 items-center justify-center lg:flex">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#C3A75D]/30 bg-[#C3A75D]/5 shadow-[0_0_70px_rgba(195,167,93,0.12)]">
              <div className="absolute inset-3 rounded-full border border-dashed border-[#A6B58A]/50" />
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-[#C3A75D]/40 bg-gradient-to-br from-[#737D4C]/60 to-[#C3A75D]/20 text-[#E0D19C] shadow-2xl">
                <BrainCircuit size={52} />
              </div>
              <span className="absolute -right-2 top-5 rounded-lg border border-[#C3A75D]/30 bg-[#343A2B] p-2 text-[#D8C27F]">
                <Zap size={18} />
              </span>
              <span className="absolute -bottom-2 left-3 rounded-lg border border-[#91A77A]/30 bg-[#292F25] p-2 text-[#B9CBA7]">
                <Target size={18} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#C3A75D]/60 hover:shadow-[0_12px_30px_rgba(195,167,93,0.10)]"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#C3A75D]/5 blur-2xl transition group-hover:bg-[#C3A75D]/15" />
              <div className="relative flex items-center justify-between">
                <div className={`rounded-xl border p-3 ${cardColors[item.color]}`}>
                  <Icon size={22} />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#737D4C]/20 px-2 py-1 text-xs font-bold text-[#AFC08B]">
                  <TrendingUp size={13} /> {item.change}
                </span>
              </div>
              <p className="relative mt-5 text-sm text-[var(--text-secondary)]">{item.title}</p>
              <h2 className="relative mt-1 text-3xl font-black tracking-tight text-[var(--text-primary)]">
                {item.value}
              </h2>
              <p className="relative mt-2 text-xs text-[var(--text-secondary)]">{item.detail}</p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#737D4C] to-[#C3A75D] transition-all duration-500 group-hover:w-full" />
            </div>
          );
        })}
      </section>

      {/* PLACEMENT CHARTS */}
      <section className="grid gap-5 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-2`}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-[#737D4C]/20 p-2 text-[#AFC08B]">
                  <Activity size={18} />
                </div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Placement Overview</h2>
              </div>
              <p className="mt-2 text-xs text-[var(--text-secondary)]">
                Monthly student and placement activity
              </p>
            </div>
            <span className="rounded-lg border border-[#C3A75D]/25 bg-[#C3A75D]/10 px-3 py-2 text-xs font-semibold text-[#C3A75D]">
              2026–27 · Sample
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="studentFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#91A77A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#91A77A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="placedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C3A75D" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C3A75D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" stroke={axisColor} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltip} />
                <Area type="monotone" dataKey="students" name="Students" stroke="#91A77A" fill="url(#studentFill)" strokeWidth={3} />
                <Area type="monotone" dataKey="placed" name="Placed" stroke="#C3A75D" fill="url(#placedFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex gap-5 text-xs">
            <span className="text-[#AFC08B]">● Students</span>
            <span className="text-[#C3A75D]">● Placed</span>
          </div>
        </div>

        {/* READINESS DISTRIBUTION */}
        <div className={panelClass}>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#C3A75D]/15 p-2 text-[#C3A75D]">
              <Target size={18} />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Readiness Mix</h2>
          </div>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">Illustrative student categories</p>

          <div className="relative mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={readinessData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={88} paddingAngle={5} stroke="none">
                  {readinessData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[var(--text-primary)]">100%</span>
              <span className="text-xs text-[var(--text-secondary)]">Sample data</span>
            </div>
          </div>

          <div className="space-y-3">
            {readinessData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-[var(--text-primary)]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS AND QUICK ACTIONS */}
      <section className="grid gap-5 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-2`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Skill Performance</h2>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">Illustrative average skill scores</p>
            </div>
            <Link to="/skills" className="text-xs font-semibold text-[#C3A75D] hover:text-[#E0CC91]">
              View analysis <ChevronRight size={14} className="inline" />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ left: 15, right: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke={axisColor} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="skill" stroke={axisColor} width={110} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={chartTooltip} />
                <Bar dataKey="score" name="Score" radius={[0, 7, 7, 0]} fill="#A6B58A" barSize={17} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className={panelClass}>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Quick Actions</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Access platform modules</p>
          <div className="mt-5 space-y-3">
            <Link to="/prediction" className="flex items-center gap-3 rounded-xl border border-[#737D4C]/30 bg-[#737D4C]/10 p-3 transition hover:border-[#C3A75D]/60 hover:bg-[#737D4C]/20">
              <div className="rounded-lg bg-[#737D4C]/25 p-2 text-[#B9CBA7]"><BrainCircuit size={19} /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">AI Prediction</p>
                <p className="text-xs text-[var(--text-secondary)]">Check student readiness</p>
              </div>
              <ChevronRight size={17} className="text-[#C3A75D]" />
            </Link>

            <Link to="/resume" className="flex items-center gap-3 rounded-xl border border-[#C3A75D]/25 bg-[#C3A75D]/10 p-3 transition hover:border-[#C3A75D]/60 hover:bg-[#C3A75D]/15">
              <div className="rounded-lg bg-[#C3A75D]/20 p-2 text-[#D8C27F]"><FileText size={19} /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Resume Builder</p>
                <p className="text-xs text-[var(--text-secondary)]">Build a professional CV</p>
              </div>
              <ChevronRight size={17} className="text-[#C3A75D]" />
            </Link>

            <Link to="/jobs" className="flex items-center gap-3 rounded-xl border border-[#B98D79]/25 bg-[#B98D79]/10 p-3 transition hover:border-[#C3A75D]/60 hover:bg-[#B98D79]/15">
              <div className="rounded-lg bg-[#B98D79]/20 p-2 text-[#D6B5A2]"><BriefcaseBusiness size={19} /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Explore Jobs</p>
                <p className="text-xs text-[var(--text-secondary)]">Discover opportunities</p>
              </div>
              <ChevronRight size={17} className="text-[#C3A75D]" />
            </Link>
          </div>
        </div>
      </section>

      {/* STUDENT TABLE */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Student Readiness Snapshot</h2>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">Illustrative records for interface demonstration</p>
          </div>
          <button
            onClick={() => exportReport(filteredStudents)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D8C27F]/30 bg-gradient-to-r from-[#737D4C] to-[#89945D] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-3 px-5 pb-4">
          <div className="flex min-w-52 flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] px-3 py-2.5">
            <Search size={17} className="text-[var(--text-secondary)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student or branch..."
              className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
            />
          </div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-main)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none"
          >
            <option value="All">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#737D4C]/15 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Branch</th>
                <th className="px-5 py-4">CGPA</th>
                <th className="px-5 py-4">AI Readiness</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.name} className="border-t border-[var(--border)] transition hover:bg-[#737D4C]/10">
                  <td className="px-5 py-4 font-semibold text-[var(--text-primary)]">{student.name}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">{student.branch}</td>
                  <td className="px-5 py-4 text-[var(--text-secondary)]">{student.cgpa}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.status === "High"
                        ? "bg-[#737D4C]/25 text-[#AFC08B]"
                        : student.status === "Medium"
                        ? "bg-[#C3A75D]/20 text-[#C3A75D]"
                        : "bg-[#B98D79]/20 text-[#D6B5A2]"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#AFC08B]">
                      <CircleCheck size={14} /> Available
                    </span>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[var(--text-secondary)]">
                    No matching students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTNOTE */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C3A75D]/20 bg-[#737D4C]/10 px-4 py-3 text-xs text-[var(--text-secondary)]">
        <span className="flex items-center gap-2">
          <Activity size={15} className="text-[#C3A75D]" />
          Dashboard charts and student records use illustrative sample data.
        </span>
        <span className="flex items-center gap-2">
          <Clock3 size={14} /> PlacementIQ · Intelligence Platform
        </span>
      </div>
    </div>
  );
}
