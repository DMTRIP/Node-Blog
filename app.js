const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./config/mongodb-config');

const app = express();

const { app: { port } } = require('./config/config');

// Api
const post = require('./api/routes/post');

// client views
app.use(express.static(path.join(__dirname, '/public')));

// user, post images
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', post);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
