import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function DashboardUtils() {
    const context = useContext(AuthContext);
    const navigate = useNavigate()

    return (
        <div className='dashboard-utils-wrapper'>
            <h3> Utils here</h3>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => {navigate("/sign-image", { replace: true });}}>Sign new image</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="contained">Contained</Button>
            </Stack>
        </div>
    );
}