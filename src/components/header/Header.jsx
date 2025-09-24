import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#118ab2',
        color: 'white',
        padding: '15px 30px',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}
      >
        Russian Roulette
      </Typography>
    </Box>
  );
}

export default Header;