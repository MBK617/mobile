## Requirements for Expo CLI
* Node.js LTS release or greater
    ```
    node -v
    ```
    ```
    npm cache clean -f
    ```
    ```
    npm install -g n
    ```
    ```
    sudo n latest
    ```

* Git
* Watchman for macOS users

## Expo Start
To download Expo CLI:
```
npm install -g expo-cli
```
## Run
Be in directory where project is then:
```
expo start
```
This will share a QR code you can scan from the Expo app (Android) or from camera (iOS).

## For Virtual Device
### Windows OS and virtual Android 
Dependencies
  * Node
  * Python2 via Chocolatey
  * JDK

Download [Android Studio](https://developer.android.com/studio)
When prompted to choose an installation type, choose custom and click all below
  * ```Android SDK```
  * ```Android SDK Platform```
  * ```Performance (Intel ® HAXM)```
  * ```Android Virtual Device```
 
 Then install
 
#### Install Android SDK 
Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 9 (Pie) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:

* ```Android SDK Platform 28```
* ```Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image```

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 28.0.3 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### Configure the ANDROID_HOME environment variable
The React Native tools require some environment variables to be set up in order to build apps with native code.

Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK

The SDK is installed, by default, at the following location:
```c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk```

You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

#### Add platform-tools to Path
Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Select the Path variable, then click Edit. Click New and add the path to platform-tools to the list.

The default location for this folder is:
```c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools```

#### Using the Virtual Device via Android Studio
Open ./myproject/android, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

![lil android](https://reactnative.dev/docs/assets/GettingStartedAndroidStudioAVD.png)

If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Pie API Level 28 image.

Click "Next" then "Finish" to create your AVD. At this point you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

###  iOS and virtual Android 
