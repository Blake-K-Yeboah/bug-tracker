const express = require('express');
const app = express();

// Require Mongoose for DB
const mongoose = require('mongoose');

// Require Body Parser
const bodyParser = require('body-parser');

// Require passport
const passport = require('passport');

// Require User Router
const users = require('./routes/api/user.routes');

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// Test Request
app.get('/', (req, res) => res.send("Hello There!"));

// DB Config
const db = process.env.MONGOURI || require("./config/keys").mongoURI;

// Connect to MongoDB 
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// User Route
app.use('/api/users', users);

// Port Environment Variable or 5000
const port = process.env.PORT || '5000';

app.listen(port, () => console.log(`Server Listening on Port: ${port}`));