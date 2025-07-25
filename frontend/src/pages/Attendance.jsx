import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';

function Attendance() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'employee') {
      setError('Only employees can access this feature.');
      return;
    }

    // Restore previous session (optional)
    const storedLoginTime = localStorage.getItem('loginTime');
    if (storedLoginTime) {
      setLoginTime(new Date(storedLoginTime));
      setIsLoggedIn(true);
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Employee Attendance Tracker
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {!error && (
          <>
            {isLoggedIn ? (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Logged in at: <strong>{loginTime?.toLocaleTimeString()}</strong>
                </Typography>
                <Button variant="contained" color="error" fullWidth onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Log In
              </Button>
            )}

            {logoutTime && (
              <Box mt={3}>
                <Typography variant="body1">
                  Logged out at: <strong>{logoutTime.toLocaleTimeString()}</strong>
                </Typography>
                <Typography variant="body1">
                  Total Duration: <strong>{duration}</strong>
                </Typography>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default Attendance;
