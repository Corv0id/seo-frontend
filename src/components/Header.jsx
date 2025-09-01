import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout }    from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Header = ({ loggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
      })
      .catch(console.error);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ bgcolor: '#1976d2', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="white">
          SEO Audit Dashboard
        </Typography>

        {loggedIn && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <IconButton color="inherit" title="Profile" onClick={() => navigate('/profile')}>
              <FaUserCircle size={24} />
            </IconButton>
            <IconButton color="inherit" title="Logout" onClick={handleLogout}>
              <MdLogout size={24} />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;