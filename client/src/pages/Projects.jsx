import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { Plus, Users, Calendar, Trash2, FolderOpen, Clock, Folder, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const GRADIENTS = [
  { from: '#818cf8', to: '#6366f1' },
  { from: '#34d399', to: '#059669' },
  { from: '#fbbf24', to: '#f59e0b' },
  { from: '#f87171', to: '#ef4444' },
  { from: '#c084fc', to: '#a855f7' },
];

const Projects = () => {
  const { user } = useAuth();
  const { isDarkMode: dark } = useTheme();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', deadline: '', members: [] });

  const fetchProjects = async () => {
    try { const r = await api.get('/projects'); setProjects(r.data); }
    catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  const fetchUsers = async () => {
    try { const r = await api.get('/auth/users'); setUsers(r.data); }
    catch { console.error('Failed to load users'); }
  };

  useEffect(() => { fetchProjects(); if (user?.role === 'Admin') fetchUsers(); }, [user]);

  const handleMemberSelect = (e) => setFormData({ ...formData, members: Array.from(e.target.selectedOptions, o => o.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', formData);
      toast.success('Project created!');
      setShowModal(false);
      setFormData({ name: '', description: '', deadline: '', members: [] });
      fetchProjects();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create project'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project and all its tasks?')) return;
    try { await api.delete(`/projects/${id}`); toast.success('Project deleted'); fetchProjects(); }
    catch { toast.error('Failed to delete project'); }
  };

  const cardBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.95)';
  const cardBorder = dark ? '1px solid rgba(168,85,247,0.1)' : '1px solid rgba(0,0,0,0.07)';
  const cardShadow = dark ? '0 4px 24px rgba(0,0,0,0.35)' : '0 2px 20px rgba(0,0,0,0.06)';
  const inputStyle = {
    width: '100%', background: dark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
    border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
    borderRadius: '10px', padding: '10px 14px', fontSize: '13px',
    color: dark ? '#fff' : '#111', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  };
  const labelStyle = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '6px' };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid rgba(168,85,247,0.2)', borderTop: '3px solid #a855f7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>Loading projects...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .proj-card{transition:transform 0.25s ease,box-shadow 0.25s ease,border-color 0.25s ease;}
        .proj-card:hover{transform:translateY(-5px);}
        .del-btn{opacity:0;transition:opacity 0.2s;}
        .proj-card:hover .del-btn{opacity:1;}
        .new-btn{transition:transform 0.2s,box-shadow 0.2s;}
        .new-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(168,85,247,0.45)!important;}
        .modal-overlay{animation:fadeUp 0.2s ease forwards;}
        .modal-box{animation:modalIn 0.3s ease forwards;}
        .inp:focus{border-color:rgba(168,85,247,0.6)!important;box-shadow:0 0 0 3px rgba(168,85,247,0.1);}
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeUp 0.4s ease forwards' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a855f7', margin: '0 0 6px' }}>Your Workspace</p>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: dark ? '#fff' : '#111', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Projects</h1>
            <p style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', margin: 0 }}>
              {projects.length > 0 ? `You have ${projects.length} active ${projects.length === 1 ? 'project' : 'projects'} running.` : 'No projects yet — start by creating one.'}
            </p>
          </div>
          {user?.role === 'Admin' && (
            <button onClick={() => setShowModal(true)} className="new-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(168,85,247,0.4)' }}>
              <Plus size={15} /> New Project
            </button>
          )}
        </div>

        {/* ── Stats strip ── */}
        {projects.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Total Projects', val: projects.length, color: '#818cf8' },
              { label: 'Total Members', val: [...new Set(projects.flatMap(p => p.members))].length, color: '#34d399' },
              { label: 'With Deadline', val: projects.filter(p => p.deadline).length, color: '#fbbf24' },
            ].map(s => (
              <div key={s.label} style={{ background: cardBg, border: cardBorder, borderRadius: '12px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: cardShadow }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: s.color }}>{s.val}</span>
                <span style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Grid ── */}
        {projects.length === 0 ? (
          <div style={{ background: cardBg, border: `2px dashed ${dark ? 'rgba(168,85,247,0.2)' : 'rgba(99,102,241,0.2)'}`, borderRadius: '20px', padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: dark ? 'rgba(168,85,247,0.1)' : 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FolderOpen size={24} color={dark ? 'rgba(168,85,247,0.6)' : 'rgba(99,102,241,0.5)'} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', margin: '0 0 8px' }}>No projects yet</p>
            {user?.role === 'Admin' && (
              <button onClick={() => setShowModal(true)} style={{ fontSize: '13px', color: '#a855f7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Create your first project <ArrowRight size={13} />
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {projects.map((project, i) => {
              const g = GRADIENTS[i % GRADIENTS.length];
              const daysLeft = project.deadline ? Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
              const isOverdue = daysLeft !== null && daysLeft < 0;
              return (
                <div key={project._id} className="proj-card"
                  style={{ background: cardBg, border: cardBorder, borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: cardShadow, position: 'relative' }}>

                  {/* Top gradient bar */}
                  <div style={{ height: '4px', background: `linear-gradient(to right, ${g.from}, ${g.to})` }} />

                  {/* Card icon accent */}
                  <div style={{ padding: '18px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `linear-gradient(135deg,${g.from}22,${g.to}22)`, border: `1px solid ${g.from}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Folder size={18} color={g.from} />
                    </div>
                    {user?.role === 'Admin' && (
                      <button className="del-btn" onClick={() => handleDelete(project._id)}
                        style={{ width: '30px', height: '30px', borderRadius: '8px', background: dark ? 'rgba(248,113,113,0.1)' : 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <div style={{ padding: '14px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: dark ? '#fff' : '#111', margin: '0 0 6px', lineHeight: 1.3 }}>{project.name}</h3>
                    <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)', lineHeight: 1.6, flex: 1, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description || 'No description provided.'}
                    </p>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                        <Users size={13} />
                        <span>{project.members.length} {project.members.length === 1 ? 'member' : 'members'}</span>
                      </div>
                      {project.deadline ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: isOverdue ? '#f87171' : daysLeft <= 3 ? '#fbbf24' : dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                          <Calendar size={11} />
                          <span>{isOverdue ? 'Overdue' : daysLeft === 0 ? 'Due today' : new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>No deadline</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box" style={{ background: dark ? '#0f0a20' : '#fff', border: dark ? '1px solid rgba(168,85,247,0.2)' : '1px solid #e2e8f0', borderRadius: '20px', width: '100%', maxWidth: '440px', boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(168,85,247,0.1)', overflow: 'hidden' }}>

            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: dark ? 'rgba(168,85,247,0.05)' : 'rgba(99,102,241,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Folder size={15} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: dark ? '#fff' : '#111', margin: 0 }}>New Project</h3>
                  <p style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)', margin: 0 }}>Fill in the details to get started</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)}
                style={{ width: '28px', height: '28px', borderRadius: '8px', background: dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: 'none', cursor: 'pointer', fontSize: '16px', color: dark ? 'rgba(255,255,255,0.5)' : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ×
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Project Name</label>
                <input type="text" required className="inp" placeholder="e.g. Website Redesign"
                  style={inputStyle} value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Description <span style={{ textTransform: 'none', fontWeight: 400 }}>(optional)</span></label>
                <textarea placeholder="What's this project about?" rows={2} className="inp"
                  style={{ ...inputStyle, resize: 'none' }} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> Deadline</label>
                  <input type="date" className="inp" style={inputStyle} value={formData.deadline}
                    onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                </div>
                <div>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={10} /> Members</label>
                  <select multiple className="inp" style={{ ...inputStyle, minHeight: '72px', padding: '6px 10px' }}
                    value={formData.members} onChange={handleMemberSelect}>
                    {users.map(u => <option key={u._id} value={u._id} style={{ background: dark ? '#1a1030' : '#fff', padding: '4px' }}>{u.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '6px', borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
                <button type="button" onClick={() => setShowModal(false)}
                  style={{ padding: '9px 16px', borderRadius: '10px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0', background: 'transparent', color: dark ? 'rgba(255,255,255,0.5)' : '#666', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ padding: '9px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(168,85,247,0.4)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
