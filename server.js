const fs = require('fs');
const path = require('path');

// Log directory contents for debugging
fs.readdirSync(path.join(__dirname, 'controllers/api')).forEach(file => {
  console.log('File in controllers/api:', file);
});

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers'); // Import helpers

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); // Register helpers with Handlebars

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
