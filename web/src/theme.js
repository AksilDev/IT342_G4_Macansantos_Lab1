import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7214E0', // Your accent color
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF5A5F',
    },
    info: {
      main: '#00A3FF',
    },
    success: {
      main: '#21B37A',
    },
    background: {
      default: '#f6f7fb',
      paper: '#fff'
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #7f21f0, #6a0ee0)'
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;