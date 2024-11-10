
---

# Bus Departure App

A mobile app built with React Native that displays the next 3 bus departures from Lehmja and Tornimäe bus stops. The transit data is manually entered and stored locally, allowing for quick updates.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features
- Display the next 3 departures for selected bus stops
- Local data storage for offline access and quick updates
- Simple, user-friendly interface with real-time data refresh

## Technologies Used
- **React Native**: For building the mobile app
- **AsyncStorage** or **SQLite**: For local data storage
- **JavaScript**: For app logic and functionality

## Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/) (recommended version >= 14.x)
- Install React Native CLI:
  ```bash
  npm install -g react-native-cli
  ```
- Android Studio (for Android Emulator) or a physical Android device

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/bus-departure-app.git
   cd bus-departure-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app on Android:
   ```bash
   npx react-native run-android
   ```

### Database Setup
- For simple storage, use AsyncStorage (already included with React Native).
- For structured data, install and set up SQLite:
  ```bash
  npm install @react-native-sqlite-storage/sqlite-storage
  ```

## Usage
1. Open the app on your Android device.
2. Input the bus departure data manually through the in-app interface.
3. The app will display the next 3 upcoming departures from each selected bus stop (Lehmja and Tornimäe).
4. Data is saved locally, so it remains available even without an internet connection.

## Project Structure
```
bus-departure-app/
├── src/
│   ├── components/         # UI components (e.g., list of departures)
│   ├── screens/            # Screens for each section of the app
│   ├── storage/            # Data storage and database setup
│   └── utils/              # Utility functions (e.g., time formatting)
├── App.js                  # Main entry point of the app
├── README.md
└── package.json
```

## Contributing
Feel free to open issues or submit pull requests for improvements and bug fixes.

---
