const express = require('express');
const path = require('path');

const app = express();
const hbs = require('hbs');

hbs.registerHelper('if_st', function(templateAtribut, compareAtreibut, opts) {
  if (templateAtribut === compareAtreibut) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

const { app: { port } } = require('./config/config');

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'hbs',
    // choose style for post 1 == first style etc...
    poststyle: 1,
    post: [{

    }],
  });
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
