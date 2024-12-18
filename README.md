# CSCI2720 Project
This is the project of location web app created by Group 20. 

The project here submitted is original except for source material explicitly acknowledged, and that the same or closely related material has not been previously submitted for another course. We also acknowledge that we am aware of University policy and regulations on honesty in academic work, and of the disciplinary guidelines and procedures applicable to breaches of such policy and regulations, as contained in the website. University Guideline on Academic Honesty: https://www.cuhk.edu.hk/policy/academichonesty/


## 0. Stack
- Frontend: React + Vite
- Backend: Node.js (Express)
- Database: MongoDB

## 1. Project Structure
```
csci2720-project
├── client
│   ├── public
│   └── src
│       ├── api
│       ├── assets
│       ├── components
│       ├── pages
│       ├── utils
|       ├── App.jsx
|       ├── App.css
|       ├── main.jsx
|       └── ...
│   ├── index.html
│   ├── .env
|   ├── package.json
|   └── ...
└── server
    ├── datasets
    │   ├── comments.json
    │   ├── events.json
    │   ├── locations.json
    │   ├── users.json
    │   └── import.js
    ├── model.js
    ├── server.js
    ├── .env
    ├── package.json
    └── ...
```

## 2. Google Maps API
Enable the following Google Maps APIs:
- Maps Embed API
- Maps JavaScript API
- Places API
- Geocoding API

You will need a Maps Platform API Key and a map ID.

## 3. Start the Application
Run the following commands at the root directory (csci2720-project)
- step1: `npm install` to install dependencies (at root)
- step2: `npm run download_pkgs`to install dependencies (at client & server)
- step3: `cd client && cp .env.example .env`, then insert your Maps Platform API Key and map ID to `\client\.env`
- step4: `npm run start` to start the app. This command will import the dataset to database `csci2720-project-group20`, and start both client and server. 

The client will be running at `http://localhost:5173` and the server will be running at `http://localhost:8080`.

### (Optional)
You can run the following commands if you want to perform individual actions.
- `npm run install_client`
- `npm run install_server`
- `npm run import_dataset`
- `npm run start_client`
- `npm run start_server`


## 4. Packages Used

### Frontend
- @vis.gl/react-google-maps: "^1.4.2"
- axios: "^1.7.9",
- bootstrap: "^5.3.3",
- motion: "^11.14.1",
- react: "^18.3.1",
- react-bootstrap: "^2.10.6",
- react-dom: "^18.3.1",
- react-icons: "^5.4.0",
- react-router-dom: "^7.0.2",
- use-places-autocomplete: "^4.0.1"

### Backend
- bcrypt: "^5.1.1",
- cors: "^2.8.5",
- dotenv: "^16.4.7",
- express: "^4.21.1",
- express-session: "^1.18.1",
- mongoose: "^8.8.3"