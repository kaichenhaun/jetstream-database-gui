const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log("MongoDB connection established");
})

const usersRouter = require('./routes/users');
const connectorsRouter = require("./routes/connectors");
const subscriptionsRouter = require("./routes/subscriptions");

app.use('/users', usersRouter);
app.use('/connectors', connectorsRouter);
app.use('/subscriptions', subscriptionsRouter);

app.listen(port, () => {
    console.log("Running on port: "+port);
})