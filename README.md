# Authentication

A **React** application for creating the authentication functionality of a website. The application has three pages: signup, login and profile. The data storage and authentication is done using **firebase**.

The signup page lets a user create an account on firebase with email, password and an optional profile picture. On successful signup, the user is redirected to profile page which displays the user's email and profile pitcure. The user can logout and come back again to login to profile.
# Installation instruction
1. Make sure you have npm and node installed.
2. Clone the repository from github.
3. Go the directory of cloned repo and run `npm install` to install all the dependencies. 
4. Create an account on firebase and have authentication turned on. Get the configuration for authentication and store it an `env.local` file to avoid exposing credentials in version control. A sample env.local file looks like this \n
`REACT_APP_FIREBASE_API_KEY = *****************\n
REACT_APP_FIREBASE_AUTH_DOMAIN = *************\n
...`

4. After installation, run `npm start` to start the development server. By default, the application should be accessible at localhost:3000.
