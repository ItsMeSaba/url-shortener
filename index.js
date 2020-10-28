const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

require('dotenv').config();

mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to DB')
)

app.use(express.static('public'));
app.use(express.json());
app.set('views engine', 'ejs');


app.use('/', routes);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));