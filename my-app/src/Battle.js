import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

function Battle() {
  const [orientation, setOrientation] = useState([0,0,0]);

  const requestOrientationPermission = () => {
    DeviceOrientationEvent.requestPermission().then(permissionState => {
    if (permissionState === 'granted') {
      window.addEventListener('deviceorientation', (e) => {
        setOrientation([e.alpha, e.beta, e.gamma])
    });
      console.log("DeviceMotionEvent permission granted.");
    } else {
      console.log("DeviceMotionEvent permission denied.");
    }}).catch(err => {
        console.error("Error requesting DeviceMotionEvent permission:", err);
    });
  };

  useEffect(() => {
    window.addEventListener("deviceorientation", (e) => {
      setOrientation([e.alpha, e.beta, e.gamma])
    });
  }, [])

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      {orientation.map((data) => {
        return (
          <>
            {data}
            <br/>
          </>
        )
      })}
      <Button onClick={() => requestOrientationPermission()}> Get permission!</Button>
    </Box>
  );
}

export default Battle;