import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from '@mui/material';

export default function Audits() {
  const [audits, setAudits]   = useState([]);
  const [loading, setLoad]    = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Not authenticated');

    fetch('/api/audits', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setAudits)
      .catch((e) => setError(e.statusText || e.message))
      .finally(() => setLoad(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;
  if (error)   return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>My Audits</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completed</TableCell>

              {/* Pagespeed columns */}
              <TableCell>Perf</TableCell>
              <TableCell>Access</TableCell>
              <TableCell>Best Prac.</TableCell>
              <TableCell>SEO</TableCell>

              {/* Serpstack columns */}
              <TableCell>Query</TableCell>
              <TableCell>Rank</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {audits.map((a) => {
              const isSerp = a.seoData?.organic_results;

              return (
                <TableRow key={a._id}>
                  <TableCell>{a.domain}</TableCell>

                  <TableCell>
                    <Chip
                      label={a.type}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={a.status}
                      color={a.status === 'completed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {a.completedAt
                      ? new Date(a.completedAt).toLocaleString()
                      : '—'}
                  </TableCell>

                  {/* Pagespeed scores */}
                  <TableCell>{!isSerp ? a.performanceScore ?? '—' : ''}</TableCell>
                  <TableCell>{!isSerp ? a.accessibilityScore ?? '—' : ''}</TableCell>
                  <TableCell>{!isSerp ? a.bestPracticesScore ?? '—' : ''}</TableCell>
                  <TableCell>{!isSerp ? a.seoScore ?? '—' : ''}</TableCell>

                  {/* Serpstack fields */}
                  <TableCell>{isSerp ? a.seoData?.search_parameters?.q : ''}</TableCell>
                  <TableCell>{a.serpRank}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}