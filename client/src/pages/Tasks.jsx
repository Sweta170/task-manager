import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Plus, Search, Calendar, AlertCircle, CheckCircle2, Clock3, ListChecks } from 'lucide-react';
import toast from 'react-hot-toast';

const priorityConfig = {
  High:   { label: 'High',   classes: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20' },
  Medium: { label: 'Medium', classes: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20' },
  Low:    { label: 'Low',    classes: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' },
};

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks]       = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [projectId, setProjectId] = useState('');
  const [search, setSearch]       = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', assignedTo: '', projectId: '',
    status: 'To Do', priority: 'Medium', deadline: ''
  });

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks', { params: { projectId, search } }),
        api.get('/projects')
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      if (user?.role === 'Admin') {
        const usersRes = await api.get('/auth/users');
        setUsers(usersRes.data);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [projectId, search, user]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      fetchData();
    } catch { toast.error('Failed to update status'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      toast.success('Task created!');
      setShowTaskModal(false);
      setFormData({ title: '', description: '', assignedTo: '', projectId: '', status: 'To Do', priority: 'Medium', deadline: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const columns = [
    { title: 'To Do',       status: 'To Do',       icon: ListChecks,    accent: 'text-slate-500 dark:text-slate-400',   header: 'border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40' },
    { title: 'In Progress', status: 'In Progress', icon: Clock3,        accent: 'text-indigo-500 dark:text-indigo-400', header: 'border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-900/20' },
    { title: 'Completed',   status: 'Completed',   icon: CheckCircle2,  accent: 'text-emerald-500 dark:text-emerald-400', header: 'border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/20' },
  ];

  const TaskCard = ({ task }) => (
    <div className={`bg-white dark:bg-slate-800/60 rounded-xl p-4 mb-3 border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group
      ${task.isOverdue ? 'border-rose-200 dark:border-rose-500/30' : 'border-slate-200 dark:border-slate-700/50'}`
    }>
      {/* Title row */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {task.title}
        </p>
        {task.isOverdue && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed mb-3">{task.description}</p>
      )}

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${priorityConfig[task.priority]?.classes}`}>
          {task.priority}
        </span>
        {task.projectId?.name && (
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {task.projectId.name}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Calendar className="w-3 h-3" />
          <span>{task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}</span>
        </div>
        <select
          className="text-xs bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
          value={task.status}
          onChange={(e) => handleStatusChange(task._id, e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-1 tracking-wide uppercase">Kanban Board</p>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {tasks.length > 0 ? `${tasks.length} tasks across all your projects.` : 'Nothing here yet — add your first task!'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 w-full sm:w-44"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="py-2 px-3 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">All Projects</option>
            {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>

          {/* Add Task */}
          {user?.role === 'Admin' && (
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl transition-all text-sm font-semibold shadow-lg shadow-indigo-500/20 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
        {columns.map(col => {
          const Icon = col.icon;
          const colTasks = tasks.filter(t => t.status === col.status);
          return (
            <div key={col.status} className={`rounded-2xl border flex flex-col overflow-hidden ${col.header}`}>
              {/* Column Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-inherit">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${col.accent}`} />
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{col.title}</h3>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700/50">
                  {colTasks.length}
                </span>
              </div>

              {/* Task list */}
              <div className="p-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-24 flex items-center justify-center">
                    <p className="text-xs text-slate-400 dark:text-slate-600 italic">Nothing here</p>
                  </div>
                ) : (
                  colTasks.map(task => <TaskCard key={task._id} task={task} />)
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700/60 overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">New Task</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">What needs to get done?</p>
              </div>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Task Title</label>
                  <input
                    type="text" required
                    placeholder="e.g. Design landing page"
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Description <span className="font-normal normal-case">(optional)</span></label>
                  <textarea
                    placeholder="Any additional context..."
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 resize-none"
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Project</label>
                    <select required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={formData.projectId}
                      onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    >
                      <option value="">Pick project</option>
                      {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Assign To</label>
                    <select
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    >
                      <option value="">Unassigned</option>
                      {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Priority</label>
                    <select
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Deadline</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit" form="task-form"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-500/20"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
