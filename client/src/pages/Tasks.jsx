import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { Plus, Search, Calendar, AlertCircle, CheckCircle2, Clock3, ListChecks, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const priorityConfig = {
  High:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.25)', dot: '#f87171' },
  Medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.25)',  dot: '#fbbf24' },
  Low:    { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.25)',  dot: '#34d399' },
};

const columns = [
  { title: 'To Do',       status: 'To Do',       icon: ListChecks,   color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
  { title: 'In Progress', status: 'In Progress', icon: Clock3,       color: '#fbbf24', bg: 'rgba(251,191,36,0.06)',  border: 'rgba(251,191,36,0.2)'  },
  { title: 'Completed',   status: 'Completed',   icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.2)'  },
];

const Tasks = () => {
  const { user } = useAuth();
  const { isDarkMode: dark } = useTheme();
  const [tasks, setTasks]       = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [projectId, setProjectId] = useState('');
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData]   = useState({ title: '', description: '', assignedTo: '', projectId: '', status: 'To Do', priority: 'Medium', deadline: '' });

  const fetchData = async () => {
    try {
      const [tRes, pRes] = await Promise.all([api.get('/tasks', { params: { projectId, search } }), api.get('/projects')]);
      setTasks(tRes.data); setProjects(pRes.data);
      if (user?.role === 'Admin') { const uRes = await api.get('/auth/users'); setUsers(uRes.data); }
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [projectId, search, user]);

  const handleStatusChange = async (id, status) => {
    try { await api.put(`/tasks/${id}`, { status }); fetchData(); }
    catch { toast.error('Failed to update status'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      toast.success('Task created!');
      setShowModal(false);
      setFormData({ title: '', description: '', assignedTo: '', projectId: '', status: 'To Do', priority: 'Medium', deadline: '' });
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create task'); }
  };

  const card = { background: dark ? 'rgba(255,255,255,0.03)' : '#fff', border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)', borderRadius: '14px', boxShadow: dark ? '0 2px 16px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)' };
  const inputSt = { width: '100%', background: dark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: dark ? '#fff' : '#111', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' };
  const labelSt = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '6px' };

  const TaskCard = ({ task }) => {
    const p = priorityConfig[task.priority] || priorityConfig.Medium;
    const dateStr = task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date';
    return (
      <div style={{ ...card, padding: '14px', marginBottom: '10px', cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s', borderLeft: task.isOverdue ? '3px solid #f87171' : `3px solid ${p.dot}` }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = dark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = dark ? '0 2px 16px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)'; }}>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: dark ? '#fff' : '#111', lineHeight: 1.3, margin: 0 }}>{task.title}</p>
          {task.isOverdue && <AlertCircle size={14} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />}
        </div>

        {/* Description */}
        {task.description && (
          <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)', lineHeight: 1.6, margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {task.description}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: p.bg, border: `1px solid ${p.border}`, color: p.color }}>{task.priority}</span>
          {task.projectId?.name && (
            <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 8px', borderRadius: '6px', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              {task.projectId.name}
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: task.isOverdue ? '#f87171' : dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', fontWeight: task.isOverdue ? 600 : 400 }}>
            <Calendar size={11} /> {dateStr}
          </div>
          <select value={task.status} onChange={e => handleStatusChange(task._id, e.target.value)}
            style={{ fontSize: '11px', fontWeight: 600, padding: '4px 8px', borderRadius: '8px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', background: dark ? 'rgba(255,255,255,0.06)' : '#f8fafc', color: dark ? 'rgba(255,255,255,0.7)' : '#374151', outline: 'none', cursor: 'pointer' }}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid #a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>Loading tasks...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        .inp-field:focus{border-color:rgba(168,85,247,0.6)!important;box-shadow:0 0 0 3px rgba(168,85,247,0.1)!important;}
        .add-btn{transition:transform 0.2s,box-shadow 0.2s;}
        .add-btn:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(168,85,247,0.45)!important;}
        .col-scroll::-webkit-scrollbar{width:4px;}
        .col-scroll::-webkit-scrollbar-thumb{background:rgba(168,85,247,0.2);border-radius:4px;}
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', animation: 'fadeUp 0.4s ease forwards' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a855f7', margin: '0 0 5px' }}>Kanban Board</p>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: dark ? '#fff' : '#111', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Tasks</h1>
            <p style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', margin: 0 }}>
              {tasks.length > 0 ? `${tasks.length} task${tasks.length !== 1 ? 's' : ''} across all your projects.` : 'Nothing here yet — add your first task!'}
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }} />
              <input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} className="inp-field"
                style={{ ...inputSt, width: '180px', paddingLeft: '32px' }} />
            </div>

            {/* Project filter */}
            <select value={projectId} onChange={e => setProjectId(e.target.value)} className="inp-field"
              style={{ ...inputSt, width: 'auto' }}>
              <option value="">All Projects</option>
              {projects.map(p => <option key={p._id} value={p._id} style={{ background: dark ? '#1a1030' : '#fff' }}>{p.name}</option>)}
            </select>

            {/* Add Task */}
            {user?.role === 'Admin' && (
              <button onClick={() => setShowModal(true)} className="add-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 18px rgba(168,85,247,0.38)', whiteSpace: 'nowrap' }}>
                <Plus size={15} /> Add Task
              </button>
            )}
          </div>
        </div>

        {/* ── Kanban Columns ── */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', minHeight: 0 }}>
          {columns.map(col => {
            const Icon = col.icon;
            const colTasks = tasks.filter(t => t.status === col.status);
            return (
              <div key={col.status} style={{ display: 'flex', flexDirection: 'column', borderRadius: '18px', background: dark ? col.bg : `${col.bg}`, border: dark ? `1px solid ${col.border}` : `1px solid ${col.border}`, overflow: 'hidden', minHeight: 0 }}>

                {/* Column header */}
                <div style={{ padding: '14px 16px', borderBottom: dark ? `1px solid ${col.border}` : `1px solid ${col.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: `${col.color}18`, border: `1px solid ${col.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={15} color={col.color} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: dark ? '#fff' : '#111' }}>{col.title}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', background: `${col.color}15`, color: col.color, border: `1px solid ${col.color}30` }}>
                    {colTasks.length}
                  </span>
                </div>

                {/* Tasks */}
                <div className="col-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                  {colTasks.length === 0 ? (
                    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${col.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={13} color={`${col.color}60`} />
                      </div>
                      <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)', fontStyle: 'italic' }}>Nothing here</p>
                    </div>
                  ) : (
                    colTasks.map(task => <TaskCard key={task._id} task={task} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: dark ? '#0f0a20' : '#fff', border: dark ? '1px solid rgba(168,85,247,0.2)' : '1px solid #e2e8f0', borderRadius: '20px', width: '100%', maxWidth: '460px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 40px rgba(168,85,247,0.08)', animation: 'modalIn 0.3s ease forwards' }}>

            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: dark ? 'rgba(168,85,247,0.05)' : 'rgba(99,102,241,0.02)', borderRadius: '20px 20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckSquare size={15} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: dark ? '#fff' : '#111', margin: 0 }}>New Task</h3>
                  <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', margin: 0 }}>What needs to get done?</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)}
                style={{ width: '28px', height: '28px', borderRadius: '8px', background: dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: '16px', color: dark ? 'rgba(255,255,255,0.5)' : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ×
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <form id="task-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelSt}>Task Title</label>
                  <input type="text" required className="inp-field" placeholder="e.g. Design landing page" style={inputSt} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div>
                  <label style={labelSt}>Description <span style={{ textTransform: 'none', fontWeight: 400 }}>(optional)</span></label>
                  <textarea rows={2} className="inp-field" placeholder="Any additional context..." style={{ ...inputSt, resize: 'none' }} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelSt}>Project</label>
                    <select required className="inp-field" style={inputSt} value={formData.projectId} onChange={e => setFormData({ ...formData, projectId: e.target.value })}>
                      <option value="">Pick project</option>
                      {projects.map(p => <option key={p._id} value={p._id} style={{ background: dark ? '#1a1030' : '#fff' }}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelSt}>Assign To</label>
                    <select className="inp-field" style={inputSt} value={formData.assignedTo} onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}>
                      <option value="">Unassigned</option>
                      {users.map(u => <option key={u._id} value={u._id} style={{ background: dark ? '#1a1030' : '#fff' }}>{u.name}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelSt}>Priority</label>
                    <select className="inp-field" style={inputSt} value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelSt}>Deadline</label>
                    <input type="date" className="inp-field" style={inputSt} value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div style={{ padding: '16px 24px', borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowModal(false)}
                style={{ padding: '9px 16px', borderRadius: '10px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', background: 'transparent', color: dark ? 'rgba(255,255,255,0.5)' : '#666', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" form="task-form"
                style={{ padding: '9px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(168,85,247,0.4)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
