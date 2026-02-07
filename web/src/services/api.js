const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  // Auth endpoints
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        // Handle validation errors
        const errorMessages = [];
        Object.keys(data.errors).forEach(field => {
          errorMessages.push(...data.errors[field]);
        });
        throw new Error(errorMessages.join('. '));
      } else {
        throw new Error(data.message || 'Login failed');
      }
    }
    
    return data;
  }

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        // Handle validation errors
        const errorMessages = [];
        Object.keys(data.errors).forEach(field => {
          errorMessages.push(...data.errors[field]);
        });
        throw new Error(errorMessages.join('. '));
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    }
    
    return data;
  }

  // User endpoints
  async getUserProfile(token) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return response.json();
  }

  async updateUserProfile(userData, token) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    return response.json();
  }

  async getDashboardData(token) {
    const response = await fetch(`${API_BASE_URL}/users/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    return response.json();
  }
}

export default new ApiService();
