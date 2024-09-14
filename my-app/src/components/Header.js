import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
    const navigate = useNavigate(); // To handle redirects
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        // Logic for sign out
        console.log('Signing out...');
        handleMenuClose();
    };

    return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img
                        src="bitefight.png"
                        alt="Logo"
                        style={{ height: '50px' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledButton onClick={() => navigate('/battle')}><LogoText>Bite </LogoText> Fight!</StyledButton>
                </Box>

                <StyledButton color="inherit" onClick={() => navigate('/about')}>About</StyledButton>


                <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                    <Avatar alt="Profile" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => {
                        navigate("/services")
                    }}>Profile</MenuItem>
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
