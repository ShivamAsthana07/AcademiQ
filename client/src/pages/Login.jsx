import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'IBM Plex Sans', sans-serif; background: #09090b; }
        .font-garamond { font-family: 'EB Garamond', serif; }

        .login-page {
          min-height: 100vh;
          background: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          background: #0e0e11;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        }

        .login-logo {
          width: 56px;
          height: 56px;
          margin: 0 auto 1.2rem;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
        }

        .login-title {
          font-family: 'EB Garamond', serif;
          font-size: 30px;
          color: white;
          text-align: center;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .login-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 1.5rem;
        }

        .login-label {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          text-align: center;
          margin-bottom: 1rem;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 13px 16px;
          background: white;
          border-radius: 12px;
          text-decoration: none;
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 500;
          font-family: 'IBM Plex Sans', sans-serif;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          border: none;
        }

        .google-btn:hover {
          background: #f1f1f1;
          transform: translateY(-1px);
        }

        .login-footer {
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          text-align: center;
          margin-top: 1.5rem;
          line-height: 1.7;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">🎓</div>
          <h1 className="login-title font-garamond">AcademiQ</h1>
          <p className="login-subtitle">Your intelligent academic assistant</p>

          <hr className="login-divider" />

          <p className="login-label">Sign in to continue</p>

          {/* Google Button */}
          <a href="http://localhost:3001/api/auth/google" className="google-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </a>

          <p className="login-footer">
            By signing in, you agree to our terms of service.<br/>
            Your chats are saved securely.
          </p>

        </div>
      </div>
    </>
  );
}