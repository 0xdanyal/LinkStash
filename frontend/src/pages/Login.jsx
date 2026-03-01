import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Logo from '../components/Logo';
import '../styles/global.css';
import '../styles/login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
      login(data.token, data.email);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <Logo />
        </div>
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to access your link library</p>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="form-label">Email address</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
          </div>
          <div className="auth-field">
            <label className="form-label">Password</label>
            <input type="password" placeholder="Enter your password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one free</Link>
        </div>
      </div>
    </div>
  );
}