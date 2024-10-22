import React from 'react';

import Navbar from './Navbar'
import Copyright from './Copyright';

import { List, ListItem, Box, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function About() {

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
        <Grid container direction='column' padding={2}>
          <Grid item xs={12}>
            <Typography variant='h4' textAlign='center'>About stegno-image</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' textAlign='center' fullwidth>
              Description
            </Typography>
            <Typography variant='span' fullwidth>
              Stegano image allows you to sign PNG images with the steganography method of LSB.
            </Typography>
            <Typography variant='h6' textAlign='center' justifyContent='flex-start' fullwidth>
              v0.1 known issues:
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                listStylePosition: 'inside',
              }}
            >
              <ListItem sx={{ display: 'list-item' }}>
                Deleting an image from dash board deletes all images from UI but not from backend.
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                SignImage onlmy download the 1st image on the list
              </ListItem>
            </List>
          </Grid>


        </Grid>
        <Copyright />
      </Box>
    </Box>

  );
}