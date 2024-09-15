import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography, Modal } from '@mui/material';
import left from "../animations/left.webp"
import right from "../animations/right.webp"
import vs from "../animations/vs.webp"
import stone from "../stoneslab.png"
import fall from "../animations/fall.webp"
import rise from "../animations/crack.webp"
import confetti from "../animations/confetti.webp"
import "./battle.css"
import GameCard from '../components/GameCard';
import { WinnerContext } from '../WinnerContext.js';

function Battle() {
  const [leftLightning, setLeftLightning] = useState(null);
  const [rightLightning, setRightLightning] = useState(null);
  const [versus, setVersus] = useState(null);
  const [leftLightningBox, setLeftLightningBox] = useState(false);
  const [rightLightningBox, setRightLightningBox] = useState(false);
  const [versusBox, setVersusBox] = useState(false);
  const [fallSmoke, setFallSmoke] = useState(null)
  const [fallSmokeBox, setFallSmokeBox] = useState(false);
  const [riseRocks, setRiseRocks] = useState(null)
  const [riseRocksBox, setRiseRocksBox] = useState(false);
  const [confettiFall, setConfettiFall] = useState(null)
  const [confettiFallBox, setConfettiFallBox] = useState(false);

  const [topAnimationState, setTopAnimationState] = useState(null)
  const [bottomAnimationState, setBottomAnimationState] = useState(null)
  const [winnerState, setWinnerState] = useState(false)

  const [topCountry, setTopCountry] = useState({ name: "loading", nationality: "loading" });
  const [bottomCountry, setBottomCountry] = useState({ name: "loading", nationality: "loading" });
  const [open, setOpen] = useState(true)

  const navigate = useNavigate(); // To handle redirects
  const winnerContext = useContext(WinnerContext);


  let cards = useRef([]);
  const topCountryRef = useRef(topCountry)
  const topAnimationStateRef = useRef(topAnimationState)
  const bottomAnimationStateRef = useRef(bottomAnimationState)
  const winnerStateRef = useRef(winnerState)

  useEffect(() => {
    topCountryRef.current = topCountry
  }, [topCountry])

  useEffect(() => {
    topAnimationStateRef.current = topAnimationState
  }, [topAnimationState])

  useEffect(() => {
    bottomAnimationStateRef.current = bottomAnimationState
  }, [bottomAnimationState])

  useEffect(() => {
    winnerStateRef.current = winnerState
  }, [winnerState])

  const declareWinner = () => {
    setWinnerState(true)
    setBottomAnimationState("winner")
    setConfettiFall(confetti)
    setConfettiFallBox(true)
    setTimeout(() => {
      setConfettiFall(null)
      setTimeout(() => {
        setConfettiFallBox(false)
      }, 10)
    }, 18000)
    let prompt = "Give me a list of 5 " + bottomCountry.nationality + " recipes. They all must be " + bottomCountry.nationality + ".";
    const pref = localStorage.getItem("preferences")
    if (pref) {
      prompt = prompt + "If possible, also include the following dietary preferences."

      if (pref.calorieRange) {
        prompt = prompt + "The dish should have between " + pref.calorieRange[0] + " and " + pref.calorieRange[1] + " calories."
      }

      if (pref.proteinLevel) {
        prompt = prompt + "It should have a " + pref.proteinLevel[0] + " to " + pref.proteinLevel[1] + " protein level."
      }

      if (pref.sugarLevel) {
        prompt = prompt + "It should have a " + pref.sugarLevel[0] + " to " + pref.sugarLevel[1] + " protein level."
      }

      if (pref.dietaryPreferences) {
        prompt = "I also have the following dietary preferences: " + Object.entries(pref.dietaryPreferences)
      }
    }
    fetch('https://vthacks2024-backend-1095352764453.us-east4.run.app/getRecipes/' + prompt)
      .then(async (response) => {
        winnerContext.setRecipes(await response.json());
        navigate("/winner");
      })
  }

  const newCard = (location) => {
    if (cards.current.length === 0) {
      if (location === "top") {
        setBottomCountry(topCountryRef.current)
      }
      declareWinner()
      return;
    }

    if (location === "top") {
      setBottomCountry(topCountryRef.current)
      setTopCountry(cards.current.pop())
    } else {
      setTopCountry(cards.current.pop())
    }
    setTopAnimationState("newCard")
    setTimeout(() => {
      setTopAnimationState(null)
    }, 420)
    playVersusAnimation()
  }

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

  const topWins = () => {
    setTopAnimationState("fall")
    setTimeout(() => {
      setFallSmoke(fall)
      setFallSmokeBox(true)
      setTimeout(() => {
        setFallSmoke(null)
        setTimeout(() => {
          setFallSmokeBox(false)
          setTopAnimationState(null)
          newCard("top")
        }, 10)
      }, 1300)
    }, 700)
  }

  const bottomWins = () => {
    setBottomAnimationState("hit")
    setTimeout(() => {
      setTopAnimationState("rise")
    }, 400)
    setTimeout(() => {
      setRiseRocks(rise)
      setRiseRocksBox(true)
      setTimeout(() => {
        setRiseRocks(null)
        setTimeout(() => {
          setRiseRocksBox(false)
        }, 10)
      }, 1200)
    }, 350)
    setTimeout(() => {
      setFallSmoke(fall)
      setFallSmokeBox(true)
      setTimeout(() => {
        setFallSmoke(null)
        setTimeout(() => {
          setFallSmokeBox(false)
          setTopAnimationState(null)
          setBottomAnimationState(null)
          newCard("bottom")
        }, 10)
      }, 1300)
    }, 1000)
  }

  const requestOrientationPermission = () => {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') {
          setOpen(false)
          window.addEventListener('devicemotion', (e) => {
            if (!winnerStateRef.current && topAnimationStateRef.current === null && bottomAnimationStateRef.current === null) {
              if (e.rotationRate.alpha > 300) {
                topWins()
              } else if (e.rotationRate.alpha < -300) {
                bottomWins()
              } else if (Math.abs(e.rotationRate.gamma) > 500) {
                declareWinner()
              }
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    requestOrientationPermission();
    const fetchCards = async () => {
      try {
        const response = await fetch('https://vthacks2024-backend-1095352764453.us-east4.run.app/start_game');
        if (!response.ok) throw new Error('Network response was not ok');
        cards.current = await response.json();
        setTopCountry(cards.current.pop())
        setBottomCountry(cards.current.pop())
      } catch (error) {
        console.error(error)
      }
    };
    fetchCards();
  }, [])

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please click below to grant orientation access
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            To use this application, tilt your device towards your preferred food.
            If you're happy with the winning food, tilt your device to the side.
          </Typography>
          <br />
          <Button variant='contained' style={{ backgroundColor: '#EA5723' }} onClick={() => {
            requestOrientationPermission()
            setOpen(false)
          }}>
            Grant Orientation Acess
          </Button>
        </Box>
      </Modal >
      <Box sx={{ width: "100vw", height: "100vh", mt: 1 }} className="gradient">
        <Stack sx={{ width: "100%", height: "calc(100% - 70px)" }} alignItems="center" direction="column">
          <Box sx={{ position: "relative", border: winnerState ? "0px solid #121212" : "1px solid #EA5723", width: "60%", height: "40%", transition: "border 1s" }}>
            <Box className={topAnimationState} sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 3, opacity: winnerState ? 0 : 1 }}>
              <GameCard country={topCountry}></GameCard>
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: 150, position: "relative" }}>
            {rightLightningBox && <Box component="img" sx={{ position: "absolute", left: 200, top: 0 }} width={250} src={rightLightning} />}
            {versusBox && <Box component="img" sx={{ position: "absolute", left: 80, top: 0, zIndex: 2 }} width={250} src={versus} />}
            {leftLightningBox && <Box component="img" sx={{ position: "absolute", left: -40, top: 0 }} width={250} src={leftLightning} />}
          </Box>
          <Box sx={{ position: "relative", zIndex: 2, border: winnerState ? "0px solid #EA5723" : "1px solid 121212", width: "60%", height: "40%", transition: "border 1s" }}>
            <Box className={bottomAnimationState} sx={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}>
              <GameCard country={bottomCountry}></GameCard>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ backgroundImage: `url(${stone})`, width: "100%", height: 200, position: "absolute", zIndex: 1, top: "calc(100% - 100px)", left: 0 }}>
        </Box>
        {riseRocksBox && <Box component="img" sx={{ position: "absolute", left: 75, top: 270, zIndex: 999 }} width={250} src={riseRocks} />}
        {fallSmokeBox && <Box component="img" sx={{ position: "absolute", left: -60, top: "calc(100vh - 210px)", zIndex: 999 }} width={500} src={fallSmoke} />}
        {confettiFallBox && <Box component="img" sx={{ position: "absolute", left: 60, top: 0, zIndex: 1000 }} width={700} height={700} src={confettiFall} />}
        {confettiFallBox && <Box component="img" sx={{ position: "absolute", left: -200, top: -300, zIndex: 1000 }} width={700} height={700} src={confettiFall} />}


      </Box>
    </>
  );
}

export default Battle;