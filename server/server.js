const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());


"************ FRONT END TESTING ***************"

d = require('./db_for_frontend_testing/location_data.json')

app.get('/front_end_testing_all_locations', (req, res) => {
    res.send(d);
});

app.get('/front_end_testing_favlist', (req, res) => {
    res.send(d.filter(loc => loc.isFav == true));
});

app.post('/front_end_testing_favlist/', (req, res) => {
    const targetIndex = d.findIndex(loc => loc.id == req.body.locId)
    d[targetIndex].isFav = !d[targetIndex].isFav
    res.send(d);
    console.log("add to fav")
});

app.delete('/front_end_testing_favlist/', (req, res) => {
    const targetIndex = d.findIndex(loc => loc.id == req.body.locId)
    d[targetIndex].isFav = !d[targetIndex].isFav
    res.send(d);
    console.log("remove from fav")
});

app.all('/*', (req, res) => {
    res.send('Hello World!');
});

"************ FRONT END TESTING ***************"


const server = app.listen(8080);