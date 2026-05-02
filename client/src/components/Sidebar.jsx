import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'Projects', path: '/app/projects', icon: FolderKanban },
  { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
];

const Sidebar = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column',
      background: isDarkMode ? 'rgba(8,8,16,0.95)' : 'rgba(255,255,255,0.98)',
      borderRight: isDarkMode ? '1px solid rgba(168,85,247,0.1)' : '1px solid rgba(0,0,0,0.06)',
      transition: 'background 0.3s',
    }} className="hidden md:flex">

      {/* Logo */}
      <div style={{
        height: '56px', display: 'flex', alignItems: 'center', padding: '0 20px',
        borderBottom: isDarkMode ? '1px solid rgba(168,85,247,0.1)' : '1px solid rgba(0,0,0,0.05)',
        cursor: 'pointer',
      }} onClick={() => navigate('/')}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px',
          boxShadow: '0 4px 12px rgba(168,85,247,0.4)',
        }}>
          <CheckCircle size={14} color="#fff" />
        </div>
        <span style={{
          fontWeight: 800, fontSize: '15px',
          background: 'linear-gradient(135deg,#a855f7,#6366f1)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          TaskFlow
        </span>
      </div>

      {/* Nav label */}
      <div style={{ padding: '20px 16px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)' }}>
        Menu
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink key={name} to={path} end={path === '/app'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 12px', borderRadius: '10px', textDecoration: 'none',
              fontSize: '13px', fontWeight: isActive ? 700 : 500,
              transition: 'all 0.2s',
              background: isActive
                ? isDarkMode ? 'rgba(168,85,247,0.15)' : 'rgba(99,102,241,0.08)'
                : 'transparent',
              color: isActive
                ? isDarkMode ? '#c084fc' : '#6366f1'
                : isDarkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
              borderLeft: isActive ? '3px solid #a855f7' : '3px solid transparent',
            })}
            onMouseEnter={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'; e.currentTarget.style.color = isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'; } }}
            onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) { e.currentTarget.style.background = 'transparent'; } }}
          >
            <Icon size={16} />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        margin: '12px', padding: '12px 14px', borderRadius: '12px',
        background: isDarkMode ? 'rgba(168,85,247,0.06)' : 'rgba(99,102,241,0.04)',
        border: isDarkMode ? '1px solid rgba(168,85,247,0.12)' : '1px solid rgba(99,102,241,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>All systems live</span>
        </div>
        <p style={{ fontSize: '10px', color: isDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)', margin: 0 }}>MERN Stack · v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
