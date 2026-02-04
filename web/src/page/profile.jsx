import { Container, Paper, Avatar, Box, Typography, TextField, Button, Grid } from '@mui/material';

function Profile() {
  const username = localStorage.getItem("username");

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 40 }}>
          {username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" gutterBottom>{username}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Member since 2024</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Full Name" fullWidth defaultValue={username} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" fullWidth defaultValue={`${username}@example.com`} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth size="large" sx={{ mt: 2 }}>Update Profile</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default Profile;