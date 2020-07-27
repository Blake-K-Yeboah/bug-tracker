const express = require('express');
const app = express();

app.get('/', (req, res) => res.send("Hello There!"));

const port = process.env.PORT || '5000';

app.listen(port, () => console.log('Server Listening on port: ' + port))