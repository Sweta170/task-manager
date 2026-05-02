import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock3, AlertTriangle, ListChecks, TrendingUp, ArrowRight, Flame, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const getProgressColor = (val, total) => {
  if (!total) return 'bg-slate-300 dark:bg-slate-700';
  const pct = val / total;
  if (pct >= 0.8) return 'bg-emerald-500';
  if (pct >= 0.4) return 'bg-amber-400';
  return 'bg-rose-500';
};

const Dashboard = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks/stats/dashboard');
        setStats(res.data);
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#818cf8', '#fbbf24', '#34d399'];
  const chartData = stats ? [
    { name: 'To Do', value: stats.statusCounts['To Do'] || 0 },
    { name: 'In Progress', value: stats.statusCounts['In Progress'] || 0 },
    { name: 'Completed', value: stats.statusCounts['Completed'] || 0 },
  ] : [];

  const total = stats?.totalTasks || 0;
  const completed = stats?.completedTasks || 0;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-8">

      {/* Header — warm, personal greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-1 tracking-wide uppercase">
            {getGreeting()}
          </p>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {user?.name} <span className="text-slate-400 dark:text-slate-500 font-normal">— let's get things done.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Here's a quick look at where things stand today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          Live updates on
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Overall Completion</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{completionPct}<span className="text-base font-normal text-slate-400 dark:text-slate-500">%</span></span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getProgressColor(completed, total)}`}
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400 dark:text-slate-500">
          <span>{completed} of {total} tasks completed</span>
          {total - completed > 0 && <span>{total - completed} remaining</span>}
        </div>
      </div>

      {/* Stat Cards — compact, human-scale */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'All Tasks', val: stats?.totalTasks || 0, icon: ListChecks, accent: 'indigo', note: 'total assigned' },
          { label: 'Done', val: stats?.completedTasks || 0, icon: CheckCircle2, accent: 'emerald', note: 'wrapped up' },
          { label: 'In Progress', val: stats?.pendingTasks || 0, icon: Clock3, accent: 'amber', note: 'still running' },
          { label: 'Overdue', val: stats?.overdueTasks || 0, icon: AlertTriangle, accent: 'rose', note: 'need attention' },
        ].map(({ label, val, icon: Icon, accent, note }) => (
          <div key={label} className={`glass-panel rounded-2xl p-4 border transition-all duration-200 glass-hover
            ${accent === 'indigo' ? 'border-indigo-100 dark:border-indigo-500/10' : ''}
            ${accent === 'emerald' ? 'border-emerald-100 dark:border-emerald-500/10' : ''}
            ${accent === 'amber' ? 'border-amber-100 dark:border-amber-500/10' : ''}
            ${accent === 'rose' ? 'border-rose-100 dark:border-rose-500/10' : ''}
          `}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3
              ${accent === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : ''}
              ${accent === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}
              ${accent === 'amber' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' : ''}
              ${accent === 'rose' ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : ''}
            `}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 leading-none mb-1">{val}</p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{note}</p>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Chart — takes 3 cols */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">Task breakdown</h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">{total} total</span>
          </div>

          {total > 0 ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    color: isDarkMode ? '#f1f5f9' : '#0f172a',
                    borderRadius: '10px',
                    fontSize: '13px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                  }} itemStyle={{ color: isDarkMode ? '#e2e8f0' : '#0f172a' }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-56 flex flex-col items-center justify-center text-center gap-2">
              <ListChecks className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-400 dark:text-slate-500 text-sm">No tasks yet — add some to get started</p>
            </div>
          )}
        </div>

        {/* Sidebar panels — takes 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Quick status */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status at a glance</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'To Do', val: stats?.statusCounts?.['To Do'] || 0, color: 'bg-indigo-400' },
                { label: 'In Progress', val: stats?.statusCounts?.['In Progress'] || 0, color: 'bg-amber-400' },
                { label: 'Completed', val: stats?.statusCounts?.['Completed'] || 0, color: 'bg-emerald-400' },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">{label}</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue nudge — only show if overdue > 0 */}
          {stats?.overdueTasks > 0 ? (
            <div className="glass-panel rounded-2xl p-5 border border-rose-200 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-500/5">
              <div className="flex items-start gap-3">
                <div className="bg-rose-100 dark:bg-rose-500/10 p-2 rounded-lg shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">You're behind on {stats.overdueTasks} {stats.overdueTasks === 1 ? 'task' : 'tasks'}</p>
                  <p className="text-xs text-rose-500 dark:text-rose-400/80 mt-1 leading-relaxed">These have passed their deadline. Tackle them first!</p>
                  <a href="/tasks" className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline">
                    View tasks <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-5 border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">All caught up!</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400/80 mt-1 leading-relaxed">No overdue tasks. You're doing great — keep it up.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
