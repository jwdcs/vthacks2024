import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const GameCard = ({ country }) => {
    console.log('Rendering GameCard with country:', country);

    // Default image if URL is not provided or is invalid
    const defaultImage = 'https://via.placeholder.com/140';

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={country.imageUrl || defaultImage}
                alt={`${country.name} flag/cuisine`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {country.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default GameCard;
