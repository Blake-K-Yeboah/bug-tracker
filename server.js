const express = require('express');
const app = express();

// Require Mongoose for DB
const mongoose = require('mongoose');

// Require Body Parser
const bodyParser = require('body-parser');

// Require passport
const passport = require('passport');

// Require Routers
const users = require('./routes/api/user.routes');
const changes = require('./routes/api/changes.routes');
const projects = require('./routes/api/projects.routes');

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

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

// Get rid of deprecation warning
mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api/users', users);
app.use('/api/changes', changes);
app.use('/api/projects', projects);

// Port Environment Variable or 5000
const port = process.env.PORT || '5000';

app.listen(port, () => console.log(`Server Listening on Port: ${port}`));