import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
    return (
        <Box
            sx={{
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: 'white',
                padding: '20px',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/vthackslogo.svg`}
                alt="SVG Illustration"
                style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
            />
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    marginTop: '40px',
                    marginBottom: '20px',
                }}
            >
                About Us
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                This is a project made by James de Chutkowski, Matthew Brenningmeyer, Abhishek Kotgire, Abhay Raghavan for VT Hacks 12! It is a [description here]
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                Check out our GitHub repo and Devpost by clicking the images below!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center both images horizontally
                    gap: '20px', // Space between the images
                }}
            >
                <img
                    src={`${process.env.PUBLIC_URL}/github.svg`}
                    alt="GitHub Logo"
                    style={{ width: '150px', height: 'auto' }}
                />
                <img
                    src={`${process.env.PUBLIC_URL}/devpost.svg`}
                    alt="Devpost Logo"
                    style={{ width: '150px', height: 'auto' }}
                />
            </Box>
        </Box >
    );
};

export default About;
