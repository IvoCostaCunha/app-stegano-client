import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../contexts/AuthContext';

import Copyright from './Copyright';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar, Alert } from '@mui/material';
import { red, green, orange } from '@mui/material/colors';


export default function SignUp() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext)

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const [showHelpText, setShowHelpText] = useState("none")
  const handleClose = async () => { setShowStatus(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get('email'), username: formData.get('username'), password: formData.get('password') }
    const response = await authContext.signUp(data)

    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` code(${response.code})`)
      navigate("/signin", { replace: true });
    }

    if (!response.confirmation) {
      setShowHelpText('')
      setSeverity('error')
      setStatus(response.error + ` code(${response.code}).`)
    }
    setShowStatus(true)
  }


  return (
    <Container component="main" maxWidth="xs">

      <Snackbar open={showStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Adress"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {console.log(showHelpText)}
          <Typography sx={{ display: showHelpText, color: orange[900], textAlign: 'center'}}>
            {
              `Password must be at least 6 characters long.\n`
              + `Username must be alphanumerical without spaces.\n`
              + `Email must be valid.`
            }
          </Typography>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link href='/app/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}