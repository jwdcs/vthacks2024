import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const LogoText = styled('span')(({ theme }) => ({
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#EA5723',
    marginLeft: theme.spacing(2),
    display: 'inline-block',
    verticalAlign: 'middle',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'inherit',
    textTransform: 'none',
    position: 'relative',
    '&:hover': {
        color: '#EA5723',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -2,
            width: '100%',
            height: '2px',
            backgroundColor: '#EA5723',
        },
    },
}));

const Header = () => {
    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img
                        src="bitefight.png"
                        alt="Logo"
                        style={{ height: '50px' }}
                    />
                    <LogoText>BiteFight</LogoText>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledButton color="inherit">Battle!</StyledButton>
                    <StyledButton color="inherit">About</StyledButton>
                    <StyledButton color="inherit">Services</StyledButton>
                    <StyledButton color="inherit">Contact</StyledButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
