import React, { useState, useContext, useEffect } from 'react';

import Navbar from './Navbar'
import Copyright from './Copyright';

import { Box, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from '@mui/material/Link';

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
            <Typography variant='span' textAlign='center' justifyContent='flex-start' fullwidth>
              DESCRIPTION enim et ullamco anim. Nisi occaecat in amet Lorem non adipisicing deserunt officia. Ex incididunt non proident enim ullamco nostrud ea elit proident laborum. Tempor voluptate reprehenderit ipsum eu consequat ut veniam esse ipsum ullamco.
              Minim veniam esse eiusmod et enim exercitation adipisicing aute aliqua ad et magna sit. Irure voluptate eu Lorem est. Commodo irure voluptate eiusmod anim id cupidatat elit reprehenderit eiusmod nostrud excepteur. Duis veniam labore reprehenderit quis est.
              Aliqua culpa ut fugiat ea ad sunt qui anim esse ea veniam culpa velit exercitation. Esse fugiat dolore sint et commodo tempor ullamco Lorem cillum dolor minim sunt cupidatat et. Eu culpa incididunt adipisicing minim amet qui cupidatat deserunt laborum cillum. Esse velit minim et aliquip.
            </Typography>
          </Grid>


        </Grid>
        <Copyright />
      </Box>
    </Box>

  );
}