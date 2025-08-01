# Countdown Timer App

A modern, responsive countdown timer application built with Vite and vanilla JavaScript.

## Features

- ⏰ Set custom countdown times (hours, minutes, seconds)
- ▶️ Start, pause, and reset functionality
- 🎹 Keyboard shortcuts (Space to start/pause, Escape to reset)
- 🔊 Audio notification when countdown reaches zero
- 📱 Responsive design that works on all devices
- 🌙 Modern dark theme with glass morphism effects
- 📳 Browser notifications (when permitted)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd countdown-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Set Time**: Enter the desired countdown time using the hours, minutes, and seconds inputs
2. **Start Timer**: Click the "Start" button or press the Space key
3. **Pause/Resume**: Click "Pause" or press Space while the timer is running
4. **Reset**: Click "Reset" or press Escape to reset the timer
5. **Notification**: When the countdown reaches zero, you'll hear an audio beep and see a notification (if permissions are granted)

## Keyboard Shortcuts

- **Space**: Start/Pause the timer
- **Escape**: Reset the timer

## Browser Compatibility

This app works in all modern browsers that support:
- ES6 modules
- Web Audio API (for sound notifications)
- Notifications API (for browser notifications)

## License

ISC