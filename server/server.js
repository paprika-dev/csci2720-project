const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const authRoutes = require('./router/auth');
const protectedRoutes = require('./router/protected');

const cors = require('cors');
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
        .then(() => { console.log("DB connected") })
        .catch(err => console.log(err))

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


"************ FRONT END TESTING ***************"

d = require('./db_for_frontend_testing/location_data.json')

app.get('/front_end_testing_single_location/:locName', (req, res) => {
    const targetIndex = d.findIndex(loc => loc.name == req.params.locName.replace(/-+/g,' '))
    res.send(d[targetIndex]);
});

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));