import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FeatureCard({ icon, title, children }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        minWidth: 200,
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.06)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 18px 40px rgba(7,8,10,0.18)' }
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Box sx={{ mt: 0.3 }}>{icon}</Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>{children}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
