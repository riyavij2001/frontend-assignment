import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Alert, Divider, Card, CardContent, Avatar } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { TrendingUp, TrendingDown, People, Schedule, EventNote, CheckCircle } from '@mui/icons-material';

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

  const counts = leaves.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(counts).map(([status, value], idx) => ({
    id: idx,
    label: status,
    value,
  }));

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [85, 88, 92, 87, 94, 91],
  };

  const weeklyTrend = [78, 82, 85, 88, 90, 92, 89];

  const totalLeaves = leaves.length;
  const approvedLeaves = counts['Approved'] || 0;
  const pendingLeaves = counts['Pending'] || 0;
  const rejectedLeaves = counts['Rejected'] || 0;

  const attendanceRate =
    attendanceData.values.reduce((a, b) => a + b, 0) === 0
      ? 0
      : ((attendanceData.values[0] / attendanceData.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
      <main style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Dashboard Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: '#001833', 
            mb: 2
          }}>
            Analytics Dashboard
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#666', 
            maxWidth: 600, 
            mx: 'auto'
          }}>
            Welcome back! Here's an overview of your HR metrics and insights.
          </Typography>
        </Box>

        {/* Statistics Cards Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: '#4CAF50', 
                    width: 48, 
                    height: 48, 
                    mr: 2 
                  }}>
                    <Schedule />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      8:45 AM
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Login Time
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +5% from last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: '#FF9800', 
                    width: 48, 
                    height: 48, 
                    mr: 2 
                  }}>
                    <EventNote />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#F57C00' }}>
                      {totalLeaves}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Number of Leaves
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#F44336' }}>
                  <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    -2% from last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: '#2196F3', 
                    width: 48, 
                    height: 48, 
                    mr: 2 
                  }}>
                    <People />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976D2' }}>
                      156
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Number of Employees
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +3% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: '#9C27B0', 
                    width: 48, 
                    height: 48, 
                    mr: 2 
                  }}>
                    <CheckCircle />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#7B1FA2' }}>
                      {approvedLeaves}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Leaves Regulated
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
                  <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +8% from last week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          color: '#001833', 
          mb: 4,
          textAlign: 'center'
        }}>
          Analytics Overview
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Left Chart - Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: 3,
              height: 400
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                Leave Status Distribution
              </Typography>
              <Box sx={{ height: 320, display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, label: 'Approved', value: approvedLeaves, color: '#4CAF50' },
                        { id: 1, label: 'Pending', value: pendingLeaves, color: '#FF9800' },
                        { id: 2, label: 'Rejected', value: rejectedLeaves, color: '#F44336' },
                      ],
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right Chart - Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: 3,
              height: 400
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                Monthly Attendance Trend
              </Typography>
              <Box sx={{ height: 320, display: 'flex', justifyContent: 'center' }}>
                <BarChart
                  series={[{ 
                    data: attendanceData.values,
                    color: '#2196F3'
                  }]}
                  xAxis={[{ data: attendanceData.labels, scaleType: 'band' }]}
                  width={400}
                  height={300}
                  margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Additional Charts Row */}
        <Grid container spacing={4}>
          {/* Weekly Trend Line Chart */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: 3,
              height: 350
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                Weekly Attendance Trend
              </Typography>
              <Box sx={{ height: 270, display: 'flex', justifyContent: 'center' }}>
                <LineChart
                  series={[{ 
                    data: weeklyTrend,
                    area: true,
                    color: '#667eea'
                  }]}
                  xAxis={[{ 
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
                    scaleType: 'band' 
                  }]}
                  width={600}
                  height={250}
                  margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Department Distribution */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              p: 3,
              height: 350
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
                Department Distribution
              </Typography>
              <Box sx={{ height: 270, display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, label: 'Engineering', value: 45, color: '#4CAF50' },
                        { id: 1, label: 'Sales', value: 32, color: '#2196F3' },
                        { id: 2, label: 'Marketing', value: 28, color: '#FF9800' },
                        { id: 3, label: 'HR', value: 25, color: '#9C27B0' },
                        { id: 4, label: 'Finance', value: 18, color: '#F44336' },
                      ],
                    },
                  ]}
                  width={300}
                  height={250}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
