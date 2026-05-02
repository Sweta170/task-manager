import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, CheckCircle, Zap, Shield, BarChart3 } from 'lucide-react';

const Login = () => {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Member' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (user) return <Navigate to="/app" replace />;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Logged in successfully!');
      } else {
        await register(formData.name, formData.email, formData.password, formData.role);
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    { icon: <Shield size={15} />, text: 'JWT Secured Authentication' },
    { icon: <Zap size={15} />, text: 'Role-Based Access Control' },
    { icon: <BarChart3 size={15} />, text: 'Real-Time Analytics Dashboard' },
    { icon: <CheckCircle size={15} />, text: 'Kanban Task Management' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .login-wrap * { font-family:'Inter',sans-serif; box-sizing:border-box; }

        @keyframes blob { 0%,100%{transform:scale(1) translate(0,0);} 33%{transform:scale(1.08) translate(15px,-12px);} 66%{transform:scale(0.95) translate(-10px,10px);} }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px);} to{opacity:1;transform:translateX(0);} }
        @keyframes spin-slow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.5;} 100%{transform:scale(1.5);opacity:0;} }
        @keyframes shimmer { 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
        @keyframes particle { 0%{transform:translateY(0) rotate(0deg);opacity:1;} 100%{transform:translateY(-80px) rotate(360deg);opacity:0;} }

        .blob1 { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; animation:blob 9s ease-in-out infinite; }
        .blob2 { position:absolute; border-radius:50%; filter:blur(50px); pointer-events:none; animation:blob 12s ease-in-out infinite reverse; }

        .form-card {
          animation: fadeUp 0.7s ease forwards;
          background: rgba(15,12,35,0.75);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          color: #fff;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field:focus {
          border-color: rgba(168,85,247,0.7);
          background: rgba(168,85,247,0.06);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.12);
        }

        .select-field {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          color: #fff;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.25s;
        }
        .select-field:focus { border-color: rgba(168,85,247,0.7); }
        .select-field option { background: #1a1030; }

        .btn-submit {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #6366f1);
          background-size: 200% auto;
          box-shadow: 0 6px 25px rgba(168,85,247,0.4);
          transition: transform 0.2s, box-shadow 0.2s, background-position 0.4s;
          position: relative;
          overflow: hidden;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 35px rgba(168,85,247,0.55);
          background-position: right center;
        }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-submit::after {
          content:'';
          position:absolute;
          top:-50%; left:-60%;
          width:40%; height:200%;
          background:rgba(255,255,255,0.12);
          transform:skewX(-20deg);
          transition: left 0.5s;
        }
        .btn-submit:hover::after { left:120%; }

        .perk-item { animation: slideIn 0.5s ease forwards; opacity: 0; }
        .perk-item:nth-child(1){animation-delay:0.1s}
        .perk-item:nth-child(2){animation-delay:0.2s}
        .perk-item:nth-child(3){animation-delay:0.3s}
        .perk-item:nth-child(4){animation-delay:0.4s}

        .logo-ring {
          position:absolute; border-radius:50%;
          border: 1px solid rgba(168,85,247,0.3);
          animation: spin-slow 12s linear infinite;
        }
        .logo-ring-2 {
          position:absolute; border-radius:50%;
          border: 1px dashed rgba(99,102,241,0.25);
          animation: spin-slow 20s linear infinite reverse;
        }
        .pulse-dot::before {
          content:''; position:absolute; inset:0; border-radius:50%;
          border: 2px solid rgba(168,85,247,0.6);
          animation: pulse-ring 2s ease-out infinite;
        }

        .toggle-btn {
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600;
          background: linear-gradient(135deg, #a855f7, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: opacity 0.2s;
          animation: shimmer 3s linear infinite;
        }
        .toggle-btn:hover { opacity: 0.8; }

        .label { font-size:12px; font-weight:600; color:rgba(255,255,255,0.55); margin-bottom:6px; display:block; letter-spacing:0.02em; }

        .eye-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:rgba(255,255,255,0.35); cursor:pointer; display:flex; transition:color 0.2s; }
        .eye-btn:hover { color:rgba(255,255,255,0.7); }

        .back-link { background:none; border:none; cursor:pointer; font-size:12px; color:rgba(255,255,255,0.35); transition:color 0.2s; }
        .back-link:hover { color:rgba(255,255,255,0.7); }

        .divider { display:flex; align-items:center; gap:12px; margin:20px 0; }
        .divider-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .divider-text { font-size:11px; color:rgba(255,255,255,0.25); font-weight:500; }
      `}</style>

      <div className="login-wrap" style={{ minHeight:'100vh', display:'flex', background:'#080810', overflow:'hidden', position:'relative' }}>

        {/* Animated background blobs */}
        <div className="blob1" style={{ width:'500px', height:'500px', top:'10%', left:'-10%', background:'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)' }} />
        <div className="blob2" style={{ width:'600px', height:'600px', bottom:'5%', right:'-15%', background:'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)' }} />
        <div className="blob1" style={{ width:'300px', height:'300px', top:'60%', left:'30%', background:'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)', animationDelay:'4s' }} />

        {/* ── Left Panel ── */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'60px 60px', position:'relative', zIndex:10 }}
          className="hidden md:flex">
          {/* Logo */}
          <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'10px', background:'none', border:'none', cursor:'pointer', marginBottom:'60px' }}>
            <div style={{ position:'relative', width:'44px', height:'44px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div className="logo-ring" style={{ width:'44px', height:'44px', top:0, left:0 }} />
              <div className="logo-ring-2" style={{ width:'56px', height:'56px', top:'-6px', left:'-6px' }} />
              <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
                <CheckCircle size={16} color="#fff" />
              </div>
            </div>
            <span style={{ fontWeight:800, fontSize:'18px', color:'#fff' }}>TaskFlow</span>
          </button>

          {/* Headline */}
          <div style={{ marginBottom:'48px' }}>
            <h1 style={{ fontSize:'36px', fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:'14px', letterSpacing:'-0.02em' }}>
              The smarter way<br />
              <span style={{ background:'linear-gradient(135deg,#c084fc,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                to manage your team.
              </span>
            </h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.7, maxWidth:'320px' }}>
              Role-based access, Kanban boards, and real-time analytics — all in one beautiful dashboard.
            </p>
          </div>

          {/* Perks */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {perks.map((p, i) => (
              <div key={i} className="perk-item" style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'rgba(168,85,247,0.12)', border:'1px solid rgba(168,85,247,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'#a855f7', flexShrink:0 }}>
                  {p.icon}
                </div>
                <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.6)', fontWeight:500 }}>{p.text}</span>
              </div>
            ))}
          </div>

          {/* Floating card */}
          <div style={{ marginTop:'48px', animation:'float 5s ease-in-out infinite' }}>
            <div style={{ background:'rgba(168,85,247,0.08)', border:'1px solid rgba(168,85,247,0.2)', borderRadius:'16px', padding:'16px 20px', display:'inline-flex', gap:'14px', alignItems:'center' }}>
              <div style={{ position:'relative' }}>
                <div className="pulse-dot" style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#10b981', position:'relative' }} />
              </div>
              <div>
                <p style={{ fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.85)', margin:0 }}>Live Dashboard</p>
                <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', margin:0 }}>24 tasks · 3 projects active</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ width:'100%', maxWidth:'480px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'40px 32px', position:'relative', zIndex:10 }}>
          <div className="form-card" style={{ width:'100%', padding:'36px 32px' }}>

            {/* Header */}
            <div style={{ textAlign:'center', marginBottom:'28px' }}>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:'16px' }}>
                <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 25px rgba(168,85,247,0.4)' }}>
                  <CheckCircle size={22} color="#fff" />
                </div>
              </div>
              <h2 style={{ fontSize:'22px', fontWeight:800, color:'#fff', margin:'0 0 8px', letterSpacing:'-0.01em' }}>
                {isLogin ? 'Welcome back 👋' : 'Create an account'}
              </h2>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', margin:0 }}>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign up for free' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {!isLogin && (
                <div>
                  <label className="label">Full Name</label>
                  <input name="name" type="text" required className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
              )}

              <div>
                <label className="label">Email Address</label>
                <input name="email" type="email" required className="input-field" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div>
                <label className="label">Password</label>
                <div style={{ position:'relative' }}>
                  <input name="password" type={showPassword ? 'text' : 'password'} required className="input-field" style={{ paddingRight:'44px' }} placeholder="••••••••" value={formData.password} onChange={handleChange} />
                  <button type="button" className="eye-btn" tabIndex={-1} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="label">Role</label>
                  <select name="role" className="select-field" value={formData.role} onChange={handleChange}>
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-submit" style={{ marginTop:'4px' }}>
                {loading ? 'Processing...' : (isLogin ? 'Sign In →' : 'Create Account →')}
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">TaskFlow · MERN Stack</span>
              <div className="divider-line" />
            </div>

            <div style={{ textAlign:'center' }}>
              <button className="back-link" onClick={() => navigate('/')}>← Back to home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
