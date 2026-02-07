import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'studentId':
        if (!value.trim()) {
          newErrors.studentId = 'Student ID is required';
        } else if (value.length < 5 || value.length > 20) {
          newErrors.studentId = 'Student ID must be between 5 and 20 characters';
        } else if (!/^[A-Za-z0-9]+$/.test(value)) {
          newErrors.studentId = 'Student ID can only contain letters and numbers';
        } else {
          delete newErrors.studentId;
        }
        break;
        
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (value.length < 2 || value.length > 50) {
          newErrors.firstName = 'First name must be between 2 and 50 characters';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.firstName = 'First name can only contain letters and spaces';
        } else {
          delete newErrors.firstName;
        }
        break;
        
      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (value.length < 2 || value.length > 50) {
          newErrors.lastName = 'Last name must be between 2 and 50 characters';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.lastName = 'Last name can only contain letters and spaces';
        } else {
          delete newErrors.lastName;
        }
        break;
        
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
        
      case 'birthdate':
        if (!value) {
          newErrors.birthdate = 'Birthdate is required';
        } else {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 13) {
            newErrors.birthdate = 'You must be at least 13 years old';
          } else if (age > 120) {
            newErrors.birthdate = 'Please enter a valid birthdate';
          } else {
            delete newErrors.birthdate;
          }
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else if (value.length > 128) {
          newErrors.password = 'Password must not exceed 128 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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
    setSuccess('');
    setErrors({});

    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix the validation errors below');
      setLoading(false);
      return;
    }

    try {
      await api.register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

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
        
        <form onSubmit={handleSubmit} className="form-grid">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          {/* Student ID Field */}
          <div className="form-group">
            <label>Student ID Number</label>
            <input 
              type="text" 
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              onBlur={(e) => validateField('studentId', e.target.value)}
              placeholder="Enter your ID number (5-20 characters)" 
              required
            />
            {errors.studentId && <div className="field-error">{errors.studentId}</div>}
          </div>

          {/* Row 1: First and Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={(e) => validateField('firstName', e.target.value)}
                placeholder="Enter your first name" 
                required
              />
              {errors.firstName && <div className="field-error">{errors.firstName}</div>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={(e) => validateField('lastName', e.target.value)}
                placeholder="Enter your last name" 
                required
              />
              {errors.lastName && <div className="field-error">{errors.lastName}</div>}
            </div>
          </div>

          {/* Row 2: Email and Birthdate */}
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => validateField('email', e.target.value)}
                placeholder="Enter your email" 
                required
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Birthdate</label>
              <input 
                type="date" 
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                onBlur={(e) => validateField('birthdate', e.target.value)}
                required
              />
              {errors.birthdate && <div className="field-error">{errors.birthdate}</div>}
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField('password', e.target.value)}
              placeholder="Enter your password (min 6 characters, with uppercase, lowercase, and number)" 
              required
              minLength="6"
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          


          {/* Action Button */}
          <button type="submit" className="btn-complete" disabled={loading}>
            {loading ? 'Creating Account...' : 'Complete Form'} <span>→</span>
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