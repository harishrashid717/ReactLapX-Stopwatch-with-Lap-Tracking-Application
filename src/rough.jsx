import { useState, useRef } from "react";
import "./App.css";
import Display from "./components/display/Display";
import Start from "./components/controls/startButton/Start";
import Continue from "./components/controls/continueButton/Continue";
import Lap from "./components/controls/lapButton/Lap";
import Pause from "./components/controls/pauseButton/Pause";
import Reset from "./components/controls/resetButton/Reset";

import { getTime } from "./stopTimer";
import { cuurentDateTime } from "./currentDateTime";
function App() {
  const [time, setTime] = useState(0);
  const [intervalID, setIntervalId] = useState(null);
  const lapTrigger = useRef(null);
  // const [lap , setLap] = useState([0, 0, 0, 0]);
  const setLap = useRef([0, 0, 0, 0]);
  const count = useRef(0);
  function handleStartClick() {
    if (!intervalID) {
      let id = setInterval(() => {
        setTime((t) => t + 100);
      }, 100);
      setIntervalId(id);
    }
  }

  function handlePauseClick() {
    clearInterval(intervalID);
    setIntervalId(null);
  }

  function handleResetClick() {
    handlePauseClick();
    setTime(0);
  }

  function handleContinueClick() {
    handleStartClick();
  }

  function handleLapClick() {
    // const [lapHr, lapMin, lapSec, lapMs] = getTime(time);
    count.current = count.current + 1;
    const elapsedLap = [...getTime(time)];
    console.log(elapsedLap);

    for (let i = 0; i < 4; i++) {
      setLap.current[i] = elapsedLap[i] - setLap.current[i];
    }

    let currentLap = "";
    for (let i = 0; i < 4; i++) {
      console.log(currentLap);
      i === 3
        ? (currentLap += `${String(setLap.current[i]).padStart(3, "0")}`)
        : (currentLap += `${String(setLap.current[i]).padStart(2, "0")}`);
    }
    console.log(currentLap);

    let currentElapsedLap = "";
    for (let i = 0; i < 4; i++) {
      i === 3
        ? (currentElapsedLap += `${String(elapsedLap[i]).padStart(3, "0")}`)
        : (currentElapsedLap += `${String(elapsedLap[i]).padStart(2, "0")}`);
    }

    const currentTimeDate = cuurentDateTime();
    const obj = {
      row: count.current,
      lapTime: currentLap,
      elapsedTime: currentElapsedLap,
      currentTimeDate: currentTimeDate,
    };
    localStorage.setItem(count.current, JSON.stringify(obj));
  }
  const [hr, min, sec, mSec] = getTime(time);

  return (
    <>
      <Display mSec={mSec} sec={sec} min={min} hr={hr}></Display>
      <Start handleStartClick={handleStartClick}></Start>
      <Pause handlePauseClick={handlePauseClick}></Pause>
      <Continue handleContinueClick={handleContinueClick}></Continue>
      <Lap handleLapClick={handleLapClick}></Lap>
      <Reset handleResetClick={handleResetClick}></Reset>
    </>
  );
}

export default App;
