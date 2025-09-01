import React from 'react';
import { Paper, Typography } from '@mui/material';

const MetricsCard = ({ title, value }) => (
  <Paper style={{ padding: '20px', textAlign: 'center' }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

export default MetricsCard;