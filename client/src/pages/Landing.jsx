import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Users, BarChart3, Zap, Shield, Clock, ArrowRight, Layout, Bell, ChevronRight } from 'lucide-react';

const features = [
  { icon: <Shield className="w-5 h-5" />, title: 'Role-Based Access Control', desc: 'JWT-secured auth with Admin & Member roles for full access control.', color: '#a855f7' },
  { icon: <Layout className="w-5 h-5" />, title: 'Project Management', desc: 'Create projects, assign members, set deadlines — all in one view.', color: '#6366f1' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Kanban Task Board', desc: 'Move tasks from To Do → In Progress → Done visually.', color: '#8b5cf6' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Live Analytics', desc: 'Interactive Recharts dashboard showing real-time team performance.', color: '#a855f7' },
  { icon: <Bell className="w-5 h-5" />, title: 'Overdue Alerts', desc: 'Tasks are auto-flagged when deadlines pass. Nothing gets missed.', color: '#7c3aed' },
  { icon: <Users className="w-5 h-5" />, title: 'Team Collaboration', desc: 'Assign tasks, filter by project, and search your workspace.', color: '#6366f1' },
];

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up as Admin or Member in seconds.' },
  { num: '02', title: 'Set Up Projects', desc: 'Create projects and assign your team members.' },
  { num: '03', title: 'Track Tasks', desc: 'Add tasks, set priorities and monitor progress.' },
];

const techs = ['MongoDB', 'Express.js', 'React 19', 'Node.js', 'Vite', 'Tailwind CSS', 'JWT', 'Recharts'];

