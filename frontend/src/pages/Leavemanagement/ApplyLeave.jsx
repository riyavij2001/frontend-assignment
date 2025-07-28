import React, { useState, useEffect } from 'react';
import {
  Box, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  Alert, 
  Card,
  CardContent,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  EventNote,
  Description,
  CalendarToday,
  Send,
  CheckCircle,
  Warning,
  Person,
  Schedule
} from '@mui/icons-material';

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [leaveDays, setLeaveDays] = useState(0);

  const leaveTypes = [
    { value: 'Sick Leave', label: 'Sick Leave', color: '#ff9800' },
    { value: 'Casual Leave', label: 'Casual Leave', color: '#2196f3' },
    { value: 'Earned Leave', label: 'Earned Leave', color: '#4caf50' },
    { value: 'Maternity Leave', label: 'Maternity Leave', color: '#e91e63' }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDays(diffDays);
    } else {
      setLeaveDays(0);
    }
  }, [fromDate, toDate]);

  const handleSubmit = () => {
    if (!leaveType || !fromDate || !toDate || !reason) {
      setError('Please fill out all fields.');
      setSuccessMsg('');
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      setError('From date cannot be after To date.');
      setSuccessMsg('');
      return;
    }

    if (!user) {
      setError('You must be logged in to apply for leave.');
      return;
    }

    const newLeave = {
      id: Date.now(),
      name: user.userName,
      from: fromDate.toISOString().split('T')[0],
      to: toDate.toISOString().split('T')[0],
      reason,
      type: leaveType,
      status: 'Pending',
      comment: '',
      days: leaveDays,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    const existingLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
    localStorage.setItem('leaves', JSON.stringify([...existingLeaves, newLeave]));

    setSuccessMsg('Leave application submitted successfully!');
    setLeaveType('');
    setFromDate(null);
    setToDate(null);
    setReason('');
    setError('');
    setLeaveDays(0);
  };

  const getLeaveTypeColor = (type) => {
    const leaveType = leaveTypes.find(lt => lt.value === type);
    return leaveType ? leaveType.color : '#666';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            color: '#001833', 
            mb: 3,
            textAlign: 'center'
          }}>
            Apply for Leave
          </Typography>

          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: '#001833',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}>
              <EventNote sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Leave Application Form
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Submit your leave request for approval
              </Typography>
            </Box>
            
            <CardContent sx={{ p: 4 }}>
              {user ? (
                <>
                  {/* User Info Section */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 4,
                    p: 2,
                    bgcolor: '#e3f2fd',
                    borderRadius: 2,
                    border: '1px solid #2196f3'
                  }}>
                    <Person sx={{ color: '#2196f3' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                        Welcome, {user.userName}!
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Role: <strong>{user.role}</strong>
                      </Typography>
                    </Box>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      <Warning sx={{ mr: 1 }} />
                      {error}
                    </Alert>
                  )}
                  
                  {successMsg && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {successMsg}
                    </Alert>
                  )}

                  <Grid container spacing={3} direction={"row"}>
                    {/* Leave Type */}
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Leave Type</InputLabel>
                        <Select
                          value={leaveType}
                          label="Leave Type"
                          onChange={(e) => setLeaveType(e.target.value)}
                          sx={{
                            '& .MuiSelect-select': {
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              width: 120
                            }
                          }}
                        >
                          {leaveTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ 
                                  width: 12, 
                                  height: 12, 
                                  borderRadius: '50%', 
                                  bgcolor: type.color 
                                }} />
                                {type.label}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Leave Duration Display */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: '#f5f5f5', 
                        borderRadius: 2,
                        border: '1px solid #ddd',
                        display: 'flex',
                      }}>
                        <Typography variant="body2" sx={{ color: '#666', mr: 2 }}>
                          Leave Duration:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#001833', fontWeight: 600 }}>
                          {leaveDays} {leaveDays === 1 ? 'day' : 'days'}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* From Date */}
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <CalendarToday sx={{ mr: 1, color: '#666' }} />
                            }}
                          />
                        )}
                        disablePast
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            InputProps: {
                              startAdornment: <CalendarToday sx={{ mr: 1, color: '#666' }} />
                            }
                          }
                        }}
                      />
                    </Grid>

                    {/* To Date */}
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <CalendarToday sx={{ mr: 1, color: '#666' }} />
                            }}
                          />
                        )}
                        disablePast
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            InputProps: {
                              startAdornment: <CalendarToday sx={{ mr: 1, color: '#666' }} />
                            }
                          }
                        }}
                      />
                    </Grid>

                    {/* Reason */}
                    <Grid item xs={12}>
                      <TextField
                        label="Reason for Leave"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please provide a detailed reason for your leave request..."
                        InputProps={{
                          startAdornment: <Description sx={{ mr: 1, color: '#666', alignSelf: 'flex-start', mt: 2}} />
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  {/* Submit Button */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!leaveType || !fromDate || !toDate || !reason}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        bgcolor: '#001833',
                        '&:hover': { bgcolor: '#001833' },
                        '&:disabled': { bgcolor: '#ccc' }
                      }}
                    >
                      <Send sx={{ mr: 1 }} />
                      Submit Leave Request
                    </Button>
                  </Box>

                  {/* Leave Summary Preview */}
                  {leaveType && fromDate && toDate && reason && (
                    <Box sx={{ mt: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                      <Typography variant="h6" sx={{ mb: 2, color: '#001833' }}>
                        Leave Summary Preview
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            <strong>Leave Type:</strong>
                          </Typography>
                          <Chip 
                            label={leaveType} 
                            size="small" 
                            sx={{ 
                              bgcolor: getLeaveTypeColor(leaveType),
                              color: 'white',
                              mt: 0.5
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            <strong>Duration:</strong> {leaveDays} {leaveDays === 1 ? 'day' : 'days'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            <strong>From:</strong> {fromDate.toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            <strong>To:</strong> {toDate.toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Warning sx={{ fontSize: 48, color: '#ff9800', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#001833', mb: 2 }}>
                    Login Required
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                    You must be logged in to apply for leave.
                  </Typography>
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
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default ApplyLeave;
