import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function Home() {
    // Sample data for BarChart
    const attendanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [20, 18, 22, 19, 25, 23],
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <main style={{ padding: '4rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
                <Grid
                    container
                    spacing={6}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        animation: 'fadeIn 1s ease forwards',
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                    }}
                >
                    {/* Left side: Heading and subheading with background */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #001833 0%, #001833 100%)',
                                borderRadius: 3,
                                color: '#fff',
                                p: 5,
                                boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)',
                                minHeight: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                Welcome to the Attendance Management System
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.85, mt: 2 }}>
                                Streamline and track attendance effortlessly with our easy-to-use platform.
                                Manage leaves, attendance, and reports all in one place.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right side: Pie chart and Bar chart stacked */}
                    <div style={{display:'flex', width:'100%'}}>
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    maxWidth: 420,
                                    mx: 'auto',
                                    mb: 4,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    align="center"
                                    sx={{ fontWeight: 'bold', color: '#001833' }}
                                >
                                    Leave Status Breakdown
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, label: 'Approved', value: 10 },
                                                { id: 1, label: 'Pending', value: 5 },
                                                { id: 2, label: 'Rejected', value: 2 },
                                            ],
                                        },
                                    ]}
                                    width={350}
                                    height={350}
                                />
                            </Paper>

                            <Paper
                                elevation={8}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    maxWidth: 420,
                                    mx: 'auto',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    align="center"
                                    sx={{ fontWeight: 'bold', color: '#001833' }}
                                >
                                    Monthly Attendance
                                </Typography>
                                <BarChart
                                    series={[{ data: attendanceData.values }]}
                                    xAxis={[{ data: attendanceData.labels, scaleType: 'band' }]}
                                    width={350}
                                    height={300}
                                    margin={{ top: 30, bottom: 40, left: 50, right: 20 }}
                                />
                            </Paper>
                        </Grid>
                    </div>

                </Grid>
            </main>
        </div>
    );
}

export default Home;
