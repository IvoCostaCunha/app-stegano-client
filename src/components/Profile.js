import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Copyright from './Copyright';

import { Container, Button, TextField, Toolbar, Box, Typography, Snackbar, Alert, } from '@mui/material';
import { red, green } from '@mui/material/colors';

export default function SignImage(props) {
  const authContext = useContext(AuthContext);

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const handleClose = async () => { setShowStatus(false) }


  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get('email'), username: formData.get('username') }

    const response = await authContext.updateUser(data)

    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
    }
    setShowStatus(true)
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Snackbar open={showStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>

      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box component="form" onSubmit={(e) => { handleUpdate(e) }} noValidate sx={{ mt: 1 }}>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              margin="normal"
              required
              fullWidth
              name="id"
              label="Your ID (Cannot be changed)"
              type="id"
              id="id"
              defaultValue={authContext.id}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Email Address"
              name="email"
              defaultValue={authContext.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Your Username"
              type="username"
              id="username"
              defaultValue={authContext.username}
            />
            <TextField
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              required
              fullWidth
              name="created_at"
              label="Date of creation (Cannot be changed)"
              type="created_at"
              id="created_at"
              defaultValue={authContext.created_at}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update your profile
            </Button>
          </Box>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}