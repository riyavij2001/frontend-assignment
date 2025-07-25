import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Alert, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function Dashboard() {
  const [leaves, setLeaves] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
    setLeaves(storedLeaves);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <Box p={4}>
        <Alert severity="warning">Please log in to view the dashboard.</Alert>
      </Box>
    );
  }

  // Calculate leave counts
  const counts = leaves.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(counts).map(([status, value], idx) => ({
    id: idx,
    label: status,
    value,
  }));

  // Attendance mock data
  const attendanceData = {
    labels: ['Present', 'Absent'],
    values: [20, 2],
  };

  // KPIs
  const totalLeaves = leaves.length;
  const approvedLeaves = counts['Approved'] || 0;
  const pendingLeaves = counts['Pending'] || 0;
  const rejectedLeaves = counts['Rejected'] || 0;

  const attendanceRate =
    attendanceData.values.reduce((a, b) => a + b, 0) === 0
      ? 0
      : ((attendanceData.values[0] / attendanceData.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>

      {/* KPI summary */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        {[
          { label: 'Total Leave Requests', value: totalLeaves },
          { label: 'Approved Leaves', value: approvedLeaves },
          { label: 'Pending Leaves', value: pendingLeaves },
          { label: 'Rejected Leaves', value: rejectedLeaves },
          { label: 'Attendance Rate', value: `${attendanceRate}%` },
        ].map(({ label, value }) => (
          <Grid item xs={6} sm={4} md={2} key={label}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1" color="textSecondary">
                {label}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Charts */}
      <div style={{display:'flex', justifyContent:'center'}}>
      <Grid container spacing={3}>
        {/* Leave Status Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Leave Status Overview
            </Typography>
            <PieChart
              series={[{ data: pieData }]}
              width={300}
              height={300}
              slotProps={{
                legend: {
                  direction: 'column',
                  position: { vertical: 'middle', horizontal: 'right' },
                  labelStyle: { fontSize: 12 },
                  itemGap: 8,
                },
              }}
              sx={{ mx: 'auto' }}
            />
          </Paper>
        </Grid>

        {/* Attendance Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Attendance This Month
            </Typography>
            <BarChart
              series={[{ data: attendanceData.values }]}
              xAxis={[{ data: attendanceData.labels, scaleType: 'band' }]}
              height={300}
              margin={{ top: 20, bottom: 40, left: 40, right: 20 }}
            />
          </Paper>
        </Grid>
      </Grid>
      </div>
    </Box>
  );
}

export default Dashboard;
