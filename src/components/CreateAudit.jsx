import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Box, Paper, Typography } from '@mui/material';

export default function CreateAudit() {
  const [domain, setDomain] = useState('');
  const [type,   setType]   = useState('pagespeed');
  const [query,  setQuery]  = useState('');
  const [loading, setLoad]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    const token = localStorage.getItem('token');
    await fetch('/api/audits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({ domain, type, query }),
    });

    setLoad(false);
    navigate('/audits');          // go back to the list
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create New Audit
        </Typography>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Audit Type"
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="pagespeed">PageSpeed</MenuItem>
            <MenuItem value="serpstack">SERPStack</MenuItem>
          </TextField>

          <TextField
            label="Query (optional for SERPStack)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Creating…' : 'Create Audit'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}