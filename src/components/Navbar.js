import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import { Snackbar, Alert } from '@mui/material';
import { red, grey } from '@mui/material/colors';

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard(props) {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext)

  const navigate = useNavigate()

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const handleClose = async () => { setShowStatus(false) }

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };


  const handleDisconnect = async () => {
    const response = await authContext.signOut()

    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
      navigate("/signin", { replace: true });
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
    }
    setShowStatus(true)
  }

  return (
    <Box>

      <Snackbar open={showStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>

      <AppBar position="fixed">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            height: '5vh'
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            align='center'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {appContext.currentPage}
          </Typography>

          <Button onClick={() => { handleDisconnect() }}>
            <ExitToAppIcon sx={{ color: grey[100] }} />
          </Button>

        </Toolbar>

      </AppBar>
      <Toolbar />
      <Drawer
        variant="permanent"
        open={open}
      >

        <List
          component="nav"
        >
          <ListItemButton
            onClick={() => {
              appContext.setCurrentPage('Dashboard')
              navigate("/dashboard", { replace: true });
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            appContext.setCurrentPage('Profile')
            navigate("/profile", { replace: true });
          }}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            appContext.setCurrentPage('Sign Images')
            navigate("/sign-image", { replace: true });
          }}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Sign new image" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            appContext.setCurrentPage('Verify Images')
            navigate("/verify-image", { replace: true });
          }}>
            <ListItemIcon>
              <FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Verify Image" />
          </ListItemButton>

          <ListItemButton onClick={() => {
            appContext.setCurrentPage('About')
            navigate("/about", { replace: true });
          }}>
            <ListItemIcon>
              <HelpCenterRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}
