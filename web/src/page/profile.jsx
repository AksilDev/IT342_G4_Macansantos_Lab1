import { Container, Paper, Avatar, Box, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // This shouldn't happen due to ProtectedRoute, but extra safety
      window.location.href = '/login';
      return;
    }
    
    const fetchUserProfile = async () => {
      try {
        const profileData = await api.getUserProfile(token);
        setUser(profileData);
        setFormData({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || ''
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // If token is invalid, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    if (!token) return;
    
    setUpdating(true);
    try {
      const updatedProfile = await api.updateUserProfile(formData, token);
      setUser(updatedProfile);
      // Show success message (you can add a toast notification here)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading profile...</Typography>
      </Container>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'User';
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 40 }}>
          {initials}
        </Avatar>
        <Typography variant="h5" gutterBottom>{fullName}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Member since {new Date(user.createdAt || Date.now()).getFullYear()}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="First Name" 
              name="firstName"
              fullWidth 
              value={formData.firstName}
              onChange={handleInputChange}
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Last Name" 
              name="lastName"
              fullWidth 
              value={formData.lastName}
              onChange={handleInputChange}
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Email" 
              name="email"
              fullWidth 
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined" 
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              size="large" 
              sx={{ mt: 2 }}
              onClick={handleUpdateProfile}
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default Profile;