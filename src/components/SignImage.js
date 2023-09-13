import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

import Navbar from './Navbar';
import Copyright from './Copyright';

import { Button, Container, Grid, ImageList, ImageListItem, Typography, Box, Toolbar, ImageListItemBar, IconButton, ButtonGroup, Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { red, green, grey } from '@mui/material/colors';
import DeleteIconRounded from '@mui/icons-material/DeleteRounded';
import DeleteForeverIconRounded from '@mui/icons-material/DeleteForeverRounded';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SignImage() {
  const dataContext = useContext(DataContext)
  const authContext = useContext(AuthContext)

  // Severities -> error, warning, info, success
  const [severity, setSeverity] = useState('success')
  const [status, setStatus] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const handleClose = async () => { setShowStatus(false) }

  const [loading, setLoading] = React.useState(false);

  const [tempImgToUpload, setTempImpToUpload] = useState([])

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImportFiles = async (e) => {
    e.preventDefault()
    const files = e.target.files
    for (let file of files) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name

      setTempImpToUpload(current => [...current, {
        url: fileUrl,
        filename: fileName,
        file: file
      }])
    }
  }

  const handleRemoveImg = async (img) => {
    setTempImpToUpload(tempImgToUpload.filter(item => item.url !== img.url))
    URL.revokeObjectURL(img.url)
  }

  const removeAllImgs = async () => {
    for (const img in tempImgToUpload) URL.revokeObjectURL(img.url)
    setTempImpToUpload([])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData();

    for (const x in tempImgToUpload) {
      formData.append(tempImgToUpload[x].file.name, tempImgToUpload[x].file);
    }

    const response = await dataContext.sendPngFiles(authContext.id, formData)

    if (response.confirmation) {
      setSeverity('success')
      setStatus(response.message + ` (code: ${response.code})`)
      setLoading(false)
      // retrieve images then
    }
    else {
      setSeverity('error')
      setStatus(response.error + ` (code: ${response.code})`)
      setLoading(false)
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
        sx={{
          backgroundColor: grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          paddingTop: '8vh',
        }}
      >

        <Toolbar position="fixed">
          <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
            <Button
              startIcon={<DriveFolderUploadRoundedIcon />}
              onClick={() => { document.getElementById('input_import_files').click() }}
            >
              Import files
              <input
                id='input_import_files'
                type="file"
                hidden
                accept="image/png"
                multiple
                onChange={(e) => { handleImportFiles(e) }}
              />
            </Button>
            <LoadingButton startIcon={<FileOpenRoundedIcon />}
              onClick={handleUpload}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              <span>Sign imported images</span>
            </LoadingButton>
            <Button
              startIcon={<DeleteIconRounded />}
              onClick={removeAllImgs}
            >
              Remove all images</Button>
          </ButtonGroup>
        </Toolbar>

        <Box container margin={2}>
          <ImageList  cols={mobile ? 1 : 3} >
            {tempImgToUpload.map((img) => (
              <ImageListItem key={img.url}>
                <img
                  src={img.url}
                  srcSet={img.url}
                  id={img.id}
                  alt={img.title}
                  loading="lazy"
                  style={{ maxWidth: '95%', maxHeight: '95%' }}
                />
                <ImageListItemBar
                  title={img.filename}
                  actionIcon={
                    <IconButton
                      sx={{ color: grey[200] }}
                      onClick={() => { handleRemoveImg(img) }}
                    >
                      <DeleteForeverIconRounded />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Copyright />
      </Box>
    </Box>
  )
}