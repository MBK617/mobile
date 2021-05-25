# MBK617 - mobile
[![Maintainability](https://api.codeclimate.com/v1/badges/db380ebbe6b4304e1c1b/maintainability)](https://codeclimate.com/github/MBK617/mobile/maintainability)
## Requirements for Development
* Node.js LTS release or greater
* Expo CLI
* Android Studio (if developing on virtual device) or some other android emulator

## Available NPM Scripts
* `npm start` : Starts development environment via expo. A browser UI will launch and allow you to develop app from Android or iOS emulator, web browser, or a physical device.
* `npm run android` : Starts development environment via react-native and will load Android emulator.
* `npm run ios`: Beats me, I haven't tested it yet.
* `npm run test`: Runs jest test suite (a.k.a nothing yet)
* `npm run docs`: Generates/updates documentation found in /docs based on commented code.

## Environment Variables
You will need to create a .env file in the root directory with the following values:
```js
// This is the server address that will be called when making HTTP requests. 
// For development purposes, this should be your device's local IP. You can 
// find this using the terminal command `ipconfig` on Windows or `ifconfig` 
// on Unix or MacOS.
SERVER_HOST = 192.168.0.7 // URL or IP address 

// This is the server port that will be used when making HTTP requests.
SERVER_PORT = 8080 // Port Number
```

## Getting Started
* Ensure that the server is running on the same port specified in your .env.
* If you are starting the server for the first time or have pulled new changes since running it last, install any new dependencies. 
  * Run `npm install` in the root directory of this repository.
* Run `npm start` in the root directory of this repository.
  * The Expo Development Tools will launch in your browser. You can use this to launch the app in an emulator, or on your mobile device by using the Expo mobile app.
    * If Expo fails to launch your Android or iOS emulator, try opening it manually and navigating to the Expo app on the emulator. From here you should be able to open an expo url from your clipboard. 

## Troubleshooting
* Check the spelling on your .env variables. Make sure they're exact.
* Is your environment up to date? Run `npm install` if you've pulled new changes since the last time you installed.
* Check that you don't have conflicting global versions of any important packages installed, expecially expo. If `expo` is a recognized command, you have it installed globally and you should make sure that the version matches the one in our package.json or uninstall it.
