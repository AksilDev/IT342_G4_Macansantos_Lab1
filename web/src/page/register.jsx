import React from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  return (
    <div className="register-container">
      {/* Header Section */}
      <div className="register-header">
        <h1>Create Your Mini-APP Account</h1>
        <div className="title-divider">
          <div className="line"></div>
          <div className="dot"></div>
          <div className="line"></div>
        </div>
        <p>Already have an account? <Link to="/login" className="signin-link">Sign in here</Link></p>
      </div>

      {/* Main Form Card */}
      <div className="register-card">
        <h2>Registration Progress</h2>
        
        <form className="form-grid">
          {/* Full Width Field */}
          <div className="form-group">
            <label>Student ID Number</label>
            <input type="text" placeholder="Enter your ID number" />
          </div>

          {/* Row 1: First and Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>
          </div>

          {/* Row 2: Email and Birthdate */}
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Birthdate</label>
              <input type="date" />
            </div>
          </div>

          {/* Action Button */}
          <button type="submit" className="btn-complete">
            Complete Form <span>→</span>
          </button>
        </form>

        <div className="register-footer">
          By signing up, you agree to our <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Register;