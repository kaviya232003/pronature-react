import React, { useState } from 'react';
import styles from './AuthModal.module.css';

export default function AuthModal({ onSuccess }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!email || !password) return setError('Please fill all fields.');
    if (mode === 'register' && !name) return setError('Please enter your name.');

    setLoading(true);
    try {
      const endpoint = mode === 'register' ? 'register' : 'login';
      const res = await fetch(`http://localhost:5000/api/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem('pn_token', data.token);
      localStorage.setItem('pn_current', JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (err) {
      setError('Could not connect to server. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>Fresh<span className={styles.green}>Eats</span></span>
        </div>

        <h2 className={styles.title}>
          {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🍽️'}
        </h2>
        <p className={styles.sub}>
          {mode === 'login' ? 'Login to place orders and book tables' : 'Join us for a delicious experience'}
        </p>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${mode === 'login' ? styles.activeTab : ''}`} onClick={() => { setMode('login'); setError(''); }}>Login</button>
          <button className={`${styles.tab} ${mode === 'register' ? styles.activeTab : ''}`} onClick={() => { setMode('register'); setError(''); }}>Register</button>
        </div>

        {mode === 'register' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input className={styles.input} type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
        </div>

        {error && <p className={styles.error}>⚠ {error}</p>}

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        <p className={styles.switchText}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className={styles.switchBtn} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>

        <button className={styles.guestBtn} onClick={() => onSuccess({ name: 'Guest', email: '' })}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}