import { Box, CircularProgress, Container, Typography } from '@mui/material';

export const LoadingScreen = () => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: 2
    }}
  >
    <CircularProgress size={60} />
    <Typography variant="h6" color="textSecondary">
      Cargando aplicación...
    </Typography>
  </Box>
);
