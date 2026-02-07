import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import api from '../services/api';

import GoogleIcon from '../assets/googleicon.png';
import FacebookIcon from '../assets/fbicon.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else if (value.length > 100) {
          newErrors.email = 'Email must not exceed 100 characters';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else if (value.length > 128) {
          newErrors.password = 'Password must not exceed 128 characters';
        } else {
          delete newErrors.password;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field on change (after user starts typing)
    if (formData[name] || value) {
      validateField(name, value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
    });
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});

    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix the validation errors below');
      setLoading(false);
      return;
    }

    try {
      const response = await api.login(formData.email, formData.password);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', `${response.firstName} ${response.lastName}`);
      localStorage.setItem('email', response.email);
      localStorage.setItem('userId', response.id);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Slogan Text Overlay */}
      <div className="brand-slogan">
        Swiffly Log-in and Log-out.
      </div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1>WELCOME</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField('email', e.target.value)}
              placeholder="Enter your email address" 
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField('password', e.target.value)}
              placeholder="Enter your password" 
              required
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="form-actions">
            <div className="checkbox-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In to MiniAPP'}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>Or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="social-login">
          <button className="btn-social">
            {/* PLACEHOLDER ICON */}
            <img src={GoogleIcon} alt="Google" className="social-icon" />
            Google
          </button>
          <button className="btn-social">
            {/* PLACEHOLDER ICON */}
            <img src={FacebookIcon} alt="Facebook" className="social-icon" />
            Facebook
          </button>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Don't have an account? 
            <Link to="/register" className="signup-link"> Sign up here</Link>
          </p>
          <div className="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;