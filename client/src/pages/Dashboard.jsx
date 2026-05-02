import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock3, AlertTriangle, ListChecks, TrendingUp, ArrowRight, Flame, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', emoji: '☀️' };
  if (h < 17) return { text: 'Good afternoon', emoji: '🌤️' };
  return { text: 'Good evening', emoji: '🌙' };
};

const Dashboard = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const greeting = getGreeting();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks/stats/dashboard');
        setStats(res.data);
      } catch {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const dark = isDarkMode;

  const card = {
    background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
    border: dark ? '1px solid rgba(168,85,247,0.1)' : '1px solid rgba(0,0,0,0.06)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    boxShadow: dark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 2px 16px rgba(0,0,0,0.06)',
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid #a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>Loading workspace...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const COLORS = ['#818cf8', '#fbbf24', '#34d399'];
  const chartData = [
    { name: 'To Do', value: stats?.statusCounts?.['To Do'] || 0 },
    { name: 'In Progress', value: stats?.statusCounts?.['In Progress'] || 0 },
    { name: 'Completed', value: stats?.statusCounts?.['Completed'] || 0 },
  ];
  const total = stats?.totalTasks || 0;
  const completed = stats?.completedTasks || 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pctColor = pct >= 80 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#f43f5e';

  const statCards = [
    { label: 'All Tasks', val: total, icon: ListChecks, color: '#818cf8', bg: 'rgba(129,140,248,0.1)', note: 'total assigned' },
    { label: 'Done', val: completed, icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.1)', note: 'wrapped up' },
    { label: 'In Progress', val: stats?.pendingTasks || 0, icon: Clock3, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', note: 'still running' },
    { label: 'Overdue', val: stats?.overdueTasks || 0, icon: AlertTriangle, color: '#f87171', bg: 'rgba(248,113,113,0.1)', note: 'need attention' },
  ];

  return (
    <>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes countUp{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        @keyframes progressFill{from{width:0%}to{width:${pct}%}}
        @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.5}}
        .dash-card{transition:transform 0.25s,box-shadow 0.25s;}
        .dash-card:hover{transform:translateY(-3px);}
        .stat-num{animation:countUp 0.5s ease forwards;}
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeUp 0.5s ease forwards' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '4px' }}>
              {greeting.emoji} {greeting.text}
            </p>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: dark ? '#fff' : '#111', margin: 0, letterSpacing: '-0.02em' }}>
              {user?.name} <span style={{ fontWeight: 400, color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>— let's get things done.</span>
            </h1>
            <p style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', marginTop: '4px' }}>
              Here's a quick look at where things stand today.
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: dark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.07)',
            border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '6px 12px',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', animation: 'pulse2 2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>Live updates on</span>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="dash-card" style={{ ...card, padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={15} color="#a855f7" />
              <span style={{ fontSize: '15px', fontWeight: 600, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>Overall Completion</span>
            </div>
            <span style={{ fontSize: '26px', fontWeight: 900, color: pctColor }}>{pct}<span style={{ fontSize: '14px', fontWeight: 500, color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>%</span></span>
          </div>
          <div style={{ height: '8px', borderRadius: '999px', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, borderRadius: '999px', background: `linear-gradient(to right, ${pctColor}, ${pctColor}cc)`, boxShadow: `0 0 10px ${pctColor}60`, transition: 'width 1s ease', animation: 'progressFill 1.2s ease forwards' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
            <span>{completed} of {total} tasks completed</span>
            {total - completed > 0 && <span>{total - completed} remaining</span>}
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          {statCards.map(({ label, val, icon: Icon, color, bg, note }, i) => (
            <div key={label} className="dash-card" style={{ ...card, padding: '18px', animationDelay: `${i * 0.08}s` }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '12px' }}>
                <Icon size={16} />
              </div>
              <p className="stat-num" style={{ fontSize: '34px', fontWeight: 900, color: dark ? '#fff' : '#111', lineHeight: 1, margin: '0 0 6px' }}>{val}</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)', margin: 0 }}>{label}</p>
              <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)', marginTop: '2px' }}>{note}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '14px' }}>

          {/* Chart */}
          <div className="dash-card" style={{ ...card, padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)', margin: 0 }}>Task Breakdown</h3>
              <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>{total} total</span>
            </div>
            {total > 0 ? (
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                      {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip contentStyle={{
                      background: dark ? '#1a1030' : '#fff',
                      border: dark ? '1px solid rgba(168,85,247,0.2)' : '1px solid #e2e8f0',
                      borderRadius: '10px', fontSize: '12px', color: dark ? '#fff' : '#111',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }} />
                    <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <ListChecks size={36} color={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} />
                <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>No tasks yet — add some to get started</p>
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Status at a glance */}
            <div className="dash-card" style={{ ...card, padding: '18px 20px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                <Zap size={14} color="#f59e0b" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)', margin: 0 }}>Status at a glance</h3>
              </div>
              {[
                { label: 'To Do', val: stats?.statusCounts?.['To Do'] || 0, color: '#818cf8' },
                { label: 'In Progress', val: stats?.statusCounts?.['In Progress'] || 0, color: '#fbbf24' },
                { label: 'Completed', val: stats?.statusCounts?.['Completed'] || 0, color: '#34d399' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: dark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}80`, flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: dark ? '#fff' : '#111' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Overdue / All good */}
            {stats?.overdueTasks > 0 ? (
              <div className="dash-card" style={{ ...card, padding: '16px 18px', background: dark ? 'rgba(248,113,113,0.06)' : 'rgba(254,242,242,0.9)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(248,113,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Flame size={15} color="#f87171" />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#f87171', margin: '0 0 4px' }}>Behind on {stats.overdueTasks} task{stats.overdueTasks > 1 ? 's' : ''}</p>
                    <p style={{ fontSize: '13px', color: 'rgba(248,113,113,0.75)', margin: '0 0 8px', lineHeight: 1.5 }}>These have passed their deadline. Tackle them first!</p>
                    <a href="/app/tasks" style={{ fontSize: '13px', fontWeight: 600, color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                      View tasks <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dash-card" style={{ ...card, padding: '16px 18px', background: dark ? 'rgba(52,211,153,0.05)' : 'rgba(240,253,244,0.9)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={15} color="#34d399" />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', margin: '0 0 4px' }}>All caught up! 🎉</p>
                    <p style={{ fontSize: '13px', color: 'rgba(52,211,153,0.75)', margin: 0, lineHeight: 1.5 }}>No overdue tasks. You're doing great — keep it up.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
