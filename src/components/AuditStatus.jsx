import React from 'react';
import { Paper, Typography, LinearProgress, Box } from '@mui/material';

const AuditStatus = ({ stats }) => {
  if (!stats) return null;

  const total = stats.total;
  const completed = stats.completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6">Audit Summary</Typography>

      <Typography variant="body2" color="text.secondary">
        Total: {total}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Completed: {completed}
      </Typography>

      <Box sx={{ mt: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="caption">
          {progress}% completed
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuditStatus;