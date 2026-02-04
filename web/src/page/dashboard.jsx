import { Container, Typography, Grid, Card, CardContent, Box, Button, Divider, Chip } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import HistoryIcon from '@mui/icons-material/History';

function Dashboard() {
  const username = localStorage.getItem("username") || "User";

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>Welcome back, {username}!</Typography>
        <Typography variant="body1" color="text.secondary">Here is what's happening with your gear today.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Service Requests</Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Chip label="No active requests" color="info" variant="outlined" />
                <Chip label="0 Pending" sx={{ borderColor: 'text.disabled' }} />
                <Chip label="0 In Progress" sx={{ borderColor: 'text.disabled' }} />
              </Box>

              <Box sx={{ py: 4, textAlign: 'center', bgcolor: '#fbfbff', borderRadius: 2 }}>
                 <ConstructionIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                 <Typography color="text.secondary">No active cleaning or repairs found.</Typography>
                 <Button variant="contained" sx={{ mt: 2 }}>Book a Technician</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom><HistoryIcon sx={{ mr: 1 }} /> Recent Activity</Typography>
              <Typography variant="body2" color="text.secondary">Joined the MiniApp platform</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Dashboard;