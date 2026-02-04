import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username') || '';

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    handleClose();
    navigate('/login');
  };

  const initials = username ? username.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() : 'U';

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar
        position="static"
        color="primary"
        enableColorOnDark
        sx={{ background: 'linear-gradient(90deg, rgba(114,20,224,0.96), rgba(107,18,220,0.86))', boxShadow: '0 6px 18px rgba(114,20,224,0.12)' }}
      >
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, fontWeight: 700 }}>
            MiniApp
          </Typography>

          {!token ? (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          ) : (
            <>
              <Tooltip title={username || 'User'}>
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 36, height: 36 }}>{initials}</Avatar>
                </IconButton>
              </Tooltip>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem component={RouterLink} to="/dashboard">Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
