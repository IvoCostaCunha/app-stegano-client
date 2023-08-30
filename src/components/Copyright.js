import React, { useState, useContext, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
    return (
      
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        <br/>
        {'Copyright © '}
        <Link color="inherit" href="/app/about">
          stegano-image
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }