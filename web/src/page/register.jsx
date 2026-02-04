import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import FeatureCard from '../components/FeatureCard';
import InfoIcon from '@mui/icons-material/Info';
import BoltIcon from '@mui/icons-material/Bolt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const errs = {};
    if (username.trim().length < 3) errs.username = "Username must be at least 3 characters.";
    if (!emailPattern.test(email)) errs.email = "Please enter a valid email address.";
    if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      // After successful register, navigate to login
      navigate("/login");
    }, 900);
  };

  return (
    <Grid container className="auth-split" sx={{ minHeight: '86vh' }}>
      <Grid item xs={12} md={6} className="auth-left">
        <Box className="auth-left-overlay">
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 2 }}>REGISTER to join us in MINI-APP.</Typography>
          <Typography sx={{ color: 'rgba(43, 41, 41, 0.85)', mb: 3 }}>Follow instructions for hasstle-free registering process.</Typography>


        </Box>
      </Grid>

      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={8} sx={{ width: 520, p: 4 }} component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 900, textAlign: 'center', letterSpacing: 1 }}>WELCOME</Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mb: 3 }}>Create an account to continue</Typography>

          <TextField label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" error={!!errors.username} helperText={errors.username} />

          <TextField label="Email Address" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" error={!!errors.email} helperText={errors.email} />

          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" error={!!errors.password} helperText={errors.password} />

          <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword} />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.8, borderRadius: 6, boxShadow: '0 12px 36px rgba(114,20,224,0.18)', fontWeight: 700, background: 'linear-gradient(90deg, var(--accent), var(--accent-2))' }} disabled={submitting}>
            {submitting ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
          </Button>

          <Divider sx={{ my: 3 }}>Or continue with</Divider>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ borderColor: 'var(--google)', color: 'var(--google)' }}>Google</Button>
            <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ borderColor: 'var(--facebook)', color: 'var(--facebook)' }}>Facebook</Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>Already have an account? <RouterLink to="/login" style={{ color: '#6C63FF', textDecoration: 'none' }}>Login</RouterLink></Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;