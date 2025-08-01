import './style.css'
import { setupCountdown } from './countdown.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Countdown Timer</h1>
    <div class="countdown-container">
      <div class="time-inputs">
        <div class="input-group">
          <label for="hours">Hours</label>
          <input type="number" id="hours" min="0" max="23" value="0">
        </div>
        <div class="input-group">
          <label for="minutes">Minutes</label>
          <input type="number" id="minutes" min="0" max="59" value="5">
        </div>
        <div class="input-group">
          <label for="seconds">Seconds</label>
          <input type="number" id="seconds" min="0" max="59" value="0">
        </div>
      </div>
      <div class="display">
        <div id="countdown-display">05:00</div>
      </div>
      <div class="controls">
        <button id="start-btn" type="button">Start</button>
        <button id="pause-btn" type="button" disabled>Pause</button>
        <button id="reset-btn" type="button">Reset</button>
      </div>
    </div>
  </div>
`

setupCountdown()
