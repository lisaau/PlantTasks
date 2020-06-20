# PlantTasks ![cactus-icon-small](assets/cactus-icon-small.png)

Never forget to take care of your plants with PlantTasks, a mobile app to track your plants and their tasks. 



## Table of Contents

- [Demo](#demo)
- [About the Project](#about-the-project)
  - [Features](#features)
  - [Stack](#stacks)
  - [Project Planning](#project-planning)
- [Running the App](#running-the-app)
  - [Running Tests](#running-tests)
  - [Server](#server)
- [Future Features](#future-features)
- [Contact](#contact)



## Demo

[![Watch the demo video][product-screenshot]](https://youtu.be/-vrytNw_v_A)

- [Video transcript](https://docs.google.com/document/d/1bQ5D2n8WCMlu_mDsCMeWKZ_uwF602IOkdhcnv98P8ck/edit?usp=sharing)

- View the progress of the app at https://expo.io/@lisaau/PlantTasks. 



## About the Project

This mobile app is for users who own plants that have different requirements and cadence for the care they need. PlantTasks allows users to track the plants they own as well as the tasks for those plants. By displaying the tasks that the user needs to complete that day, the user can focus on what they need do and not juggle a bunch of to-do's in their head.

### Features

Plants:

- [x] Add plant
- [x] Delete plant
- [x] View plant
- [x] Edit plant
- [x] Form validation

Tasks:

- [x] Add task for a plant
- [x] Delete task for a plant
- [x] View all tasks for a plant
- [x] View task to do for the day
- [x] Form validation

Login/User Information:

- [x] User registration and login
- [x] Profile tab and logout



### Stack

- [React Native](https://reactnative.dev/) frontend (built on [Expo](https://docs.expo.io/))
- [Node](https://nodejs.org/) backend with [Express](https://expressjs.com/)
- [Postgres](https://www.postgresql.org/) database
- [Auth0](https://auth0.com/) for authentication



### Project Planning

[Project Planning Document](https://docs.google.com/document/d/19wEyoS1IJNBF7tuTYKs9tbo86pfvjpsz1zGN2cCEnr0/edit?usp=sharing)



## Running the App

##### Using an Android device:

1. Make sure to download the [Expo Client App](https://expo.io/tools#client) for Android if you want to view it on your phone.
2. Scan the QR code 

##### Using an iOS device:

Scanning the QR code directly to view the Expo Client App only works on Android as there are [limitations for iOS](https://blog.expo.io/upcoming-limitations-to-ios-expo-client-8076d01aee1a). You will also need to create an Auth0 account so that you can set the callback URL with the URL associated with your Expo account.

1. Download the [Expo Client App](https://expo.io/tools#client) for iOS
2. Clone this repo

```
git clone https://github.com/lisaau/PlantTasks.git
```

2. Switch into this directory and install dependencies.

```bash
cd PlantTasks
npm install
```

3. Set up an Auth0 account:

   1. Login or sign up for an Auth0 account https://auth0.com/

   2. Create an app in Applications (or follow the instructions when prompted to if you just signed up). 

   3. In the callback URL section, add the URL in this format: https://auth.expo.io/@your-username/PlantTasks
      where 'your-username' is the username of your Expo account

   4. Find the 'clientId' and 'domain' in your Auth0 application under Basic in the Settings tab. Replace the clientId and domain in `App.js` with your clientId and domain.

      ```
      const auth0ClientId = 'YOUR-AUTH0-CLIENT-ID';
      const auth0Domain = 'YOUR-AUTH0-DOMAIN';
      ```

4. Run `npm start` to generate a QR code in your machine to scan with your phone camera. You may select LAN or Tunnel as the connection.

##### Using an Android emulator/iOS simulator:

Complete the same steps as the iOS device. You may skip step 1 (downloading the Expo Client App). Instead of scanning with a phone camera, select the emulator/simulator you want to use. 



### Running Tests

Once you have cloned the repo and installed dependencies, you can run the tests in the terminal:

``` bash
git clone https://github.com/lisaau/PlantTasks.git
cd PlantTasks
npm install
npm run test
```



### Server

The Express files for the server can be found in a separate repo, [PlantTasksServer](https://github.com/lisaau/PlantTasksServer). The server is deployed on [Heroku](https://planttasks.herokuapp.com/).



## Future Features

- Push notifications for reminders
- Plant image uploading (setting up Amazon S3 to store images)
- Using external plant API's 
  - to provide more plant details
  - generate task recommendations for specific plants
  - Auto-populate plant species in the plant form
- Expand test coverage
- Accessibility
  - Update TasksScreen to work with screen readers
  - Form validation to display error message in addition to color change



## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/lisa-au
[product-screenshot]: assets/PlantTasksScreenshot.png