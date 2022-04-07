import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
          variant="h6"
          color="inherit"
          component="div"
        >
          Posts
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
