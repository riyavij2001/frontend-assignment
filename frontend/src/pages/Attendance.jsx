import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Paper, 
    Alert, 
    Card, 
    CardContent,
    Avatar,
    Divider,
    Chip
} from '@mui/material';
import { 
    AccessTime, 
    ExitToApp, 
    Login as LoginIcon, 
    Person,
    Warning,
    CheckCircle
} from '@mui/icons-material';

function Attendance() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.role !== 'employee') {
        setError('Only employees can access the attendance tracker. Please log in with an employee account.');
        return;
      }

      const storedLoginTime = localStorage.getItem('loginTime');
      if (storedLoginTime) {
        setLoginTime(new Date(storedLoginTime));
        setIsLoggedIn(true);
      }
    } else {
      setError('Please log in to access the attendance tracker.');
    }
  }, []);

  const handleLogin = () => {
    const now = new Date();
    localStorage.setItem('loginTime', now.toISOString());
    setLoginTime(now);
    setIsLoggedIn(true);
    setLogoutTime(null);
    setDuration('');
  };

  const handleLogout = () => {
    const now = new Date();
    setLogoutTime(now);
    setIsLoggedIn(false);
    localStorage.removeItem('loginTime');

    const diffMs = now - loginTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setDuration(`${hours}h ${minutes}m ${seconds}s`);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          color: '#001833', 
          mb: 3,
          textAlign: 'center'
        }}>
          Employee Attendance Tracker
        </Typography>

        {error ? (
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}>
              <Warning sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Access Restricted
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {error}
              </Typography>
            </Box>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                {user ? (
                  <>
                    You are currently logged in as <strong>{user.userName}</strong> with role <strong>{user.role}</strong>.
                    <br />
                    Only employees can access the attendance tracker.
                  </>
                ) : (
                  'Please log in with an employee account to access this feature.'
                )}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  onClick={() => window.location.href = '/login'}
                  sx={{ 
                    bgcolor: '#001833',
                    '&:hover': { bgcolor: '#001833' }
                  }}
                >
                  Go to Login
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => window.location.href = '/'}
                  sx={{ 
                    borderColor: '#001833',
                    color: '#001833',
                    '&:hover': { 
                      borderColor: '#001833',
                      bgcolor: 'rgba(0,24,51,0.1)' 
                    }
                  }}
                >
                  Back to Home
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: ' #001833',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}>
              <Person sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome, {user?.userName}!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Track your daily attendance and work hours
              </Typography>
            </Box>
            
            <CardContent sx={{ p: 4 }}>
              {isLoggedIn ? (
                <>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 3,
                    p: 2,
                    bgcolor: '#e8f5e8',
                    borderRadius: 2,
                    border: '1px solid #4caf50'
                  }}>
                    <CheckCircle sx={{ color: '#4caf50' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                        Currently Logged In
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Login Time: <strong>{loginTime?.toLocaleTimeString()}</strong>
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    color="error" 
                    fullWidth 
                    onClick={handleLogout}
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': { bgcolor: '#d32f2f' }
                    }}
                  >
                    <ExitToApp sx={{ mr: 1 }} />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 3,
                    p: 2,
                    bgcolor: '#fff3e0',
                    borderRadius: 2,
                    border: '1px solid #ff9800'
                  }}>
                    <AccessTime sx={{ color: '#ff9800' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 600 }}>
                        Ready to Start
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Click below to log in for the day
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleLogin}
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      bgcolor: '#001833',
                      '&:hover': { bgcolor: '#001833' }
                    }}
                  >
                    <LoginIcon sx={{ mr: 1 }} />
                    Check In
                  </Button>
                </>
              )}

              {logoutTime && (
                <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#001833' }}>
                    Session Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Login Time:</strong> {loginTime?.toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Logout Time:</strong> {logoutTime.toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total Duration:</strong> 
                      <Chip 
                        label={duration} 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}

export default Attendance;
