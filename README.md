# MBK617 - mobile
## Requirements for Development
* Node.js LTS release or greater
* Expo CLI
* Android Studio (if developing on virtual device)

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