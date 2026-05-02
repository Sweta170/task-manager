import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Projects', path: '/app/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
        <span className="text-2xl font-bold text-gradient tracking-tight">TeamTask</span>
      </div>
      <div className="flex-1 py-6 px-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(79,70,229,0.1)]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${item.path === window.location.pathname ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
