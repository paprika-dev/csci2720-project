# CSCI2720 Project
This is the project of location web app created by Group 20. 

## Stack
- Frontend: React + Vite
- Backend: Node.js (Express)
- Database: MongoDB

## Google Map API
The following google map APIs have to be enabled
- Maps Embed API
- Maps JavaScript API

## Import Database
(instruction to be added)

## Start the Application
At the root directory (csci2720-project)
- `npm install` & `npm run download_pkgs`to install dependencies
- `cd client && cp .env.example .env`, then insert your google maps api key in `\client\.env`
- `npm run dev` to start the app for developement, or `npm run start` for production

The client will be running at `http://localhost:5173` and the server will be running at `http://localhost:8080`.