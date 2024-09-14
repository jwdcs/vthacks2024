import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import { Slider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheese, faLeaf, faBreadSlice, faFish} from "@fortawesome/free-solid-svg-icons";

const Preferences = () => {
    //Providing different values with labels
    const calorieMarks = [
        {
            value: 0,
            label: "0",
        },
        {
            value: 200,
            label: "200",
        },
        {
            value: 400,
            label: "400",
        },
        {
            value: 600,
            label: "600",
        },
        {
            value: 800,
            label: "800",
        },
        {
            value: 1000,
            label: "1000",
        },
    ];

    const proteinMarks = [
        {
            value: 0,
            label: "Low",
        },
        {
            value: 10,
            label: "Medium",
        },
        {
            value: 20,
            label: "High",
        },
    ];
 
    const [val, setVal] = useState([0, 40]);
    const updateRange = (e, data) => {
        setVal(data);
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
                    sx = {{color:"#EA5723"}}
                    max={1000}
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
                min={0}
                max={20}
                step={10}
                marks={proteinMarks}
                sx = {{color:"#EA5723"}}
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
                min={0}
                max={20}
                step={10}
                marks={proteinMarks}
                sx = {{color:"#EA5723"}}
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
                <Stack>
                    <FontAwesomeIcon icon={faCheese} size="4x" />
                    <Typography
                                    sx={{
                                        maxWidth: '800px',
                                        textAlign: 'center',
                                    }}>Lactose <br />Intolerant </Typography>
                </Stack>
                <Stack>
                    <FontAwesomeIcon icon={faLeaf} size="4x" />
                    <Typography                                     sx={{
                                        maxWidth: '800px',
                                        textAlign: 'center',
                                    }}> Vegetarian </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Stack>
                    <FontAwesomeIcon icon={faBreadSlice} size="4x" />
                    <Typography                                     sx={{
                                        maxWidth: '800px',
                                        textAlign: 'center',
                                    }}> Gluten-Free </Typography>
                </Stack>
                <Stack>
                    <FontAwesomeIcon icon={faFish} size="4x" />
                    <Typography                                     sx={{
                                        maxWidth: '800px',
                                        textAlign: 'center',
                                    }}> Pescatarian </Typography>
                </Stack>
            </Stack>

            <button>
                Set Preferences
            </button>
        </Box >
    );
};

export default Preferences;