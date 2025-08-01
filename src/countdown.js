let countdownInterval = null;
let totalSeconds = 0;
let isRunning = false;

export function setupCountdown() {
  const hoursInput = document.querySelector('#hours');
  const minutesInput = document.querySelector('#minutes');
  const secondsInput = document.querySelector('#seconds');
  const display = document.querySelector('#countdown-display');
  const startBtn = document.querySelector('#start-btn');
  const pauseBtn = document.querySelector('#pause-btn');
  const resetBtn = document.querySelector('#reset-btn');

  function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  function calculateTotalSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }

  function startCountdown() {
    if (!isRunning) {
      totalSeconds = calculateTotalSeconds();
      if (totalSeconds <= 0) {
        alert('Please set a valid time!');
        return;
      }
    }

    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;

    countdownInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        startBtn.disabled = false;
        startBtn.textContent = 'Start';
        pauseBtn.disabled = true;
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        display.style.color = '#ff4444';
        display.textContent = 'Time\'s Up!';
        
        // Play notification sound or show alert
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Countdown Timer', {
            body: 'Time\'s up!',
            icon: '/vite.svg'
          });
        } else {
          alert('Time\'s up!');
        }
        return;
      }

      totalSeconds--;
      updateDisplay();
    }, 1000);
  }

  function pauseCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    isRunning = false;
    startBtn.disabled = false;
    startBtn.textContent = 'Resume';
    pauseBtn.disabled = true;
  }

  function resetCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    isRunning = false;
    totalSeconds = 0;
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    display.style.color = '';
    
    // Reset to initial values
    totalSeconds = calculateTotalSeconds();
    updateDisplay();
  }

  // Event listeners
  startBtn.addEventListener('click', startCountdown);
  pauseBtn.addEventListener('click', pauseCountdown);
  resetBtn.addEventListener('click', resetCountdown);

  // Update display when inputs change
  [hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', () => {
      if (!isRunning) {
        totalSeconds = calculateTotalSeconds();
        updateDisplay();
      }
    });
  });

  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Initialize display
  totalSeconds = calculateTotalSeconds();
  updateDisplay();
}