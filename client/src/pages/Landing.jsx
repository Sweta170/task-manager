import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, Users, BarChart3, Zap, Shield, Clock,
  ArrowRight, Star, ChevronRight, Layout, Bell
} from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Role-Based Access Control',
    desc: 'Admins manage everything. Members update their tasks. Full security with JWT authentication.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Project Management',
    desc: 'Create projects, assign team members, set deadlines and track progress all in one place.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Kanban Task Board',
    desc: 'Visualize work with a Kanban-style board. Move tasks from To Do → In Progress → Done.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics Dashboard',
    desc: 'Interactive charts powered by Recharts give a real-time view of team performance and task status.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Overdue Detection',
    desc: 'Tasks automatically flagged overdue when deadlines pass — so nothing slips through the cracks.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Collaboration',
    desc: 'Assign tasks to specific members, filter by project, and search across your entire workspace.',
    color: 'from-indigo-500 to-blue-500',
  },
];

const stats = [
  { value: '100%', label: 'Secure Auth', icon: <Shield className="w-5 h-5" /> },
  { value: 'MERN', label: 'Full Stack', icon: <Zap className="w-5 h-5" /> },
  { value: 'Real-time', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
  { value: '24/7', label: 'Available', icon: <Clock className="w-5 h-5" /> },
];

const steps = [
  { num: '01', title: 'Create an Account', desc: 'Sign up as Admin or Member in seconds. No credit card needed.' },
  { num: '02', title: 'Set Up Projects', desc: 'Admins create projects and assign team members with a few clicks.' },
  { num: '03', title: 'Manage Tasks', desc: 'Add tasks, set priorities, assign deadlines, and track everything live.' },
];

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('opacity-0', !e.isIntersecting)),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TaskFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-pulse">
            <Star className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
            Production-Ready MERN Stack App
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Manage Your Team
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A full-stack Team Task Manager built with MongoDB, Express, React & Node.js.
            Role-based access, Kanban boards, real-time analytics — everything your team needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/login')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all hover:-translate-y-0.5"
            >
              Explore Features
            </a>
          </div>

          {/* Dashboard mockup card */}
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-900/30 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-slate-800/50">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="flex-1 mx-4 h-5 rounded bg-slate-700/60 text-xs text-slate-500 flex items-center px-3">
                task-manager-yeyz.vercel.app/dashboard
              </div>
            </div>
            {/* Fake dashboard content */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: 'Total Tasks', val: '24', color: 'from-blue-600 to-indigo-600' },
                { label: 'Completed', val: '14', color: 'from-emerald-600 to-teal-600' },
                { label: 'In Progress', val: '7', color: 'from-amber-500 to-orange-500' },
                { label: 'Overdue', val: '3', color: 'from-rose-600 to-pink-600' },
              ].map((card) => (
                <div key={card.label} className="rounded-xl bg-slate-800/60 p-4 border border-white/5">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>{card.val}</div>
                  <div className="text-xs text-slate-400 mt-1">{card.label}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid grid-cols-3 gap-3">
              {['Design Landing Page', 'Setup Database Schema', 'Build Auth Module'].map((task, i) => (
                <div key={task} className="rounded-lg bg-slate-800/40 border border-white/5 p-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-emerald-400' : i === 1 ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  <span className="text-xs text-slate-300 truncate">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-20 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Ship Faster</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Built with modern technology and designed for teams of any size.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl border border-white/5 bg-slate-900/50 hover:bg-slate-800/60 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="py-28 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Get Started in
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
            <p className="text-slate-400 text-lg">No setup complexity. Just sign up and start managing.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative flex flex-col items-center text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[-2rem] h-px bg-gradient-to-r from-indigo-500/40 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-black mb-4 shadow-xl shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                  {s.num}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm uppercase tracking-widest mb-8">Built With</p>
        <div className="flex flex-wrap justify-center gap-4">
          {['MongoDB', 'Express.js', 'React 19', 'Node.js', 'Vite', 'Tailwind CSS', 'JWT', 'Recharts'].map((tech) => (
            <div key={tech} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm font-medium hover:border-indigo-500/40 hover:text-white hover:bg-indigo-500/10 transition-all cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-violet-900/30 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Take Control
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              of Your Projects?
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join your team today and start managing tasks smarter.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:-translate-y-1"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-slate-300">TaskFlow</span>
        </div>
        <p>Built with ❤️ using MERN Stack · &copy; {new Date().getFullYear()} Sweta</p>
      </footer>

    </div>
  );
};

export default Landing;
