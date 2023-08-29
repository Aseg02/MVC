const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const expats = require('express-handlebars');
const hbs = expats.create({
    helpers
});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const ses = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 1800000, // check every 30 minutes
      expiration: 3600000 // will expire after 60 minutes
    })
  };

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(ses));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});