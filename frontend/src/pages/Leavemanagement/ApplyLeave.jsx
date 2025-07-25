import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem, Alert, Paper
} from '@mui/material';

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const leaveTypes = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Maternity Leave'];

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

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('You must be logged in to apply for leave.');
      return;
    }

    const newLeave = {
      id: Date.now(),
      name: user.userName,
      from: fromDate,
      to: toDate,
      reason,
      type: leaveType,
      status: 'Pending',
      comment: '',
    };

    const existingLeaves = JSON.parse(localStorage.getItem('leaves')) || [];
    localStorage.setItem('leaves', JSON.stringify([...existingLeaves, newLeave]));

    setSuccessMsg('Leave application submitted!');
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setError('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Apply for Leave
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <TextField select label="Leave Type" fullWidth value={leaveType} onChange={(e) => setLeaveType(e.target.value)} margin="normal">
          {leaveTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        <TextField type="date" label="From Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
          value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

        <TextField type="date" label="To Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }}
          value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <TextField label="Reason" multiline rows={3} fullWidth margin="normal"
          value={reason} onChange={(e) => setReason(e.target.value)} />

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit Leave Request
        </Button>
      </Paper>
    </Box>
  );
}

export default ApplyLeave;
