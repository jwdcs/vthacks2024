import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Card = ({ country }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={country.imageUrl}
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

export default Card;
