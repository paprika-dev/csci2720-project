# CSCI2720 Project

This is the project of location web app created by Group 20. 

## Stack
- Frontend: React + Vite
- Backend: Node.js (Express)
- Database: MongoDB

## Start the Application
At the root directory (csci2720-project)
- `npm install` & `npm run download_pkgs`to install dependencies
- `cd client && cp .env.example .env`, then insert your google maps api key in `\client\.env`
- add an `.env` file into `\server`:

    ```
    # Server Configuration
    PORT=5000

    # Database Configuration
    MONGO_URI="mongodb+srv://<db_username>:<db_password>@cluster0.zodft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # JWT Configuration
    JWT_SECRET=mysecretkey
    JWT_EXPIRES_IN=1h
    ```
- `npm run dev` to start the app for developement, or `npm run start` for production

The client will be running at `http://localhost:5173` and the server will be running at `http://localhost:5000`.