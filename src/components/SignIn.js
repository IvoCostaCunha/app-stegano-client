import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import Copyright from './Copyright';

import background from '../assets/background.png'
import logo from '../assets/logo.png'

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

export default function SignIn() {
  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const handleClose = async () => { setShowStatus(false) }

  const [loading, setLoading] = React.useState(false);

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get('email'), password: formData.get('password') }

    const response = await authContext.signIn(data)

    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
      navigate("/dashboard", { replace: true });
      setLoading(false)
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
      setLoading(false)
    }
    setShowStatus(true)
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>

      <Snackbar open={showStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>


      
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: 'url(https://picsum.photos/1920/1080)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}/>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box padding={2}>
            <img src={logo} style={{ width: '5vh', width: '5vw', borderRadius: '10%' }} />
          </Box>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <LoadingButton
              type="submit"
              component="button"
              fullWidth
              endIcon={<VpnKeyRoundedIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Sign in</span>
            </LoadingButton>

          </Box>

          <Grid container align='center'>
            <Grid item xs={12}>
              <br />
              <Link href="#" variant="body2">
                Forgot password? (TODO on API side)
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href='/app/signup' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Copyright sx={{ mt: 5 }} />

        </Box>
      </Grid>
    </Grid >
  );
}