import { Typography, Grid, Paper, Box, Card, CardContent, Button } from '@mui/material';
import { 
    Work, 
    Analytics, 
    EventNote, 
    People, 
    Security, 
    Speed,
    ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Work sx={{ fontSize: 48, color: '#001833' }} />,
            title: 'Attendance Tracking',
            description: 'Monitor employee attendance in real-time with our advanced tracking system. Get detailed reports and insights on attendance patterns.',
            color: '#4CAF50'
        },
        {
            icon: <EventNote sx={{ fontSize: 48, color: '#001833' }} />,
            title: 'Leave Management',
            description: 'Streamline leave applications and approvals with automated workflows. Manage different types of leaves efficiently.',
            color: '#2196F3'
        },
        {
            icon: <Analytics sx={{ fontSize: 48, color: '#001833' }} />,
            title: 'Analytics & Reports',
            description: 'Generate comprehensive reports and analytics. Get insights into attendance trends and workforce patterns.',
            color: '#FF9800'
        },
        {
            icon: <People sx={{ fontSize: 48, color: '#001833' }} />,
            title: 'Employee Management',
            description: 'Manage employee profiles, roles, and permissions. Keep track of all employee information in one place.',
            color: '#9C27B0'
        }
    ];

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
            <main style={{ maxWidth: 1200, margin: '0 auto' }}>
                
                {/* Hero Section */}
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: 8, 
                    py: 6,
                    background: ' #001833',
                    borderRadius: 4,
                    color: 'white',
                    px: 4
                }}>
                    <Typography variant="h2" sx={{ 
                        fontWeight: 700, 
                        mb: 3,
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                    }}>
                        Welcome to RaaD HR
                    </Typography>
                    <Typography variant="h5" sx={{ 
                        mb: 4,
                        opacity: 0.9,
                        maxWidth: 800,
                        mx: 'auto',
                        lineHeight: 1.6
                    }}>
                        The Complete Human Resource Management Solution
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        mb: 4,
                        opacity: 0.8,
                        maxWidth: 600,
                        mx: 'auto',
                        fontSize: '1.1rem'
                    }}>
                        Streamline your workforce management with our comprehensive HR solution. 
                        Track attendance, manage leaves, and generate insightful reports all in one powerful platform.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{ 
                                bgcolor: 'white', 
                                color: '#001833',
                                px: 4,
                                py: 1.5,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            Get Started
                            <ArrowForward sx={{ ml: 1 }} />
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{ 
                                borderColor: 'white', 
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                '&:hover': { 
                                    borderColor: 'white', 
                                    bgcolor: 'rgba(255,255,255,0.1)' 
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" sx={{ 
                        fontWeight: 600, 
                        color: '#001833', 
                        mb: 2,
                        textAlign: 'center'
                    }}>
                        What We Offer
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: '#666', 
                        mb: 6,
                        textAlign: 'center',
                        maxWidth: 600,
                        mx: 'auto'
                    }}>
                        Comprehensive HR management tools designed to streamline your operations
                    </Typography>
                    
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ 
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    p: 4,
                                    textAlign: 'center',
                                    minHeight: '18rem',
                                    maxHeight: '18rem',
                                    width: '12rem',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { 
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                                    }
                                }}>
                                    <Box sx={{ mb: 3 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        mb: 2, 
                                        color: '#001833' 
                                    }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {feature.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Why Choose Us Section */}
                <Box sx={{ mb: 8 }}>
                    <Paper sx={{ 
                        borderRadius: 4,
                        p: 6,
                        background: 'linear-gradient(135deg, #001833 0%, #667eea 100%)',
                        color: 'white'
                    }}>
                        <Typography variant="h3" sx={{ 
                            fontWeight: 600, 
                            mb: 4,
                            textAlign: 'center'
                        }}>
                            Why Choose RaaD HR?
                        </Typography>
                        
                        <Grid container spacing={4} justifyContent={'center'}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                        500+
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                        Companies Trust Us
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                        99.9%
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                        Uptime Guarantee
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                        24/7
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                        Customer Support
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                {/* Call to Action */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ 
                        fontWeight: 600, 
                        color: '#001833', 
                        mb: 3
                    }}>
                        Ready to Transform Your HR Management?
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: '#666', 
                        mb: 4,
                        maxWidth: 600,
                        mx: 'auto'
                    }}>
                        Join thousands of companies that have already streamlined their HR processes with RaaD HR
                    </Typography>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => navigate('/login')}
                        sx={{ 
                            bgcolor: '#001833',
                            px: 6,
                            py: 2,
                            fontSize: '1.1rem',
                            '&:hover': { bgcolor: '#001833' }
                        }}
                    >
                        Start Your Free Trial
                        <ArrowForward sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </main>
        </div>
    );
}

export default Home;
