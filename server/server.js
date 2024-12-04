const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
    data = {
        name: "venue1",
        quota: 800
    }
    res.send(JSON.stringify(data));
});


app.all('/*', (req, res) => {
    res.send('Hello World!');
});
const server = app.listen(8080);