import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Copyright from './Copyright';

import { Box, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Snackbar, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { grey } from '@mui/material/colors';

import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

export default function Dashboard(props) {
  const authContext = useContext(AuthContext)
  const dataContext = useContext(DataContext)

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const handleClose = async () => { setShowStatus(false) }

  const [userImgs, setUserImgs] = useState([])

  const handleDownload = async (img) => {
    const response = await dataContext.dowloadFileFromAWS(img.url)
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

  const getImgs = async () => {
    if(loaded) return null
    const response = await dataContext.getPngFilesFromId(authContext.id)
    if(response.confirmation) {
      response.data.forEach(url => {
        setUserImgs(prevState => [...prevState, {url: url}]);
      });
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
    }
    setShowStatus(true)
    console.log('1')
  }


  useEffect( () => {
    getImgs()
    setLoaded(true)
  })

  return (
    <Box sx={{ display: 'flex' }}>

      <Snackbar open={showStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {status}
        </Alert>
      </Snackbar>

      <Navbar />
      <Box
        sx={{
          backgroundColor: grey[100],
          height: '100vh',
          overflow: 'auto',
          paddingTop: '5vh',
        }}
      >
        <ImageList>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader >December</ListSubheader>
          </ImageListItem>
          {userImgs.map((img) => (
            <ImageListItem key={img.url}>
              <img
                src={img.url}
                srcSet={img.url}
                alt={img.src}
                loading="lazy"
                onClick={(e) => { handleDownload(e) }}
              />
              <ImageListItemBar
                title={img.filename}
                subtitle={authContext.username}
                actionIcon={
                  <IconButton
                    sx={{ color: grey[200] }}
                    onClick={() => { handleDownload(img) }}
                  >
                    <SaveIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Copyright />
      </Box>
    </Box>
  );
}
