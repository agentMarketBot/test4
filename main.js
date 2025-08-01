import './style.css'

class CountdownApp {
  constructor() {
    this.targetDate = null;
    this.countdownInterval = null;
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    this.daysElement = document.getElementById('days');
    this.hoursElement = document.getElementById('hours');
    this.minutesElement = document.getElementById('minutes');
    this.secondsElement = document.getElementById('seconds');
    this.targetDateInput = document.getElementById('targetDate');
    this.startBtn = document.getElementById('startBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.messageElement = document.getElementById('message');
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => this.startCountdown());
    this.resetBtn.addEventListener('click', () => this.resetCountdown());
    
    // Set minimum date to current date/time
    const now = new Date();
    const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    this.targetDateInput.min = localISOTime;
  }

  startCountdown() {
    const inputValue = this.targetDateInput.value;
    if (!inputValue) {
      this.showMessage('Please select a target date and time!', 'error');
      return;
    }

    this.targetDate = new Date(inputValue);
    const now = new Date();

    if (this.targetDate <= now) {
      this.showMessage('Please select a future date and time!', 'error');
      return;
    }

    this.clearMessage();
    this.startBtn.textContent = 'Running...';
    this.startBtn.disabled = true;
    this.targetDateInput.disabled = true;

    // Clear any existing interval
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    // Start the countdown
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date();
    const timeDifference = this.targetDate - now;

    if (timeDifference <= 0) {
      this.finishCountdown();
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    this.daysElement.textContent = this.formatTime(days);
    this.hoursElement.textContent = this.formatTime(hours);
    this.minutesElement.textContent = this.formatTime(minutes);
    this.secondsElement.textContent = this.formatTime(seconds);
  }

  finishCountdown() {
    clearInterval(this.countdownInterval);
    this.countdownInterval = null;

    // Set all values to 00
    this.daysElement.textContent = '00';
    this.hoursElement.textContent = '00';
    this.minutesElement.textContent = '00';
    this.secondsElement.textContent = '00';

    this.showMessage('🎉 Time\'s up! Your countdown has finished! 🎉', 'finished');
    this.resetButtons();
  }

  resetCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    this.targetDate = null;
    this.daysElement.textContent = '00';
    this.hoursElement.textContent = '00';
    this.minutesElement.textContent = '00';
    this.secondsElement.textContent = '00';
    
    this.targetDateInput.value = '';
    this.clearMessage();
    this.resetButtons();
  }

  resetButtons() {
    this.startBtn.textContent = 'Start Countdown';
    this.startBtn.disabled = false;
    this.targetDateInput.disabled = false;
  }

  formatTime(time) {
    return time.toString().padStart(2, '0');
  }

  showMessage(text, type = '') {
    this.messageElement.textContent = text;
    this.messageElement.className = `message ${type}`;
  }

  clearMessage() {
    this.messageElement.textContent = '';
    this.messageElement.className = 'message';
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CountdownApp();
});