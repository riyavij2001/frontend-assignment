import React, { useEffect, useState } from 'react';
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';

function ApprovalLeave() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [rejectionComment, setRejectionComment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];
    setRequests(leaves);
  }, []);

  const updateLeaves = (updatedRequests) => {
    setRequests(updatedRequests);
    localStorage.setItem('leaves', JSON.stringify(updatedRequests));
  };

  const handleApprove = (id) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: 'Approved' } : req
    );
    updateLeaves(updated);
  };

  const handleRejectClick = (id) => {
    setSelectedId(id);
    setRejectionComment('');
    setOpenDialog(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectionComment.trim()) {
      setError('Rejection comment is required.');
      return;
    }

    const updated = requests.map(req =>
      req.id === selectedId ? { ...req, status: 'Rejected', comment: rejectionComment } : req
    );
    updateLeaves(updated);
    setOpenDialog(false);
    setError('');
  };

  if (!user || user.role !== 'admin') {
    return (
      <Box p={4}>
        <Alert severity="warning">Access Denied: Only admins can view this page.</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Leave Approval Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#001833' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Employee</TableCell>
              <TableCell sx={{ color: '#fff' }}>Leave Type</TableCell>
              <TableCell sx={{ color: '#fff' }}>From</TableCell>
              <TableCell sx={{ color: '#fff' }}>To</TableCell>
              <TableCell sx={{ color: '#fff' }}>Reason</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Comment</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.name}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>{req.from}</TableCell>
                <TableCell>{req.to}</TableCell>
                <TableCell>{req.reason}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>{req.comment || '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleApprove(req.id)}
                    disabled={req.status !== 'Pending'}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRejectClick(req.id)}
                    disabled={req.status !== 'Pending'}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reject Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reject Leave Request</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="Rejection Comment"
            multiline
            rows={3}
            fullWidth
            value={rejectionComment}
            onChange={(e) => setRejectionComment(e.target.value)}
            placeholder="Reason for rejection"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleRejectConfirm} variant="contained" color="error">
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ApprovalLeave;
