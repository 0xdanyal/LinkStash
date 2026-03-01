import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';
import '../styles/global.css';
import '../styles/login.css';
import '../styles/register.css';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      nav('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <Logo />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span className="register-badge">Free forever · No credit card</span>
        </div>
        <h1 className="auth-heading">Create your stash</h1>
        <p className="auth-subheading">Save, tag & search your links from anywhere</p>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="form-label">Email address</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
          </div>
          <div className="auth-field">
            <label className="form-label">Password</label>
            <input type="password" placeholder="Choose a strong password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" minLength={6} />
            <span className="password-hint">Minimum 6 characters</span>
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="terms-note">By signing up you agree to keep your links awesome 🔗</p>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}