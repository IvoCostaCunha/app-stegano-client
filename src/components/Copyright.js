import React, { useState, useContext, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props) {
    return (
      
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        <br/>
	<Link color="inherit" href="https://opensource.org/license/mit">
        MIT Licence
	</Link>
	{' 2024 @ '}
        <Link color="inherit" href="/app/about">
          Ivo Costa Cunha
        </Link>
	.
      </Typography>
    );
  }
