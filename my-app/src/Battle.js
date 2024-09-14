import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import left from "./left.webp"
import right from "./right.webp"
import vs from "./vs.webp"

function Battle() {
  const [tilted, setTilted] = useState(null)
  const [leftLightning, setLeftLightning] = useState(null);
  const [rightLightning, setRightLightning] = useState(null);
  const [versus, setVersus] = useState(null);
  const [leftLightningBox, setLeftLightningBox] = useState(false);
  const [rightLightningBox, setRightLightningBox] = useState(false);
  const [versusBox, setVersusBox] = useState(false);

  const playVersusAnimation = () => {
    if (versus === null) {
      setLeftLightning(left)
      setRightLightning(right)
      setVersus(vs)
      setLeftLightningBox(true)
      setRightLightningBox(true)
      setVersusBox(true)
      setTimeout(() => {
        setLeftLightning(null)
        setRightLightning(null)
        setTimeout(() => {
          setLeftLightningBox(false)
          setRightLightningBox(false)
        }, 10)
      }, 600)
      setTimeout(() => {
        setVersus(null)
        setTimeout(() => {
          setVersusBox(false)
        }, 10)
      }, 2000)
    }
  }

  const requestOrientationPermission = () => {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', (e) => {
            if (e.rotationRate.alpha > 300) {
              setTilted("red")
            } else if (e.rotationRate.alpha < -300) {
              setTilted("green")
            } 
          });
        }});
    }
  };

  useEffect(() => {
    requestOrientationPermission();
  }, [])

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Stack>
        <Box sx={{position: "absolute", left: 0, top: "45%"}}>
          {rightLightningBox && <Box component="img" sx={{position: "absolute", left: 200, top: 0}} width={250} src={rightLightning}/>}
          {versusBox && <Box component="img" sx={{position: "absolute", left: 80, top: 0, zIndex: 2}} width={250} src={versus}/>}
          {leftLightningBox && <Box component="img" sx={{position: "absolute", left: -40, top: 0}} width={250} src={leftLightning}/>}
        </Box>
      <Box sx={{backgroundColor: tilted, border: "1px solid white", width: 100, height: 100}}>
      </Box>
      <Button onClick={() => {
        playVersusAnimation()
      }}> Play animation!</Button>
      {/* <Button onClick={() => requestOrientationPermission()}> Get permission!</Button> */}
      </Stack>
    </Box>
  );
}

export default Battle;