import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Import the CSS we just created


import GoogleIcon from '../assets/googleicon.png';
import FacebookIcon from '../assets/fbicon.png';
// Note: Background image is handled in CSS

const Login = () => {
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
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
            />
          </div>

          <div className="form-actions">
            <div className="checkbox-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Sign In to MiniAPP
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