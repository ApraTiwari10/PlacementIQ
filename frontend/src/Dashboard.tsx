
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  GraduationCap,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  BriefcaseBusiness,
  Target,
  Activity,
  ChevronDown,
  Menu,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PredictionForm from "./PredictionForm";

const placementData = [
  { month: "Jan", students: 120, placed: 45 },
  { month: "Feb", students: 180, placed: 70 },
  { month: "Mar", students: 220, placed: 95 },
  { month: "Apr", students: 260, placed: 130 },
  { month: "May", students: 310, placed: 175 },
  { month: "Jun", students: 380, placed: 240 },
  { month: "Jul", students: 450, placed: 310 },
];

const readinessData = [
  { name: "High", value: 45, color: "#8B5CF6" },
  { name: "Medium", value: 35, color: "#06B6D4" },
  { name: "Low", value: 20, color: "#F59E0B" },
];

const students = [
  { name: "Aarav Sharma", id: "STU001", branch: "Computer Science", score: 92, status: "High" },
  { name: "Priya Verma", id: "STU002", branch: "Information Technology", score: 85, status: "High" },
  { name: "Rahul Singh", id: "STU003", branch: "Computer Science", score: 68, status: "Medium" },
  { name: "Ananya Gupta", id: "STU004", branch: "Electronics", score: 54, status: "Low" },
];

function App() {
  return (
    <div className="min-h-screen bg-[#090B14] text-slate-100">
      <div className="flex min-h-screen">

        <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] bg-[#0D101B] p-6 lg:flex lg:flex-col">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
              <BrainCircuit size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PlacementIQ</h1>
              <p className="text-xs text-slate-500">Intelligence Platform</p>
            </div>
          </div>

          <p className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {[
              { name: "Dashboard", icon: LayoutDashboard, active: true },
              { name: "Students", icon: Users },
              { name: "Readiness Prediction", icon: BrainCircuit },
              { name: "Placement Analytics", icon: ChartNoAxesCombined },
              { name: "Skill Assessment", icon: GraduationCap },
            ].map((item) => (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  item.active
                    ? "bg-violet-600/15 font-semibold text-violet-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={19} />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5">
              <Settings size={19} /> Settings
            </button>
            <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/[0.08] p-4">
              <div className="mb-2 flex items-center gap-2 text-violet-400">
                <Activity size={18} />
                <span className="text-xs font-semibold">AI INSIGHTS</span>
              </div>
              <p className="text-xs leading-5 text-slate-400">
                Intelligent student readiness analysis powered by machine learning.
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-white/[0.07] pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold">Administrator</p>
                <p className="text-xs text-slate-500">Placement Cell</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-violet-400">Dashboard</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Dashboard Overview
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Monitor student performance and placement readiness.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-3 text-slate-400 hover:text-white sm:block">
                <Search size={19} />
              </button>
              <button className="relative rounded-xl border border-white/10 bg-white/[0.03] p-3 text-slate-400">
                <Bell size={19} />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-500" />
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm">
                <span>2026–27</span>
                <ChevronDown size={15} />
              </button>
            </div>
          </header>
          <div className="mb-8">
  <PredictionForm />
</div>

          <div className="mb-6 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] px-4 py-3 text-xs text-cyan-300">
            <Activity size={16} />
            Demo dashboard — sample data for interface development.
          </div>

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Total Students", value: "2,450", change: "+12.8%", icon: Users, color: "violet", positive: true },
              { title: "Placement Ready", value: "1,284", change: "+8.4%", icon: Target, color: "cyan", positive: true },
              { title: "Placed Students", value: "876", change: "+15.2%", icon: BriefcaseBusiness, color: "emerald", positive: true },
              { title: "Average Readiness", value: "78.6%", change: "-2.1%", icon: ChartNoAxesCombined, color: "amber", positive: false },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/[0.07] bg-[#111522] p-5 transition hover:-translate-y-1 hover:border-violet-500/30">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <div className={`rounded-xl bg-${card.color}-500/10 p-3 text-${card.color}-400`}>
                    <card.icon size={20} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{card.value}</h3>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  {card.positive ? (
                    <ArrowUpRight size={15} className="text-emerald-400" />
                  ) : (
                    <ArrowDownRight size={15} className="text-amber-400" />
                  )}
                  <span className={card.positive ? "text-emerald-400" : "text-amber-400"}>
                    {card.change}
                  </span>
                  <span className="text-slate-500">vs last semester</span>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-[#111522] p-5 xl:col-span-2">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Placement Performance</h3>
                  <p className="mt-1 text-xs text-slate-500">Student placement trends over time</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-2 text-violet-400">
                    <span className="h-2 w-2 rounded-full bg-violet-500" /> Registered
                  </span>
                  <span className="flex items-center gap-2 text-cyan-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" /> Placed
                  </span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={placementData}>
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#252A3A" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "#171C2B", border: "1px solid #33394C", borderRadius: 12 }} />
                    <Area type="monotone" dataKey="students" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#purpleGradient)" />
                    <Area type="monotone" dataKey="placed" stroke="#06B6D4" strokeWidth={2.5} fill="url(#cyanGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#111522] p-5">
              <h3 className="font-semibold">Readiness Distribution</h3>
              <p className="mt-1 text-xs text-slate-500">Student readiness categories</p>
              <div className="relative mt-3 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={readinessData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={5} stroke="none">
                      {readinessData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#171C2B", border: "1px solid #33394C", borderRadius: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">100%</span>
                  <span className="text-xs text-slate-500">Students</span>
                </div>
              </div>
              <div className="space-y-3">
                {readinessData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-400">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                      {item.name} readiness
                    </span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-[#111522] p-5">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">Student Readiness Overview</h3>
                <p className="mt-1 text-xs text-slate-500">Sample student assessment records</p>
              </div>
              <button className="rounded-lg border border-white/10 px-4 py-2 text-xs text-violet-400 hover:bg-violet-500/10">
                View all students
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] text-xs text-slate-500">
                    <th className="pb-4 font-medium">Student</th>
                    <th className="pb-4 font-medium">Student ID</th>
                    <th className="pb-4 font-medium">Branch</th>
                    <th className="pb-4 font-medium">Readiness Score</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-white/[0.05] last:border-0">
                      <td className="py-4 font-medium">{student.name}</td>
                      <td className="py-4 text-slate-500">{student.id}</td>
                      <td className="py-4 text-slate-400">{student.branch}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span>{student.score}%</span>
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${student.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          student.status === "High"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : student.status === "Medium"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="mt-8 flex flex-wrap justify-between gap-2 text-xs text-slate-600">
            <span>PlacementIQ · Student Intelligence Platform</span>
            <span>Built for smarter placement preparation</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
