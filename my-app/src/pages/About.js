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
            <br />
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
                This is a project made by <span style={{ color: "#EA5723" }}>James de Chutkowski</span>,  <span style={{ color: "#EA5723" }}>Matthew Brenningmeyer</span>,  <span style={{ color: "#EA5723" }}>Abhishek Kotgire</span>, and <span style={{ color: "#EA5723" }}>Abhay Raghavan</span> for VTHacks 12.
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                <br />
                <br />
                Check out our GitHub and Devpost by clicking the images below!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center both images horizontally
                    gap: '20px', // Space between the images
                    mt: 3,
                }}
            >
                <a href='https://github.com/jwdcs/vthacks2024'>
                    <img
                        src={`${process.env.PUBLIC_URL}/github.svg`}
                        alt="GitHub Logo"
                        color='white'
                        style={{ width: '150px', height: '150px', color: 'white' }}
                    />
                </a>
                <a href='https://devpost.com/software/thunder-dough'>
                    <img
                        src={`${process.env.PUBLIC_URL}/devpost.svg`}
                        alt="Devpost Logo"
                        style={{ width: '150px', height: '150px' }}
                    />
                </a>
            </Box>
        </Box >
    );
};

export default About;
