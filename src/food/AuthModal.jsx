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

  const handleSubmit = () => {
    const { name, email, password } = form;
    const users = JSON.parse(localStorage.getItem('pn_users') || '[]');

    if (!email || !password) return setError('Please fill all fields.');
    if (mode === 'register' && !name) return setError('Please enter your name.');

    setLoading(true);
    setTimeout(() => {
      if (mode === 'register') {
        const exists = users.find(u => u.email === email);
        if (exists) { setError('Email already registered.'); setLoading(false); return; }
        const newUser = { name, email, password };
        localStorage.setItem('pn_users', JSON.stringify([...users, newUser]));
        localStorage.setItem('pn_current', JSON.stringify(newUser));
        onSuccess(newUser);
      } else {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) { setError('Invalid email or password.'); setLoading(false); return; }
        localStorage.setItem('pn_current', JSON.stringify(user));
        onSuccess(user);
      }
      setLoading(false);
    }, 800);
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