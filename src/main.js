import './style.css'

class CountdownApp {
  constructor() {
    this.totalSeconds = 0;
    this.remainingSeconds = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
    
    this.init();
  }
  
  init() {
    this.createHTML();
    this.bindEvents();
    this.updateDisplay();
  }
  
  createHTML() {
    document.querySelector('#app').innerHTML = `
      <div class="countdown-container">
        <h1 class="countdown-title">Countdown Timer</h1>
        
        <div class="countdown-display" id="display">00:00:00</div>
        
        <div class="countdown-inputs">
          <div class="input-group">
            <label for="hours">Hours</label>
            <input type="number" id="hours" class="time-input" min="0" max="23" value="0">
          </div>
          <div class="input-group">
            <label for="minutes">Minutes</label>
            <input type="number" id="minutes" class="time-input" min="0" max="59" value="5">
          </div>
          <div class="input-group">
            <label for="seconds">Seconds</label>
            <input type="number" id="seconds" class="time-input" min="0" max="59" value="0">
          </div>
        </div>
        
        <div class="countdown-controls">
          <button id="startBtn" class="btn btn-primary">Start</button>
          <button id="pauseBtn" class="btn btn-secondary" disabled>Pause</button>
          <button id="resetBtn" class="btn btn-danger">Reset</button>
        </div>
        
        <div id="status" class="status-message"></div>
      </div>
    `;
  }
  
  bindEvents() {
    document.getElementById('startBtn').addEventListener('click', () => this.start());
    document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
    document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    
    // Allow input changes only when timer is not running
    ['hours', 'minutes', 'seconds'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        if (!this.isRunning) {
          this.updateFromInputs();
        }
      });
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (this.isRunning) {
          this.pause();
        } else {
          this.start();
        }
      } else if (e.code === 'Escape') {
        this.reset();
      }
    });
  }
  
  updateFromInputs() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
  }
  
  start() {
    if (!this.isRunning && !this.isPaused) {
      this.updateFromInputs();
    }
    
    if (this.remainingSeconds <= 0) {
      this.updateStatus('Please set a time greater than 0', 'status-finished');
      return;
    }
    
    this.isRunning = true;
    this.isPaused = false;
    
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.updateDisplay();
      
      if (this.remainingSeconds <= 0) {
        this.finish();
      }
    }, 1000);
    
    this.updateButtons();
    this.updateStatus('Timer running...', 'status-running');
    this.disableInputs();
  }
  
  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.isPaused = true;
      clearInterval(this.intervalId);
      this.updateButtons();
      this.updateStatus('Timer paused', 'status-paused');
    }
  }
  
  reset() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.intervalId);
    
    this.updateFromInputs();
    this.updateButtons();
    this.updateStatus('', '');
    this.enableInputs();
  }
  
  finish() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.intervalId);
    this.remainingSeconds = 0;
    this.updateDisplay();
    this.updateButtons();
    this.updateStatus('Time\'s up!', 'status-finished');
    this.enableInputs();
    
    // Play notification sound if available
    this.playNotification();
  }
  
  updateDisplay() {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    const seconds = this.remainingSeconds % 60;
    
    const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('display').textContent = display;
    
    // Update document title
    if (this.isRunning) {
      document.title = `${display} - Countdown Timer`;
    } else {
      document.title = 'Countdown Timer';
    }
  }
  
  updateButtons() {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (this.isRunning) {
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
      startBtn.textContent = 'Start';
    } else if (this.isPaused) {
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
      startBtn.textContent = 'Resume';
    } else {
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
      startBtn.textContent = 'Start';
    }
  }
  
  updateStatus(message, className) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status-message ${className}`;
  }
  
  disableInputs() {
    ['hours', 'minutes', 'seconds'].forEach(id => {
      document.getElementById(id).disabled = true;
    });
  }
  
  enableInputs() {
    ['hours', 'minutes', 'seconds'].forEach(id => {
      document.getElementById(id).disabled = false;
    });
  }
  
  playNotification() {
    // Try to play a beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.log('Audio notification not available');
    }
    
    // Try to show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Countdown Timer', {
        body: 'Time\'s up!',
        icon: '/vite.svg'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Countdown Timer', {
            body: 'Time\'s up!',
            icon: '/vite.svg'
          });
        }
      });
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CountdownApp();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CountdownApp();
  });
} else {
  new CountdownApp();
}