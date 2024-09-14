import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

const Game = () => {
    const [cards, setCards] = useState({ card1: null, card2: null });
    const [current, setCurrent] = useState(null);
    const [losers, setLosers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/start_game');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCards({ card1: data.card1, card2: data.card2 });
                setCurrent(null);
                setLosers([]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const selectCard = async (winner, loser) => {
        try {
            const response = await fetch('http://localhost:5000/select_winner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ winner, loser }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCurrent(winner);
            setLosers([...losers, loser]);
        } catch (error) {
            console.error('Error selecting card:', error);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            {cards.card1 && cards.card2 ? (
                <>
                    <GameCard country={cards.card1} />
                    <GameCard country={cards.card2} />
                    <Box>
                        <Button
                            variant="contained"
                            onClick={() => selectCard(cards.card1.name, cards.card2.name)}
                        >
                            Select {cards.card1.nationality}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => selectCard(cards.card2.name, cards.card1.name)}
                        >
                            Select {cards.card2.nationality}
                        </Button>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Current Winner: {current}</Typography>
                        <Typography variant="h6">Losers: {losers.join(', ')}</Typography>
                    </Box>
                </>
            ) : (
                <Typography>Loading cards...</Typography>
            )}
        </Box>
    );
};

export default Game;
