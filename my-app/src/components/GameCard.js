import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const GameCard = ({ country }) => {
    console.log('Rendering GameCard with country:', country);

    const defaultImage = 'https://via.placeholder.com/140';

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    component="img"
                    src={country.imageUrl || defaultImage}
                    alt={`${country.name} flag`}
                    sx={{ width: 50, height: 30, marginRight: 2 }}
                />
                <Box>
                    <Typography variant="h6" component="div">
                        {country.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {country.nationality}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

GameCard.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        nationality: PropTypes.string.isRequired
    }).isRequired
};

export default GameCard;
