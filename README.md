# PlantTasks

Never forget to take care of your plants with PlantTasks, a mobile app to track your plants and their tasks. 

### Core Functionality

This mobile app is for users who own plants that have different requirements and cadence for the care they need. PlantTasks allows users to track the plants they own as well as the tasks for those plants. By displaying the tasks that the user needs to complete that day, the user can focus on what they need do and not juggle a bunch of to-do's in their head.

### Features

Plants:

- [x] Add plant
- [x] Delete plant
- [x] View plant
- [x] Edit plant

Tasks:

- [x] Add task for a plant
- [x] Delete task for a plant
- [x] View tasks for a plant
- [x] View task instances for the day

Login:

- [x] User registration and login



### Stack

- React Native frontend (built on Expo)
- Node backend with Express
- Postgres database



## Running the App

View the progress of the app at https://expo.io/@lisaau/PlantTasks. 

##### Using an Android device:

1. Make sure to download the [Expo Client App](https://expo.io/tools#client) for Android if you want to view it on your phone.
2. Scan the QR code 

##### Using an iOS device:

Scanning the QR code directly to view the Expo Client App only works on Android as there are [limitations for iOS](https://blog.expo.io/upcoming-limitations-to-ios-expo-client-8076d01aee1a). If you have iOS:

1. Download the [Expo Client App](https://expo.io/tools#client) for iOS
2. Clone this repo

```
https://github.com/lisaau/PlantTasks.git
```

2. Switch into this directory and install dependencies.

```bash
cd PlantTasks
npm install
```

3. Set up an Auth0 account:

   1. Login or sign up for an Auth0 account https://auth0.com/

   2. Create an app in Applications (or follow the instructions when prompted to if you just signed up). 

   3. In the callback URL section, add the URL in this format: https://*auth*.*expo*.*io*/@your-username/PlantTasks
      where 'your-username' is the username of your Expo account

   4. Find the 'clientId' and 'domain' in your Auth0 application under Basic in the Settings tab. Replace the clientId and domain in `App.js` (line 21 and 22) with your clientId and domain.

      ```
      const auth0ClientId = 'CP2k1WKt3V5r4J8XbVt9gzScxE3s2gTI';
      const auth0Domain = 'https://dev-skxc8k2i.auth0.com';
      ```

4. Run `npm start` to generate a QR code in your machine to scan with your phone camera. You may select LAN or Tunnel as the connection.

##### Using an Android emulator/iOS simulator:

Complete the same steps as the iOS device. You may skip step 1 (downloading the Expo Client App). Instead of scanning with a phone camera, select the emulator/simulator you want to use. 



### Notes

The Express files for the server can be found in a separate repo, [PlantTasksServer](https://github.com/lisaau/PlantTasksServer). The server is deployed on Heroku (https://planttasks.herokuapp.com/).



## Demo

- [Video demo](https://drive.google.com/file/d/10Gz2yDjO_iVoJSl_hndyij8VtcgwerAR/view?usp=sharing) [WIP]

- [Try it out on your phone!](https://expo.io/@lisaau/PlantTasks) (Follow the steps in Running the App section to get set up)

  

## Project Documents/Progress

[Project Planning Document](https://docs.google.com/document/d/19wEyoS1IJNBF7tuTYKs9tbo86pfvjpsz1zGN2cCEnr0/edit?usp=sharing)

[Trello](https://trello.com/b/wUakeweD/planttasks-techtonica-final-project-lisa-au)

