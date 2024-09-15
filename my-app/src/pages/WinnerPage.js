import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { WinnerContext } from '../WinnerContext.js';

function WinnerPage() {
    const winnerContext = useContext(WinnerContext);

    // Extract winner data from context
    const winnerData = winnerContext.recipes ?? null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                p: 2,
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                We have a winner!
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                {winnerData ? `${winnerData}` : 'Loading...'}
            </Typography>
            <Box sx={{ mt: 4 }}>
                {winnerData && (
                    <Box>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Top Recipes:
                        </Typography>
                        <ul>
                            {winnerData.recipes && winnerData.recipes.map((recipe, index) => (
                                <li key={index}>{recipe}</li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default WinnerPage;
