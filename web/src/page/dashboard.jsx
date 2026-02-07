import { Container, Typography, Box, Avatar, Paper } from '@mui/material';

function Dashboard() {
  const username = localStorage.getItem("username") || "User";

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 3,
              bgcolor: 'primary.main',
              fontSize: 32,
              fontWeight: 'bold'
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            Welcome, {username}!
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Glad to have you here. Your dashboard is ready and waiting for you to explore.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Start your journey with MiniApp
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
export default Dashboard;