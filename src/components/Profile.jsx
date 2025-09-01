import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then((r) => r.json())
      .then(setUser)
      .finally(() => setLoad(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  const date = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : '—';

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ width: 80, height: 80 }}>
          <FaUserCircle size={60} />
        </Avatar>

        <List dense sx={{ width: '100%' }}>
          <ListItem>
            <ListItemText primary="Email" secondary={user.email || '—'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Name" secondary={user.name || '—'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Role" secondary={user.role || '—'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Joined" secondary={date} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}