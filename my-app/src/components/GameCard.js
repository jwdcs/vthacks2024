import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';

const GameCard = ({ country }) => {
    console.log('Rendering GameCard with country:', country);

    // Default image if URL is not provided or is invalid
    const defaultImage = 'https://via.placeholder.com/140';

    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" spacing={1}>
                    <img src={defaultImage} width={180} height={130}>

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
                                {country.nationality}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {country.name}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default GameCard;
