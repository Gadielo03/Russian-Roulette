import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#118ab2',
        color: 'white',
        textAlign: 'center',
        padding: '10px 20px',
        backdropFilter: 'blur(10px)',
        zIndex: 1000
      }}
    >
      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
        Ing. Ulloa Paseme plsss :D | Made with ❤️
      </Typography>
    </Box>
  );
}

export default Footer;