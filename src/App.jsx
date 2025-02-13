// Import React hooks and external dependencies
import { useState, useRef } from "react";
import "./App.css";

// Import components
import Display from "./components/TimeDisplay/Display";
import Start from "./components/controls/startButton/Start";
import Continue from "./components/controls/continueButton/Continue";
import Lap from "./components/controls/lapButton/Lap";
import Pause from "./components/controls/pauseButton/Pause";
import Reset from "./components/controls/resetButton/Reset";
import LapData from "./components/lapDataDetails/LapData";

// Import utility functions
import { getTime } from "./stopTimer";
import { currentDateTime } from "./currentDateTime";

function App() {
  // State management
  const [time, setTime] = useState(0); // Total elapsed time in milliseconds
  const [intervalID, setIntervalId] = useState(null); // Store interval reference
  const [isRunning, setIsRunning] = useState(false); // Track if timer is running
  const [isPaused, setIsPaused] = useState(false); // Track if timer is paused

  // Refs for persistent values between renders
  const lapTrigger = useRef(null); // Reference for lap button (unused in current implementation)
  const count = useRef(0); // Track number of laps
  const previousElapsedTime = useRef(0); // Store previous lap's time for lap calculations

  /**
   * Handles timer start functionality
   * Creates interval to increment time every 100ms
   */
  const handleStartClick = () => {
    if (!intervalID) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(id);
      setIsRunning(true); // Timer is now running
      setIsPaused(false); // Ensure paused state is false
    }
  };

  /**
   * Pauses the timer by clearing the interval
   */
  const handlePauseClick = () => {
    clearInterval(intervalID);
    setIntervalId(null);
    setIsRunning(false); // Timer is no longer running
    setIsPaused(true); // Timer is now paused
  };

  /**
   * Resets timer to initial state
   * Clears interval, resets time and lap counters
   */
  const handleResetClick = () => {
    handlePauseClick();
    setTime(0);
    count.current = 0;
    previousElapsedTime.current = 0;
    setIsPaused(false); // Reset paused state
    localStorage.clear(); // Clear the local storage
  };

  /**
   * Continues timer from paused state
   * Essentially same as start but maintains existing time
   */
  const handleContinueClick = () => {
    handleStartClick();
    setIsPaused(false); // Timer is no longer paused
  };

  /**
   * Handles lap creation and storage
   * Calculates lap time and stores in localStorage
   */
  const handleLapClick = () => {
    if (time === 0) return; // Prevent lap creation when timer is reset

    // Increment lap counter
    count.current += 1;

    // Calculate lap time relative to previous lap
    const currentElapsed = time;
    const lapTime = currentElapsed - previousElapsedTime.current;
    previousElapsedTime.current = currentElapsed;

    // Format lap time components
    const [lapHr, lapMin, lapSec, lapMs] = getTime(lapTime);
    const currentLap = `${String(lapHr).padStart(2, "0")}:${String(lapMin).padStart(2, "0")}:${String(lapSec).padStart(2, "0")}:${String(lapMs).padStart(3, "0")}`;

    // Format total elapsed time
    const [elapsedHr, elapsedMin, elapsedSec, elapsedMs] = getTime(currentElapsed);
    const currentElapsedLap = `${String(elapsedHr).padStart(2, "0")}:${String(elapsedMin).padStart(2, "0")}:${String(elapsedSec).padStart(2, "0")}:${String(elapsedMs).padStart(3, "0")}`;

    // Create lap object
    const lapData = {
      row: count.current,
      lapTime: currentLap,
      elapsedTime: currentElapsedLap,
      currentTimeDate: currentDateTime(),
    };

    // Update localStorage with new lap data
    const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
    dataArray.push(lapData);
    localStorage.setItem("dataArray", JSON.stringify(dataArray));
  };

  // Get formatted time components for display
  const [hr, min, sec, mSec] = getTime(time);

  return (
    <div className="container">
      {/* Main time display */}
      <Display mSec={mSec} sec={sec} min={min} hr={hr} />

      {/* Control buttons with conditional rendering */}
      <div className="control-buttons d-flex ">
        {/* Show Start button only when timer is not running and not paused */}
        {!isRunning && !isPaused && <Start handleStartClick={handleStartClick} />}

        {/* Show Pause and Lap buttons only when timer is running */}
        {isRunning && (
          <>
            <Pause handlePauseClick={handlePauseClick} />
            <Lap handleLapClick={handleLapClick} />
          </>
        )}

        {/* Show Continue and Reset buttons only when timer is paused */}
        {isPaused && (
          <>
            <Continue handleContinueClick={handleContinueClick} />
            <Reset handleResetClick={handleResetClick} />
          </>
        )}
      </div>

      {/* Lap data display */}
      <LapData />
      </div>
  );
}

export default App;