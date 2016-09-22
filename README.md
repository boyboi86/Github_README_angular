# Github_README_angular
This is a simple AngularJS that calls individual Github repo readme, based on what user search.

## Instructions

Require node.js and node package manager (npm) to run

download zip file or `git clone` repo

navigate to working directory, run `npm install`

if you are window user, run `npm run deploy:WINDOWS`, otherwise run `npm run deploy`

Open browser to go http://localhost:8080 to view app.

## Usage

Click the input box (small github icon at the top corner)

Enter your github username in the input box (small github icon) then press enter.

Choose one of your existing repositories by clicking a link

You will see your readme.md file

If user or readme does not exist, you will be force back to the index page.

## Commands

`npm start` to initialize app. (For heroku deployment)

`npm run postinstall` set production environment and bundle js files. (For heroku deployment)

`npm run deploy:WINDOWS` for Window users only. To set for production and initialize app.

`npm run deploy` for all non-Window users. To set for production and initialize app.

`npm run dev` for development purposes, runs webpack-dev-server.
