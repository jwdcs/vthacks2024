import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Slider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheese, faLeaf, faBreadSlice, faFish } from "@fortawesome/free-solid-svg-icons";

const Preferences = () => {
    const calorieMarks = [
        { value: 0, label: "0" },
        { value: 200, label: "200" },
        { value: 400, label: "400" },
        { value: 600, label: "600" },
        { value: 800, label: "800" },
        { value: 1000, label: "1000" },
        { value: 1200, label: "1200" },
        { value: 1400, label: "1400" },
    ];

    const proteinMarks = [
        { value: 0, label: "Low" },
        { value: 10, label: "Medium" },
        { value: 20, label: "High" },
    ];

    const [val, setVal] = useState([0, 1400]);
    const [proteinVal, setProteinVal] = useState([0, 20]);
    const [sugarVal, setSugarVal] = useState([0, 20]);
    const [activeIcons, setActiveIcons] = useState({
        lactoseIntolerant: false,
        vegetarian: false,
        glutenFree: false,
        pescatarian: false,
    });
    const [hasFetched, setHasFetched] = useState(false)

    useEffect(() => {
        // Fetch preferences when component mounts
        const fetchPreferences = () => {
            //try {
            // const response = await fetch('http://localhost:5000/preferences'); // Adjust URL if needed
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const data = await response.json();
            const data = localStorage.getItem("preferences")
            if (data) {
                console.log('Preferences fetched successfully:', data);
                setVal(data.calorieRange || [0, 1000]);
                setProteinVal(data.proteinLevel || [0, 20]);
                setSugarVal(data.sugarLevel || [0, 20]);
                setActiveIcons(data.dietaryPreferences || {
                    lactoseIntolerant: false,
                    vegetarian: false,
                    glutenFree: false,
                    pescatarian: false,
                });
            }
            setHasFetched(true)

            // } catch (error) {
            //     console.error('Error fetching preferences:', error);
            // } finally {
            //     setHasFetched(true)
            // }
        };

        fetchPreferences();
    }, []);

    useEffect(() => {
        if (hasFetched) {
            handleSetPreferences()
        }
    }, [val, proteinVal, sugarVal, activeIcons, hasFetched])

    const updateRange = (e, newValue) => {
        setVal(newValue);
    };

    const handleProteinChange = (e, newValue) => {
        setProteinVal(newValue);
    };

    const handleSugarChange = (e, newValue) => {
        setSugarVal(newValue);
    };

    const toggleIcon = (key) => {
        setActiveIcons(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const handleSetPreferences = () => {
        const preferences = {
            calorieRange: val,
            proteinLevel: proteinVal,
            sugarLevel: sugarVal,
            dietaryPreferences: activeIcons,
        };

        // Save preferences to LocalStorage
        localStorage.setItem('preferences', JSON.stringify(preferences));

        // // Optionally send preferences to the backend
        // fetch('http://localhost:5000/save_preferences', { // Ensure this URL matches your backend
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(preferences),
        // })
        //     .then(response => response.json())
        //     .then(result => console.log('Preferences saved:', result))
        //     .catch(error => console.error('Error saving preferences:', error));
    };

    return (
        <Box
            sx={{
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: 'white',
                padding: '20px',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    marginTop: '40px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}
            >
                Set your preferences for the food of your choice!
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                Calorie Count
            </Typography>
            <Slider
                value={val}
                onChange={updateRange}
                marks={calorieMarks}
                valueLabelDisplay="auto"
                min={0}
                step={25}
                sx={{ color: "#EA5723" }}
                max={1400}
            />
            <Typography
                variant="h5"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                Protein Level
            </Typography>
            <Slider
                value={proteinVal}
                onChange={handleProteinChange}
                min={0}
                max={20}
                step={10}
                marks={proteinMarks}
                sx={{ color: "#EA5723" }}
            />
            <Typography
                variant="h5"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                Sugar Level
            </Typography>
            <Slider
                value={sugarVal}
                onChange={handleSugarChange}
                min={0}
                max={20}
                step={10}
                marks={proteinMarks}
                sx={{ color: "#EA5723" }}
            />
            <Typography
                variant="h5"
                sx={{
                    maxWidth: '800px',
                    textAlign: 'center',
                }}>
                Dietary Preferences
            </Typography>
            <Stack direction="row" spacing={4}>
                <Stack onClick={() => toggleIcon('lactoseIntolerant')}>
                    <FontAwesomeIcon
                        icon={faCheese}
                        size="4x"
                        style={{ color: activeIcons.lactoseIntolerant ? 'EA5723' : 'white' }}
                    />
                    <Typography
                        sx={{
                            maxWidth: '800px',
                            textAlign: 'center',
                        }}>Lactose <br />Intolerant </Typography>
                </Stack>
                <Stack onClick={() => toggleIcon('vegetarian')}>
                    <FontAwesomeIcon
                        icon={faLeaf}
                        size="4x"
                        style={{ color: activeIcons.vegetarian ? 'EA5723' : 'white' }}
                    />
                    <Typography
                        sx={{
                            maxWidth: '800px',
                            textAlign: 'center',
                        }}> Vegetarian </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Stack onClick={() => toggleIcon('glutenFree')}>
                    <FontAwesomeIcon
                        icon={faBreadSlice}
                        size="4x"
                        style={{ color: activeIcons.glutenFree ? 'EA5723' : 'white' }}
                    />
                    <Typography
                        sx={{
                            maxWidth: '800px',
                            textAlign: 'center',
                        }}> Gluten-Free </Typography>
                </Stack>
                <Stack onClick={() => toggleIcon('pescatarian')}>
                    <FontAwesomeIcon
                        icon={faFish}
                        size="4x"
                        style={{ color: activeIcons.pescatarian ? 'EA5723' : 'white' }}
                    />
                    <Typography
                        sx={{
                            maxWidth: '800px',
                            textAlign: 'center',
                        }}> Pescatarian </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Preferences;
