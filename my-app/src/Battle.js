import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function Battle() {
  const [orientation, setOrientation] = useState([0,0,0])

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
    </Box>
  );
}

export default Battle;