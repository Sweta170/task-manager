import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User as UserIcon, Moon, Sun, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header style={{
      background: isDarkMode ? 'rgba(8,8,16,0.85)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: isDarkMode ? '1px solid rgba(168,85,247,0.12)' : '1px solid rgba(0,0,0,0.06)',
      position: 'sticky', top: 0, zIndex: 40,
      transition: 'background 0.3s',
    }}>
      <div style={{ maxWidth: '100%', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>

        {/* Mobile logo */}
        <span className="md:hidden" style={{ marginRight: 'auto', fontWeight: 800, fontSize: '16px', background: 'linear-gradient(135deg,#a855f7,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          TaskFlow
        </span>

        {/* Theme toggle */}
        <button onClick={toggleTheme}
          style={{
            width: '34px', height: '34px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: isDarkMode ? 'rgba(168,85,247,0.1)' : 'rgba(99,102,241,0.08)',
            color: isDarkMode ? '#c084fc' : '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'rotate(20deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />

        {/* User badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: isDarkMode ? 'rgba(168,85,247,0.08)' : 'rgba(99,102,241,0.06)',
          border: isDarkMode ? '1px solid rgba(168,85,247,0.15)' : '1px solid rgba(99,102,241,0.12)',
          borderRadius: '10px', padding: '5px 10px',
        }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '8px',
            background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <UserIcon size={13} color="#fff" />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#374151' }}>
            {user?.name}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '6px',
            background: isDarkMode ? 'rgba(168,85,247,0.2)' : 'rgba(99,102,241,0.1)',
            color: isDarkMode ? '#c084fc' : '#6366f1',
          }}>
            {user?.role}
          </span>
        </div>

        {/* Logout */}
        <button onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: isDarkMode ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)',
            border: isDarkMode ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(239,68,68,0.12)',
            borderRadius: '10px', padding: '6px 12px', cursor: 'pointer',
            color: '#ef4444', fontSize: '12px', fontWeight: 600,
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDarkMode ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <LogOut size={13} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
