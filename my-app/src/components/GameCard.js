import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';

const GameCard = ({ country }) => {
    console.log('Rendering GameCard with country:', country);

    const defaultImage = 'https://via.placeholder.com/140';

    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" spacing={1}>
                    <img src={defaultImage} width={180} height={135}>

                    </img>
                    <Stack direction="row">
                        <Box
                            component="img"
                            src={country.imageUrl || defaultImage}
                            alt={`${country.name} flag`}
                            sx={{ width: 80, height: 50, marginRight: 2, mt: .5 }}
                        />
                        <Box>
                            <Typography variant="h6" component="div">
                                {country.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {country.nationality}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
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
