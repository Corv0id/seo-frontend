// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import MetricsCard from './MetricsCard';
import AuditStatus from './AuditStatus';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats]   = useState(null);
  const [chartData, setChart] = useState(null);
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoad(false);

    fetch('/api/audits', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then(r => r.json())
      .then(audits => {
        const total     = audits.length;
        const completed = audits.filter(a => a.status === 'completed').length;
        const pagespeed = audits.filter(a => a.type === 'pagespeed').length;
        const serpstack = audits.filter(a => a.type === 'serpstack').length;

        // last 7 days completed
        const last7 = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();

        const dailyCompleted = last7.map(date =>
          audits.filter(a => a.completedAt && new Date(a.completedAt).toDateString() === date.toDateString()).length
        );

        setStats({ total, completed, pagespeed, serpstack });
        setChart({
          labels: last7.map(d => d.toLocaleDateString('en', { weekday: 'short' })),
          datasets: [{
            label: 'Completed Audits',
            data: dailyCompleted,
            backgroundColor: '#42a5f5',
          }],
        });
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MetricsCard title="Total Audits" value={stats?.total ?? 0} />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricsCard title="Completed" value={stats?.completed ?? 0} />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricsCard title="PageSpeed" value={stats?.pagespeed ?? 0} />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricsCard title="SERPStack" value={stats?.serpstack ?? 0} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{
                    height: 320,
                    minHeight: 320,
                    width: 500,           // or any fixed width you like
                    minWidth: 500,
                    maxWidth: 500,
                    margin: '0 auto',     // keeps it centered
  }}>
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, title: { display: true, text: 'Completed Audits (Last 7 Days)' } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                          callback: (v) => Math.round(v),   // only whole numbers
                        },
                      },
                    },
                }}
              />
            ) : (
              <CircularProgress />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <AuditStatus stats={stats} />
        </Grid>
      </Grid>
    </Box>
  );
}