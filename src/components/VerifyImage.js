import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import Navbar from './Navbar';
import Copyright from './Copyright';

import { Box, Button, Grid, TextField, Toolbar, ButtonGroup, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteForeverIconRounded from '@mui/icons-material/DeleteForeverRounded'
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import YoutubeSearchedForRoundedIcon from '@mui/icons-material/YoutubeSearchedForRounded';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';

import LoadingButton from '@mui/lab/LoadingButton';

import { grey } from '@mui/material/colors';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function VerifyImage() {
  const authContext = useContext(AuthContext)
  const dataContext = useContext(DataContext)

  const [showResults, setShowResults] = useState('none')
  const [showSearch, setShowSearch] = useState('')

  const [loading, setLoading] = useState(false)

  const [imageList, setImageList] = React.useState([
  ])

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRemoveImg = async (img) => {
    console.log(img.url)
    setImageList(imageList.filter(item => item.url !== img.url))
    // URL.revokeObjectURL(img.url)
  }

  const handleSearch = async (img) => {
    setLoading(true)

    // AJAX
    setShowSearch('none')
    setShowResults('')
    setLoading(false)
  }

  const handleImportFiles = async (e) => {
    e.preventDefault()
    const files = e.target.files
    for (let file of files) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name

      setImageList(current => [...current, {
        url: fileUrl,
        filename: fileName,
        file: file
      }])
    }
  }

  const handleResetSearch = async () => {
    for (const img in imageList) URL.revokeObjectURL(img.url)
    setImageList([])
    setShowSearch('')
    setShowResults('none')
  }

  useEffect(() => {
    return (() => {
      imageList.forEach(img => {
        URL.revokeObjectURL(img.url)
      });
      setImageList([])
    })
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
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
              {mobile ? 'Import': 'Import files'}
              <input
                id='input_import_files'
                type="file"
                hidden
                accept="image/png"
                multiple
                onChange={(e) => { handleImportFiles(e) }}
              />
            </Button>
            <LoadingButton
              startIcon={<ImageSearchRoundedIcon />}
              onClick={handleSearch}
              loading={loading}
              loadingPosition="start"
              variant="contained"
            >
              {mobile ? 'Search': 'Search autors'}
            </LoadingButton>
            <Button
              startIcon={<YoutubeSearchedForRoundedIcon />}
              onClick={handleResetSearch}
              variant="contained"
            >
              {mobile ? 'Reset': 'Reset search'}
            </Button>
          </ButtonGroup>
        </Toolbar>

        {/* To display what images are gonna be searched */}
        <Box container margin={2} sx={{ display: showSearch }}>
          <ImageList cols={mobile ? 1 : 3}>
            {imageList.map((img) => (
              <ImageListItem key={img.url}>
                <img
                  src={img.url}
                  srcSet={img.url}
                  alt={img.filename}
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


        {/* To display results */}
        <Grid container margin={2} sx={{ display: showResults }}>
          {
            imageList.map((img) => (
              <Grid container direction='row'>

                {/* Picture */}
                <Grid container direction='column' xs={2.5}>
                  <Grid item sx={6}>
                    <img
                      alt={img.filename}
                      src={img.url}
                      style={{ minHeight: '25vh', maxWidth: '95%', maxHeight: '95%' }}
                    />
                  </Grid>
                </Grid>

                {/* TextFields */}
                <Grid container direction='row' spacing={2} xs={9}>

                  {/* Line 1 */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Filename"
                      value={img.filename}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Line 2 */}
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="User ID"
                      value={img.userId}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={img.username}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="User Emain"
                      value={img.userEmail}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Copyright/>
      </Box>
    </Box>
  )
}