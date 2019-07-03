const express = require('express');
const app = express();
const {app: { port }} = require('./config/config');


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});