export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const revealRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries =>
      entries.forEach(e => e.isIntersecting && e.target.classList.add('vis')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleTry = () => navigate('/login');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { font-family:'Inter',sans-serif; box-sizing:border-box; margin:0; padding:0; }

        .rv { opacity:0; transform:translateY(24px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .rv.vis { opacity:1; transform:translateY(0); }
        .d1{transition-delay:0.1s} .d2{transition-delay:0.2s} .d3{transition-delay:0.3s}
        .d4{transition-delay:0.4s} .d5{transition-delay:0.5s} .d6{transition-delay:0.6s}

        @keyframes blob { 0%,100%{transform:scale(1) translate(0,0);} 33%{transform:scale(1.05) translate(10px,-10px);} 66%{transform:scale(0.97) translate(-8px,8px);} }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes shimmer { 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
        @keyframes glow { 0%,100%{box-shadow:0 0 30px rgba(168,85,247,0.3);} 50%{box-shadow:0 0 60px rgba(168,85,247,0.6);} }

        .blob1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%); animation:blob 8s ease-in-out infinite; filter:blur(40px); pointer-events:none; }
        .blob2 { position:absolute; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(168,85,247,0.3),transparent 70%); animation:blob 10s ease-in-out infinite reverse; filter:blur(50px); pointer-events:none; }

        .hero-badge { animation:fadeUp 0.6s ease forwards; }
        .hero-h1 { animation:fadeUp 0.7s 0.1s ease forwards; opacity:0; }
        .hero-p { animation:fadeUp 0.7s 0.2s ease forwards; opacity:0; }
        .hero-cta { animation:fadeUp 0.7s 0.3s ease forwards; opacity:0; }
        .mockup { animation:float 5s ease-in-out infinite; }

        .shimmer-text {
          background:linear-gradient(90deg,#fff,#c084fc,#818cf8,#fff,#c084fc);
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }

        .btn-primary {
          background:linear-gradient(135deg,#7c3aed,#a855f7);
          box-shadow:0 0 25px rgba(168,85,247,0.4);
          transition:transform 0.2s,box-shadow 0.2s;
          border:none; cursor:pointer;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 40px rgba(168,85,247,0.6); animation:glow 2s ease-in-out infinite; }

        .feat-card {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          transition:transform 0.3s,background 0.3s,border-color 0.3s;
          border-radius:16px; padding:24px;
        }
        .feat-card:hover { transform:translateY(-6px); background:rgba(168,85,247,0.08); border-color:rgba(168,85,247,0.3); }

        .step-card {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; padding:28px 24px;
          transition:transform 0.3s,border-color 0.3s;
          text-align:center;
        }
        .step-card:hover { transform:translateY(-5px); border-color:rgba(168,85,247,0.4); }

        .tech-pill {
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:999px; padding:8px 18px;
          font-size:12px; font-weight:600; color:rgba(255,255,255,0.6);
          transition:all 0.2s; cursor:default;
        }
        .tech-pill:hover { background:rgba(168,85,247,0.15); border-color:rgba(168,85,247,0.5); color:#c084fc; transform:translateY(-2px); }

        .email-input {
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:12px; padding:12px 16px;
          color:#fff; font-size:13px; outline:none;
          transition:border-color 0.2s;
          width:220px;
        }
        .email-input::placeholder { color:rgba(255,255,255,0.35); }
        .email-input:focus { border-color:rgba(168,85,247,0.7); }

        .nav-link { color:rgba(255,255,255,0.55); font-size:13px; font-weight:500; text-decoration:none; transition:color 0.2s; }
        .nav-link:hover { color:#fff; }

        .section-label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#a855f7; margin-bottom:10px; }
      `}</style>

      <div style={{ background:'#080810', minHeight:'100vh', color:'#fff', overflowX:'hidden' }}>

        {/* Navbar */}
        <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, background:'rgba(8,8,16,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.06)', height:'56px', display:'flex', alignItems:'center' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 24px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <CheckCircle size={14} color="#fff" />
              </div>
              <span style={{ fontWeight:800, fontSize:'15px' }}>TaskFlow</span>
            </div>
            <div style={{ display:'flex', gap:'28px' }}>
              {['#features','#how-it-works','#tech'].map((h,i) => (
                <a key={h} href={h} className="nav-link">{['Features','How it Works','Tech Stack'][i]}</a>
              ))}
            </div>
            <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
              <button onClick={() => navigate('/login')} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.6)', fontSize:'13px', fontWeight:500, cursor:'pointer', padding:'6px 12px' }}>Sign In</button>
              <button onClick={() => navigate('/login')} className="btn-primary" style={{ color:'#fff', fontWeight:700, fontSize:'13px', padding:'8px 18px', borderRadius:'10px', display:'flex', alignItems:'center', gap:'6px' }}>
                Sign up Free <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingTop:'80px', overflow:'hidden', textAlign:'center' }}>
          <div className="blob1" style={{ top:'10%', left:'-10%' }} />
          <div className="blob2" style={{ top:'20%', right:'-8%' }} />
          <div className="blob1" style={{ bottom:'5%', left:'40%', width:'600px', height:'300px', opacity:0.5 }} />

          <div style={{ position:'relative', zIndex:10, maxWidth:'700px', padding:'0 24px' }}>
            {/* Badge */}
            <div className="hero-badge" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'999px', padding:'6px 14px', fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.75)', marginBottom:'28px' }}>
              <span>🌟</span> Production-Ready MERN Stack App
            </div>

            <h1 className="hero-h1" style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:'18px' }}>
              Streamlined Task Management<br />
              <span className="shimmer-text">for Teams and Individuals</span>
            </h1>

            <p className="hero-p" style={{ fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:1.7, maxWidth:'480px', margin:'0 auto 32px' }}>
              In today's fast-paced world, staying organized and on track can be challenging, whether you're working alone or as part of a team.
            </p>

            <div className="hero-cta" style={{ display:'flex', gap:'10px', justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
              <input
                className="email-input"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button onClick={handleTry} className="btn-primary" style={{ color:'#fff', fontWeight:700, fontSize:'13px', padding:'12px 22px', borderRadius:'12px', display:'flex', alignItems:'center', gap:'8px' }}>
                Try it Free <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Mockup */}
          <div className="mockup" style={{ position:'relative', zIndex:10, marginTop:'56px', maxWidth:'900px', width:'100%', padding:'0 20px' }}>
            <div style={{ background:'rgba(20,18,35,0.9)', border:'1px solid rgba(168,85,247,0.25)', borderRadius:'20px', overflow:'hidden', boxShadow:'0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(168,85,247,0.1)' }}>
              {/* Browser bar */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#f87171' }} />
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#fbbf24' }} />
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#34d399' }} />
                <div style={{ flex:1, margin:'0 12px', background:'rgba(255,255,255,0.06)', borderRadius:'6px', padding:'4px 10px', fontSize:'11px', color:'rgba(255,255,255,0.3)' }}>
                  task-manager-yeyz.vercel.app/app
                </div>
              </div>
              {/* 3-panel layout */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr 1fr', gap:'1px', background:'rgba(255,255,255,0.05)', minHeight:'220px' }}>
                {/* Panel 1 - Create Task */}
                <div style={{ background:'rgba(14,12,28,0.95)', padding:'18px' }}>
                  <p style={{ fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.85)', marginBottom:'12px' }}>Create New Task</p>
                  <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:'8px', padding:'10px', marginBottom:'10px', fontSize:'11px', color:'rgba(255,255,255,0.3)', border:'1px solid rgba(255,255,255,0.07)', minHeight:'56px' }}>Description...</div>
                  <button style={{ width:'100%', background:'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', border:'none', borderRadius:'8px', padding:'8px', fontSize:'11px', fontWeight:700, cursor:'pointer' }}>Create Task</button>
                  <div style={{ marginTop:'14px' }}>
                    <p style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.4)', marginBottom:'6px' }}>Personal Projects</p>
                    {['Fitness','Groceries','Appointments'].map(t => (
                      <div key={t} style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', padding:'4px 0', display:'flex', alignItems:'center', gap:'6px' }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#a855f7' }} />{t}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Panel 2 - Project Status */}
                <div style={{ background:'rgba(12,10,24,0.95)', padding:'18px' }}>
                  <p style={{ fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.85)', marginBottom:'12px' }}>Project Status</p>
                  {[
                    { name:'Website Redesign', status:'On Track', color:'#10b981' },
                    { name:'Mobile App Dev', status:'At Risk', color:'#f59e0b' },
                    { name:'E-commerce Platform', status:'Off Track', color:'#f43f5e' },
                  ].map(p => (
                    <div key={p.name} style={{ marginBottom:'10px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
                        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.7)', fontWeight:500 }}>{p.name}</span>
                        <span style={{ fontSize:'10px', color:p.color, fontWeight:600 }}>● {p.status}</span>
                      </div>
                      <div style={{ height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'2px' }}>
                        <div style={{ height:'100%', width: p.status==='On Track'?'80%':p.status==='At Risk'?'50%':'30%', background:p.color, borderRadius:'2px' }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Panel 3 - Team */}
                <div style={{ background:'rgba(14,12,28,0.95)', padding:'18px' }}>
                  <p style={{ fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.85)', marginBottom:'12px' }}>Invite to Team</p>
                  <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(168,85,247,0.2)', borderRadius:'8px', padding:'10px', fontSize:'11px', color:'rgba(255,255,255,0.3)', minHeight:'56px' }}>name@email.com</div>
                  <div style={{ marginTop:'14px' }}>
                    <p style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.4)', marginBottom:'8px' }}>Task Stats</p>
                    {[{l:'Completed',v:'14',c:'#10b981'},{l:'Pending',v:'7',c:'#f59e0b'},{l:'Overdue',v:'3',c:'#f43f5e'}].map(s => (
                      <div key={s.l} style={{ display:'flex', justifyContent:'space-between', padding:'3px 0', fontSize:'11px' }}>
                        <span style={{ color:'rgba(255,255,255,0.45)' }}>{s.l}</span>
                        <span style={{ color:s.c, fontWeight:700 }}>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding:'60px 24px', borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {[
              {v:'100%',l:'Secure Auth',icon:<Shield size={16}/>,c:'#a855f7'},
              {v:'MERN',l:'Full Stack',icon:<Zap size={16}/>,c:'#6366f1'},
              {v:'Live',l:'Dashboard',icon:<BarChart3 size={16}/>,c:'#8b5cf6'},
              {v:'24/7',l:'Available',icon:<Clock size={16}/>,c:'#7c3aed'},
            ].map((s,i) => (
              <div key={s.l} className={`rv d${i+1}`} style={{ textAlign:'center', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'24px 16px' }}>
                <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'10px', background:s.c+'22', color:s.c, marginBottom:'10px' }}>{s.icon}</div>
                <div style={{ fontSize:'22px', fontWeight:900, color:s.c }}>{s.v}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', fontWeight:500, marginTop:'2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" style={{ padding:'80px 24px', maxWidth:'1100px', margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:'48px' }}>
            <p className="section-label">Features</p>
            <h2 style={{ fontSize:'28px', fontWeight:900, color:'#fff', marginBottom:'10px' }}>Everything Your Team Needs</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', maxWidth:'380px', margin:'0 auto' }}>Built with modern tech and designed for teams of any size.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
            {features.map((f,i) => (
              <div key={f.title} className={`feat-card rv d${i+1}`}>
                <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'38px', height:'38px', borderRadius:'10px', background:f.color+'22', color:f.color, marginBottom:'14px' }}>{f.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:'13px', color:'#fff', marginBottom:'8px' }}>{f.title}</h3>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" style={{ padding:'80px 24px', borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:'48px' }}>
              <p className="section-label">How It Works</p>
              <h2 style={{ fontSize:'28px', fontWeight:900, color:'#fff', marginBottom:'10px' }}>Up & Running in 3 Steps</h2>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)' }}>No complex setup. Just sign up and start managing.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
              {steps.map((s,i) => (
                <div key={s.num} className={`step-card rv d${i+1}`}>
                  <div style={{ width:'44px', height:'44px', borderRadius:'14px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:900, color:'#fff', margin:'0 auto 16px', boxShadow:'0 6px 20px rgba(168,85,247,0.4)' }}>{s.num}</div>
                  <h3 style={{ fontWeight:700, fontSize:'13px', color:'#fff', marginBottom:'8px' }}>{s.title}</h3>
                  <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" style={{ padding:'60px 24px', textAlign:'center' }}>
          <p className="rv" style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:'20px' }}>Built With</p>
          <div className="rv" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px', maxWidth:'600px', margin:'0 auto' }}>
            {techs.map(t => <span key={t} className="tech-pill">{t}</span>)}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'80px 24px', position:'relative', overflow:'hidden', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="blob1" style={{ top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.2 }} />
          <div className="rv" style={{ position:'relative', zIndex:10, maxWidth:'480px', margin:'0 auto' }}>
            <h2 style={{ fontSize:'28px', fontWeight:900, color:'#fff', marginBottom:'12px' }}>
              Ready to Take Control?
            </h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)', marginBottom:'28px', lineHeight:1.7 }}>
              Join your team today and start managing tasks smarter, faster, together.
            </p>
            <button onClick={() => navigate('/login')} className="btn-primary" style={{ color:'#fff', fontWeight:700, fontSize:'14px', padding:'14px 32px', borderRadius:'14px', display:'inline-flex', alignItems:'center', gap:'8px' }}>
              Get Started Free <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding:'24px', textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'6px' }}>
            <div style={{ width:'20px', height:'20px', borderRadius:'6px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <CheckCircle size={11} color="#fff" />
            </div>
            <span style={{ fontWeight:700, fontSize:'13px', color:'rgba(255,255,255,0.8)' }}>TaskFlow</span>
          </div>
          <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.25)' }}>Built with ❤️ using MERN Stack · © {new Date().getFullYear()} Sweta</p>
        </footer>

      </div>
    </>
  );
}
