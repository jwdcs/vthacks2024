import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Collapse, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { WinnerContext } from '../WinnerContext.js';
import { useNavigate } from 'react-router-dom';

function WinnerPage() {
    const winnerContext = useContext(WinnerContext);
    const navigate = useNavigate();

    // Extract winner data from context
    const winnerData = winnerContext.recipes ?? null;
    const [expandedRecipe, setExpandedRecipe] = useState(null);

    const handleExpandClick = (index) => {
        setExpandedRecipe(expandedRecipe === index ? null : index);
    };

    useEffect(() => {
        if (winnerData === null) {
            navigate("/battle");
        }
    }, [winnerData, navigate]);

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
                {winnerData ? `The winner is ${winnerData.countryName}` : 'Loading...'}
            </Typography>
            <Box sx={{ mt: 4, width: '80%' }}>
                {winnerData && (
                    <Box>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Top Recipes:
                        </Typography>
                        {winnerData.recipes.map((recipe, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        p: 2,
                                        border: '1px solid #ddd',
                                        borderRadius: 2,
                                    }}
                                    onClick={() => handleExpandClick(index)}
                                >
                                    <Box>
                                        <Typography variant="h6">{recipe.recipe_name}</Typography>
                                        <Typography variant="body2">
                                            {recipe.recipe_description.length > 50
                                                ? `${recipe.recipe_description.slice(0, 50)}...`
                                                : recipe.recipe_description}
                                        </Typography>
                                    </Box>
                                    <IconButton>
                                        <FontAwesomeIcon icon={expandedRecipe === index ? faChevronUp : faChevronDown} />
                                    </IconButton>
                                </Box>
                                <Collapse in={expandedRecipe === index}>
                                    <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                                        <Typography variant="h6">Ingredients:</Typography>
                                        <ul>
                                            {recipe.recipe_ingredients.map((ingredient, idx) => (
                                                <li key={idx}>{ingredient}</li>
                                            ))}
                                        </ul>
                                        <Typography variant="h6">Instructions:</Typography>
                                        <Typography variant="body1">{recipe.recipe_instructions}</Typography>
                                    </Box>
                                </Collapse>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default WinnerPage;
