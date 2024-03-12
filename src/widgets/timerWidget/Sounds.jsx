import { useContext, useEffect, useState } from "react";
import { sounds } from "./utilities/sounds.js";
import styles from "./TimerWidget.module.css";
import Button from "./UI/Button.jsx";
import TimerContext from "./store/TimerContext.jsx";

const Sounds = () => {
  const { setTimerStats, timerStats } = useContext(TimerContext);

  const [isEditing, setIsEditing] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    setAudio(new Audio(timerStats.pickedSound));
  }, [timerStats.pickedSound]);

  function handleSoundChange(event) {
    setTimerStats((prev) => {
      return {
     ...prev,
        pickedSound: event.target.value,
      };
    })
  }

  const soundNames = Object.fromEntries(
    Object.entries(sounds).map(([soundKey]) => [sounds[soundKey], soundKey])
  );

  useEffect(() => {
    audio.play().catch(error => console.error("Error playing audio: No audio selected"));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const soundOptions = Object.entries(sounds).map(([soundKey, soundValue]) => (
    <option key={soundKey} value={soundValue}>
      {soundKey}
    </option>
  ));

  const displaySoundName = soundNames[timerStats.pickedSound] || "No sound";

  return (
    <div className={styles.sounds_container}>
      <h3 className={styles.sounds_heading}>Sound</h3>
      {isEditing ? (
        <select
          className={styles.sounds_selectSound}
          value={timerStats.pickedSound ? timerStats.pickedSound : ''}
          onChange={(event) => handleSoundChange(event)}
        >
          <option value="">Select a sound</option>
          {soundOptions}
        </select>
      ) : (
        <p className={styles.sounds_sound}>{displaySoundName}</p>
      )}
      <Button color="blue" disabled={timerStats.isTimerActive || timerStats.isBreakActive} onClick={() => setIsEditing(prev => !prev)} >
      {isEditing ? "Save" : "Edit"}
      </Button>
    </div>
  );
};

export default Sounds;
