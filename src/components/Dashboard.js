import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Copyright from './Copyright';

import { Link, Box, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { grey } from '@mui/material/colors';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

export default function Dashboard() {
  const authContext = useContext(AuthContext)
  const dataContext = useContext(DataContext)

  const navigate = useNavigate()

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)

  const handleClose = async () => { setShowStatus(false) }

  const [userImgs, setUserImgs] = useState([])
  const [isEmptyImgs, setIsEmptyImgs] = useState(true)

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleDelete = async (img) => {
    const response = await dataContext.deletePngFile(authContext.id, img.filename)
    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
      console.log(img.id)
      setUserImgs(userImgs.filter(item => item.id !== img.id))
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
    }
    setShowStatus(true)
  }

  const getImgs = async () => {
    const response = await dataContext.getPngFilesFromId(authContext.id)
    if (response.confirmation) {
      response.data.forEach(file => {
        setUserImgs(prevState => [...prevState, { id: file.id, ownerId: file.ownerId, filename: file.filename, url: file.url }]);
      });
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
    }
    setShowStatus(true)
  }


  useEffect(() => {
    getImgs().then(() => {
      if (userImgs.length > 0) setIsEmptyImgs(false)
    })
  }, [])

  useEffect(() => {
    console.log(userImgs)
  })

  useEffect(() => {
    setSeverity('info')
    setStatus('Updated.')
    setShowStatus(true)
    setIsEmptyImgs(!userImgs.length > 0)
  }, [userImgs])

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
          flexGrow: 1,
          backgroundColor: grey[100],
          height: '100vh',
          overflow: 'auto',
          paddingTop: '5vh',
        }}
      >

        <Box container margin={2}>
          <ImageList cols={mobile ? 1 : 3} sx={{ display: isEmptyImgs ? 'none' : 'grid' }}>
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
                  subtitle={img.ownerId}
                  actionIcon={
                    <>
                      <IconButton
                        sx={{ color: grey[200] }}
                        onClick={() => { handleDownload(img) }}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: grey[200] }}
                        onClick={() => { handleDelete(img) }}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>

                    </>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>

          <Typography variant="h5" sx={{ display: isEmptyImgs ? '' : 'none', textAlign: 'center', paddingTop: '30px' }} fullWidth>
            You have not yet signed any image ? <br />
            <Link variant="h6"
              onClick={() => { navigate('/sign-image', { replace: true }) }}
            >
              Start here ! </Link>
          </Typography>
        </Box>
      </Box>


    </Box>
  );
}
