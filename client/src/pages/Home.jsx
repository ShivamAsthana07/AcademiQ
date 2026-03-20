import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If already logged in go straight to chat
  if (user) return <Navigate to="/chat" replace />;
  if (user === undefined) return (
    <div style={{
      minHeight: "100vh", background: "#09090b", display: "flex",
      alignItems: "center", justifyContent: "center",
      color: "rgba(255,255,255,0.2)", fontSize: "14px", fontFamily: "IBM Plex Sans, sans-serif"
    }}>
      Loading...
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'IBM Plex Sans', sans-serif; background: #09090b; }
        .font-garamond { font-family: 'EB Garamond', serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(1.5);opacity:0} }

        .fade-up-1 { animation: fadeUp .7s ease forwards; opacity: 0; }
        .fade-up-2 { animation: fadeUp .7s ease .15s forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp .7s ease .3s forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp .7s ease .45s forwards; opacity: 0; }
        .fade-up-5 { animation: fadeUp .7s ease .6s forwards; opacity: 0; }

        .logo-float { animation: float 4s ease-in-out infinite; }

        .glow-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: white;
          border: none;
          border-radius: 14px;
          color: #09090b;
          font-size: 15px;
          font-weight: 500;
          font-family: 'IBM Plex Sans', sans-serif;
          cursor: pointer;
          transition: transform .2s, background .2s;
          text-decoration: none;
        }
        .glow-btn:hover { background: #f0f0f0; transform: translateY(-2px); }

        .outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          font-family: 'IBM Plex Sans', sans-serif;
          cursor: pointer;
          transition: all .2s;
          text-decoration: none;
        }
        .outline-btn:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.85); transform: translateY(-2px); }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
          transition: all .25s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-3px);
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 24px;
          text-align: center;
        }

        .gradient-text {
          background: linear-gradient(135deg, #f59e0b, #fcd34d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .pulse-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(245,158,11,0.4);
          animation: pulse-ring 2s ease-out infinite;
        }

        .nav { 
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: rgba(9,9,11,0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        @media (max-width: 768px) {
          .nav { padding: 16px 24px; }
          .hide-mobile { display: none; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
          }}>🎓</div>
          <span className="font-garamond" style={{ fontSize: 20, color: "white", letterSpacing: "0.02em" }}>AcademiQ</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="hide-mobile" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Academic AI Assistant
          </span>
          <a href="/login" className="outline-btn" style={{ padding: "9px 20px", fontSize: 13 }}>
            Sign in
          </a>
        </div>
      </nav>

      {/* Main */}
      <main style={{ minHeight: "100vh", background: "#09090b", overflowX: "hidden" }}>

        {/* Hero */}
        <section className="grid-bg" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "120px 24px 80px", textAlign: "center",
          position: "relative",
        }}>
          {/* Glow blob */}
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>

          {/* Logo */}
          <div className="fade-up-1" style={{ marginBottom: 32, position: "relative", display: "inline-block" }}>
            <div className="pulse-ring"/>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 34, position: "relative",
            }} className="logo-float">
              🎓
            </div>
          </div>

          {/* Badge */}
          <div className="fade-up-1" style={{ marginBottom: 24 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 99,
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
              fontSize: 12, color: "rgba(245,158,11,0.8)", fontWeight: 500, letterSpacing: "0.04em"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}/>
              Powered by Llama 3.3 · Groq
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up-2 font-garamond" style={{
            fontSize: "clamp(40px, 7vw, 72px)", color: "white",
            lineHeight: 1.15, marginBottom: 24, maxWidth: 800,
          }}>
            Your intelligent<br/>
            <em className="gradient-text">academic assistant</em>
          </h1>

          {/* Subheadline */}
          <p className="fade-up-3" style={{
            fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.4)",
            maxWidth: 520, lineHeight: 1.75, marginBottom: 40,
          }}>
            Ask anything about your studies, research papers, and coursework.
            Get clear, accurate answers instantly.
          </p>

          {/* CTA buttons */}
          <div className="fade-up-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="http://localhost:3001/api/auth/google" className="glow-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Get started free
            </a>
            <button onClick={() => navigate("/login")} className="outline-btn">
              Sign in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          {/* Scroll hint */}
          <div className="fade-up-5" style={{ marginTop: 64, color: "rgba(255,255,255,0.15)", fontSize: 12, letterSpacing: "0.08em" }}>
            SCROLL TO EXPLORE
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="font-garamond" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "white", marginBottom: 12 }}>
              Built for serious learners
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", maxWidth: 480, margin: "0 auto" }}>
              Everything you need to excel in your academic journey
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              {
                icon: "🧠",
                title: "Intelligent Q&A",
                desc: "Ask complex academic questions and get detailed, well-structured answers with relevant context and citations."
              },
              {
                icon: "💾",
                title: "Saved Conversations",
                desc: "All your chats are saved to your account. Pick up where you left off, anytime, from any device."
              },
              {
                icon: "📚",
                title: "All Subjects",
                desc: "From mathematics and science to history and literature — comprehensive knowledge across every discipline."
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Powered by Groq's high-speed inference, get answers in milliseconds, not minutes."
              },
              {
                icon: "🔒",
                title: "Secure Login",
                desc: "Sign in securely with your Google account. Your data is private and protected."
              },
              {
                icon: "🌙",
                title: "Dark & Light Mode",
                desc: "Study comfortably at any hour with a carefully designed theme that adapts to your preference."
              },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                <h3 className="font-garamond" style={{ fontSize: 20, color: "white", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "40px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              { value: "70B", label: "Parameter model" },
              { value: "∞", label: "Questions answered" },
              { value: "100%", label: "Free to use" },
              { value: "24/7", label: "Always available" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="font-garamond gradient-text" style={{ fontSize: 36, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ padding: "0 24px 100px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 24, padding: "56px 40px",
          }}>
            <h2 className="font-garamond" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "white", marginBottom: 12 }}>
              Ready to study smarter?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
              Join AcademiQ and get instant answers to all your academic questions.
            </p>
            <a href="http://localhost:3001/api/auth/google" className="glow-btn" style={{ margin: "0 auto" }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Start for free with Google
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🎓</span>
            <span className="font-garamond" style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>AcademiQ</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Final Year Project · Built with React, Node.js & Groq
          </p>
        </footer>

      </main>
    </>
  );
}